---
paths:
  - "composables/**"
---

# Composables

## useSizeProps

**Fichier :** `composables/useSizeProps.ts`

### Type Size

```typescript
export type Size = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const AvailableSizes: Size[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']
```

### Fonction useSizeMapping

```typescript
export function useSizeMapping(props: { size: Size }, suffix: string): ComputedRef<string>
```

- `suffix` : préfixe du composant DaisyUI (ex: `'btn'`, `'badge'`, `'input'`)
- Retourne la classe CSS correspondante : `'btn-sm'`, `'badge-lg'`, etc.
- Retourne `''` si `size` est `'default'`

**Exemple :**
```typescript
const sizeClass = useSizeMapping(props, 'btn')
// props.size = 'sm' -> sizeClass.value = 'btn-sm'
// props.size = 'default' -> sizeClass.value = ''
```

---

## useVariantProps

**Fichier :** `composables/useVariantProps.ts`

### Type Variant

```typescript
export type Variant = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
```

### Fonction useVariantMapping

```typescript
export function useVariantMapping(props: { variant: Variant }, suffix: string): ComputedRef<string>
```

- `suffix` : préfixe du composant DaisyUI (ex: `'btn'`, `'alert'`, `'badge'`)
- Retourne la classe CSS correspondante : `'btn-primary'`, `'alert-error'`, etc.
- Retourne `''` si `variant` est `'default'`

**Exemple :**
```typescript
const variantClass = useVariantMapping(props, 'btn')
// props.variant = 'primary' -> variantClass.value = 'btn-primary'
// props.variant = 'default' -> variantClass.value = ''
```

---

## Utilisation combinée dans un composant

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

## Créer un nouveau composable

1. Créer `composables/use{Feature}.ts`
2. Exporter les types et la fonction
3. Ajouter l'export dans `index.ts`
4. Suivre le même pattern que les composables existants
