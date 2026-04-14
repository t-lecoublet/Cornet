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
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'Custom title', content: 'Default content.' },
      { title: 'Badge item', content: 'Special content.' },
    ]"
  >
    <template #title-1>
      <div class="flex items-center gap-2">
        <DuBadge variant="primary" size="sm">NEW</DuBadge>
        Badge item
      </div>
    </template>
  </DuCollapse>
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'Custom title', content: 'Default content.' },
    { title: 'Badge item', content: 'Special content.' },
  ]"
>
  <template #title-1>
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">NEW</span>
      Badge item
    </div>
  </template>
</DuCollapse>`,
    },
  ],
} satisfies DocPageData
