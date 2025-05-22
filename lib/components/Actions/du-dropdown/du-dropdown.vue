<script setup lang="ts">
import { computed, provide } from 'vue'
import { type DROPDOWNPlacement } from './du-dropdown.types'

const props = withDefaults(
  defineProps<{
    hover?: boolean
    open?: boolean
    placement?:
      | 'start'
      | 'center'
      | 'end'
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
  }>(),
  {
    hover: false,
    open: false,
    placement: 'bottom',
  },
)

provide('isDropdownTrigger', true)

const placementClass = computed(() => {
  switch (props.placement) {
    case 'start':
      return 'dropdown-start'
    case 'center':
      return 'dropdown-center'
    case 'end':
      return 'dropdown-end'
    case 'top':
      return 'dropdown-top'
    case 'bottom':
      return 'dropdown-bottom'
    case 'left':
      return 'dropdown-left'
    case 'right':
      return 'dropdown-right'
    default:
      return ''
  }
})

const hoverClass = computed(() => {
  return props.hover ? 'dropdown-hover' : ''
})

const openClass = computed(() => {
  return props.open ? 'dropdown-open' : ''
})
</script>

<template>
  <div :class="['dropdown', placementClass, hoverClass, openClass]">
    <slot name="trigger"></slot>
    <div class="dropdown-content">
      <slot></slot>
    </div>
  </div>
</template> 