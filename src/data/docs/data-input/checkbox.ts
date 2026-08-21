import type { DocPageData } from '@/types/docs'

export default {
  title: 'Checkbox',
  description: 'Checkboxes allow the user to select one or more items from a set.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/checkbox/',
  props: [
    {
      title: 'modelValue',
      description: 'Checked state (use with `v-model`). Bind an array to build a checkbox group.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'indeterminate',
      description: 'Render the checkbox in the indeterminate state. Reactive — updates after mount too.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the checkbox',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  ],
  classnames: {
    component: [
      { class: 'checkbox', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'checkbox-primary', desc: 'Primary color' },
      { class: 'checkbox-secondary', desc: 'Secondary color' },
      { class: 'checkbox-accent', desc: 'Accent color' },
      { class: 'checkbox-neutral', desc: 'Neutral color' },
      { class: 'checkbox-info', desc: 'Info color' },
      { class: 'checkbox-success', desc: 'Success color' },
      { class: 'checkbox-warning', desc: 'Warning color' },
      { class: 'checkbox-error', desc: 'Error color' },
    ],
    size: [
      { class: 'checkbox-xs', desc: 'Extra small' },
      { class: 'checkbox-sm', desc: 'Small' },
      { class: 'checkbox-md', desc: 'Medium' },
      { class: 'checkbox-lg', desc: 'Large' },
      { class: 'checkbox-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      description: 'The checked state is driven by `v-model` — there is no `checked` prop.',
      script: `
        const accepted = ref(true)
        return { accepted }
      `,
      preview: `<label class="flex items-center gap-2 cursor-pointer">
  <DuCheckbox v-model="accepted" />
  <span class="text-sm">Accept terms</span>
</label>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const accepted = ref(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <DuCheckbox v-model="accepted" />
    Accept terms
  </label>
</template>`,
    },
    {
      title: 'Variants',
      script: `
        const val = ref(true)
        return { val }
      `,
      preview: `<div class="flex flex-wrap gap-3">
  <DuCheckbox v-model="val" variant="primary" />
  <DuCheckbox v-model="val" variant="secondary" />
  <DuCheckbox v-model="val" variant="accent" />
  <DuCheckbox v-model="val" variant="neutral" />
  <DuCheckbox v-model="val" variant="success" />
  <DuCheckbox v-model="val" variant="error" />
</div>`,
      code: `<DuCheckbox v-model="val" variant="primary" />
<DuCheckbox v-model="val" variant="secondary" />
<DuCheckbox v-model="val" variant="accent" />
<DuCheckbox v-model="val" variant="neutral" />
<DuCheckbox v-model="val" variant="success" />
<DuCheckbox v-model="val" variant="error" />`,
    },
    {
      title: 'Sizes',
      script: `
        const val = ref(true)
        return { val }
      `,
      preview: `<div class="flex items-center gap-3">
  <DuCheckbox v-model="val" size="xs" />
  <DuCheckbox v-model="val" size="sm" />
  <DuCheckbox v-model="val" />
  <DuCheckbox v-model="val" size="lg" />
  <DuCheckbox v-model="val" size="xl" />
</div>`,
      code: `<DuCheckbox v-model="val" size="xs" />
<DuCheckbox v-model="val" size="sm" />
<DuCheckbox v-model="val" />
<DuCheckbox v-model="val" size="lg" />
<DuCheckbox v-model="val" size="xl" />`,
    },
    {
      title: 'Disabled',
      script: `
        const val = ref(true)
        return { val }
      `,
      preview: `<DuCheckbox v-model="val" disabled />`,
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
