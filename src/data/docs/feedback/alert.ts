import type { DocPageData } from '@/types/docs'

export default {
  title: 'Alert',
  description: 'Alert is used to display important messages or feedback to the user.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/alert/',
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
  <div role="alert" class="alert alert-info"><span>💡 Info message</span></div>
  <div role="alert" class="alert alert-success"><span>✅ Success message</span></div>
  <div role="alert" class="alert alert-warning"><span>⚠️ Warning message</span></div>
  <div role="alert" class="alert alert-error"><span>❌ Error message</span></div>
</div>`,
      code: `<DuAlert variant="info" icon>Info message</DuAlert>
<DuAlert variant="success" icon>Success message</DuAlert>
<DuAlert variant="warning" icon>Warning message</DuAlert>
<DuAlert variant="error" icon>Error message</DuAlert>`,
    },
    {
      title: 'Soft style',
      preview: `<div class="flex flex-col gap-2 w-full">
  <div role="alert" class="alert alert-soft alert-success"><span>✅ Operation successful</span></div>
  <div role="alert" class="alert alert-soft alert-error"><span>❌ An error occurred</span></div>
</div>`,
      code: `<DuAlert variant="success" soft icon>Operation successful</DuAlert>
<DuAlert variant="error" soft icon>An error occurred</DuAlert>`,
    },
    {
      title: 'Dismissible',
      code: `<DuAlert variant="info" icon dismissible>
  This alert can be dismissed.
</DuAlert>`,
    },
    {
      title: 'Auto-dismiss',
      code: `<DuAlert variant="success" icon dismissible autoDismissible>
  Disappears after 5 seconds.
</DuAlert>`,
    },
    {
      title: 'With actions',
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
