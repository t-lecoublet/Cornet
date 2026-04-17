import type { DocPageData } from '@/types/docs'

export default {
  title: 'Button',
  description: 'Buttons allow users to take actions and make choices with a single tap.',
  category: 'Actions',
  source: 'https://daisyui.com/components/button/',
  classnames: {
    component: [
      { class: 'btn', desc: 'Base button class' },
    ],
    style: [
      { class: 'outline', desc: 'Transparent background with colored border' },
      { class: 'soft', desc: 'Low-contrast soft style' },
      { class: 'dash', desc: 'Dashed border style' },
      { class: 'ghost', desc: 'No background, inherits text color' },
      { class: 'link', desc: 'Looks like a hyperlink' },
      { class: 'wide', desc: 'Extra horizontal padding' },
      { class: 'block', desc: 'Full width button' },
      { class: 'circle', desc: 'Circular button (equal width/height)' },
      { class: 'square', desc: 'Square button (equal width/height)' },
    ],
    color: [
      { class: 'primary', desc: 'Primary color' },
      { class: 'secondary', desc: 'Secondary color' },
      { class: 'accent', desc: 'Accent color' },
      { class: 'neutral', desc: 'Neutral color' },
      { class: 'info', desc: 'Info color' },
      { class: 'success', desc: 'Success color' },
      { class: 'warning', desc: 'Warning color' },
      { class: 'error', desc: 'Error color' },
    ],
    size: [
      { class: 'xs', desc: 'Extra small' },
      { class: 'sm', desc: 'Small' },
      { class: 'md', desc: 'Medium', default: true },
      { class: 'lg', desc: 'Large' },
      { class: 'xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuButton>Button</DuButton>`,
      code: `<DuButton>Button</DuButton>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton variant="primary">Primary</DuButton>
  <DuButton variant="secondary">Secondary</DuButton>
  <DuButton variant="accent">Accent</DuButton>
  <DuButton variant="neutral">Neutral</DuButton>
  <DuButton variant="info">Info</DuButton>
  <DuButton variant="success">Success</DuButton>
  <DuButton variant="warning">Warning</DuButton>
  <DuButton variant="error">Error</DuButton>
</div>`,
      code: `<DuButton variant="primary">Primary</DuButton>
<DuButton variant="secondary">Secondary</DuButton>
<DuButton variant="accent">Accent</DuButton>
<DuButton variant="neutral">Neutral</DuButton>
<DuButton variant="info">Info</DuButton>
<DuButton variant="success">Success</DuButton>
<DuButton variant="warning">Warning</DuButton>
<DuButton variant="error">Error</DuButton>`,
    },
    {
      title: 'Outline style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton variant="primary" outline>Primary</DuButton>
  <DuButton variant="secondary" outline>Secondary</DuButton>
  <DuButton variant="accent" outline>Accent</DuButton>
</div>`,
      code: `<DuButton variant="primary" outline>Primary</DuButton>
<DuButton variant="secondary" outline>Secondary</DuButton>
<DuButton variant="accent" outline>Accent</DuButton>`,
    },
    {
      title: 'Soft style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton variant="primary" soft>Primary</DuButton>
  <DuButton variant="secondary" soft>Secondary</DuButton>
  <DuButton variant="error" soft>Error</DuButton>
</div>`,
      code: `<DuButton variant="primary" soft>Primary</DuButton>
<DuButton variant="secondary" soft>Secondary</DuButton>
<DuButton variant="error" soft>Error</DuButton>`,
    },
    {
      title: 'Ghost & Link',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton ghost>Ghost</DuButton>
  <DuButton link>Link</DuButton>
</div>`,
      code: `<DuButton ghost>Ghost</DuButton>
<DuButton link>Link</DuButton>`,
    },
    {
      title: 'Dash style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton variant="primary" dash>Dash Primary</DuButton>
  <DuButton variant="secondary" dash>Dash Secondary</DuButton>
</div>`,
      code: `<DuButton variant="primary" dash>Dash Primary</DuButton>
<DuButton variant="secondary" dash>Dash Secondary</DuButton>`,
    },
    {
      title: 'Active',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton variant="primary" active>Active</DuButton>
  <DuButton variant="secondary" active>Active</DuButton>
</div>`,
      code: `<DuButton variant="primary" active>Active</DuButton>
<DuButton variant="secondary" active>Active</DuButton>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <DuButton size="xs">XSmall</DuButton>
  <DuButton size="sm">Small</DuButton>
  <DuButton size="md">Medium</DuButton>
  <DuButton size="lg">Large</DuButton>
  <DuButton size="xl">XLarge</DuButton>
</div>`,
      code: `<DuButton size="xs">XSmall</DuButton>
<DuButton size="sm">Small</DuButton>
<DuButton size="md">Medium</DuButton>
<DuButton size="lg">Large</DuButton>
<DuButton size="xl">XLarge</DuButton>`,
    },
    {
      title: 'Circle & Square',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <DuButton circle variant="primary">✕</DuButton>
  <DuButton square variant="neutral">★</DuButton>
</div>`,
      code: `<DuButton circle variant="primary">✕</DuButton>
<DuButton square variant="neutral">★</DuButton>`,
    },
    {
      title: 'Block (full width)',
      preview: `<div class="w-64">
  <DuButton variant="primary" block>Block button</DuButton>
</div>`,
      code: `<DuButton variant="primary" block>Block button</DuButton>`,
    },
    {
      title: 'Disabled',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton disabled>Disabled</DuButton>
  <DuButton variant="primary" disabled>Disabled</DuButton>
</div>`,
      code: `<DuButton disabled>Disabled</DuButton>
<DuButton variant="primary" disabled>Disabled</DuButton>`,
    },
    {
      title: 'As a link (as prop)',
      description: 'Use the `as` prop to render the button as an anchor or RouterLink element.',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButton as="a" href="#" variant="primary">Link button</DuButton>
  <DuButton as="a" href="#" variant="neutral" outline>Outline link</DuButton>
</div>`,
      code: `<!-- Render as <a> tag -->
<DuButton as="a" href="/docs" variant="primary">Go to docs</DuButton>

<!-- Render as RouterLink (requires vue-router) -->
<DuButton as="RouterLink" to="/docs" variant="primary">Go to docs</DuButton>`,
    },
    {
      title: 'Loading state',
      description: 'Disable the button and add a loading spinner during async operations.',
      preview: `<DuButton variant="primary" disabled>
  <DuLoading animation="spinner" />
  Loading...
</DuButton>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  await someAsyncOperation()
  loading.value = false
}
</script>

<template>
  <DuButton variant="primary" :disabled="loading" @click="handleSubmit">
    <DuLoading v-if="loading" animation="spinner" />
    {{ loading ? 'Loading...' : 'Submit' }}
  </DuButton>
</template>`,
    },
  ],
} satisfies DocPageData
