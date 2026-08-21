import type { DocPageData } from '@/types/docs'

export default {
  title: 'Button',
  description: 'Buttons allow users to take actions and make choices with a single tap.',
  category: 'Actions',
  source: 'https://daisyui.com/components/button/',
  props: [
    {
      title: 'as',
      description: 'Element or component the button renders as. `RouterLink` / `NuxtLink` resolve to the router link component.',
      type: 'DuButtonElementTag',
      default: '"button"',
      options: ['button', 'a', 'input', 'div', 'RouterLink', 'NuxtLink'],
    },
    {
      title: 'label',
      description: 'Text label. Required when `as="input"`, which has no slot content.',
      type: 'string',
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'outline',
      description: 'Outline style — transparent background with a colored border',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'soft',
      description: 'Soft style — low-contrast tinted background',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'dash',
      description: 'Dashed border style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'ghost',
      description: 'Ghost style — no background until hovered',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'link',
      description: 'Render the button styled as a text link',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'active',
      description: 'Force the active (pressed) state',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the button',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'wide',
      description: 'Extra horizontal padding',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'block',
      description: 'Full-width button',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'square',
      description: 'Equal width and height, square corners',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'circle',
      description: 'Equal width and height, fully rounded',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'href',
      description: 'Target URL. Used when `as="a"`; pass `to` instead for `RouterLink` / `NuxtLink`.',
      type: 'string',
    },
    {
      title: 'type',
      description: 'Native `type` attribute when `as="button"`',
      type: 'string',
    },
    {
      title: 'inputType',
      description: 'Native `type` attribute when `as="input"`',
      type: "'button' | 'submit' | 'reset' | 'radio' | 'checkbox'",
    },
    {
      title: 'value',
      description: 'Native `value` attribute when `as="input"`',
      type: 'string',
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for the root element',
      type: 'string',
    },
  ],
  // The DaisyUI classes DuButton actually emits, and which prop produces each —
  // useful when you want to write the markup by hand instead of importing DuButton.
  classnames: {
    component: [
      { class: 'btn', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    style: [
      { class: 'btn-outline', desc: 'Transparent background with a colored border — outline' },
      { class: 'btn-soft', desc: 'Low-contrast tinted background — soft' },
      { class: 'btn-dash', desc: 'Dashed border — dash' },
      { class: 'btn-ghost', desc: 'No background until hovered — ghost' },
      { class: 'btn-link', desc: 'Styled as a text link — link' },
      { class: 'btn-active', desc: 'Forced pressed state — active' },
    ],
    color: [
      { class: 'btn-primary', desc: 'variant="primary"' },
      { class: 'btn-secondary', desc: 'variant="secondary"' },
      { class: 'btn-accent', desc: 'variant="accent"' },
      { class: 'btn-neutral', desc: 'variant="neutral"' },
      { class: 'btn-info', desc: 'variant="info"' },
      { class: 'btn-success', desc: 'variant="success"' },
      { class: 'btn-warning', desc: 'variant="warning"' },
      { class: 'btn-error', desc: 'variant="error"' },
    ],
    size: [
      { class: 'btn-xs', desc: 'size="xs"' },
      { class: 'btn-sm', desc: 'size="sm"' },
      { class: 'btn-md', desc: 'size="md"' },
      { class: 'btn-lg', desc: 'size="lg"' },
      { class: 'btn-xl', desc: 'size="xl"' },
    ],
    modifier: [
      { class: 'btn-wide', desc: 'Extra horizontal padding — wide' },
      { class: 'btn-block', desc: 'Full width — block' },
      { class: 'btn-square', desc: 'Equal width and height, square corners — square' },
      { class: 'btn-circle', desc: 'Equal width and height, fully rounded — circle' },
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
      links: [
        { label: 'Vue Router RouterLink docs', href: 'https://router.vuejs.org/guide/essentials/navigation.html' },
      ],
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
      links: [
        { label: 'DuLoading docs', href: '/docs/feedback/loading' },
      ],
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
