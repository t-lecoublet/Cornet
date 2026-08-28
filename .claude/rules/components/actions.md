---
paths:
  - "components/Actions/**"
---

# Action Components

## DuButton

**Files:** `components/Actions/du-button/du-button.vue` | `.types.ts` | `.stories.ts`

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
export type DuButtonSize = (typeof BUTTON_SIZES)[number]
export type DuButtonColor = (typeof BUTTON_COLORS)[number]
```

---

## DuDropdown

**Files:** `components/Actions/du-dropdown/du-dropdown.vue` | `.types.ts` | `.stories.ts`

WAI-ARIA disclosure pattern, built on `core/popover` + `core/positioning`.

**Props:**
- `open?`: boolean — omit it and the dropdown owns its state; pass it (`v-model:open`) and yours decides
- `hover?`: boolean — opens on pointer hover **and** on keyboard focus
- `openDelay?` / `closeDelay?`: number (ms, default 100)
- `placement?`: `'start'` | `'center'` | `'end'` | `'top'` | `'bottom'` | `'left'` | `'right'` (also a comma string, an array, or an object of flags)
- `popover?`: boolean — top layer, immune to `overflow: hidden`
- `closeOnClickOutside?` / `closeOnEscape?`: boolean (default true)
- `disabled?`: boolean
- `contentClass?`: string

**Emits:** `update:open`, `open`, `close`

**Slots:**
- `trigger` — scope `{ open, toggle, triggerProps }`. **Spread `triggerProps`** on the trigger or nothing opens.
- `content` / default — scope `{ open, close }`

```vue
<DuDropdown>
  <template #trigger="{ triggerProps }">
    <DuButton v-bind="triggerProps">Open</DuButton>
  </template>
  <DuMenu :items="items" />
</DuDropdown>
```

**Types :**
```typescript
export const DROPDOWN_PLACEMENTS = ['dropdown-start', 'dropdown-center', 'dropdown-end', 'dropdown-top', 'dropdown-bottom', 'dropdown-left', 'dropdown-right'] as const
export const DROPDOWN_STATES = ['dropdown-open', 'dropdown-close'] as const
export type DuDropdownPlacement = (typeof DROPDOWN_PLACEMENTS)[number]
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
export type DuModalPlacement = (typeof MODAL_PLACEMENTS)[number]
```

---

## DuSwap

**Files:** `components/Actions/du-swap/du-swap.vue` | `.types.ts` | `.stories.ts`

Toggle between two states with animations.

**Props:**
- `useCheckbox?`: boolean
- `modelValue?`: boolean (v-model)
- `rotate?`: boolean - Rotation animation
- `flip?`: boolean - Flip animation
- `ariaLabel?`: string - accessible name (`useCheckbox: false` renders a `<button aria-pressed>`)

**Types :**
```typescript
export const SWAP_PROPERTIES = ['swap-rotate', 'swap-flip', 'swap-active'] as const
export type DuSwapProperty = (typeof SWAP_PROPERTIES)[number]
```

---

## DuFab

**Files:** `components/Actions/du-fab/du-fab.vue` | `.types.ts` | `.stories.ts`

Floating Action Button.

**Props:**
- `items?`: DuFabItem[]
- `modifier?`: `'fab-flower'`
- `customClass?`: string
- `size?`: Size
- `variant?`: Variant
- `circle?`: boolean
- `mainAction?`: DuFabMainAction
- `closeButton?`: DuFabCloseButton
- `absolute?`: boolean

**Types :**
```typescript
export interface DuFabItem {
  label?: string
  icon?: IconSource
  customClass?: string
  onClick?: () => void
  tooltip?: string
  tooltipPosition?: 'left' | 'top' | 'right' | 'bottom'
}

export interface DuFabMainAction {
  label?: string
  icon?: IconSource
  customClass?: string
  variant?: string
  onClick?: () => void
}

export interface DuFabCloseButton {
  label?: string
  icon?: string
  customClass?: string
  variant?: string
}
```
