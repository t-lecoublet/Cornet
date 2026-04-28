import express, { type Request, type Response } from 'express'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { docsRegistry } from './website/src/data/docs/registry.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITLAB_BASE = 'https://gitlab.limos.fr/hub-isima/daisyui-vue-kit'
const GITHUB_BASE = 'https://github.com/t-lecoublet/Cornet'
const GITHUB_SSH  = 'git@github.com:t-lecoublet/Cornet.git'

function transformToGithub(text: string): string {
  return text
    .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit\/-\/tree\//g, `${GITHUB_BASE}/tree/`)
    .replace(/https:\/\/gitlab\.limos\.fr\/hub-isima\/daisyui-vue-kit/g, GITHUB_BASE)
    .replace(/git@gitlab\.limos\.fr:hub-isima\/daisyui-vue-kit\.git/g, GITHUB_SSH)
}

function applyRepo(text: string, repo: 'gitlab' | 'github'): string {
  return repo === 'github' ? transformToGithub(text) : text
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
