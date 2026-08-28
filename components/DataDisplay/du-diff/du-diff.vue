<script setup lang="ts">
// The comparison is driven by focus, not by a slider: daisyUI moves
// `.diff-resizer` to 95cqi when the figure has focus and to 5cqi when
// `.diff-item-1` does. That is a real keyboard mechanism, but it only works if
// both elements can take focus — which they could not, because nothing gave
// them a tabindex.
//
// A continuous, arrow-driven divider would be a different widget (a slider with
// its own value semantics) and belongs in `core/`, not in a prop here.
import { type DuDiffProps } from './du-diff.types'

withDefaults(
  defineProps<DuDiffProps>(),
  {
    item1: undefined,
    item2: undefined,
    aspectRatio: "",
    ariaLabel: undefined,
    revealLabel: 'Reveal the second image',
    item1Alt: 'First image',
    item2Alt: 'Second image',
  },
)
</script>

<template>
  <figure
    :class="['diff', aspectRatio]"
    tabindex="0"
    role="group"
    :aria-label="ariaLabel"
  >
    <!--
      No `role="button"`: it is not activated, only focused. Announcing a button
      would promise an Enter key that does nothing.
    -->
    <div class="diff-item-1" tabindex="0" :aria-label="revealLabel">
      <slot name="item1">
        <img v-if="item1" :src="item1" :alt="item1Alt" />
        <div
          v-else
          class="bg-primary text-primary-content flex items-center justify-center h-full"
        >
          Image 1
        </div>
      </slot>
    </div>
    <div class="diff-item-2">
      <slot name="item2">
        <img v-if="item2" :src="item2" :alt="item2Alt" />
        <div
          v-else
          class="bg-secondary text-secondary-content flex items-center justify-center h-full"
        >
          Image 2
        </div>
      </slot>
    </div>
    <div class="diff-resizer" aria-hidden="true"></div>
  </figure>
</template>
