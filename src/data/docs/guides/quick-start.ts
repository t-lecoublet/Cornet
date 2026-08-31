import type { DocPageData } from '@/types/docs'

export default {
  title: 'Quick Start',
  description: 'Start using components in minutes. A practical introduction to the most common patterns.',
  category: 'Guides',
  sections: [
    {
      title: 'Your first component',
      description: 'Import a component directly. This assumes Cornet is already in your project — if not, the Installation guide takes about a minute.',
      links: [
        { label: 'Installation', href: '/docs/guides/installation' },
        { label: 'Cornet button', href: '/docs/actions/button' },
        { label: 'Vue basic usage docs', href: 'https://vuejs.org/api/composition-api-setup.html#basic-usage' },
      ],
      preview: `<div class="flex flex-wrap gap-3 items-center">
  <DuButton>Default</DuButton>
  <DuButton variant="primary">Primary</DuButton>
  <DuButton variant="secondary">Secondary</DuButton>
</div>`,
      code: `<script setup lang="ts">
import { DuButton } from 'cornet-ui'
</script>

<template>
  <DuButton variant="primary">Click me</DuButton>
</template>`,
    },
    {
      title: 'Variants',
      description: 'Most components accept a `variant` prop to change their color.',
      links: [
        { label: 'DaisyUI variants docs', href: 'https://daisyui.com/docs/colors' },
        { label: 'Vue props docs', href: 'https://vuejs.org/guide/components/props.html#props' },
      ],
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
      description: `Use the 'size' prop to scale components: 'xs', 'sm', 'md', 'lg', 'xl'.`,
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
      description: 'Components that hold state support `v-model` — and they follow one contract throughout the library: **omit the model and the component owns its state; pass it and yours decides**. A `:open="true"` with no listener pins a dropdown open rather than being silently overruled.',
      links: [
        { label: 'Vue reactivity docs', href: 'https://vuejs.org/guide/essentials/reactivity-fundamentals' },
        { label: 'Vue v-model docs', href: 'https://vuejs.org/guide/components/v-model.html' },
        { label: 'Vue form input bindings docs', href: 'https://vuejs.org/guide/essentials/forms' },
      ],
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
      description: 'Combine DuButton, DuInputField, and DuLabel to build a simple form.',
      links: [
        { label: 'DuInputField docs', href: '/docs/data-input/input-field' },
        { label: 'DuLabel docs', href: '/docs/data-input/label' },
        { label: 'DuCheckbox docs', href: '/docs/data-input/checkbox' },
      ],
      script: `
      const email = ref('')
      const password = ref('')
      function submit() {
        alert('forme submitted with email: ' + email.value + ' and password: ' + password.value)
      }
      return { email, password, submit }
      `,
      preview: `<form class="flex flex-col gap-4 w-80" @submit.prevent="submit">
<DuFieldset legend="Email">
      <DuInputField v-model="email" type="email" required />
    </DuFieldset>

<DuFieldset legend="Password">
      <DuInputField v-model="password" type="password" required />
    </DuFieldset>

    <DuButton type="submit" variant="primary">Log in</DuButton>
  </form>`,
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
    <DuFieldset legend="Email">
      <DuInputField v-model="email" type="email" required />
    </DuFieldset>

    <DuFieldset legend="Password">
      <DuInputField v-model="password" type="password" required />
    </DuFieldset>

    <DuButton type="submit" variant="primary">Log in</DuButton>
  </form>
</template>`,
    },
    {
      title: 'Notifications from anywhere',
      description: 'Put one `<DuToast />` in your layout, then raise messages with `useToasts()` from any component. The queue lives at module scope, so no caller has to find the container first.',
      links: [
        { label: 'DuToast docs', href: '/docs/feedback/toast' },
      ],
      code: `<!-- App.vue, once -->
<template>
  <RouterView />
  <DuToast horizontalPosition="end" verticalPosition="top" />
</template>

<!-- anywhere else -->
<script setup lang="ts">
import { useToasts } from 'cornet-ui'

const { push } = useToasts()

async function save() {
  await api.save()
  push({ message: 'Saved', variant: 'success' })
}
</script>`,
    },
    {
      title: 'What you get for free',
      description: 'Cornet\'s stateful components implement the WAI-ARIA patterns rather than approximating them with CSS. A dropdown carries `aria-expanded` and returns focus to its trigger; tabs are one tab stop walked with the arrow keys; a tooltip opens on **focus** as well as hover and closes on Escape; a floating drawer traps focus and marks the page behind it `inert`. You do not wire any of that — but two things are worth knowing.',
      lang: 'vue',
      code: `<!-- 1. A dropdown trigger must spread triggerProps -->
<DuDropdown>
  <template #trigger="{ triggerProps }">
    <DuButton v-bind="triggerProps">Menu</DuButton>
  </template>
  <DuMenu role="menu" ariaLabel="Actions" :items="actions" />
</DuDropdown>

<!-- 2. Anything whose visible content is an icon needs a name -->
<DuButton circle ariaLabel="Close">✕</DuButton>
<DuLoading ariaLabel="Loading results" />
<DuStatus variant="success" ariaLabel="Online" />`,
    },
  ],
} satisfies DocPageData
