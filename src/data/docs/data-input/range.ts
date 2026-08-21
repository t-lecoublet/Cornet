import type { DocPageData } from '@/types/docs'

export default {
  title: 'Range',
  description: 'Range input allows users to select a value within a numeric range.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/range/',
  props: [
    {
      title: 'modelValue',
      description: 'Current value (use with `v-model`)',
      type: 'number',
      default: '4',
    },
    {
      title: 'min',
      description: 'Minimum value',
      type: 'number',
      default: '0',
    },
    {
      title: 'max',
      description: 'Maximum value',
      type: 'number',
      default: '10',
    },
    {
      title: 'step',
      description: 'Increment between values',
      type: 'number',
      default: '1',
    },
    {
      title: 'disabled',
      description: 'Disable the range',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  ],
  classnames: {
    component: [
      { class: 'range', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'range-primary', desc: 'Primary color' },
      { class: 'range-secondary', desc: 'Secondary color' },
      { class: 'range-accent', desc: 'Accent color' },
      { class: 'range-neutral', desc: 'Neutral color' },
      { class: 'range-info', desc: 'Info color' },
      { class: 'range-success', desc: 'Success color' },
      { class: 'range-warning', desc: 'Warning color' },
      { class: 'range-error', desc: 'Error color' },
    ],
    size: [
      { class: 'range-xs', desc: 'Extra small' },
      { class: 'range-sm', desc: 'Small' },
      { class: 'range-md', desc: 'Medium' },
      { class: 'range-lg', desc: 'Large' },
      { class: 'range-xl', desc: 'Extra large' },
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
