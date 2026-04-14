import type { DocPageData } from '@/types/docs'

export default {
  title: 'Status',
  description: 'Status is a small colored indicator dot used to show the status of an item.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/status/',
  classnames: {
    color: [
      { class: 'status-primary', desc: 'Primary color' },
      { class: 'status-secondary', desc: 'Secondary color' },
      { class: 'status-accent', desc: 'Accent color' },
      { class: 'status-success', desc: 'Green — online/active' },
      { class: 'status-warning', desc: 'Yellow — idle/pending' },
      { class: 'status-error', desc: 'Red — offline/error' },
      { class: 'status-info', desc: 'Blue — informational' },
    ],
    modifier: [
      { class: 'status-ping', desc: 'Pulsing ping animation' },
    ],
    size: [
      { class: 'status-xs', desc: 'Extra small' },
      { class: 'status-sm', desc: 'Small' },
      { class: 'status-md', desc: 'Medium', default: true },
      { class: 'status-lg', desc: 'Large' },
      { class: 'status-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" />
  <DuStatus variant="warning" />
  <DuStatus variant="error" />
  <DuStatus variant="info" />
</div>`,
      code: `<DuStatus variant="success" />
<DuStatus variant="warning" />
<DuStatus variant="error" />
<DuStatus variant="info" />`,
    },
    {
      title: 'Ping animation',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" ping />
  <DuStatus variant="error" ping />
</div>`,
      code: `<DuStatus variant="success" ping />
<DuStatus variant="error" ping />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <DuStatus variant="success" size="xs" />
  <DuStatus variant="success" size="sm" />
  <DuStatus variant="success" />
  <DuStatus variant="success" size="lg" />
  <DuStatus variant="success" size="xl" />
</div>`,
      code: `<DuStatus variant="success" size="xs" />
<DuStatus variant="success" size="sm" />
<DuStatus variant="success" />
<DuStatus variant="success" size="lg" />
<DuStatus variant="success" size="xl" />`,
    },
    {
      title: 'Inline with text',
      preview: `<div class="flex items-center gap-2">
  <DuStatus variant="success" />
  <span class="text-sm">Server online</span>
</div>`,
      code: `<div class="flex items-center gap-2">
  <DuStatus variant="success" />
  <span>Server online</span>
</div>`,
    },
  ],
} satisfies DocPageData
