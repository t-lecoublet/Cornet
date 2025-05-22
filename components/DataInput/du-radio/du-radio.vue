<script setup lang="ts">
import { type RADIOProps } from './du-radio.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"

const props = withDefaults(
  defineProps<RADIOProps>(),
  {
    checked: false,
    disabled: false,
    variant: "default",
    size: "default",
  },
)

const { colorClass } = useVariantMapping(props, "radio")
const { sizeClass } = useSizeMapping(props, "radio")
</script>

<template>
  <input
    type="radio"
    :checked="checked"
    :disabled="disabled"
    :class="['radio', colorClass, sizeClass]"
  />
</template> 