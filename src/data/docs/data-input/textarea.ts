import type { DocPageData } from '@/types/docs'

export default {
  title: 'TextArea',
  description: 'TextArea is a multiline text input.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/textarea/',
  classnames: {
    style: [
      { class: 'textarea-ghost', desc: 'Transparent ghost style' },
    ],
    color: [
      { class: 'textarea-primary', desc: 'Primary border on focus' },
      { class: 'textarea-secondary', desc: 'Secondary border' },
      { class: 'textarea-accent', desc: 'Accent border' },
      { class: 'textarea-error', desc: 'Error state' },
      { class: 'textarea-success', desc: 'Success state' },
    ],
    size: [
      { class: 'textarea-xs', desc: 'Extra small' },
      { class: 'textarea-sm', desc: 'Small' },
      { class: 'textarea-md', desc: 'Medium', default: true },
      { class: 'textarea-lg', desc: 'Large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuTextArea placeholder="Write something..." class="w-72" />`,
      code: `<DuTextArea v-model="message" placeholder="Write something..." />`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuTextArea variant="primary" placeholder="Primary" />
  <DuTextArea variant="success" placeholder="Success" />
  <DuTextArea variant="error" placeholder="Error" />
</div>`,
      code: `<DuTextArea v-model="msg" variant="primary" placeholder="Primary" />
<DuTextArea v-model="msg" variant="success" placeholder="Success" />
<DuTextArea v-model="msg" variant="error" placeholder="Error" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuTextArea size="xs" placeholder="XSmall" />
  <DuTextArea size="sm" placeholder="Small" />
  <DuTextArea placeholder="Medium" />
  <DuTextArea size="lg" placeholder="Large" />
</div>`,
      code: `<DuTextArea v-model="msg" size="xs" placeholder="XSmall" />
<DuTextArea v-model="msg" size="sm" placeholder="Small" />
<DuTextArea v-model="msg" placeholder="Medium" />
<DuTextArea v-model="msg" size="lg" placeholder="Large" />`,
    },
    {
      title: 'Ghost style',
      description: 'Use `ghost` for a transparent textarea that blends into its container.',
      preview: `<DuTextArea ghost placeholder="Ghost textarea..." class="w-72" />`,
      code: `<DuTextArea v-model="msg" ghost placeholder="Ghost textarea..." />`,
    },
    {
      title: 'Disabled',
      preview: `<DuTextArea disabled placeholder="Disabled" class="w-72" />`,
      code: `<DuTextArea v-model="msg" disabled placeholder="Disabled" />`,
    },
    {
      title: 'With rows',
      preview: `<DuTextArea :rows="6" placeholder="Custom row height..." class="w-72" />`,
      code: `<DuTextArea v-model="msg" :rows="6" placeholder="Custom row height..." />`,
    },
    {
      title: 'v-model binding',
      description: 'DuTextArea uses `modelValue` + `update:modelValue` under the hood, compatible with `v-model`.',
      links: [
        { label: 'Vue v-model docs', href: 'https://vuejs.org/guide/components/v-model.html' },
      ],
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuTextArea placeholder="Write a comment..." :rows="4" variant="primary" />
  <p class="text-xs text-base-content/50">0 characters</p>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <DuTextArea
    v-model="message"
    placeholder="Write a comment..."
    :rows="4"
    variant="primary"
  />
  <p class="text-sm text-base-content/50 mt-1">{{ message.length }} characters</p>
</template>`,
    },
    {
      title: 'Inside a fieldset',
      description: 'Combine with DuFieldset + DuLabel for accessible form groups.',
      links: [
        { label: 'DuFieldset docs', href: '/docs/data-input/fieldset' },
        { label: 'DuLabel docs', href: '/docs/data-input/label' },
      ],
      preview: `<DuFieldset legend="Contact">
  <DuLabel label="Message">
    <DuTextArea placeholder="Your message..." :rows="4" variant="primary" />
  </DuLabel>
</DuFieldset>`,
      code: `<DuFieldset legend="Contact">
  <DuLabel label="Message">
    <DuTextArea
      v-model="msg"
      placeholder="Your message..."
      :rows="5"
      variant="primary"
    />
  </DuLabel>
</DuFieldset>`,
    },
  ],
} satisfies DocPageData
