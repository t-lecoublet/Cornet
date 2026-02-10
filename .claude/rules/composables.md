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

## Creating a new composable

1. Create `composables/use{Feature}.ts`
2. Export types and function
3. Add export to `index.ts`
4. Follow the same pattern as existing composables
