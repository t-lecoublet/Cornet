<script setup lang="ts">
import { useVariantMapping } from "../../../composables/useVariantProps";
import { type DuProgressProps } from "./du-progress.types";

const props = withDefaults(
  defineProps<DuProgressProps>(),
  {
    variant: "default",
    value: 0,
    max: 100,
    indeterminate: false,
    ariaLabel: undefined,
  },
);
// A `<progress>` is a status readout, not a control a `<label>` labels; its
// accessible name comes from `ariaLabel` or the consumer's own
// `aria-labelledby`, neither of which the rule can see. The exemption is in
// eslint.config.js: see the note in du-modal.vue.
const { colorClass } = useVariantMapping(props, "progress");
</script>

<template>
  <progress
    :class="['progress', 'w-56', colorClass]"
    :value="!indeterminate ? value : undefined"
    :max="!indeterminate ? max : undefined"
    :aria-label="ariaLabel"
  ></progress>
</template> 