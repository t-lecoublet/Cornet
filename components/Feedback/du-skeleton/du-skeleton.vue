<script setup lang="ts">
import { type DuSkeletonProps } from "./du-skeleton.types";

// A placeholder shape means nothing to anyone who cannot see it. Named, it
// says what is coming; unnamed, it is hidden rather than read out as an
// empty box.
const props = defineProps<DuSkeletonProps>();
</script>

<template>
  <div
    :class="['skeleton', props.class]"
    :role="label ? 'status' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <slot></slot>
  </div>
</template>
