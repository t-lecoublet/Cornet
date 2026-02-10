---
paths:
  - "components/Feedback/**"
---

# Composants Feedback

## DuAlert

**Fichiers :** `components/Feedback/du-alert/du-alert.vue` | `.types.ts` | `.stories.ts`

**Props :**
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

**Fichiers :** `components/Feedback/du-skeleton/du-skeleton.vue` | `.types.ts` | `.stories.ts`

Placeholder de chargement. La forme est contrôlée par les classes CSS.

**Props :**
- `class?`: string

---

## DuToast

**Fichiers :** `components/Feedback/du-toast/du-toast.vue` | `.types.ts` | `.stories.ts`

Conteneur de notifications positionnées.

**Props :**
- `horizontalPosition?`: `'start'` | `'center'` | `'end'`
- `verticalPosition?`: `'top'` | `'middle'` | `'bottom'`
- `to?`: string - Cible de téléportation

---

## DuTooltip

**Fichiers :** `components/Feedback/du-tooltip/du-tooltip.vue` | `.types.ts` | `.stories.ts`

**Props :**
- `variant?`: Variant
- `dataTip?`: string - Contenu du tooltip
- `open?`: boolean - Toujours visible
- `position?`: `'top'` | `'right'` | `'bottom'` | `'left'`
- `responsive?`: boolean
