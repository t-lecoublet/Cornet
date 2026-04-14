import type { DocPageData } from '@/types/docs'

export default {
  title: 'Range',
  description: 'Range input allows users to select a value within a numeric range.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/range/',
  classnames: {
    color: [
      { class: 'range-primary', desc: 'Primary color' },
      { class: 'range-secondary', desc: 'Secondary color' },
      { class: 'range-accent', desc: 'Accent color' },
      { class: 'range-success', desc: 'Success color' },
      { class: 'range-warning', desc: 'Warning color' },
      { class: 'range-error', desc: 'Error color' },
    ],
    size: [
      { class: 'range-xs', desc: 'Extra small' },
      { class: 'range-sm', desc: 'Small' },
      { class: 'range-md', desc: 'Medium', default: true },
      { class: 'range-lg', desc: 'Large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="w-64">
  <DuRange :modelValue="40" :min="0" :max="100" variant="primary" />
</div>`,
      code: `<DuRange v-model="value" :min="0" :max="100" variant="primary" />`,
    },
    {
      title: 'With steps',
      preview: `<div class="w-64">
  <DuRange :modelValue="50" :min="0" :max="100" :step="25" variant="secondary" />
</div>`,
      code: `<DuRange v-model="value" :min="0" :max="100" :step="25" variant="secondary" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-3 w-64">
  <DuRange :modelValue="50" variant="primary" size="xs" />
  <DuRange :modelValue="50" variant="primary" size="sm" />
  <DuRange :modelValue="50" variant="primary" />
  <DuRange :modelValue="50" variant="primary" size="lg" />
</div>`,
      code: `<DuRange v-model="val" variant="primary" size="xs" />
<DuRange v-model="val" variant="primary" size="sm" />
<DuRange v-model="val" variant="primary" />
<DuRange v-model="val" variant="primary" size="lg" />`,
    },
  ],
} satisfies DocPageData
