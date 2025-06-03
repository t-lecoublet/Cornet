import { computed } from 'vue'

export type Size = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const AvailableSizes: Size[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl']

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
