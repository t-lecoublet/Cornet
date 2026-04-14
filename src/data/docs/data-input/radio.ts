import type { DocPageData } from '@/types/docs'

export default {
  title: 'Radio',
  description: 'Radio buttons allow the user to select one option from a set. DuRadio renders a styled `<input type="radio">`. The `name` and `value` HTML attributes are passed through via Vue\'s attribute fallthrough. Use `:checked` to control selection and `@change` to handle updates.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/radio/',
  classnames: {
    color: [
      { class: 'radio-primary', desc: 'Primary color' },
      { class: 'radio-secondary', desc: 'Secondary color' },
      { class: 'radio-accent', desc: 'Accent color' },
      { class: 'radio-success', desc: 'Success color' },
      { class: 'radio-warning', desc: 'Warning color' },
      { class: 'radio-error', desc: 'Error color' },
    ],
    size: [
      { class: 'radio-xs', desc: 'Extra small' },
      { class: 'radio-sm', desc: 'Small' },
      { class: 'radio-md', desc: 'Medium', default: true },
      { class: 'radio-lg', desc: 'Large' },
      { class: 'radio-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic radio group',
      description: '`name` and `value` are HTML attributes passed through to the native input. Use `:checked` and `@change` to manage state.',
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
