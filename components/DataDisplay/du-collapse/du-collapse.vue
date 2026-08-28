<script setup lang="ts">
// A list of independent disclosures — that is the whole difference from
// DuAccordion, where opening one closes the others.
//
// WAI-ARIA disclosure pattern:
// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
import { computed } from 'vue'
import { useComponentId, useControllableState } from '../../core/shared'
import {
  type DuCollapseEmit,
  type DuCollapseItem,
  type DuCollapseProps,
  type DuCollapseValue,
} from './du-collapse.types'

const props = withDefaults(
  defineProps<DuCollapseProps>(),
  {
    items: undefined,
    // No default: a `modelValue` that is always defined would mean the
    // component is permanently controlled and could never open anything.
    modelValue: undefined,
    modifier: undefined,
    customClass: '',
  },
)

const emit = defineEmits<DuCollapseEmit>()

const instanceId = useComponentId(undefined, 'collapse')
const headerId = (value: DuCollapseValue) => `${instanceId}-header-${value}`
const panelId = (value: DuCollapseValue) => `${instanceId}-panel-${value}`

const valueOf = (item: DuCollapseItem, index: number): DuCollapseValue => item.value ?? index

const initial = computed<DuCollapseValue[]>(() => (props.items ?? [])
  .map((item, index) => (item.open === true && item.disabled !== true ? valueOf(item, index) : null))
  .filter((value): value is DuCollapseValue => value != null))

const model = useControllableState<DuCollapseValue[]>(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  initial.value,
)

const isOpen = (value: DuCollapseValue) => model.value.includes(value)

function toggle(value: DuCollapseValue) {
  model.value = isOpen(value)
    ? model.value.filter((open) => open !== value)
    : [...model.value, value]
}

defineExpose({ isOpen, toggle })
</script>

<template>
  <template v-if="items">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'collapse',
        'bg-base-100 border border-base-300',
        isOpen(valueOf(item, index)) ? 'collapse-open' : 'collapse-close',
        modifier,
        item.customClass || customClass,
      ]"
    >
      <!--
        `collapse-close` is not decoration: daisyUI also opens a collapse on
        `:focus-within`, which would reveal a panel while `aria-expanded` still
        said false.
      -->
      <button
        :id="headerId(valueOf(item, index))"
        type="button"
        class="collapse-title text-left w-full"
        :aria-expanded="isOpen(valueOf(item, index))"
        :aria-controls="panelId(valueOf(item, index))"
        :disabled="item.disabled"
        @click="toggle(valueOf(item, index))"
      >
        <slot v-if="$slots[`title-${index}`]" :name="`title-${index}`" :item="item" :index="index" />
        <slot v-else-if="$slots.title" name="title" :item="item" :index="index" />
        <template v-else>{{ item.title }}</template>
      </button>

      <div
        :id="panelId(valueOf(item, index))"
        role="region"
        class="collapse-content"
        :aria-labelledby="headerId(valueOf(item, index))"
      >
        <slot v-if="$slots[`content-${index}`]" :name="`content-${index}`" :item="item" :index="index" />
        <slot v-else-if="$slots.content" name="content" :item="item" :index="index" />
        <template v-else>{{ item.content }}</template>
      </div>
    </div>
  </template>

  <!-- Manual mode -->
  <template v-else>
    <slot></slot>
  </template>
</template>
