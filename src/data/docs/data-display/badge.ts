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
  <DuBadge>Default</DuBadge>
  <DuBadge variant="primary">Primary</DuBadge>
  <DuBadge variant="secondary">Secondary</DuBadge>
  <DuBadge variant="accent">Accent</DuBadge>
</div>`,
      code: `<DuBadge>Default</DuBadge>
<DuBadge variant="primary">Primary</DuBadge>
<DuBadge variant="secondary">Secondary</DuBadge>
<DuBadge variant="accent">Accent</DuBadge>`,
    },
    {
      title: 'Outline',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuBadge variant="primary" outline>Primary</DuBadge>
  <DuBadge variant="secondary" outline>Secondary</DuBadge>
  <DuBadge variant="error" outline>Error</DuBadge>
</div>`,
      code: `<DuBadge variant="primary" outline>Primary</DuBadge>
<DuBadge variant="secondary" outline>Secondary</DuBadge>
<DuBadge variant="error" outline>Error</DuBadge>`,
    },
    {
      title: 'Soft & Ghost',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuBadge variant="success" soft>Soft success</DuBadge>
  <DuBadge ghost>Ghost</DuBadge>
</div>`,
      code: `<DuBadge variant="success" soft>Soft success</DuBadge>
<DuBadge ghost>Ghost</DuBadge>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <DuBadge variant="primary" size="xs">XSmall</DuBadge>
  <DuBadge variant="primary" size="sm">Small</DuBadge>
  <DuBadge variant="primary">Medium</DuBadge>
  <DuBadge variant="primary" size="lg">Large</DuBadge>
</div>`,
      code: `<DuBadge variant="primary" size="xs">XSmall</DuBadge>
<DuBadge variant="primary" size="sm">Small</DuBadge>
<DuBadge variant="primary">Medium</DuBadge>
<DuBadge variant="primary" size="lg">Large</DuBadge>`,
    },
    {
      title: 'Inside a button',
      links: [
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<DuButton variant="primary">
  Inbox <DuBadge size="sm">5</DuBadge>
</DuButton>`,
      code: `<DuButton variant="primary">
  Inbox
  <DuBadge size="sm">5</DuBadge>
</DuButton>`,
    },
    {
      title: 'Dash style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuBadge variant="primary" dash>Primary</DuBadge>
  <DuBadge variant="success" dash>Success</DuBadge>
</div>`,
      code: `<DuBadge variant="primary" dash>Primary</DuBadge>
<DuBadge variant="success" dash>Success</DuBadge>`,
    },
    {
      title: 'With icon',
      description: 'The `icon` prop adds an icon based on the variant.',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuBadge variant="info" icon>Info</DuBadge>
  <DuBadge variant="success" icon>Success</DuBadge>
  <DuBadge variant="warning" icon>Warning</DuBadge>
  <DuBadge variant="error" icon>Error</DuBadge>
</div>`,
      code: `<DuBadge variant="info" icon>Info</DuBadge>
<DuBadge variant="success" icon>Success</DuBadge>
<DuBadge variant="warning" icon>Warning</DuBadge>
<DuBadge variant="error" icon>Error</DuBadge>`,
    },
    {
      title: 'Empty badge',
      description: 'Badge without content, useful for indicators.',
      preview: `<div class="flex items-center gap-4">
  <DuBadge size="lg" variant="primary"></DuBadge>
  <DuBadge size="md" variant="success"></DuBadge>
  <DuBadge size="sm" variant="warning"></DuBadge>
  <DuBadge size="xs" variant="error"></DuBadge>
</div>`,
      code: `<DuBadge size="lg" variant="primary"></DuBadge>
<DuBadge size="md" variant="success"></DuBadge>
<DuBadge size="sm" variant="warning"></DuBadge>
<DuBadge size="xs" variant="error"></DuBadge>`,
    },
    {
      title: 'In headings',
      preview: `<div class="flex flex-col gap-2">
  <h1 class="text-xl font-semibold">Heading <DuBadge size="lg">New</DuBadge></h1>
  <h2 class="text-lg font-semibold">Section <DuBadge variant="secondary">Beta</DuBadge></h2>
</div>`,
      code: `<h1 class="text-xl font-semibold">
  Heading <DuBadge size="lg">New</DuBadge>
</h1>
<h2 class="text-lg font-semibold">
  Section <DuBadge variant="secondary">Beta</DuBadge>
</h2>`,
    },
  ],
} satisfies DocPageData
