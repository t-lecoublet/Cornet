<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { useComponentId } from '../../core/shared'
import {
  DU_ACCORDION_CONTEXT,
  type DuAccordionContext,
  type DuAccordionItemProps,
} from './du-accordion.types'

const props = withDefaults(
  defineProps<DuAccordionItemProps>(),
  {
    value: undefined,
    checked: false,
    disabled: false,
    customClass: '',
    title: '',
  },
)

const accordion = inject<DuAccordionContext>(DU_ACCORDION_CONTEXT)

// A manually written panel has no index of its own, so it takes a place in the
// order it registered in — stable for as long as the list is.
const identity = accordion?.register(props.value) ?? (props.value ?? 0)

const instanceId = useComponentId(undefined, 'accordion-item')
const headerId = `${instanceId}-header`
const panelId = `${instanceId}-panel`

const isOpen = computed(() => accordion?.isOpen(identity) ?? false)

onMounted(() => {
  if (props.checked && !isOpen.value) {
    accordion?.toggle(identity)
  }
})
</script>

<template>
  <div
    :class="[
      'collapse',
      'bg-base-100 border border-base-300',
      isOpen ? 'collapse-open' : 'collapse-close',
      accordion?.modifier,
      customClass,
    ]"
  >
    <button
      :id="headerId"
      type="button"
      class="collapse-title text-left w-full"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :disabled="disabled"
      @click="accordion?.toggle(identity)"
    >
      <slot name="title">{{ title }}</slot>
    </button>

    <div :id="panelId" role="region" class="collapse-content" :aria-labelledby="headerId">
      <slot></slot>
    </div>
  </div>
</template>
