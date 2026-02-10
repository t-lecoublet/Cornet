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

**Props:**
- `variant?`: Variant
- `dataTip?`: string - Tooltip content
- `open?`: boolean - Always visible
- `position?`: `'top'` | `'right'` | `'bottom'` | `'left'`
- `responsive?`: boolean
