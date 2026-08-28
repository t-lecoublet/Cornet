<script setup lang="ts">
import { inject, computed } from "vue";
import { type DuRatingItemProps, type DuRatingItemEmits } from "./du-rating.types";

const props = withDefaults(
  defineProps<DuRatingItemProps>(),
  {
    value: 0,
    checked: false,
    disabled: false,
    readonly: false,
    label: undefined,
    shape: "star-2",
    halfMask: undefined,
    customClass: "",
  },
);

// Read-only renders a plain element, not a disabled radio. A disabled
// control reads as "you may not touch this", which is not what a displayed
// rating means; the group carries the value, and the stars are decoration.
//
// The note is here rather than above the root: a `v-if`/`v-else` pair is one
// root for attribute inheritance, and a leading comment would make it two.
const emit = defineEmits<DuRatingItemEmits>();

const ratingName = inject("ratingName", "");

const handleChange = () => {
  emit("change", props.value);
};

const shapeClass = computed(() => {
  switch (props.shape) {
    case "star":
      return "mask-star";
    case "star-2":
      return "mask-star-2";
    case "heart":
      return "mask-heart";
    case "circle":
      return "mask-circle";
    default:
      return "";
  }
});

const maskClass = computed(() => {
  const classes = ["mask", shapeClass.value, props.color];

  if (props.halfMask) {
    classes.push((props.halfMask == 1) ? `mask-half-1` : `mask-half-2`);
  }

  if (props.customClass) {
    classes.push(props.customClass);
  }

  return classes;
});
</script>

<template>
  <div v-if="readonly" :class="maskClass" aria-hidden="true"></div>
  <input
    v-else
    type="radio"
    :name="ratingName"
    :class="maskClass"
    :checked="checked"
    :disabled="disabled"
    :aria-label="label"
    @click="handleChange"
  />
</template>
