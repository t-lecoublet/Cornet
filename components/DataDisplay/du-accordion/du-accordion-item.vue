<script setup lang="ts">
import { inject } from 'vue'
import { type DuAccordionItemProps } from './du-accordion.types'

withDefaults(
  defineProps<DuAccordionItemProps>(),
  {
    checked: false,
    customClass: '',
    title: '',
  },
)

// Get the accordion name from parent
const accordionName = inject('accordionName', '')
</script>

<template>
  <div :class="['collapse', 'bg-base-100 border border-base-300', customClass]">
    <!-- Open/close mechanism, not a form control: see du-accordion.vue. -->
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      type="radio"
      :name="accordionName"
      :checked="checked ? true : undefined"
    />
    <div class="collapse-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="collapse-content">
      <slot></slot>
    </div>
  </div>
</template> 