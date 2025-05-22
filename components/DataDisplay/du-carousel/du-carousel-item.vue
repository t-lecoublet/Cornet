<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <div :id="id" class="carousel-item">
    <slot></slot>
  </div>
</template> 