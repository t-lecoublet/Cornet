---
paths:
  - "composables/**"
---

# Composables

## useSizeProps

**File:** `composables/useSizeProps.ts`

### Size Type

```typescript
export type Size = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const AvailableSizes: Size[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']
```

### useSizeMapping Function

```typescript
export function useSizeMapping(props: { size: Size }, suffix: string): ComputedRef<string>
```

- `suffix`: DaisyUI component prefix (e.g., `'btn'`, `'badge'`, `'input'`)
- Returns the corresponding CSS class: `'btn-sm'`, `'badge-lg'`, etc.
- Returns `''` if `size` is `'default'`

**Example:**
```typescript
const sizeClass = useSizeMapping(props, 'btn')
// props.size = 'sm' -> sizeClass.value = 'btn-sm'
// props.size = 'default' -> sizeClass.value = ''
```

---

## useVariantProps

**File:** `composables/useVariantProps.ts`

### Variant Type

```typescript
export type Variant = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
```

### useVariantMapping Function

```typescript
export function useVariantMapping(props: { variant: Variant }, suffix: string): ComputedRef<string>
```

- `suffix`: DaisyUI component prefix (e.g., `'btn'`, `'alert'`, `'badge'`)
- Returns the corresponding CSS class: `'btn-primary'`, `'alert-error'`, etc.
- Returns `''` if `variant` is `'default'`

**Example:**
```typescript
const variantClass = useVariantMapping(props, 'btn')
// props.variant = 'primary' -> variantClass.value = 'btn-primary'
// props.variant = 'default' -> variantClass.value = ''
```

---

## Combined usage in a component

```typescript
const props = withDefaults(defineProps<{
  size?: Size
  variant?: Variant
}>(), {
  size: 'default',
  variant: 'default'
})

const sizeClass = useSizeMapping(props, 'btn')
const variantClass = useVariantMapping(props, 'btn')

const classes = computed(() =>
  ['btn', sizeClass.value, variantClass.value].filter(Boolean).join(' ')
)
```

## useIconSource

**File:** `composables/useIconSource.ts`

The `icon` (and `figure`) field of an item, in the three forms the components
accept: a Vue component, an image URL, or a raw SVG/HTML string.

```typescript
export type IconSource = Component | string | null
export type IconKind = 'component' | 'image' | 'html'

export function resolveIconKind(icon: unknown): IconKind | null
export function iconAsText(icon: unknown): string | undefined
```

A template cannot narrow `IconSource` through a `resolveIconKind` call in a
sibling `v-if`, so the two are used together — `resolveIconKind` picks the
branch, `iconAsText` hands that branch a `string`:

```vue
<component :is="item.icon" v-if="resolveIconKind(item.icon) === 'component'" />
<img v-else-if="resolveIconKind(item.icon) === 'image'" :src="iconAsText(item.icon)" :alt="item.label" />
<div v-else-if="resolveIconKind(item.icon) === 'html'" v-html="iconAsText(item.icon)"></div>
```

Never inline a `typeof item.icon === 'object'` chain in a template: the three
components that did each recognized a different subset (one missed function
components, another missed root-relative image paths).

**Used by:** DuDock, DuTabs, DuStats, DuFab, DuMenuItem.

---

## nestedSize

**File:** `composables/useSizeProps.ts`

```typescript
export function nestedSize(size: Size): Size
```

The size one step below `size`, for a control rendered **inside** a sized
component — the chips in a select field, a modal's close button. `'default'`
counts as `'md'`; `'xs'` has nowhere left to go. Pair it with `useSizeMapping`
through a getter so it stays reactive:

```typescript
const inner = reactive({ get size() { return nestedSize(props.size) } })
const { sizeClass } = useSizeMapping(inner, 'btn')
```

A hardcoded `btn-sm` inside a component that exposes `size` is always a bug.

---

## Creating a new composable

1. Create `composables/use{Feature}.ts`
2. Export types and function
3. Add export to `index.ts`
4. Follow the same pattern as existing composables
