<script setup lang="ts">
import { type DuCarouselItemProps } from './du-carousel.types'

// `role="group"` + `aria-roledescription="slide"` is what tells a screen
// reader this is one of several rather than a div among divs. It needs a
// name to be worth anything, which is what `label` is for.
defineProps<DuCarouselItemProps>()
</script>

<template>
  <div
    :id="id"
    class="carousel-item"
    role="group"
    aria-roledescription="slide"
    :aria-label="ariaLabel"
  >
    <slot></slot>
  </div>
</template>
