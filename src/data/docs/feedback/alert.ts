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
    color: [
      { class: 'alert-info', desc: 'Blue informational message' },
      { class: 'alert-success', desc: 'Green success message' },
      { class: 'alert-warning', desc: 'Yellow warning message' },
      { class: 'alert-error', desc: 'Red error message' },
    ],
    style: [
      { class: 'alert-soft', desc: 'Low-contrast background' },
      { class: 'alert-outline', desc: 'Outline border only' },
      { class: 'alert-dash', desc: 'Dashed border' },
      { class: 'alert-vertical', desc: 'Stack icon above text' },
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
      title: 'With actions',
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
