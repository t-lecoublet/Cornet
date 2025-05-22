<script setup lang="ts">
import { type Size, useSizeMapping } from '../../../composables/useSizeProps'
import { computed } from 'vue'
import { type AVATARRounded } from './du-avatar.types'

type Rounded =
  | 'default'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'rounded'
  | 'full'

// Définition des types pour les props
const props = withDefaults(
  defineProps<{
    size?: Size
    rounded?: Rounded
  }>(),
  {
    size: 'default',
    rounded: 'default',
  },
)

const { sizeClass } = useSizeMapping(props, 'avatar')

const roundedClass = computed(() => {
  return {
    default: '',
    rounded: 'rounded',
    full: 'rounded-full',
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  }[props.rounded]
})
</script>

<template>
  <div class="avatar">
    <div :class="[sizeClass, roundedClass]">
      <slot />
    </div>
  </div>
</template> 