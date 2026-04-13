import type { DocPageData } from '@/types/docs'

export default {
  title: 'Progress',
  description: 'Progress bar displays how much of a task has been completed.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/progress/',
  classnames: {
    color: [
      { class: 'progress-primary', desc: 'Primary color' },
      { class: 'progress-secondary', desc: 'Secondary color' },
      { class: 'progress-accent', desc: 'Accent color' },
      { class: 'progress-success', desc: 'Success color' },
      { class: 'progress-warning', desc: 'Warning color' },
      { class: 'progress-error', desc: 'Error color' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<progress class="progress progress-primary w-72" value="70" max="100"></progress>`,
      code: `<DuProgress :value="70" :max="100" variant="primary" />`,
    },
    {
      title: 'Indeterminate (no value)',
      preview: `<progress class="progress progress-secondary w-72"></progress>`,
      code: `<DuProgress variant="secondary" />`,
    },
    {
      title: 'All variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <progress class="progress progress-primary" value="30" max="100"></progress>
  <progress class="progress progress-secondary" value="50" max="100"></progress>
  <progress class="progress progress-accent" value="70" max="100"></progress>
  <progress class="progress progress-success" value="90" max="100"></progress>
  <progress class="progress progress-error" value="20" max="100"></progress>
</div>`,
      code: `<DuProgress :value="30" variant="primary" />
<DuProgress :value="50" variant="secondary" />
<DuProgress :value="70" variant="accent" />
<DuProgress :value="90" variant="success" />
<DuProgress :value="20" variant="error" />`,
    },
  ],
} satisfies DocPageData
