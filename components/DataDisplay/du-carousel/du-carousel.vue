<script setup lang="ts">
// A carousel is a scrollable strip, and daisyUI makes it one with
// `overflow-x: scroll` and scroll snapping. Two things follow that the CSS
// cannot do on its own: a scrollable region has to be focusable to be operable
// by keyboard at all, and the strip has to say what it is.
import { computed, ref } from "vue"
import { defaultSlideLabel, type DuCarouselProps } from './du-carousel.types'
import DuCarouselItem from './du-carousel-item.vue'

const props = withDefaults(
  defineProps<DuCarouselProps>(),
  {
    items: undefined,
    start: true,
    center: false,
    end: false,
    vertical: false,
    ariaLabel: undefined,
    slideLabel: defaultSlideLabel,
    controls: false,
    previousLabel: 'Previous slide',
    nextLabel: 'Next slide',
  },
)

const strip = ref<HTMLElement | null>(null)

const positionClass = computed(() => {
  if (props.center) return "carousel-center"
  if (props.end) return "carousel-end"
  if (props.start) return "carousel-start"
  return null
})

/**
 * Scroll by one slide. Measuring the first child rather than assuming a width
 * keeps this honest for slides that are not all the same size; `scrollBy`
 * inherits the `scroll-behavior: smooth` daisyUI already sets (and the
 * `prefers-reduced-motion` guard around it).
 */
function scrollByOne(direction: 1 | -1) {
  const el = strip.value
  if (el == null) {
    return
  }
  const slide = el.querySelector<HTMLElement>('.carousel-item')
  const step = props.vertical
    ? (slide?.offsetHeight ?? el.clientHeight)
    : (slide?.offsetWidth ?? el.clientWidth)
  el.scrollBy(props.vertical ? { top: step * direction } : { left: step * direction })
}

defineExpose({ next: () => scrollByOne(1), previous: () => scrollByOne(-1) })
</script>

<template>
  <div :class="controls ? 'relative' : undefined">
    <!--
      `tabindex="0"`: a scrollable region that nothing inside can take focus
      is unreachable by keyboard, arrow keys included. The browser scrolls it
      once it can be focused.
    -->
    <div
      ref="strip"
      :class="['carousel', positionClass, { 'carousel-vertical': vertical }]"
      role="region"
      aria-roledescription="carousel"
      :aria-label="ariaLabel"
      tabindex="0"
    >
      <template v-if="items && items.length">
        <DuCarouselItem
          v-for="(item, index) in items"
          :key="item.id ?? index"
          :id="item.id"
          :aria-label="item.ariaLabel ?? slideLabel(index + 1, items.length)"
          :class="item.customClass"
        >
          <img v-if="item.src" :src="item.src" :alt="item.alt ?? ''" />
          <template v-else-if="item.content">{{ item.content }}</template>
        </DuCarouselItem>
      </template>
      <slot v-else></slot>
    </div>

    <template v-if="controls">
      <button
        type="button"
        class="btn btn-circle btn-sm absolute left-2 top-1/2 -translate-y-1/2"
        :aria-label="previousLabel"
        @click="scrollByOne(-1)"
      >
        ❮
      </button>
      <button
        type="button"
        class="btn btn-circle btn-sm absolute right-2 top-1/2 -translate-y-1/2"
        :aria-label="nextLabel"
        @click="scrollByOne(1)"
      >
        ❯
      </button>
    </template>
  </div>
</template>
