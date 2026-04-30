import express, { type Request, type Response } from 'express'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { docsRegistry } from './website/src/data/docs/registry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITLAB_BASE = 'https://gitlab.limos.fr/hub-isima/daisyui-vue-kit'
const GITHUB_BASE = 'https://github.com/t-lecoublet/Cornet'
const GITHUB_SSH  = 'git@github.com:t-lecoublet/Cornet.git'
const GITLAB_SSH  = 'git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git'

function transformToGithub(text: string): string {
  return text
    .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit\/-\/tree\//g, `${GITHUB_BASE}/tree/`)
    .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit/g, GITHUB_BASE)
    .replace(/git@gitlab\.limos\.fr:hub-isima\/daisyui-vue-kit\.git/g, GITHUB_SSH)
}

function applyRepo(text: string, repo: 'gitlab' | 'github'): string {
  return repo === 'github' ? transformToGithub(text) : text
}

function injectVitePlugin(content: string, importLine: string, pluginCall: string): string | null {
  const lines = content.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s/.test(lines[i])) lastImportIdx = i
  }
  if (lastImportIdx < 0) return null
  lines.splice(lastImportIdx + 1, 0, importLine)
  const withImport = lines.join('\n')
  if (!/plugins\s*:\s*\[/.test(withImport)) return null
  return withImport.replace(/plugins\s*:\s*\[/, `plugins: [\n    ${pluginCall},`)
}


const repoSchema = z.enum(['gitlab', 'github']).optional().describe(
  'Which repo to use for URLs in code examples. ' +
  'IMPORTANT: Before calling any tool, check if the user\'s project has a .gitmodules file. ' +
  'If it exists, read it to detect which Cornet remote is configured (gitlab.limos.fr → "gitlab", github.com → "github") and use that. ' +
  'If there is no .gitmodules or Cornet is not yet installed, ask the user which platform they prefer: ' +
  `GitLab (${GITLAB_BASE}) or GitHub (${GITHUB_BASE}).`
)

function createServer() {
  const server = new McpServer({ name: 'cornet', version: '1.0.0' })

  server.registerTool(
    'list_components',
    {
      description: 'List all Cornet Vue components and guides organized by category (includes a "Guides" category with installation, quick-start, theming, etc.)',
      inputSchema: { repo: repoSchema },
    },
    async ({ repo = 'gitlab' }) => {
      const categories: Record<string, string[]> = {}
      for (const [path, doc] of Object.entries(docsRegistry)) {
        if (!categories[doc.category]) categories[doc.category] = []
        categories[doc.category].push(path.split('/').pop()!)
      }
      const text = applyRepo(JSON.stringify(categories, null, 2), repo)
      return { content: [{ type: 'text', text }] }
    },
  )

  server.registerTool(
    'get_component_docs',
    {
      description:
        'Get full documentation for a Cornet component or guide. ' +
        'Works for both components (e.g. "button", "modal") and guides (e.g. "installation", "quick-start", "theming", "copy-components", "mcp"). ' +
        'Always call this to read a guide before asking the user to do manual steps.',
      inputSchema: {
        component: z.string().describe('Component name like "button", "modal" or guide name like "installation", "quick-start"'),
        repo: repoSchema,
      },
    },
    async ({ component, repo = 'gitlab' }) => {
      const key = Object.keys(docsRegistry).find((k) =>
        k.toLowerCase().endsWith('/' + component.toLowerCase()),
      )
      if (!key) {
        const available = Object.keys(docsRegistry).map((k) => k.split('/').pop())
        return {
          content: [
            { type: 'text', text: `Component "${component}" not found. Available: ${available.join(', ')}` },
          ],
        }
      }
      const text = applyRepo(JSON.stringify(docsRegistry[key], null, 2), repo)
      return { content: [{ type: 'text', text }] }
    },
  )

  server.registerTool(
    'get_component_source',
    {
      description: 'Get the Vue source code of a Cornet component from the lib directory',
      inputSchema: { component: z.string().describe('Component name like "button", "modal", "select"') },
    },
    async ({ component }) => {
      const name = component.toLowerCase()
      const libPath = join(__dirname, 'website', 'lib', 'components')
      try {
        const result = execSync(`find "${libPath}" -name "du-${name}.vue" 2>/dev/null`).toString().trim()
        if (!result) return { content: [{ type: 'text', text: `Vue source not found for "${component}"` }] }
        return { content: [{ type: 'text', text: readFileSync(result, 'utf-8') }] }
      } catch (e) {
        return { content: [{ type: 'text', text: `Error reading source for "${component}": ${e}` }] }
      }
    },
  )

  server.registerTool(
    'install_cornet',
    {
      description:
        'Install Cornet as a git submodule in lib/ and fully configure the project (Tailwind CSS included). ' +
        'Handles ALL steps: npm install tailwindcss + daisyui, git submodule add (on the lib branch), ' +
        'git submodule update, npm install ./lib, adding vueDaisyUI + tailwindcss Vite plugins, ' +
        'and writing the complete CSS imports. ' +
        'IMPORTANT: Never clone or copy files manually — always use this tool. ' +
        'Call first WITHOUT confirm to preview actions, ask the user, then call again with confirm: true. ' +
        'If anything is unclear, call get_component_docs with "installation" or "quick-start" to read the official guide.',
      inputSchema: {
        projectPath: z.string().describe('Absolute path to the project root directory'),
        repo: repoSchema,
        confirm: z.boolean().optional().describe('Set to true to confirm and execute'),
      },
    },
    async ({ projectPath, repo = 'gitlab', confirm = false }) => {
      if (!existsSync(join(projectPath, '.git'))) {
        return { content: [{ type: 'text', text: `"${projectPath}" is not a git repository. Run "git init" first.` }] }
      }

      const gitmodulesPath = join(projectPath, '.gitmodules')
      const gitmodulesContent = existsSync(gitmodulesPath) ? readFileSync(gitmodulesPath, 'utf-8') : ''
      if (gitmodulesContent.includes('daisyui-vue-kit') || gitmodulesContent.includes('t-lecoublet/Cornet')) {
        return { content: [{ type: 'text', text: 'Cornet is already installed as a git submodule.' }] }
      }

      if (existsSync(join(projectPath, 'lib'))) {
        return { content: [{ type: 'text', text: `A "lib/" directory already exists at "${projectPath}". Remove it first or check if Cornet is already installed.` }] }
      }

      const sshUrl = repo === 'github' ? GITHUB_SSH : GITLAB_SSH
      const httpsUrl = repo === 'github' ? GITHUB_BASE : GITLAB_BASE

      // npm packages
      const pkgPath = join(projectPath, 'package.json')
      const pkg = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, 'utf-8')) : {}
      const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
      const missingNpm = ['tailwindcss', '@tailwindcss/vite', 'daisyui'].filter(p => !(p in allDeps))

      // vite config
      const viteConfigFile = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'].find(
        f => existsSync(join(projectPath, f)),
      )
      const viteConfigPath = viteConfigFile ? join(projectPath, viteConfigFile) : null
      const viteContent = viteConfigPath ? readFileSync(viteConfigPath, 'utf-8') : null
      const viteNeedsTailwind = !viteContent?.includes('@tailwindcss/vite')
      const viteNeedsCornet = !viteContent?.includes('daisyui-vue-kit/plugin-vite')

      // CSS
      const stylePath = join(projectPath, 'src', 'style.css')
      const styleExists = existsSync(stylePath)
      const styleContent = styleExists ? readFileSync(stylePath, 'utf-8') : ''
      const styleNeedsTailwindImport = !styleContent.includes('@import "tailwindcss"')
      const styleNeedsCornetImport = !styleContent.includes('daisyui-vue-kit/css')
      const styleNeedsDaisyuiPlugin = !styleContent.includes('@plugin "daisyui"')

      const actions: string[] = []
      if (missingNpm.length > 0) {
        actions.push(`npm install ${missingNpm.map(p => `${p}@latest`).join(' ')}`)
      }
      actions.push(
        `git submodule add -b lib ${sshUrl} lib`,
        'git submodule update --init --recursive',
        'npm install ./lib',
      )
      if (viteNeedsTailwind || viteNeedsCornet) {
        const pluginNames = [...(viteNeedsCornet ? ['vueDaisyUI()'] : []), ...(viteNeedsTailwind ? ['tailwindcss()'] : [])]
        actions.push(
          viteConfigPath
            ? `Update ${viteConfigFile}: add ${pluginNames.join(', ')} to plugins`
            : `Create vite.config.js with ${pluginNames.join(', ')}`,
        )
      }
      if (styleNeedsTailwindImport || styleNeedsCornetImport || styleNeedsDaisyuiPlugin) {
        actions.push(`${styleExists ? 'Update' : 'Create'} src/style.css with all required imports`)
      }

      if (!confirm) {
        return {
          content: [{
            type: 'text',
            text: [
              'The following actions will install Cornet and set up Tailwind CSS + DaisyUI:',
              ...actions.map(a => `  • ${a}`),
              '',
              `Uses SSH (${sshUrl}). If SSH is unavailable, HTTPS fallback: ${httpsUrl}`,
              '',
              'Ask the user if they want to proceed, then call this tool again with confirm: true.',
            ].join('\n'),
          }],
        }
      }

      const results: string[] = []

      // 1. npm install tailwind packages
      if (missingNpm.length > 0) {
        try {
          execSync(`npm install ${missingNpm.map(p => `${p}@latest`).join(' ')}`, { cwd: projectPath, stdio: 'pipe' })
          results.push(`Installed: ${missingNpm.join(', ')}`)
        } catch (e: unknown) {
          results.push(`npm install failed: ${e instanceof Error ? e.message : String(e)}`)
        }
      }

      // 2. git submodule
      try {
        execSync(`git submodule add -b lib ${sshUrl} lib`, { cwd: projectPath })
        results.push('Cornet added as git submodule at lib/')
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        results.push(`git submodule add failed: ${msg}\nTry HTTPS instead: git submodule add -b lib ${httpsUrl} lib`)
        return { content: [{ type: 'text', text: results.join('\n') }] }
      }

      try {
        execSync('git submodule update --init --recursive', { cwd: projectPath })
        results.push('Submodule initialized')
      } catch (e: unknown) {
        results.push(`git submodule update failed: ${e instanceof Error ? e.message : String(e)}`)
      }

      // 3. npm install ./lib
      try {
        execSync('npm install ./lib', { cwd: projectPath, stdio: 'pipe' })
        results.push('npm install ./lib done')
      } catch (e: unknown) {
        results.push(`npm install ./lib failed: ${e instanceof Error ? e.message : String(e)}`)
      }

      // 4. vite config — inject tailwindcss first, then vueDaisyUI so it ends up first in the array
      if (viteNeedsTailwind || viteNeedsCornet) {
        if (viteConfigPath && viteContent) {
          let updated = viteContent
          if (viteNeedsTailwind) {
            updated = injectVitePlugin(updated, `import tailwindcss from '@tailwindcss/vite';`, 'tailwindcss()') ?? updated
          }
          if (viteNeedsCornet) {
            updated = injectVitePlugin(updated, `import vueDaisyUI from 'daisyui-vue-kit/plugin-vite';`, 'vueDaisyUI()') ?? updated
          }
          if (updated !== viteContent) {
            writeFileSync(viteConfigPath, updated, 'utf-8')
            results.push(`Updated ${viteConfigFile}`)
          } else {
            results.push(
              `Could not auto-patch ${viteConfigFile}. Add manually:\n` +
              `  import vueDaisyUI from 'daisyui-vue-kit/plugin-vite'\n` +
              `  import tailwindcss from '@tailwindcss/vite'\n` +
              `  // add vueDaisyUI() and tailwindcss() to the plugins array`,
            )
          }
        } else {
          const minimalConfig =
            `import { defineConfig } from 'vite';\nimport vueDaisyUI from 'daisyui-vue-kit/plugin-vite';\nimport tailwindcss from '@tailwindcss/vite';\n\nexport default defineConfig({\n  plugins: [\n    vueDaisyUI(),\n    tailwindcss()\n  ],\n});\n`
          writeFileSync(join(projectPath, 'vite.config.js'), minimalConfig, 'utf-8')
          results.push('Created vite.config.js')
        }
      }

      // 5. CSS — ensure correct order: @import "tailwindcss" → @import "daisyui-vue-kit/css" → @plugin "daisyui"
      if (styleNeedsTailwindImport || styleNeedsCornetImport || styleNeedsDaisyuiPlugin) {
        let css = styleContent
        if (styleNeedsTailwindImport) {
          css = `@import "tailwindcss";\n` + css
        }
        if (styleNeedsCornetImport) {
          css = css.replace('@import "tailwindcss";', `@import "tailwindcss";\n@import "daisyui-vue-kit/css";`)
        }
        if (styleNeedsDaisyuiPlugin) {
          const lines = css.split('\n')
          let lastImportLine = -1
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('@import ')) lastImportLine = i
          }
          if (lastImportLine >= 0) {
            lines.splice(lastImportLine + 1, 0, '@plugin "daisyui";')
            css = lines.join('\n')
          } else {
            css += '\n@plugin "daisyui";'
          }
        }
        writeFileSync(stylePath, css, 'utf-8')
        results.push(`${styleExists ? 'Updated' : 'Created'} src/style.css`)
      }

      return { content: [{ type: 'text', text: results.join('\n') }] }
    },
  )

  return server
}

const app = express()
app.use(express.json())

app.post('/mcp', async (req: Request, res: Response) => {
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined })
  const server = createServer()
  res.on('close', () => { transport.close(); server.close() })
  await server.connect(transport)
  await transport.handleRequest(req, res, req.body)
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Cornet MCP server → http://localhost:${PORT}/mcp`))
