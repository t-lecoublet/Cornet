@lib/.claude/CLAUDE.md

# Cornet MCP Server

MCP server exposing Cornet component docs via stdio.

## Structure

```
server.ts          # MCP server entry point (stdio transport)
docs/              # Component documentation (moved from src/data/docs)
  types.ts         # DocPageData and related types
  registry.ts      # Maps component paths → DocPageData
  actions/         # Button, Modal, Dropdown, Swap, FAB
  data-display/    # Accordion, Avatar, Badge, Card, ...
  data-input/      # Checkbox, Select, Input, ...
  feedback/        # Alert, Toast, Tooltip, ...
  guides/          # Installation, Quick Start, Theming, ...
  layout/          # Drawer, Join
  navigation/      # Menu, Navbar, Breadcrumbs, ...
lib/               # Cornet Vue component library (git submodule)
```

## MCP Tools

- `list_components` — list all components by category
- `get_component_docs` — full docs for a component (props, slots, classnames, code examples)
- `get_component_source` — raw `.vue` source from `/lib/components`

## Running

```bash
# Start the container
docker compose up -d

# Run MCP server (stdio)
docker compose exec -T web npx tsx /app/server.ts

# Or directly (if node/tsx installed locally)
npx tsx server.ts
```

## Claude Code MCP config

Add to your Claude Code MCP settings:

```json
{
  "cornet": {
    "command": "docker",
    "args": ["compose", "-f", "/path/to/docker-compose.yml", "exec", "-T", "web", "npx", "tsx", "/app/server.ts"]
  }
}
```
