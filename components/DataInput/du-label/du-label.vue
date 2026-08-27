<script setup lang="ts">
import { computed, provide } from "vue"
import { type DuLabelProps } from "./du-label.types"

const props = defineProps<DuLabelProps>()

if (props.type == "input") {
  provide("isInInput", true)
}

if(props.type == "select") {
  provide("isInLabel", true)
}
const typeClass = computed(() => {
  switch (props.type) {
    case "select":
      return "input pr-0"
    default:
      return props.type
  }
})
</script>

<template>
  <!-- The control this labels is nested by the consumer through the slot
       (`<DuLabel>Email <DuInputField/></DuLabel>`), which the rule cannot see. -->
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label :class="[typeClass]">
    <slot />
  </label>
</template> 