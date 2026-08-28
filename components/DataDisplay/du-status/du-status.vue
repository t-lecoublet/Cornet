<script setup lang="ts">
import { useSizeMapping } from "../../../composables/useSizeProps"
import { useVariantMapping } from "../../../composables/useVariantProps"
import { type DuStatusProps } from './du-status.types'

// A coloured dot means nothing on its own. Named, it is a status; unnamed, it
// is decoration and says so — which beats the variant name it used to carry
// ("warning" tells you the colour, not what is wrong), on a plain div where
// no assistive tech would have read it anyway.
const props = withDefaults(
  defineProps<DuStatusProps>(),
  {
    size: "default",
    variant: "default",
    bounce: false,
    ping: false,
    ariaLabel: undefined,
  },
)

const { colorClass } = useVariantMapping(props, "status")
const { sizeClass } = useSizeMapping(props, "status")
</script>

<template>
  <div
    v-if="!ping"
    :role="ariaLabel ? 'status' : undefined"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : 'true'"
    :class="['status', sizeClass, colorClass, bounce && 'animate-bounce']"
  ></div>
  <div
    v-else
    class="inline-grid *:[grid-area:1/1]"
    :role="ariaLabel ? 'status' : undefined"
    :aria-label="ariaLabel"
    :aria-hidden="ariaLabel ? undefined : 'true'"
  >
    <div :class="['status', sizeClass, colorClass, 'animate-ping']"></div>
    <div :class="['status', sizeClass, colorClass]"></div>
  </div>
</template>
