import type { DocPageData } from '@/types/docs'

export default {
  title: 'Progress',
  description: 'Progress bar displays how much of a task has been completed.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/progress/',
  props: [
    {
      title: 'value',
      description: 'Current progress value',
      type: 'number',
      default: '0',
    },
    {
      title: 'max',
      description: 'Value that represents 100%',
      type: 'number',
      default: '100',
    },
    {
      title: 'indeterminate',
      description: 'Render the indeterminate (unknown progress) animation',
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
  ],
  classnames: {
    component: [
      { class: 'progress', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'progress-primary', desc: 'variant="primary"' },
      { class: 'progress-secondary', desc: 'variant="secondary"' },
      { class: 'progress-accent', desc: 'variant="accent"' },
      { class: 'progress-neutral', desc: 'variant="neutral"' },
      { class: 'progress-info', desc: 'variant="info"' },
      { class: 'progress-success', desc: 'variant="success"' },
      { class: 'progress-warning', desc: 'variant="warning"' },
      { class: 'progress-error', desc: 'variant="error"' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="w-64">
  <DuProgress :value="70" :max="100" variant="primary" />
</div>`,
      code: `<DuProgress :value="70" :max="100" variant="primary" />`,
    },
    {
      title: 'Indeterminate (no value)',
      preview: `<div class="w-64">
  <DuProgress variant="secondary" />
</div>`,
      code: `<DuProgress variant="secondary" />`,
    },
    {
      title: 'All variants',
      preview: `<div class="flex flex-col gap-2 w-64">
  <DuProgress :value="30" variant="primary" />
  <DuProgress :value="50" variant="secondary" />
  <DuProgress :value="70" variant="accent" />
  <DuProgress :value="90" variant="success" />
  <DuProgress :value="20" variant="error" />
</div>`,
      code: `<DuProgress :value="30" variant="primary" />
<DuProgress :value="50" variant="secondary" />
<DuProgress :value="70" variant="accent" />
<DuProgress :value="90" variant="success" />
<DuProgress :value="20" variant="error" />`,
    },
  ],
} satisfies DocPageData
