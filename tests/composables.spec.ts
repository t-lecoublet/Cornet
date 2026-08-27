import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { nestedSize, useSizeMapping, type Size } from '../composables/useSizeProps'
import { useVariantMapping, type Variant } from '../composables/useVariantProps'

describe('useSizeMapping', () => {
  it('maps a size to the suffixed DaisyUI class', () => {
    const props = reactive({ size: 'sm' as Size })
    const { sizeClass } = useSizeMapping(props, 'btn')
    expect(sizeClass.value).toBe('btn-sm')
  })

  it('returns an empty string for the default size', () => {
    const props = reactive({ size: 'default' as Size })
    const { sizeClass } = useSizeMapping(props, 'btn')
    expect(sizeClass.value).toBe('')
  })

  it('is reactive to prop changes', () => {
    const props = reactive({ size: 'default' as Size })
    const { sizeClass } = useSizeMapping(props, 'input')
    props.size = 'xl'
    expect(sizeClass.value).toBe('input-xl')
  })
})

describe('nestedSize', () => {
  it('drops one step down the scale', () => {
    expect(nestedSize('xl')).toBe('lg')
    expect(nestedSize('lg')).toBe('md')
    expect(nestedSize('md')).toBe('sm')
    expect(nestedSize('sm')).toBe('xs')
  })

  it('counts the default size as md, so nested controls land on sm', () => {
    expect(nestedSize('default')).toBe('sm')
  })

  it('stops at xs — there is nothing below it', () => {
    expect(nestedSize('xs')).toBe('xs')
  })

  it('stays reactive through a getter fed to useSizeMapping', () => {
    const props = reactive({ size: 'default' as Size })
    const nested = reactive({ get size(): Size { return nestedSize(props.size) } })
    const { sizeClass } = useSizeMapping(nested, 'badge')

    expect(sizeClass.value).toBe('badge-sm')
    props.size = 'xl'
    expect(sizeClass.value).toBe('badge-lg')
  })
})

describe('useVariantMapping', () => {
  it('maps a variant to the suffixed DaisyUI class', () => {
    const props = reactive({ variant: 'primary' as Variant })
    const { colorClass } = useVariantMapping(props, 'btn')
    expect(colorClass.value).toBe('btn-primary')
  })

  it('returns an empty string for the default variant (no btn-default ghost class)', () => {
    const props = reactive({ variant: 'default' as Variant })
    const { colorClass } = useVariantMapping(props, 'btn')
    expect(colorClass.value).toBe('')
  })

  it('is reactive to prop changes', () => {
    const props = reactive({ variant: 'default' as Variant })
    const { colorClass } = useVariantMapping(props, 'alert')
    props.variant = 'error'
    expect(colorClass.value).toBe('alert-error')
  })
})
