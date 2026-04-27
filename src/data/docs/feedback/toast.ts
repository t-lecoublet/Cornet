import type { DocPageData } from '@/types/docs'

export default {
  title: 'Toast',
  description: 'Toast is a fixed-position container for alert notifications.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/toast/',
  classnames: {
    placement: [
      { class: 'toast-start', desc: 'Left side' },
      { class: 'toast-center', desc: 'Horizontally centered' },
      { class: 'toast-end', desc: 'Right side', default: true },
      { class: 'toast-top', desc: 'Top of screen' },
      { class: 'toast-middle', desc: 'Vertically centered' },
      { class: 'toast-bottom', desc: 'Bottom of screen', default: true },
    ],
  },
  sections: [
    {
      title: 'Basic',
      links: [
        { label: 'DuAlert docs', href: '/docs/feedback/alert' },
      ],
      preview: `<div class="relative h-36 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuToast class="absolute" horizontalPosition="end" verticalPosition="top">
    <DuAlert variant="success" icon>Saved successfully!</DuAlert>
  </DuToast>
</div>`,
      code: `<DuToast horizontalPosition="end" verticalPosition="top">
  <DuAlert variant="success" icon>Saved successfully!</DuAlert>
</DuToast>`,
    },
    {
      title: 'Multiple toasts',
      preview: `<div class="relative h-36 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuToast horizontalPosition="end" verticalPosition="top" class="absolute">
    <DuAlert variant="success" icon size="sm">Saved successfully!</DuAlert>
    <DuAlert variant="info" icon size="sm">2 files uploaded</DuAlert>
    <DuAlert variant="warning" icon size="sm">Session expiring soon</DuAlert>
  </DuToast>
</div>`,
      code: `<DuToast horizontalPosition="end" verticalPosition="top">
  <DuAlert
    v-for="toast in toasts"
    :key="toast.id"
    :variant="toast.type"
    icon
    dismissible
  >
    {{ toast.message }}
  </DuAlert>
</DuToast>`,
    },
    {
      title: 'With composable (recommended)',
      description: 'Create a global toast manager using Vue\'s provide/inject.',
      links: [
        { label: 'Vue provide/inject docs', href: 'https://vuejs.org/guide/components/provide-inject.html' },
      ],
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuToast horizontalPosition="end" verticalPosition="bottom" class="absolute">
    <DuAlert variant="primary" icon size="sm" dismissible>Operation completed</DuAlert>
  </DuToast>
</div>`,
      code: `<!-- In your app root or layout -->
<DuToast horizontalPosition="end" verticalPosition="top">
  <DuAlert
    v-for="t in toastStore.toasts"
    :key="t.id"
    :variant="t.type"
    icon
    dismissible
    autoDismissible
    @dismiss="toastStore.remove(t.id)"
  >
    {{ t.message }}
  </DuAlert>
</DuToast>`,
    },
  ],
} satisfies DocPageData
