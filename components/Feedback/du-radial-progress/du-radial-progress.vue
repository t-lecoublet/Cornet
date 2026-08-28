<script setup lang="ts">
import { useVariantMapping } from "../../../composables/useVariantProps";
import { AvailableSizes } from "../../../composables/useSizeProps";
import { type DuRadialProgressProps } from "./du-radial-progress.types";
import { computed } from "vue";

const props = withDefaults(
  defineProps<DuRadialProgressProps>(),
  {
    variant: "default",
    value: 0,
    size: undefined,
    thickness: undefined,
    ariaLabel: undefined,
  },
);
const { colorClass } = useVariantMapping(props, "text");

// daisyUI's radial-progress reads three CSS custom properties. `size` is
// overloaded here: one of the shared `Size` keywords styles through a class,
// anything else (`"6rem"`, `"120px"`) is a raw length and goes to `--size`.
const isSizeKeyword = (size: string): boolean => (AvailableSizes as string[]).includes(size)

const styleVar = computed(() => {
  const styleObject: Record<string, string> = {
    "--value": props.value?.toString() || "0",
  }

  if (props.size && !isSizeKeyword(props.size)) {
    styleObject["--size"] = props.size;
  }

  if (props.thickness) {
    styleObject["--thickness"] = props.thickness;
  }

  return styleObject;
});
</script>

<template>
  <div
    :class="['radial-progress', colorClass, size]"
    :style="styleVar"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="ariaLabel"
  >
    <slot> {{ value }}% </slot>
  </div>
</template>

<style scoped>
.radial-progress.xs {
  --size: 3rem;
}
.radial-progress.sm {
  --size: 5rem;
}
.radial-progress.md {
  --size: 7.5rem;
}
.radial-progress.lg {
  --size: 10rem;
}
.radial-progress.xl {
  --size: 12rem;
}
</style> 