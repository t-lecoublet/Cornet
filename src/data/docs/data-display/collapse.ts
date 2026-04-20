import type { DocPageData } from '@/types/docs'

export default {
  title: 'Collapse',
  description: 'Collapse is used to show or hide content with a smooth animation. It supports an items array (dynamic mode) or a default slot (manual mode). Unlike Accordion, collapse items use checkboxes — multiple can be open simultaneously.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/collapse/',
  classnames: {
    modifier: [
      { class: 'collapse-arrow', desc: 'Shows a chevron arrow indicator' },
      { class: 'collapse-plus', desc: 'Shows a plus/minus indicator' },
      { class: 'collapse-open', desc: 'Forces open state' },
      { class: 'collapse-close', desc: 'Forces closed state' },
    ],
  },
  sections: [
    {
      title: 'Dynamic items mode',
      description: 'Pass an `items` array to render collapses automatically. Each item has `title`, `content`, and optional `open` boolean.',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'What is Cornet?', content: 'A Vue 3 component library powered by DaisyUI 5.' },
      { title: 'Is it free?', content: 'Yes, open source and free.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'What is Cornet?', content: 'A Vue 3 component library powered by DaisyUI 5.' },
    { title: 'Is it free?', content: 'Yes, open source and free.' },
    { title: 'How do I install it?', content: 'Add it as a git submodule and run npm install.' },
  ]"
/>`,
    },
    {
      title: 'Item open by default',
      description: 'Set `open: true` on an item to have it expanded initially.',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'Open by default', content: 'This is visible on load.', open: true },
      { title: 'Closed', content: 'Click to expand.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'Open by default', content: 'This is visible on load.', open: true },
    { title: 'Closed', content: 'Click to expand.' },
  ]"
/>`,
    },
    {
      title: 'Plus indicator',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-plus"
    :items="[
      { title: 'Click to expand', content: 'Revealed content.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-plus"
  :items="[
    { title: 'Click to expand', content: 'Revealed content.' },
  ]"
/>`,
    },
    {
      title: 'Custom slot per item',
      description: 'Override any item\'s title or content with named slots (`#title-{index}`, `#content-{index}`).',
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'Custom title', content: 'Default content.', open: true },
      { title: 'Badge item', content: 'Special content.' },
    ]"
  >
    <template #title-1>
      <div class="flex items-center gap-2">
        <DuBadge variant="primary" size="sm">NEW</DuBadge>
        Badge item
      </div>
    </template>
    <template #content-1>
      <div class="flex flex-col gap-2">
        <p>Special content with custom rendering.</p>
        <DuButton variant="primary" size="sm">Action</DuButton>
      </div>
    </template>
  </DuCollapse>
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'Custom title', content: 'Default content.' },
    { title: 'Badge item', content: '' },
  ]"
>
  <template #title-1>
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">NEW</span>
      Badge item
    </div>
  </template>
  <template #content-1>
    <div class="flex flex-col gap-2">
      <p>Special content.</p>
      <DuButton variant="primary" size="sm">Action</DuButton>
    </div>
  </template>
</DuCollapse>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use the default slot to build collapse items manually with full HTML control.',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuCollapse>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" checked />
      <div class="collapse-title font-medium">Manual item 1 (open)</div>
      <div class="collapse-content">
        <p>Custom HTML content with full control.</p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" />
      <div class="collapse-title font-medium">Manual item 2</div>
      <div class="collapse-content">
        <p>Another custom collapse item.</p>
      </div>
    </div>
  </DuCollapse>
</div>`,
      code: `<DuCollapse>
  <div class="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="checkbox" checked />
    <div class="collapse-title font-medium">Manual item 1 (open)</div>
    <div class="collapse-content">
      <p>Custom HTML content.</p>
    </div>
  </div>
  <div class="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Manual item 2</div>
    <div class="collapse-content">
      <p>Another item.</p>
    </div>
  </div>
</DuCollapse>`,
    },
  ],
} satisfies DocPageData
