import type { DocPageData } from '@/types/docs'

export default {
  title: 'Collapse',
  description: 'Collapse is used to show or hide content with a smooth animation.',
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
      title: 'Basic',
      preview: `<div class="collapse collapse-arrow border border-base-300 bg-base-100 w-72">
  <input type="checkbox" />
  <div class="collapse-title font-semibold">Click to toggle</div>
  <div class="collapse-content text-sm">Hidden content here.</div>
</div>`,
      code: `<DuCollapse title="Click to toggle" indicator="arrow">
  Hidden content here.
</DuCollapse>`,
    },
    {
      title: 'Plus indicator',
      code: `<DuCollapse title="FAQ question" indicator="plus">
  Answer to the FAQ question.
</DuCollapse>`,
    },
    {
      title: 'Controlled',
      code: `<DuCollapse :open="isOpen" title="Controlled panel">
  This panel is controlled via :open prop.
</DuCollapse>`,
    },
    {
      title: 'With custom title slot',
      code: `<DuCollapse indicator="arrow">
  <template #title>
    <div class="flex items-center gap-2">
      <span class="badge badge-primary">NEW</span>
      Custom title
    </div>
  </template>
  Content here.
</DuCollapse>`,
    },
  ],
} satisfies DocPageData
