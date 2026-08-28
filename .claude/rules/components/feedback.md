---
paths:
  - "components/Feedback/**"
---

# Feedback Components

## DuAlert

**Files:** `components/Feedback/du-alert/du-alert.vue` | `.types.ts` | `.stories.ts`

**Props:**
- `variant?`: `'default'` | `'success'` | `'error'` | `'warning'` | `'info'`
- `direction?`: `'default'` | `'vertical'` | `'horizontal'` | `'responsive'`
- `soft?`: boolean
- `outline?`: boolean
- `dash?`: boolean
- `dismissible?`: boolean
- `autoDismissible?`: boolean
- `icon?`: boolean
- `dismissLabel?`: string — accessible name of the dismiss button (default `'Dismiss'`)

---

## DuLoading

**Fichiers :** `components/Feedback/du-loading/du-loading.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `animation?`: `'spinner'` | `'dots'` | `'ring'` | `'ball'` | `'bars'` | `'infinity'`
- `size?`: Size
- `variant?`: Variant

---

## DuProgress

**Fichiers :** `components/Feedback/du-progress/du-progress.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `value?`: number
- `max?`: number
- `indeterminate?`: boolean
- `variant?`: Variant
- `ariaLabel?`: string

---

## DuRadialProgress

**Fichiers :** `components/Feedback/du-radial-progress/du-radial-progress.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `value?`: number (0-100)
- `variant?`: Variant
- `size?`: Size | string
- `thickness?`: string

---

## DuSkeleton

**Files:** `components/Feedback/du-skeleton/du-skeleton.vue` | `.types.ts` | `.stories.ts`

Loading placeholder. Shape is controlled by CSS classes.

**Props:**
- `class?`: string

---

## DuToast

**Files:** `components/Feedback/du-toast/du-toast.vue` | `.types.ts` | `.stories.ts`

Positioned notification container.

**Props:**
- `horizontalPosition?`: `'start'` | `'center'` | `'end'`
- `verticalPosition?`: `'top'` | `'middle'` | `'bottom'`
- `to?`: string - Teleport target

---

## DuTooltip

**Files:** `components/Feedback/du-tooltip/du-tooltip.vue` | `.types.ts` | `.stories.ts`

WAI-ARIA tooltip pattern, built on `core/popover` + `core/positioning`.

**A tooltip is a description, never a place for interactive content** — a
keyboard user cannot reach inside one. Buttons or links in a popup mean
`DuDropdown`.

**Props:**
- `variant?`: Variant
- `dataTip?`: string — the tip, when it is plain text (the `content` slot takes markup)
- `open?`: boolean — omit it and the tooltip owns its state (hover + focus); pass it (`v-model:open`) and yours decides
- `position?`: `'top'` | `'right'` | `'bottom'` | `'left'`
- `responsive?`: boolean — only apply the tooltip above the `lg` breakpoint
- `openDelay?` / `closeDelay?`: number (ms, defaults 300 / 100)
- `popover?`: boolean — top layer, immune to `overflow: hidden`
- `disabled?`: boolean

**Emits:** `update:open`

Opens on hover after `openDelay` and on keyboard focus immediately; dismisses
on Escape (WCAG 1.4.13). The tip is a real element with `role="tooltip"`,
rendered only while shown, and `aria-describedby` is wired onto the first
focusable element in the default slot while it is up.

The `data-tip` **attribute is no longer set** — daisyUI reveals a tip on
`:hover` from that attribute alone, with no delay and no way to dismiss it. The
`dataTip` prop is unchanged.
