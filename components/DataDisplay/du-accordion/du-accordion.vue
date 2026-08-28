<script setup lang="ts">
// WAI-ARIA accordion pattern:
// https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
//
// The header is a real button carrying `aria-expanded`, and the panel is a
// region it names. daisyUI's hidden radios did the showing and hiding, but they
// announced a radio group — a set of mutually exclusive *choices* — where there
// is a set of headers that reveal content.
import { computed, provide, reactive } from 'vue'
import { useComponentId, useControllableState } from '../../core/shared'
import {
  DU_ACCORDION_CONTEXT,
  type DuAccordionContext,
  type DuAccordionEmit,
  type DuAccordionItemData,
  type DuAccordionProps,
  type DuAccordionValue,
} from './du-accordion.types'

const props = withDefaults(
  defineProps<DuAccordionProps>(),
  {
    items: undefined,
    // No default: a `modelValue` that is always defined would mean the
    // accordion is permanently controlled and could never open anything.
    modelValue: undefined,
    multiple: false,
    collapsible: true,
    modifier: undefined,
    customClass: '',
  },
)

const emit = defineEmits<DuAccordionEmit>()

const instanceId = useComponentId(undefined, 'accordion')
const headerId = (value: DuAccordionValue) => `${instanceId}-header-${value}`
const panelId = (value: DuAccordionValue) => `${instanceId}-panel-${value}`

const valueOf = (item: DuAccordionItemData, index: number): DuAccordionValue => item.value ?? index

/** Where an uncontrolled accordion starts: whatever the items say. */
const initial = computed<DuAccordionValue | DuAccordionValue[] | null>(() => {
  const open = (props.items ?? [])
    .map((item, index) => (item.checked === true && item.disabled !== true ? valueOf(item, index) : null))
    .filter((value): value is DuAccordionValue => value != null)
  return props.multiple ? open : (open[0] ?? null)
})

const model = useControllableState<DuAccordionValue | DuAccordionValue[] | null>(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  initial.value,
)

const openValues = computed<DuAccordionValue[]>(() => {
  const value = model.value
  if (value == null) {
    return []
  }
  return Array.isArray(value) ? value : [value]
})

const isOpen = (value: DuAccordionValue) => openValues.value.includes(value)

function toggle(value: DuAccordionValue) {
  if (props.multiple) {
    model.value = isOpen(value)
      ? openValues.value.filter((open) => open !== value)
      : [...openValues.value, value]
    return
  }
  // Single mode: closing the open panel is only allowed when `collapsible`,
  // otherwise the accordion would have nothing showing at all.
  if (isOpen(value)) {
    if (props.collapsible) {
      model.value = null
    }
    return
  }
  model.value = value
}

// Manual mode: the panels are written by the consumer, so they announce
// themselves and take a position in the order they registered.
let registered = 0

function register(value?: DuAccordionValue): DuAccordionValue {
  const identity = value ?? registered
  registered += 1
  return identity
}

provide<DuAccordionContext>(DU_ACCORDION_CONTEXT, reactive({
  register,
  isOpen,
  toggle,
  modifier: computed(() => props.modifier),
}) as unknown as DuAccordionContext)

defineExpose({ isOpen, toggle })
</script>

<template>
  <!-- Dynamic items mode -->
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
