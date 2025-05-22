<script setup lang="ts">
import { computed } from "vue"
import { type SELECTProps } from './du-select.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"

const props = withDefaults(
  defineProps<SELECTProps>(),
  {
    ghost: false,
    variant: "default",
    size: "default",
    disabled: false,
  },
)

const ghostClass = computed(() => (props.ghost ? "select-ghost" : ""))
const { colorClass } = useVariantMapping(props, "select")
const { sizeClass } = useSizeMapping(props, "select")
</script>

<template>
  <select
    :disabled="disabled"
    :class="['select', ghostClass, colorClass, sizeClass]"
  >
    <slot />
  </select>
</template> 