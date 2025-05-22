<script setup lang="ts">
import { type Size, useSizeMapping } from "../../../composables/useSizeProps"
import { type KBDSize } from './du-kbd.types'

// Définition des types pour les props
const props = withDefaults(
  defineProps<{
    size?: Size
  }>(),
  {
    size: "default",
  },
)

const { sizeClass } = useSizeMapping(props, "kbd")
</script>

<template>
  <kbd :class="['kbd', sizeClass]">
    <slot></slot>
  </kbd>
</template> 