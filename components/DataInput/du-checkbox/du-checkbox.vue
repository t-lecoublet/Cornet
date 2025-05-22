<script setup lang="ts">
import { type CHECKBOXProps } from './du-checkbox.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"
import { computed, onMounted, ref } from "vue"

const props = withDefaults(
  defineProps<CHECKBOXProps>(),
  {
    checked: false,
    disabled: false,
    indeterminate: false,
    variant: "default",
    size: "default",
  },
)

const currentCheckbox = ref()

const { colorClass } = useVariantMapping(props, "checkbox")
const { sizeClass } = useSizeMapping(props, "checkbox")

onMounted(() => {
  if (props.indeterminate) {
    currentCheckbox.value.indeterminate = true
  }
})
</script>

<template>
  <input
    ref="currentCheckbox"
    type="checkbox"
    :checked="checked"
    :disabled="disabled"
    :class="['checkbox', colorClass, sizeClass]"
  />
</template> 