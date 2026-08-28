<script setup lang="ts">
import { type DuCarouselItemProps } from './du-carousel.types'

defineProps<DuCarouselItemProps>()
</script>

<template>
  <!--
    `role="group"` + `aria-roledescription="slide"` is what tells a screen
    reader that this is one of several, rather than a div among divs. It needs
    a name to be worth anything, which is what `label` is for.
  -->
  <div
    :id="id"
    class="carousel-item"
    role="group"
    aria-roledescription="slide"
    :aria-label="label"
  >
    <slot></slot>
  </div>
</template>
