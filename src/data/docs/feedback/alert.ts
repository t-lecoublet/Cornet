import type { DocPageData } from '@/types/docs'

export default {
  title: 'Alert',
  description: 'Alert is used to display important messages or feedback to the user.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/alert/',
  props: [
    {
      title: 'variant',
      description: 'Color variant of the alert',
      type: 'string',
      default: '"default"',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'direction',
      description: 'Layout direction of alert content',
      type: 'string',
      default: '"default"',
      options: ['default', 'vertical', 'horizontal', 'responsive'],
    },
    {
      title: 'soft',
      description: 'Use soft/low-contrast background style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'outline',
      description: 'Use outline border style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'dash',
      description: 'Use dashed border style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'dismissible',
      description: 'Show close button to dismiss alert',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'autoDismissible',
      description: 'Automatically dismiss after 5 seconds',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'icon',
      description: 'Show variant icon',
      type: 'boolean',
      default: 'true',
    },
  ],
  slots: [
    {
      title: 'Slot #actions',
      description: 'Action buttons displayed after alert content',
      preview: `<DuAlert variant="warning" icon>
  Your session will expire soon.
  <template #actions>
    <DuButton size="xs" variant="warning">Renew</DuButton>
    <DuButton size="xs" ghost>Dismiss</DuButton>
  </template>
</DuAlert>`,
      code: `<DuAlert variant="warning" icon>
  Your session will expire soon.
  <template #actions>
    <DuButton size="xs" variant="warning">Renew</DuButton>
    <DuButton size="xs" ghost>Dismiss</DuButton>
  </template>
</DuAlert>`,
    },
  ],
  classnames: {
    component: [
      { class: 'alert', desc: 'Base class, always applied. variant="default" adds no color class.' },
      { class: 'btn btn-sm btn-square btn-ghost', desc: 'The dismiss button — dismissible' },
    ],
    style: [
      { class: 'alert-soft', desc: 'Low-contrast background — soft' },
      { class: 'alert-outline', desc: 'Border only — outline' },
      { class: 'alert-dash', desc: 'Dashed border — dash' },
    ],
    color: [
      { class: 'alert-info', desc: 'variant="info"' },
      { class: 'alert-success', desc: 'variant="success"' },
      { class: 'alert-warning', desc: 'variant="warning"' },
      { class: 'alert-error', desc: 'variant="error"' },
    ],
    modifier: [
      { class: 'alert-vertical', desc: 'Stack icon above text — direction="vertical"' },
      { class: 'alert-horizontal', desc: 'Force the row layout — direction="horizontal"' },
      { class: 'alert-vertical sm:alert-horizontal', desc: 'direction="responsive"' },
    ],
  },
  sections: [
    {
      title: 'Basic variants',
      preview: `<div class="flex flex-col gap-2 w-full">
  <DuAlert variant="info" icon>Info message</DuAlert>
  <DuAlert variant="success" icon>Success message</DuAlert>
  <DuAlert variant="warning" icon>Warning message</DuAlert>
  <DuAlert variant="error" icon>Error message</DuAlert>
</div>`,
      code: `<DuAlert variant="info" icon>Info message</DuAlert>
<DuAlert variant="success" icon>Success message</DuAlert>
<DuAlert variant="warning" icon>Warning message</DuAlert>
<DuAlert variant="error" icon>Error message</DuAlert>`,
    },
    {
      title: 'Soft style',
      preview: `<div class="flex flex-col gap-2 w-full">
  <DuAlert variant="success" soft icon>Operation successful</DuAlert>
  <DuAlert variant="error" soft icon>An error occurred</DuAlert>
</div>`,
      code: `<DuAlert variant="success" soft icon>Operation successful</DuAlert>
<DuAlert variant="error" soft icon>An error occurred</DuAlert>`,
    },
    {
      title: 'Dismissible',
      preview: `<DuAlert variant="info" icon dismissible>
  This alert can be dismissed.
</DuAlert>`,
      code: `<DuAlert variant="info" icon dismissible>
  This alert can be dismissed.
</DuAlert>`,
    },
    {
      title: 'Auto-dismiss',
      preview: `<DuAlert variant="success" icon dismissible>
  Disappears after 5 seconds (autoDismissible).
</DuAlert>`,
      code: `<DuAlert variant="success" icon dismissible autoDismissible>
  Disappears after 5 seconds.
</DuAlert>`,
    },
    {
      title: 'close event',
      description: 'The `close` event fires when the alert is dismissed — both by the close button and by `autoDismissible` timing out. Use it to drop the alert from your own state.',
      script: `
        const closed = ref(0)
        return { closed }
      `,
      preview: `<div class="flex flex-col items-center gap-3">
  <DuAlert variant="info" icon dismissible @close="closed++">
    Dismiss me.
  </DuAlert>
  <p class="text-sm text-base-content/60">close fired: <strong class="text-base-content">{{ closed }}</strong></p>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const alerts = ref([{ id: 1, text: 'Saved.' }])
</script>

<template>
  <DuAlert
    v-for="a in alerts"
    :key="a.id"
    variant="success"
    icon
    dismissible
    autoDismissible
    @close="alerts = alerts.filter(x => x.id !== a.id)"
  >
    {{ a.text }}
  </DuAlert>
</template>`,
    },
    {
      title: 'With actions',
      links: [
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<DuAlert variant="warning" icon>
  Your session will expire soon.
  <template #actions>
    <DuButton size="xs" variant="warning">Renew</DuButton>
    <DuButton size="xs" ghost>Dismiss</DuButton>
  </template>
</DuAlert>`,
      code: `<DuAlert variant="warning" icon>
  Your session will expire soon.
  <template #actions>
    <DuButton size="xs" variant="warning">Renew</DuButton>
    <DuButton size="xs" ghost>Dismiss</DuButton>
  </template>
</DuAlert>`,
    },
  ],
} satisfies DocPageData
