<script setup lang="ts">
import { useSizeMapping } from "../../../composables/useSizeProps"
import { useVariantMapping } from "../../../composables/useVariantProps"
import { computed, inject } from "vue"
import { type INPUTFIELDProps } from "./du-input-field.types"

const props = withDefaults(defineProps<INPUTFIELDProps>(), {
  placeholder: "",
  type: "text",
  size: "default",
  ghost: false,
  variant: "default",
  disabled: false,
  required: false,
})

const { colorClass } = useVariantMapping(props, "input")
const { sizeClass } = useSizeMapping(props, "input")
const ghostClass = computed(() => (props.ghost ? "input-ghost" : ""))

const isInput = inject("isInInput", false)
</script>

<template>
  <input
    :disabled="disabled"
    :type="type"
    :placeholder="placeholder"
    :class="[!isInput && 'input', colorClass, sizeClass, ghostClass]"
    :list="suggestionName"
    :required="required"
    :pattern="pattern"
    :minlength="minlength"
    :maxlength="maxlength"
    :title="title"
  />
  <datalist v-if="suggestionName" :id="suggestionName">
    <option v-for="suggestion in suggestionList" :key="suggestion">
      {{ suggestion }}
    </option>
  </datalist>
</template> 