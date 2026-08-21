import type { DocPageData } from '@/types/docs'

export default {
  title: 'TextArea',
  description: 'TextArea is a multiline text input.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/textarea/',
  props: [
    {
      title: 'modelValue',
      description: 'Text value (use with `v-model`)',
      type: 'string',
      default: "''",
    },
    {
      title: 'placeholder',
      description: 'Placeholder text',
      type: 'string',
      default: "''",
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
    {
      title: 'ghost',
      description: 'Ghost style — no background until focused',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the textarea',
      type: 'boolean',
      default: 'false',
    },
  ],
  classnames: {
    component: [
      { class: 'textarea', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    style: [
      { class: 'textarea-ghost', desc: 'Transparent ghost style' },
    ],
    color: [
      { class: 'textarea-primary', desc: 'Primary border on focus' },
      { class: 'textarea-secondary', desc: 'Secondary border' },
      { class: 'textarea-accent', desc: 'Accent border' },
      { class: 'textarea-neutral', desc: 'Neutral border' },
      { class: 'textarea-info', desc: 'Info state' },
      { class: 'textarea-success', desc: 'Success state' },
      { class: 'textarea-warning', desc: 'Warning state' },
      { class: 'textarea-error', desc: 'Error state' },
    ],
    size: [
      { class: 'textarea-xs', desc: 'Extra small' },
      { class: 'textarea-sm', desc: 'Small' },
      { class: 'textarea-md', desc: 'Medium' },
      { class: 'textarea-lg', desc: 'Large' },
      { class: 'textarea-xl', desc: 'Extra large' },
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
