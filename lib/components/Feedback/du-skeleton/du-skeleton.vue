<script setup lang="ts">
import { type SkeletonProps } from "./du-skeleton.types";

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div :class="['skeleton', props.class]">
    <slot></slot>
  </div>
</template> 