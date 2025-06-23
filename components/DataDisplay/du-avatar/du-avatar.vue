<script setup lang="ts">
import { type Size, useSizeMapping} from '../../../composables/useSizeProps'
import { computed } from 'vue'
import { type AVATARRounded, type Rounded, type AVATARMask, type Mask } from './du-avatar.types'

const props = withDefaults(
  defineProps<{
    size?: Size
    rounded?: Rounded
    offline?: boolean
    online?: boolean
    placeholder?: boolean
    ring?: boolean
    ringColor?: string
    ringOffset?: number
    mask?: Mask
  }>(),
  {
    size: 'default',
    rounded: 'default',
    offline: false,
    online: false,
    placeholder: false,
    ring: false,
    ringColor: 'primary',
    ringOffset: 2
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
  }[props.rounded] as AVATARRounded
})

const maskClass = computed(() => {
  if (!props.mask) return ''
  return 'mask ' + `mask-${props.mask}` as AVATARMask
})

const ringClass = computed(() => {
  if (!props.ring) return ''
  return `ring-${props.ringOffset} ring-${props.ringColor} ring-offset-base-100 ring-offset-2 ring-2`
})

const statusClass = computed(() => {
  if (props.online) return 'avatar-online'
  if (props.offline) return 'avatar-offline'
  return ''
})

const placeholderClass = computed(() => {
  return props.placeholder ? 'avatar-placeholder' : ''
})
</script>

<template>
  <div :class="['avatar', statusClass, placeholderClass]">
    <div :class="[sizeClass, roundedClass, maskClass, ringClass]">
      <slot />
    </div>
  </div>
</template>

<style scoped>

.avatar-xs {
  width: calc(var(--spacing)*8);
}

.avatar-sm {
  width: calc(var(--spacing)*12);
}

.avatar-md {
  width: calc(var(--spacing)*16);
}

.avatar-lg {
  width: calc(var(--spacing)*24);
}

.avatar-xl {
  width: calc(var(--spacing)*28);
}
</style>