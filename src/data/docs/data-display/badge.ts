import type { DocPageData } from '@/types/docs'

export default {
  title: 'Badge',
  description: 'Badges are used to inform the user of the status of specific data.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/badge/',
  classnames: {
    style: [
      { class: 'badge-outline', desc: 'Transparent background with border' },
      { class: 'badge-soft', desc: 'Low-contrast soft style' },
      { class: 'badge-dash', desc: 'Dashed border' },
      { class: 'badge-ghost', desc: 'Subtle ghost style' },
    ],
    color: [
      { class: 'badge-primary', desc: 'Primary color' },
      { class: 'badge-secondary', desc: 'Secondary color' },
      { class: 'badge-accent', desc: 'Accent color' },
      { class: 'badge-neutral', desc: 'Neutral color' },
      { class: 'badge-info', desc: 'Info color' },
      { class: 'badge-success', desc: 'Success color' },
      { class: 'badge-warning', desc: 'Warning color' },
      { class: 'badge-error', desc: 'Error color' },
    ],
    size: [
      { class: 'badge-xs', desc: 'Extra small' },
      { class: 'badge-sm', desc: 'Small' },
      { class: 'badge-md', desc: 'Medium', default: true },
      { class: 'badge-lg', desc: 'Large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <span class="badge">Default</span>
  <span class="badge badge-primary">Primary</span>
  <span class="badge badge-secondary">Secondary</span>
  <span class="badge badge-accent">Accent</span>
</div>`,
      code: `<DuBadge>Default</DuBadge>
<DuBadge variant="primary">Primary</DuBadge>
<DuBadge variant="secondary">Secondary</DuBadge>
<DuBadge variant="accent">Accent</DuBadge>`,
    },
    {
      title: 'Outline',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <span class="badge badge-outline badge-primary">Primary</span>
  <span class="badge badge-outline badge-secondary">Secondary</span>
  <span class="badge badge-outline badge-error">Error</span>
</div>`,
      code: `<DuBadge variant="primary" outline>Primary</DuBadge>
<DuBadge variant="secondary" outline>Secondary</DuBadge>
<DuBadge variant="error" outline>Error</DuBadge>`,
    },
    {
      title: 'Soft & Ghost',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <span class="badge badge-soft badge-success">Soft success</span>
  <span class="badge badge-ghost">Ghost</span>
</div>`,
      code: `<DuBadge variant="success" soft>Soft success</DuBadge>
<DuBadge ghost>Ghost</DuBadge>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <span class="badge badge-xs badge-primary">XSmall</span>
  <span class="badge badge-sm badge-primary">Small</span>
  <span class="badge badge-primary">Medium</span>
  <span class="badge badge-lg badge-primary">Large</span>
</div>`,
      code: `<DuBadge variant="primary" size="xs">XSmall</DuBadge>
<DuBadge variant="primary" size="sm">Small</DuBadge>
<DuBadge variant="primary">Medium</DuBadge>
<DuBadge variant="primary" size="lg">Large</DuBadge>`,
    },
    {
      title: 'Inside a button',
      preview: `<button class="btn btn-primary gap-2">Inbox <span class="badge badge-sm">5</span></button>`,
      code: `<DuButton variant="primary">
  Inbox
  <DuBadge size="sm">5</DuBadge>
</DuButton>`,
    },
  ],
} satisfies DocPageData
