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
const { colorClass } = useVariantMapping(props, "progress");
</script>

<template>
  <!--
    A `<progress>` is a status readout, not a control a `<label>` labels;
    its accessible name comes from `ariaLabel` or from the consumer's own
    `aria-labelledby` in $attrs, neither of which the rule can see.
  -->
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <progress
    :class="['progress', 'w-56', colorClass]"
    :value="!indeterminate ? value : undefined"
    :max="!indeterminate ? max : undefined"
    :aria-label="ariaLabel"
  ></progress>
</template> 