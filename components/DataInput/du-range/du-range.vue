<script setup lang="ts">
import { type DuRangeProps } from './du-range.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"
import { useComponentId } from "../../core/shared"
import { ref, computed, watch } from "vue"

const props = withDefaults(
  defineProps<DuRangeProps>(),
  {
    modelValue: 4,
    min: 0,
    max: 10,
    step: 1,
    disabled: false,
    variant: "default",
    size: "default",
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    valueText: undefined,
    ticks: undefined,
  },
)

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void
  (e: "change", value: number): void
}>()

const internalValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue
  },
)

const { colorClass } = useVariantMapping(props, "range")
const { sizeClass } = useSizeMapping(props, "range")

const handleInput = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)
  internalValue.value = value
  emit("update:modelValue", value)
  emit("change", value)
}

/**
 * A slider announces its raw number by default, which only means something to
 * someone who can see what it is a number of. `aria-valuetext` replaces it with
 * words when the consumer supplies them.
 */
const valueText = computed(() => props.valueText?.(internalValue.value))

const listId = useComponentId(undefined, 'range-ticks')

const tickOptions = computed(() => (props.ticks ?? []).map((tick) => (
  typeof tick === 'number' ? { value: tick, label: undefined } : tick
)))
</script>

<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :value="internalValue"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-valuetext="valueText"
    :list="ticks ? listId : undefined"
    :class="['range', colorClass, sizeClass]"
    @input="handleInput"
  />
  <datalist v-if="ticks" :id="listId">
    <option v-for="tick in tickOptions" :key="tick.value" :value="tick.value" :label="tick.label" />
  </datalist>
</template>
