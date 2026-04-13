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
      preview: `<textarea class="textarea w-72" placeholder="Write something..."></textarea>`,
      code: `<DuTextArea v-model="message" placeholder="Write something..." />`,
    },
    {
      title: 'Variants',
      code: `<DuTextArea v-model="msg" variant="primary" placeholder="Primary" />
<DuTextArea v-model="msg" variant="success" placeholder="Success" />
<DuTextArea v-model="msg" variant="error" placeholder="Error" />`,
    },
    {
      title: 'Sizes',
      code: `<DuTextArea v-model="msg" size="xs" placeholder="XSmall" />
<DuTextArea v-model="msg" size="sm" placeholder="Small" />
<DuTextArea v-model="msg" placeholder="Medium" />
<DuTextArea v-model="msg" size="lg" placeholder="Large" />`,
    },
    {
      title: 'Disabled',
      code: `<DuTextArea v-model="msg" disabled placeholder="Disabled" />`,
    },
    {
      title: 'With rows',
      code: `<DuTextArea v-model="msg" :rows="6" placeholder="Custom row height..." />`,
    },
  ],
} satisfies DocPageData
