import type { DocPageData } from '@/types/docs'

export default {
  title: 'Badge',
  description: 'Badges are used to inform the user of the status of specific data.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/badge/',
  props: [
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'outline',
      description: 'Outline style — transparent with a colored border',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'soft',
      description: 'Soft style — low-contrast tinted background',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'dash',
      description: 'Dashed border style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'ghost',
      description: 'Ghost style — no background',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'icon',
      description: 'Show the built-in status icon matching the variant',
      type: 'boolean',
      default: 'false',
    },
  ],
  classnames: {
    component: [
      { class: 'badge', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    style: [
      { class: 'badge-outline', desc: 'Transparent with a border — outline' },
      { class: 'badge-soft', desc: 'Low-contrast tinted background — soft' },
      { class: 'badge-dash', desc: 'Dashed border — dash' },
      { class: 'badge-ghost', desc: 'No background — ghost' },
    ],
    color: [
      { class: 'badge-primary', desc: 'variant="primary"' },
      { class: 'badge-secondary', desc: 'variant="secondary"' },
      { class: 'badge-accent', desc: 'variant="accent"' },
      { class: 'badge-neutral', desc: 'variant="neutral"' },
      { class: 'badge-info', desc: 'variant="info"' },
      { class: 'badge-success', desc: 'variant="success"' },
      { class: 'badge-warning', desc: 'variant="warning"' },
      { class: 'badge-error', desc: 'variant="error"' },
    ],
    size: [
      { class: 'badge-xs', desc: 'size="xs"' },
      { class: 'badge-sm', desc: 'size="sm"' },
      { class: 'badge-md', desc: 'size="md"' },
      { class: 'badge-lg', desc: 'size="lg"' },
      { class: 'badge-xl', desc: 'size="xl"' },
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
