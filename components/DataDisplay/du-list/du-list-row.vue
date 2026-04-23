<script setup lang="ts">
const props = defineProps<{
  class?: string
  as?: string
}>()
</script>

<template>
  <component :class="['list-row', props.class, (props.as == 'label') && 'cursor-pointer']" :is="props.as || 'li'">
      <slot></slot>
  </component>
</template> 