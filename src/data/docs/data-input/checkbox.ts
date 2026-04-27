import type { DocPageData } from '@/types/docs'

export default {
  title: 'Checkbox',
  description: 'Checkboxes allow the user to select one or more items from a set.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/checkbox/',
  classnames: {
    color: [
      { class: 'checkbox-primary', desc: 'Primary color' },
      { class: 'checkbox-secondary', desc: 'Secondary color' },
      { class: 'checkbox-accent', desc: 'Accent color' },
      { class: 'checkbox-success', desc: 'Success color' },
      { class: 'checkbox-warning', desc: 'Warning color' },
      { class: 'checkbox-error', desc: 'Error color' },
    ],
    size: [
      { class: 'checkbox-xs', desc: 'Extra small' },
      { class: 'checkbox-sm', desc: 'Small' },
      { class: 'checkbox-md', desc: 'Medium', default: true },
      { class: 'checkbox-lg', desc: 'Large' },
      { class: 'checkbox-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<label class="flex items-center gap-2 cursor-pointer">
  <DuCheckbox :checked="true" />
  <span class="text-sm">Accept terms</span>
</label>`,
      code: `<label class="flex items-center gap-2">
  <DuCheckbox v-model="accepted" />
  Accept terms
</label>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-3">
  <DuCheckbox variant="primary" :checked="true" />
  <DuCheckbox variant="secondary" :checked="true" />
  <DuCheckbox variant="accent" :checked="true" />
  <DuCheckbox variant="success" :checked="true" />
  <DuCheckbox variant="error" :checked="true" />
</div>`,
      code: `<DuCheckbox v-model="val" variant="primary" />
<DuCheckbox v-model="val" variant="secondary" />
<DuCheckbox v-model="val" variant="accent" />
<DuCheckbox v-model="val" variant="success" />
<DuCheckbox v-model="val" variant="error" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <DuCheckbox size="xs" :checked="true" />
  <DuCheckbox size="sm" :checked="true" />
  <DuCheckbox :checked="true" />
  <DuCheckbox size="lg" :checked="true" />
  <DuCheckbox size="xl" :checked="true" />
</div>`,
      code: `<DuCheckbox v-model="val" size="xs" />
<DuCheckbox v-model="val" size="sm" />
<DuCheckbox v-model="val" />
<DuCheckbox v-model="val" size="lg" />
<DuCheckbox v-model="val" size="xl" />`,
    },
    {
      title: 'Disabled',
      preview: `<DuCheckbox disabled :checked="true" />`,
      code: `<DuCheckbox v-model="val" disabled />`,
    },
    {
      title: 'Group (array binding)',
      description: 'Bind multiple checkboxes to the same array ref using the `value` prop.',
      links: [
        { label: 'Vue checkbox v-model docs', href: 'https://vuejs.org/guide/essentials/forms.html#checkbox' },
      ],
      script: `
        const selected = ref(['Vue'])
        const options = ['Vue', 'React', 'Angular', 'Svelte']
        return { selected, options }
      `,
      preview: `  <div class="flex flex-col justify-center items-center  gap-2">
    <label v-for="opt in options" :key="opt" class="flex items-center gap-2 cursor-pointer w-28">
      <DuCheckbox :value="opt" v-model="selected" variant="primary" />
      {{ opt }}
    </label>
    <p class="text-sm mt-2 text-base-content/60">Selected: {{ selected.join(', ') }}</p>
  </div>
  `,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(['Vue'])
const options = ['Vue', 'React', 'Angular', 'Svelte']
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-for="opt in options" :key="opt" class="flex items-center gap-2 cursor-pointer">
      <DuCheckbox :value="opt" v-model="selected" variant="primary" />
      {{ opt }}
    </label>
    <p class="text-sm mt-2 text-base-content/60">Selected: {{ selected.join(', ') }}</p>
  </div>
</template>`,
    },
    {
      title: 'Indeterminate',
      description: 'Use `indeterminate` prop to set the checkbox to an indeterminate state.',
      preview: `<DuCheckbox indeterminate />`,
      code: `<DuCheckbox v-model="val" indeterminate />`,
    },
  ],
} satisfies DocPageData
