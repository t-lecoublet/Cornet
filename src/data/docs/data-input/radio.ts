import type { DocPageData } from '@/types/docs'

export default {
  title: 'Radio',
  description: 'Radio buttons allow the user to select one option from a set. DuRadio renders a styled `<input type="radio">`. The `name` and `value` HTML attributes are passed through via Vue\'s attribute fallthrough. Use `:checked` to control selection and `@change` to handle updates.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/radio/',
  props: [
    {
      title: 'checked',
      description: 'Whether this radio is selected. DuRadio has **no `v-model`** — a radio is only meaningful as part of a group, so the selected value lives on the group, not on one input. Bind `:checked` from it and listen to `@change`.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the radio',
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
      { class: 'radio', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'radio-primary', desc: 'Primary color' },
      { class: 'radio-secondary', desc: 'Secondary color' },
      { class: 'radio-accent', desc: 'Accent color' },
      { class: 'radio-neutral', desc: 'Neutral color' },
      { class: 'radio-info', desc: 'Info color' },
      { class: 'radio-success', desc: 'Success color' },
      { class: 'radio-warning', desc: 'Warning color' },
      { class: 'radio-error', desc: 'Error color' },
    ],
    size: [
      { class: 'radio-xs', desc: 'Extra small' },
      { class: 'radio-sm', desc: 'Small' },
      { class: 'radio-md', desc: 'Medium' },
      { class: 'radio-lg', desc: 'Large' },
      { class: 'radio-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic radio group',
      description: '`name` and `value` are HTML attributes passed through to the native input. Use `:checked` and `@change` to manage state.',
      links: [
        { label: 'Vue attribute fallthrough docs', href: 'https://vuejs.org/guide/components/attrs.html' },
      ],
      preview: `<div class="flex flex-col gap-2">
  <label class="flex items-center gap-2 text-sm">
    <DuRadio name="plan-demo" value="free" variant="primary" :checked="true" /> Free
  </label>
  <label class="flex items-center gap-2 text-sm">
    <DuRadio name="plan-demo" value="pro" variant="primary" /> Pro
  </label>
  <label class="flex items-center gap-2 text-sm">
    <DuRadio name="plan-demo" value="enterprise" variant="primary" /> Enterprise
  </label>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const plan = ref('free')
</script>

<template>
  <label class="flex items-center gap-2">
    <DuRadio name="plan" value="free" :checked="plan === 'free'" @change="plan = 'free'" variant="primary" />
    Free
  </label>
  <label class="flex items-center gap-2">
    <DuRadio name="plan" value="pro" :checked="plan === 'pro'" @change="plan = 'pro'" variant="primary" />
    Pro
  </label>
  <label class="flex items-center gap-2">
    <DuRadio name="plan" value="enterprise" :checked="plan === 'enterprise'" @change="plan = 'enterprise'" variant="primary" />
    Enterprise
  </label>
</template>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex items-center gap-3">
  <DuRadio variant="primary" :checked="true" />
  <DuRadio variant="secondary" :checked="true" />
  <DuRadio variant="accent" :checked="true" />
  <DuRadio variant="success" :checked="true" />
  <DuRadio variant="warning" :checked="true" />
  <DuRadio variant="error" :checked="true" />
</div>`,
      code: `<DuRadio variant="primary" :checked="true" />
<DuRadio variant="secondary" :checked="true" />
<DuRadio variant="accent" :checked="true" />
<DuRadio variant="success" :checked="true" />
<DuRadio variant="warning" :checked="true" />
<DuRadio variant="error" :checked="true" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <DuRadio size="xs" variant="primary" :checked="true" />
  <DuRadio size="sm" variant="primary" :checked="true" />
  <DuRadio variant="primary" :checked="true" />
  <DuRadio size="lg" variant="primary" :checked="true" />
  <DuRadio size="xl" variant="primary" :checked="true" />
</div>`,
      code: `<DuRadio size="xs" variant="primary" :checked="true" />
<DuRadio size="sm" variant="primary" :checked="true" />
<DuRadio variant="primary" :checked="true" />
<DuRadio size="lg" variant="primary" :checked="true" />
<DuRadio size="xl" variant="primary" :checked="true" />`,
    },
    {
      title: 'Disabled',
      preview: `<div class="flex items-center gap-3">
  <DuRadio disabled :checked="true" variant="primary" />
  <DuRadio disabled variant="primary" />
</div>`,
      code: `<DuRadio disabled :checked="true" variant="primary" />
<DuRadio disabled variant="primary" />`,
    },
  ],
} satisfies DocPageData
