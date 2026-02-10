---
paths:
  - "components/Navigation/**"
---

# Composants Navigation

## DuMenu

**Fichiers :** `components/Navigation/du-menu/du-menu.vue` | `du-menu-item.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Gestion des sous-menus et slots personnalisés. Lire `du-menu.vue` ET `du-menu-item.vue`.

**Props :**
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

**Note :** MenuItem est aussi utilisé par DuDrawer (Layout).

---

## DuPagination

**Fichiers :** `components/Navigation/du-pagination/du-pagination.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Logique de calcul de pages et ellipsis.

**Props :**
- `modelValue?`: number (v-model, page actuelle)
- `total`: number (requis, nombre total d'items)
- `perPage?`: number (défaut: 10)
- `showNext?`: boolean (défaut: true)
- `showPrevious?`: boolean (défaut: true)
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
- `manual?`: boolean - Pas de calcul automatique
- `showEllipsis?`: boolean (défaut: true)
- `maxPages?`: number

---

## DuTabs

**Fichiers :** `components/Navigation/du-tabs/du-tabs.vue` | `.types.ts` | `.stories.ts`

> **Composant complexe** : Gestion des contenus dynamiques. Slots disponibles : `#tab-{index}`, `#content-{index}`.

**Props :**
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

**Fichiers :** `components/Navigation/du-breadcrumbs/du-breadcrumbs.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `items`: BreadcrumbItem[] (requis)
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

**Fichiers :** `components/Navigation/du-button-link/du-button-link.vue` | `.types.ts` | `.stories.ts`

Bouton stylisé comme lien de navigation (utilise `<a>` ou `<RouterLink>`).

**Props :**
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

**Fichiers :** `components/Navigation/du-dock/du-dock.vue` | `.types.ts` | `.stories.ts`

Barre de navigation fixe en bas (style macOS dock).

**Props :**
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

**Fichiers :** `components/Navigation/du-navbar/du-navbar.vue` | `.types.ts` | `.stories.ts`

Barre de navigation. Pas de props spécifiques, utilise des slots : `#start`, `#center`, `#end`.

---

## DuSteps / DuStepItem

**Fichiers :** `components/Navigation/du-steps/du-steps.vue` | `.types.ts` | `.stories.ts`

**Props DuSteps :**
- `items?`: StepItem[]
- `direction?`: `'steps-vertical'` | `'steps-horizontal'`
- `customClass?`: string
- `responsive?`: boolean
- `activeSteps?`: number[] - Indices des étapes actives
- `variant?`: Variant

**Props DuStepItem :**
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
