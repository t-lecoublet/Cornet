---
paths:
  - "components/Layout/**"
---

# Layout Components

## DuDrawer

**Files:** `components/Layout/du-drawer/du-drawer.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: Responsive management and overlay. Read the complete source before modifying.

**Two layouts, decided by the viewport** — the same breakpoint the
`*:drawer-open` classes use, matched in JS because the behaviour is not
expressible in CSS:

| | Layout | Behaviour |
| --- | --- | --- |
| **pinned** (≥ the breakpoint) | beside the content | no role, no focus trap, nothing inert |
| **overlay** (below it, or no `responsive`) | floating over the content | `role="dialog"` + `aria-modal`, focus trapped, background `inert`, focus handed back on close |

**Props:**
- `id?`: string
- `position?`: `'start'` | `'end'`
- `open?` / `modelValue?`: boolean — omit both and the drawer owns its state; pass either (`v-model`) and yours decides. `open` wins when both are given
- `responsive?`: boolean | `'sm'` | `'md'` | `'lg'` | `'xl'`
- `alwaysOpenOnLarge?`: boolean
- `ariaLabel?`: string — the dialog's accessible name while it floats (default `'Sidebar'`)
- `inertTarget?`: string — CSS selector for what to make `inert` behind the overlay (default: the drawer's own content pane)
- `closeOnEscape?` / `closeOnClickOutside?`: boolean (default true; the outside press only dismisses while floating)
- `sidebarClass?`: string
- `contentClass?`: string
- `overlayClass?`: string
- `items?`: DuDrawerItem[]

**Emits:** `update:open`, `update:modelValue`
**Exposes:** `toggleDrawer()`, `open()`, `close()`

**Types :**
```typescript
import { type DuMenuItemData } from '../../Navigation/du-menu/du-menu.types'

export interface DuDrawerItem extends DuMenuItemData {
  icon?: IconSource
  customClass?: string
  [key: string]: unknown
}
```

**Note:** DuDrawerItem extends DuMenuItemData from DuMenu. Any modification to DuMenuItemData also impacts DuDrawer.

---

## DuJoin

**Files:** `components/Layout/du-join/du-join.vue` | `.types.ts` | `.stories.ts`

Group of joined elements without spacing (grouped buttons, input + button, etc.)

**Props:**
- `as?`: string - Container HTML element type
- `direction?`: `'horizontal'` | `'vertical'`

**Usage:** Children must have the `join-item` class to be properly joined.
