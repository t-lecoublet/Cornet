<script setup lang="ts" generic="T extends DuFilterItem = DuFilterItem">
// daisyUI's `.filter` is a radio group, and that is the right semantics here:
// a set of mutually exclusive choices, one of which is current. What it was
// missing is the thing that makes a radio group make sense — a name for the
// group as a whole, which is what `<fieldset>` + `<legend>` provide.
import { computed, provide } from 'vue'
import { useComponentId, useControllableState } from '../../core/shared'
import DuButton from '../../Actions/du-button/du-button.vue'
import {
  type DuFilterEmit,
  type DuFilterItem,
  type DuFilterProps,
  type DuFilterValue,
} from './du-filter.types'

const props = withDefaults(
  defineProps<DuFilterProps<T>>(),
  {
    items: undefined,
    // No default: a `modelValue` that is always defined would mean the filter
    // is permanently controlled and could never select anything.
    modelValue: undefined,
    name: undefined,
    legend: 'Filter',
    showLegend: false,
    resetLabel: 'Clear filter',
    buttonsArgs: undefined,
  },
)

const emit = defineEmits<DuFilterEmit<T>>()

const filterName = useComponentId(props.name, 'filter')

// Provide the string, not a ref: DuButton reads this via a plain
// `inject('filterName', undefined)` and uses it directly (no `.value`
// unwrap, and a Ref object is always truthy regardless of its value).
provide('filterName', filterName)

const valueOf = (item: DuFilterItem, index: number): DuFilterValue => item.value ?? item.title ?? index

const initial = computed<DuFilterValue | null>(() => {
  const list = props.items ?? []
  const index = list.findIndex((item) => item.checked === true)
  return index >= 0 ? valueOf(list[index]!, index) : null
})

const selected = useControllableState<DuFilterValue | null>(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  initial.value,
)

const isSelected = (item: DuFilterItem, index: number) => valueOf(item, index) === selected.value

function select(item: T, index: number) {
  selected.value = valueOf(item, index)
  emit('change', item)
}

function reset() {
  selected.value = null
  emit('change', undefined)
}

/**
 * Nothing to reset is nothing to offer.
 *
 * daisyUI already hides it, with `visibility: hidden` on
 * `.filter:not(:has(:checked:not(.filter-reset)))`. Taking it out of the DOM as
 * well only makes the markup agree with what was already true — and it is why
 * there is no "always show it" prop: such a prop could not deliver, the
 * stylesheet would still hide the button.
 */
const showReset = computed(() => selected.value != null)
</script>

<template>
  <fieldset class="filter">
    <legend :class="showLegend ? undefined : 'sr-only'">{{ legend }}</legend>

    <DuButton
      v-if="showReset"
      customClass="btn filter-reset"
      v-bind="props.buttonsArgs"
      :checked="selected == null"
      :aria-label="resetLabel"
      label="×"
      @change="reset"
    />

    <!-- Dynamic items mode -->
    <template v-if="items">
      <DuButton
        v-for="(item, index) in items"
        :key="index"
        v-bind="item.buttonsArgs || props.buttonsArgs"
        :class="[item.customClass]"
        :checked="isSelected(item, index)"
        :aria-label="item.title"
        @change="select(item, index)"
      />
    </template>

    <!-- Manual mode -->
    <template v-else>
      <slot></slot>
    </template>
  </fieldset>
</template>
