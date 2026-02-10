---
paths:
  - "components/Navigation/**"
---

# Navigation Components

## DuMenu

**Files:** `components/Navigation/du-menu/du-menu.vue` | `du-menu-item.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: Submenu management and custom slots. Read `du-menu.vue` AND `du-menu-item.vue`.

**Props:**
- `direction?`: `'default'` | `'vertical'` | `'horizontal'` | `'responsive'`
- `size?`: Size
- `rounded?`: boolean
- `items?`: MenuItem[]
- `activeItem?`: string
- `onItemClick?`: (item: MenuItem) => void
- `onSubItemClick?`: (item: MenuItem) => void

**Types :**
```typescript
export interface MenuItem {
  label: string
  href?: string
  disabled?: boolean
  isTitle?: boolean
  subItems?: MenuItem[]
  value?: string | number
  onClick?: () => void
  checked?: boolean
  multiple?: boolean
  active?: boolean
}
```

**Note:** MenuItem is also used by DuDrawer (Layout).

---

## DuPagination

**Files:** `components/Navigation/du-pagination/du-pagination.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: Page calculation logic and ellipsis.

**Props:**
- `modelValue?`: number (v-model, current page)
- `total`: number (required, total number of items)
- `perPage?`: number (default: 10)
- `showNext?`: boolean (default: true)
- `showPrevious?`: boolean (default: true)
- `showFirst?`: boolean
- `showLast?`: boolean
- `size?`: Size
- `nextLabel?`: string
- `previousLabel?`: string
- `firstLabel?`: string
- `lastLabel?`: string
- `variant?`: Variant
- `outline?`: boolean
- `soft?`: boolean
- `manual?`: boolean - No automatic calculation
- `showEllipsis?`: boolean (default: true)
- `maxPages?`: number

---

## DuTabs

**Files:** `components/Navigation/du-tabs/du-tabs.vue` | `.types.ts` | `.stories.ts`

> **Complex component**: Dynamic content management. Available slots: `#tab-{index}`, `#content-{index}`.

**Props:**
- `size?`: Size
- `items?`: TabItem[]
- `type?`: `'lift'` | `'border'` | `'box'`
- `bottom?`: boolean
- `name?`: string

**Types :**
```typescript
export interface TabItem {
  label?: string
  icon?: any
  class?: string
  active?: boolean
  onClick?: () => void
  content?: string
  [key: string]: any
}
```

---

## DuBreadcrumbs

**Files:** `components/Navigation/du-breadcrumbs/du-breadcrumbs.vue` | `.types.ts` | `.stories.ts`

**Props:**
- `items`: BreadcrumbItem[] (required)
- `separator?`: string

**Types :**
```typescript
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
}
```

---

## DuButtonLink

**Files:** `components/Navigation/du-button-link/du-button-link.vue` | `.types.ts` | `.stories.ts`

Button styled as navigation link (uses `<a>` or `<RouterLink>`).

**Props:**
- `size?`: Size
- `variant?`: Variant
- `outline?`: boolean
- `soft?`: boolean
- `dash?`: boolean
- `active?`: boolean
- `ghost?`: boolean
- `link?`: boolean
- `wide?`: boolean
- `square?`: boolean
- `circle?`: boolean
- `block?`: boolean

---

## DuDock

**Files:** `components/Navigation/du-dock/du-dock.vue` | `.types.ts` | `.stories.ts`

Fixed navigation bar at the bottom (macOS dock style).

**Props:**
- `size?`: Size
- `items?`: DockItem[]
- `reverseTheme?`: boolean

**Types :**
```typescript
export interface DockItem {
  label?: string
  icon?: any
  class?: string
  active?: boolean
  onClick?: () => void
  [key: string]: any
}
```

---

## DuLink

**Fichiers :** `components/Navigation/du-link/du-link.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `variant?`: Variant
- `onlyUnderlineOnHover?`: boolean
- `ghost?`: boolean

---

## DuNavbar

**Files:** `components/Navigation/du-navbar/du-navbar.vue` | `.types.ts` | `.stories.ts`

Navigation bar. No specific props, uses slots: `#start`, `#center`, `#end`.

---

## DuSteps / DuStepItem

**Files:** `components/Navigation/du-steps/du-steps.vue` | `.types.ts` | `.stories.ts`

**Props DuSteps:**
- `items?`: StepItem[]
- `direction?`: `'steps-vertical'` | `'steps-horizontal'`
- `customClass?`: string
- `responsive?`: boolean
- `activeSteps?`: number[] - Indices of active steps
- `variant?`: Variant

**Props DuStepItem:**
- `label?`: string
- `active?`: boolean
- `customClass?`: string
- `dataContent?`: string
- `variant?`: Variant

**Types :**
```typescript
export interface StepItem {
  label?: string
  active?: boolean
  customClass?: string
  dataContent?: string
}
```
