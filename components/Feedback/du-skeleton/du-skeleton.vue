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
    :role="ariaLabel ? 'status' : undefined"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : 'true'"
  >
    <slot></slot>
  </div>
</template>
