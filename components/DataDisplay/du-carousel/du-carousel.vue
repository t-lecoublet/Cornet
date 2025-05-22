<script setup lang="ts">
import { computed } from "vue"
import { type CAROUSELPosition, type CAROUSELDirection } from './du-carousel.types'

const props = withDefaults(
  defineProps<{
    start?: boolean
    center?: boolean
    end?: boolean
    vertical?: boolean
  }>(),
  {
    start: true,
    center: false,
    end: false,
    vertical: false,
  },
)

const positionClass = computed(() => {
  if (props.center) return "carousel-center"
  if (props.end) return "carousel-end"
  return "carousel-start" // default position
})

const directionClass = computed(() => {
  return props.vertical ? "carousel-vertical" : "carousel-horizontal"
})
</script>

<template>
  <div :class="['carousel', positionClass, directionClass]">
    <slot></slot>
  </div>
</template> 