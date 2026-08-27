import { computed } from 'vue'

export type Size = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const AvailableSizes: Size[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']

const SIZE_SCALE: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']

/**
 * The size one step below `size`, for controls nested inside a sized one —
 * the chips in a select field, their remove button, its chevron. `'default'`
 * counts as `'md'` (daisyUI's own default), and `'xs'` has nowhere left to go.
 *
 * Pair it with `useSizeMapping` through a getter, so it stays reactive:
 * `reactive({ get size() { return nestedSize(props.size) } })`
 */
export function nestedSize(size: Size): Size {
  const index = SIZE_SCALE.indexOf(size === 'default' ? 'md' : size)
  return SIZE_SCALE[Math.max(0, index - 1)]!
}

export function useSizeMapping(props: { size: Size }, suffix: string) {
  const sizeClass = computed(() => {
    return {
      default: '',
      xs: suffix + '-xs',
      sm: suffix + '-sm',
      md: suffix + '-md',
      lg: suffix + '-lg',
      xl: suffix + '-xl',
    }[props.size]
  })

  return { sizeClass }
}

export const useSizeStoriesControl = {
  size: {
    control: { type: 'select' },
    options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
  },
}
