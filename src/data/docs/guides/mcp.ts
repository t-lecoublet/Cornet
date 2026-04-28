import type { DocPageData } from '@/types/docs'

export default {
  title: 'MCP Server',
  description: 'Use Cornet components directly in your AI assistant via the Model Context Protocol (MCP).',
  category: 'Guides',
  sections: [
    {
      title: 'What is the Cornet MCP?',
      description: 'The Cornet MCP server exposes component documentation and source code to any LLM that supports the Model Context Protocol. Once connected, your assistant can look up props, slots, code examples and raw Vue source for any Cornet component — no copy-pasting docs needed.',
      lang: 'bash',
      links: [
        { label: 'MCP specification', href: 'https://modelcontextprotocol.io' },
        { label: 'Cornet MCP repository', href: 'https://gitlab.limos.fr/hub-isima/daisyui-vue-kit/-/tree/mcp' },
      ],
      code: `# Available tools:
# list_components         → lists all components by category
# get_component_docs      → full docs (props, slots, classnames, examples)
# get_component_source    → raw .vue source from the lib`,
    },
    {
      title: 'Setup',
      description: 'Clone the MCP branch and start the server with Docker. The server listens on port 3000.',
      lang: 'bash',
      code: `git clone --recurse-submodules \\
  git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git \\
  -b mcp cornet-mcp

cd cornet-mcp
docker compose up -d

# Server is now available at http://localhost:3000/mcp`,
    },
    {
      title: 'Claude Code',
      description: 'Register the server with the Claude Code CLI. The server will be available in every conversation within this project.',
      lang: 'bash',
      links: [
        { label: 'Claude Code MCP docs', href: 'https://docs.anthropic.com/en/docs/claude-code/mcp' },
      ],
      code: `claude mcp add --transport http cornet http://localhost:3000/mcp`,
    },
    {
      title: 'Claude Code — manual config',
      description: 'Alternatively, add the server manually to your project or global MCP config.',
      lang: 'json',
      code: `// .claude/mcp.json  (project)  or  ~/.claude/mcp.json  (global)
{
  "mcpServers": {
    "cornet": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}`,
    },
    {
      title: 'OpenCode',
      description: 'Add the server to your OpenCode configuration file.',
      lang: 'json',
      links: [
        { label: 'OpenCode MCP docs', href: 'https://opencode.ai/docs/mcp' },
      ],
      code: `// ~/.config/opencode/config.json
{
  "mcp": {
    "cornet": {
      "type": "remote",
      "url": "http://localhost:3000/mcp"
    }
  }
}`,
    },
    {
      title: 'Cursor / Windsurf',
      description: 'Add an MCP config file at the root of your project.',
      lang: 'json',
      code: `// .cursor/mcp.json  or  .windsurf/mcp.json
{
  "mcpServers": {
    "cornet": {
      "url": "http://localhost:3000/mcp"
    }
  }
}`,
    },
    {
      title: 'Updating docs and components',
      description: 'When the Cornet library or documentation is updated upstream, pull the latest changes with a single command.',
      lang: 'bash',
      code: `cd cornet-mcp
git submodule update --remote --recursive
docker compose restart web`,
    },
  ],
} satisfies DocPageData
