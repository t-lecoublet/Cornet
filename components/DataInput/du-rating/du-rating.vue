<script setup lang="ts">
import { computed, provide } from "vue";
import { useComponentId } from "../../core/shared";
import { useSizeMapping } from "../../../composables/useSizeProps";
import DuRatingItem from "./du-rating-item.vue";
import { defaultRatingItemLabel, type DuRatingProps, type DuRatingEmits } from "./du-rating.types";
import { useRatingValue } from "./composables/useRatingValue";

const props = withDefaults(
  defineProps<DuRatingProps>(),
  {
    modelValue: 0,
    items: undefined,
    count: 5,
    name: undefined,
    halfStar: false,
    clearable: false,
    disabled: false,
    readonly: false,
    ariaLabel: undefined,
    itemLabel: defaultRatingItemLabel,
    shape: "star-2",
    color: "bg-secondary",
    customClass: "",
    size: "md"
  },
);

const emit = defineEmits<DuRatingEmits>();

const { internalValue, handleChange } = useRatingValue(props, emit);

// Radio group name: deterministic for SSR, unique per instance.
const ratingName = useComponentId(props.name, "rating");

provide("ratingName", ratingName);

const { sizeClass } = useSizeMapping(props, "rating");

// The template is one root through a `v-if` chain — items mode, generated
// mode, manual mode — so no comment may precede it: a leading comment makes it
// two nodes and the component stops inheriting a consumer's attributes.

/** The top of the scale, for the "n out of max" each star announces. */
const maxValue = computed(() => {
  if (props.items != null) {
    return Math.max(...props.items.map((item) => item.value), 0);
  }
  return props.count;
});

const labelFor = (value: number) => props.itemLabel(value, maxValue.value);

/**
 * Read-only renders no radios at all, so the value has to be announced by the
 * group: `role="img"` with a name is how a rating readout is normally exposed.
 */
const groupProps = computed(() => (props.readonly
  // `?? 0` so an unrated value reads "0 out of 5" rather than "null out of 5" —
  // which is what the stars show anyway, none of them filled.
  ? { role: "img", "aria-label": props.ariaLabel ?? labelFor(internalValue.value ?? 0) }
  : { role: "radiogroup", "aria-label": props.ariaLabel }));

const ratingClass = computed(() => {
  const classes = ["rating"];
  
  if (props.halfStar) {
    classes.push("rating-half");
  }
  
  if (sizeClass.value) {
    classes.push(sizeClass.value);
  }
  
  if (props.customClass) {
    classes.push(props.customClass);
  }
  
  return classes;
});

defineExpose({
  value: computed(() => internalValue.value),
});
</script>

<template>
  <div v-if="items && !$slots.default" v-bind="groupProps" :class="ratingClass">
    <template v-for="(item, index) in items" :key="index">
      <DuRatingItem
        :value="item.value"
        :checked="internalValue === item.value"
        :shape="shape"
        :color="color"
        :readonly="readonly"
        :aria-label="labelFor(item.value)"
        :half-mask="(halfStar && index % 2 === 0) ? 1 : (halfStar && index % 2 === 1) ? 2 : undefined"
        :disabled="disabled"
        @change="handleChange"
      />
    </template>
  </div>

  <!-- Auto-generated mode -->
  <div v-else-if="count > 0 && !$slots.default" v-bind="groupProps" :class="ratingClass">
    <template v-for="i in count" :key="i">
      <DuRatingItem
        v-if="halfStar"
        :value="i - 0.5"
        :checked="internalValue === i - 0.5"
        :shape="shape"
        :color="color"
        :readonly="readonly"
        :aria-label="labelFor(i - 0.5)"
        :half-mask="1"
        :disabled="disabled"
        @change="handleChange"
      />

      <DuRatingItem
        :value="i"
        :checked="internalValue === i"
        :shape="shape"
        :color="color"
        :readonly="readonly"
        :aria-label="labelFor(i)"
        :half-mask="halfStar ? 2 : undefined"
        :disabled="disabled"
        @change="handleChange"
      />
    </template>
  </div>

  <!-- Manual mode -->
  <div v-else v-bind="groupProps" :class="ratingClass">
    <slot></slot>
  </div>
</template> 