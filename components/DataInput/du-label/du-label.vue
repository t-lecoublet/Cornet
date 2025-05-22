<script setup lang="ts">
import { provide } from "vue"
import { type LABELProps } from "./du-label.types"

const props = withDefaults(defineProps<LABELProps>(), {
  type: "input",
})

if (props.type === "input") {
  provide("isInInput", true)
}
</script>

<template>
  <label :class="[type]">
    <slot />
  </label>
</template> 