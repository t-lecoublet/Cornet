---
paths:
  - "components/Actions/**"
---

# Composants Actions

## DuButton

**Fichiers :** `components/Actions/du-button/du-button.vue` | `.types.ts` | `.stories.ts`

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
- `disabled?`: boolean
- `square?`: boolean
- `circle?`: boolean
- `block?`: boolean
- `as?`: ElementType (`'button'` | `'a'` | `'input'` | `'div'` | `'RouterLink'` | `'NuxtLink'` | string)
- `type?`: string
- `href?`: string
- `value?`: string
- `inputType?`: `'button'` | `'submit'` | `'reset'` | `'radio'` | `'checkbox'`
- `label?`: string
- `customClass?`: string

**Types :**
```typescript
export const BUTTON_SIZES = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-xl'] as const
export const BUTTON_COLORS = ['btn-primary', 'btn-secondary', 'btn-accent', 'btn-neutral', 'btn-info', 'btn-success', 'btn-warning', 'btn-error'] as const
export type BUTTONSize = (typeof BUTTON_SIZES)[number]
export type BUTTONColor = (typeof BUTTON_COLORS)[number]
```

---

## DuDropdown

**Fichiers :** `components/Actions/du-dropdown/du-dropdown.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `placement?`: `'start'` | `'center'` | `'end'` | `'top'` | `'bottom'` | `'left'` | `'right'`
- `hover?`: boolean
- `open?`: boolean

**Types :**
```typescript
export const DROPDOWN_PLACEMENTS = ['dropdown-start', 'dropdown-center', 'dropdown-end', 'dropdown-top', 'dropdown-bottom', 'dropdown-left', 'dropdown-right'] as const
export type DROPDOWNPlacement = (typeof DROPDOWN_PLACEMENTS)[number]
```

---

## DuModal

**Fichiers :** `components/Actions/du-modal/du-modal.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `id?`: string
- `open?`: boolean
- `closeButton?`: boolean
- `closeOnEscape?`: boolean
- `closeBackdrop?`: boolean
- `placement?`: `'top'` | `'middle'` | `'bottom'` | `'start'` | `'end'` | `'responsive'`
- `classBox?`: string

**Types :**
```typescript
export const MODAL_PLACEMENTS = ['modal-top', 'modal-middle', 'modal-bottom', 'modal-start', 'modal-end', 'modal-bottom sm:modal-middle'] as const
export type MODALPlacement = (typeof MODAL_PLACEMENTS)[number]
```

---

## DuSwap

**Fichiers :** `components/Actions/du-swap/du-swap.vue` | `.types.ts` | `.stories.ts`

Bascule entre deux états avec animations.

**Props :**
- `useCheckbox?`: boolean
- `modelValue?`: boolean (v-model)
- `rotate?`: boolean - Animation de rotation
- `flip?`: boolean - Animation de retournement

**Types :**
```typescript
export const SWAP_PROPERTIES = ['swap-rotate', 'swap-flip', 'swap-active'] as const
export type SWAPProperty = (typeof SWAP_PROPERTIES)[number]
```

---

## DuFab

**Fichiers :** `components/Actions/du-fab/du-fab.vue` | `.types.ts` | `.stories.ts`

Bouton d'action flottant (Floating Action Button).

**Props :**
- `items?`: FABItem[]
- `modifier?`: `'fab-flower'`
- `customClass?`: string
- `size?`: Size
- `variant?`: Variant
- `circle?`: boolean
- `mainAction?`: FABMainAction
- `closeButton?`: FABCloseButton
- `absolute?`: boolean

**Types :**
```typescript
export interface FABItem {
  label?: string
  icon?: any
  customClass?: string
  onClick?: () => void
  tooltip?: string
  tooltipPosition?: 'left' | 'top' | 'right' | 'bottom'
}

export interface FABMainAction {
  label?: string
  icon?: any
  customClass?: string
  variant?: string
  onClick?: () => void
}

export interface FABCloseButton {
  label?: string
  icon?: string
  customClass?: string
  variant?: string
}
```
