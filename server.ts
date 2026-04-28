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

function createServer() {
  const server = new McpServer({ name: 'cornet', version: '1.0.0' })

  server.registerTool(
    'list_components',
    { description: 'List all Cornet Vue components organized by category' },
    async () => {
      const categories: Record<string, string[]> = {}
      for (const [path, doc] of Object.entries(docsRegistry)) {
        if (!categories[doc.category]) categories[doc.category] = []
        categories[doc.category].push(path.split('/').pop()!)
      }
      return { content: [{ type: 'text', text: JSON.stringify(categories, null, 2) }] }
    },
  )

  server.registerTool(
    'get_component_docs',
    {
      description: 'Get full documentation for a Cornet component including props, slots, classnames and code examples',
      inputSchema: { component: z.string().describe('Component name like "button", "modal", "select"') },
    },
    async ({ component }) => {
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
      return { content: [{ type: 'text', text: JSON.stringify(docsRegistry[key], null, 2) }] }
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
