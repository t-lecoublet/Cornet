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

function injectTailwindVitePlugin(content: string): string | null {
  if (content.includes('@tailwindcss/vite')) return null
  return injectVitePlugin(content, `import tailwindcss from '@tailwindcss/vite';`, 'tailwindcss()')
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
      description: 'List all Cornet Vue components organized by category',
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
      description: 'Get full documentation for a Cornet component including props, slots, classnames and code examples',
      inputSchema: {
        component: z.string().describe('Component name like "button", "modal", "select"'),
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
        'Install Cornet as a git submodule in lib/ and fully configure it. ' +
        'Handles ALL steps: git submodule add (on the lib branch), git submodule update, npm install ./lib, ' +
        'adding the vueDaisyUI Vite plugin, and adding @import "daisyui-vue-kit/css" to the CSS. ' +
        'IMPORTANT: Never clone or copy files manually — always use this tool. ' +
        'Call first WITHOUT confirm to preview actions, ask the user, then call again with confirm: true.',
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

      const viteConfigFile = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'].find(
        f => existsSync(join(projectPath, f)),
      )
      const viteConfigPath = viteConfigFile ? join(projectPath, viteConfigFile) : null
      const viteContent = viteConfigPath ? readFileSync(viteConfigPath, 'utf-8') : null
      const viteNeedsPlugin = !viteContent?.includes('daisyui-vue-kit/plugin-vite')

      const stylePath = join(projectPath, 'src', 'style.css')
      const styleExists = existsSync(stylePath)
      const styleContent = styleExists ? readFileSync(stylePath, 'utf-8') : ''
      const styleNeedsImport = !styleContent.includes('daisyui-vue-kit/css')

      const actions = [
        `git submodule add -b lib ${sshUrl} lib`,
        'git submodule update --init --recursive',
        'npm install ./lib',
      ]
      if (viteNeedsPlugin) {
        actions.push(
          viteConfigPath
            ? `Update ${viteConfigFile}: add vueDaisyUI from 'daisyui-vue-kit/plugin-vite' to plugins`
            : "No vite.config found — add vueDaisyUI from 'daisyui-vue-kit/plugin-vite' to plugins manually",
        )
      }
      if (styleNeedsImport) {
        actions.push(`${styleExists ? 'Update' : 'Create'} src/style.css: add @import "daisyui-vue-kit/css"`)
      }

      if (!confirm) {
        return {
          content: [{
            type: 'text',
            text: [
              'The following actions will install Cornet:',
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

      try {
        execSync('npm install ./lib', { cwd: projectPath, stdio: 'pipe' })
        results.push('npm install ./lib done')
      } catch (e: unknown) {
        results.push(`npm install ./lib failed: ${e instanceof Error ? e.message : String(e)}`)
      }

      if (viteNeedsPlugin && viteConfigPath && viteContent) {
        const injected = injectVitePlugin(
          viteContent,
          `import vueDaisyUI from 'daisyui-vue-kit/plugin-vite';`,
          'vueDaisyUI()',
        )
        if (injected) {
          writeFileSync(viteConfigPath, injected, 'utf-8')
          results.push(`Updated ${viteConfigFile}`)
        } else {
          results.push(
            `Could not auto-patch ${viteConfigFile}. Add manually:\n` +
            `  import vueDaisyUI from 'daisyui-vue-kit/plugin-vite'\n` +
            `  // add vueDaisyUI() as first item in the plugins array`,
          )
        }
      }

      if (styleNeedsImport) {
        const cornetLine = '@import "daisyui-vue-kit/css";'
        let newStyle: string
        if (styleExists && styleContent.includes('@import "tailwindcss"')) {
          newStyle = styleContent.replace('@import "tailwindcss";', `@import "tailwindcss";\n${cornetLine}`)
        } else if (styleExists) {
          newStyle = cornetLine + '\n' + styleContent
        } else {
          newStyle = `@import "tailwindcss";\n${cornetLine}\n@plugin "daisyui";\n`
        }
        writeFileSync(stylePath, newStyle, 'utf-8')
        results.push(`${styleExists ? 'Updated' : 'Created'} src/style.css`)
      }

      return { content: [{ type: 'text', text: results.join('\n') }] }
    },
  )

  server.registerTool(
    'setup_tailwind',
    {
      description:
        'Check if Tailwind CSS, @tailwindcss/vite and DaisyUI are installed and configured in the user\'s project. ' +
        'Always call first WITHOUT confirm to show what will be done, then ask the user if they want to proceed. ' +
        'If they agree, call again with confirm: true to execute.',
      inputSchema: {
        projectPath: z.string().describe('Absolute path to the project root directory'),
        confirm: z.boolean().optional().describe('Set to true to confirm and execute the setup actions'),
      },
    },
    async ({ projectPath, confirm = false }) => {
      const pkgPath = join(projectPath, 'package.json')
      if (!existsSync(pkgPath)) {
        return { content: [{ type: 'text', text: `No package.json found at "${projectPath}". Make sure the path is correct.` }] }
      }

      let pkg: Record<string, unknown>
      try {
        pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      } catch {
        return { content: [{ type: 'text', text: `Could not parse package.json at "${projectPath}".` }] }
      }

      const allDeps = { ...(pkg.dependencies as object), ...(pkg.devDependencies as object) }
      const missing = ['tailwindcss', '@tailwindcss/vite', 'daisyui'].filter(p => !(p in allDeps))

      const viteConfigFile = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'].find(
        f => existsSync(join(projectPath, f)),
      )
      const viteConfigPath = viteConfigFile ? join(projectPath, viteConfigFile) : null
      const viteContent = viteConfigPath ? readFileSync(viteConfigPath, 'utf-8') : null
      const viteNeedsTailwind = !viteContent?.includes('@tailwindcss/vite')

      const stylePath = join(projectPath, 'src', 'style.css')
      const styleExists = existsSync(stylePath)
      const styleContent = styleExists ? readFileSync(stylePath, 'utf-8') : ''
      const styleNeedsTailwind =
        !styleContent.includes('@import "tailwindcss"') || !styleContent.includes('@plugin "daisyui"')

      const actions: string[] = []
      if (missing.length > 0) {
        actions.push(`npm install ${missing.map(p => `${p}@latest`).join(' ')}`)
      }
      if (viteNeedsTailwind) {
        actions.push(
          viteConfigPath
            ? `Update ${viteConfigFile} to register @tailwindcss/vite plugin`
            : 'Create vite.config.js with @tailwindcss/vite plugin',
        )
      }
      if (styleNeedsTailwind) {
        actions.push(`${styleExists ? 'Update' : 'Create'} src/style.css with @import "tailwindcss" and @plugin "daisyui"`)
      }

      if (actions.length === 0) {
        return { content: [{ type: 'text', text: 'Tailwind CSS, @tailwindcss/vite and DaisyUI are already installed and configured.' }] }
      }

      if (!confirm) {
        return {
          content: [{
            type: 'text',
            text: [
              'The following actions are needed to set up Tailwind CSS + DaisyUI:',
              ...actions.map(a => `  • ${a}`),
              '',
              'Ask the user if they want to proceed, then call this tool again with confirm: true.',
            ].join('\n'),
          }],
        }
      }

      const results: string[] = []

      if (missing.length > 0) {
        try {
          execSync(`npm install ${missing.map(p => `${p}@latest`).join(' ')}`, { cwd: projectPath, stdio: 'pipe' })
          results.push(`Installed: ${missing.join(', ')}`)
        } catch (e: unknown) {
          results.push(`npm install failed: ${e instanceof Error ? e.message : String(e)}`)
        }
      }

      if (viteNeedsTailwind) {
        const minimalConfig =
          `import { defineConfig } from 'vite';\nimport tailwindcss from '@tailwindcss/vite';\n\nexport default defineConfig({\n  plugins: [\n    tailwindcss()\n  ],\n});\n`
        if (viteConfigPath && viteContent) {
          const injected = injectTailwindVitePlugin(viteContent)
          if (injected) {
            writeFileSync(viteConfigPath, injected, 'utf-8')
            results.push(`Updated ${viteConfigFile}`)
          } else {
            results.push(
              `Could not auto-patch ${viteConfigFile}. Add manually:\n` +
              `  import tailwindcss from '@tailwindcss/vite';\n` +
              `  // then add tailwindcss() to the plugins array`,
            )
          }
        } else {
          writeFileSync(join(projectPath, 'vite.config.js'), minimalConfig, 'utf-8')
          results.push('Created vite.config.js')
        }
      }

      if (styleNeedsTailwind) {
        const prefix = `@import "tailwindcss";\n@plugin "daisyui";\n`
        writeFileSync(stylePath, styleExists ? prefix + '\n' + styleContent : prefix, 'utf-8')
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
