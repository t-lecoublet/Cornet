<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <li :class="['list-row', props.class]">
    <slot></slot>
  </li>
</template> 