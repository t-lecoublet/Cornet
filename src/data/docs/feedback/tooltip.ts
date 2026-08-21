import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tooltip',
  description: 'Tooltip displays a small label when hovering over an element. The tooltip text is set via the `dataTip` prop. Use `position` to control placement and `open` to force it always visible.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/tooltip/',
  props: [
    {
      title: 'dataTip',
      description: 'Text content of the tooltip',
      type: 'string',
    },
    {
      title: 'position',
      description: 'Position of the tooltip relative to trigger',
      type: 'string',
      default: '"top"',
      options: ['top', 'bottom', 'left', 'right'],
    },
    {
      title: 'variant',
      description: 'Color variant for the tooltip',
      type: 'string',
      default: '"default"',
      options: ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'open',
      description: 'Force tooltip to always be visible',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'responsive',
      description: 'Enable responsive behavior (tooltip only on large screens)',
      type: 'boolean',
      default: 'false',
    },
  ],
  slots: [
    {
      title: 'Slot #content',
      description: 'Custom rich content for the tooltip instead of plain text',
      preview: `<DuTooltip :open="true">
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
      code: `<DuTooltip>
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
  ],
  classnames: {
    component: [
      { class: 'tooltip', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
      { class: 'tooltip-content', desc: 'Wrapper for the content slot, when used instead of the tip prop.' },
      { class: 'lg:tooltip', desc: 'Only show the tooltip from lg up — responsive' },
    ],
    color: [
      { class: 'tooltip-primary', desc: 'variant="primary"' },
      { class: 'tooltip-secondary', desc: 'variant="secondary"' },
      { class: 'tooltip-accent', desc: 'variant="accent"' },
      { class: 'tooltip-neutral', desc: 'variant="neutral"' },
      { class: 'tooltip-info', desc: 'variant="info"' },
      { class: 'tooltip-success', desc: 'variant="success"' },
      { class: 'tooltip-warning', desc: 'variant="warning"' },
      { class: 'tooltip-error', desc: 'variant="error"' },
    ],
    modifier: [
      { class: 'tooltip-open', desc: 'Force the tooltip visible — open' },
    ],
    placement: [
      { class: 'tooltip-top', desc: 'position="top" (default)' },
      { class: 'tooltip-bottom', desc: 'position="bottom"' },
      { class: 'tooltip-left', desc: 'position="left"' },
      { class: 'tooltip-right', desc: 'position="right"' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuTooltip dataTip="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
      code: `<DuTooltip dataTip="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Positions',
      preview: `<div class="flex gap-4 flex-wrap justify-center py-4">
  <DuTooltip dataTip="Top" position="top"><DuButton size="sm">Top</DuButton></DuTooltip>
  <DuTooltip dataTip="Bottom" position="bottom"><DuButton size="sm">Bottom</DuButton></DuTooltip>
  <DuTooltip dataTip="Left" position="left"><DuButton size="sm">Left</DuButton></DuTooltip>
  <DuTooltip dataTip="Right" position="right"><DuButton size="sm">Right</DuButton></DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Top" position="top">
  <DuButton size="sm">Top</DuButton>
</DuTooltip>

<DuTooltip dataTip="Bottom" position="bottom">
  <DuButton size="sm">Bottom</DuButton>
</DuTooltip>

<DuTooltip dataTip="Left" position="left">
  <DuButton size="sm">Left</DuButton>
</DuTooltip>

<DuTooltip dataTip="Right" position="right">
  <DuButton size="sm">Right</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex gap-4 flex-wrap justify-center py-4">
  <DuTooltip dataTip="Primary" variant="primary">
    <DuButton size="sm" variant="primary">Primary</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Error" variant="error">
    <DuButton size="sm" variant="error">Error</DuButton>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Primary" variant="primary">
  <DuButton size="sm" variant="primary">Primary</DuButton>
</DuTooltip>
<DuTooltip dataTip="Error" variant="error">
  <DuButton size="sm" variant="error">Error</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Always visible',
      preview: `<DuTooltip dataTip="Always visible" :open="true">
  <DuButton>Pinned tooltip</DuButton>
</DuTooltip>`,
      code: `<DuTooltip dataTip="Always visible" :open="true">
  <DuButton>Pinned tooltip</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Custom content slot',
      description: 'Use the `#content` slot for rich tooltip content instead of a plain string. The default slot wraps the trigger element.',
      links: [
        { label: 'Vue named slots docs', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
      ],
      preview: `<DuTooltip :open="true">
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
      code: `<DuTooltip>
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
    {
      title: 'On any element',
      description: 'Wrap any element inside DuTooltip — it works on icons, badges, or text.',
      preview: `<div class="flex items-center gap-4">
  <DuTooltip dataTip="User profile">
    <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
  </DuTooltip>
  <DuTooltip dataTip="3 unread" variant="info">
    <DuBadge variant="info">3</DuBadge>
  </DuTooltip>
  <DuTooltip dataTip="Keyboard shortcut: ⌘K" position="right">
    <DuKbd>⌘K</DuKbd>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="User profile">
  <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
</DuTooltip>

<DuTooltip dataTip="Keyboard shortcut: ⌘K" position="right">
  <DuKbd>⌘K</DuKbd>
</DuTooltip>`,
    },
  ],
} satisfies DocPageData
