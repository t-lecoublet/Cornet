import { type ArgTypes } from '@storybook/vue3'
import { computed } from 'vue'

export type Variant = 'default' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'

export function useVariantMapping(props: { variant: Variant }, suffix: string) {
  const colorClass = computed(() => {
    return suffix + '-' + props.variant
  })

  return { colorClass }
}

export const useVariantStoriesControl: ArgTypes = {
  variant: {
    control: { type: 'select' },
    options: ['default', 'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
  },
}
