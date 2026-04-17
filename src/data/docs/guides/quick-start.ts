import type { DocPageData } from '@/types/docs'

export default {
  title: 'Quick Start',
  description: 'Start using components in minutes. A practical introduction to the most common patterns.',
  category: 'Guides',
  sections: [
    {
      title: 'Your first component',
      description: 'Import a component directly or rely on auto-imports if you have the Vite plugin configured.',
      preview: `<div class="flex flex-wrap gap-3 items-center">
  <DuButton>Default</DuButton>
  <DuButton variant="primary">Primary</DuButton>
  <DuButton variant="secondary">Secondary</DuButton>
</div>`,
      code: `<script setup lang="ts">
import { DuButton } from 'daisyui-vue-kit'
</script>

<template>
  <DuButton variant="primary">Click me</DuButton>
</template>`,
    },
    {
      title: 'Variants',
      description: 'Most components accept a `variant` prop to change their color.',
      preview: `<div class="flex flex-wrap gap-2 items-center">
  <DuButton variant="neutral">Neutral</DuButton>
  <DuButton variant="primary">Primary</DuButton>
  <DuButton variant="secondary">Secondary</DuButton>
  <DuButton variant="accent">Accent</DuButton>
  <DuButton variant="info">Info</DuButton>
  <DuButton variant="success">Success</DuButton>
  <DuButton variant="warning">Warning</DuButton>
  <DuButton variant="error">Error</DuButton>
</div>`,
      code: `<DuButton variant="primary">Primary</DuButton>
<DuButton variant="success">Success</DuButton>
<DuButton variant="error">Error</DuButton>`,
    },
    {
      title: 'Sizes',
      description: 'Use the `size` prop to scale components: `xs`, `sm`, `md`, `lg`, `xl`.',
      preview: `<div class="flex flex-wrap gap-3 items-center">
  <DuButton size="xs">XS</DuButton>
  <DuButton size="sm">SM</DuButton>
  <DuButton>Default</DuButton>
  <DuButton size="lg">LG</DuButton>
  <DuButton size="xl">XL</DuButton>
</div>`,
      code: `<DuButton size="sm">Small</DuButton>
<DuButton>Default</DuButton>
<DuButton size="lg">Large</DuButton>`,
    },
    {
      title: 'Reactive state with v-model',
      description: 'Components that hold state (inputs, selects, modals) support `v-model`.',
      code: `<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const agreed = ref(false)
</script>

<template>
  <DuInputField v-model="name" placeholder="Your name" />
  <DuCheckbox v-model="agreed">I agree to the terms</DuCheckbox>
  <p>Hello, {{ name }}!</p>
</template>`,
    },
    {
      title: 'Composing a form',
      description: 'Combine DuLabel, DuInputField, and DuButton to build a simple form.',
      code: `<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

async function submit() {
  // handle login
}
</script>

<template>
  <form class="flex flex-col gap-4 w-80" @submit.prevent="submit">
    <DuLabel type="label">
      Email
      <DuInputField v-model="email" type="email" required />
    </DuLabel>

    <DuLabel type="label">
      Password
      <DuInputField v-model="password" type="password" required />
    </DuLabel>

    <DuButton type="submit" variant="primary">Log in</DuButton>
  </form>
</template>`,
    },
  ],
} satisfies DocPageData
