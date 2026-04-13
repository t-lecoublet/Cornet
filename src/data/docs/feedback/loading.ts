import type { DocPageData } from '@/types/docs'

export default {
  title: 'Loading',
  description: 'Loading spinner or dots to indicate that content is loading.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/loading/',
  classnames: {
    animation: [
      { class: 'loading-spinner', desc: 'Spinning circle', default: true },
      { class: 'loading-dots', desc: 'Three animated dots' },
      { class: 'loading-ring', desc: 'Animated ring' },
      { class: 'loading-ball', desc: 'Bouncing ball' },
      { class: 'loading-bars', desc: 'Animated bars' },
      { class: 'loading-infinity', desc: 'Infinity loop' },
    ],
    size: [
      { class: 'loading-xs', desc: 'Extra small' },
      { class: 'loading-sm', desc: 'Small' },
      { class: 'loading-md', desc: 'Medium', default: true },
      { class: 'loading-lg', desc: 'Large' },
      { class: 'loading-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Spinner',
      preview: `<span class="loading loading-spinner loading-lg text-primary"></span>`,
      code: `<DuLoading animation="spinner" size="lg" variant="primary" />`,
    },
    {
      title: 'All animations',
      preview: `<div class="flex flex-wrap gap-4 items-center justify-center">
  <span class="loading loading-spinner text-primary"></span>
  <span class="loading loading-dots text-secondary"></span>
  <span class="loading loading-ring text-accent"></span>
  <span class="loading loading-ball text-info"></span>
  <span class="loading loading-bars text-success"></span>
  <span class="loading loading-infinity text-warning"></span>
</div>`,
      code: `<DuLoading animation="spinner" variant="primary" />
<DuLoading animation="dots" variant="secondary" />
<DuLoading animation="ring" variant="accent" />
<DuLoading animation="ball" variant="info" />
<DuLoading animation="bars" variant="success" />
<DuLoading animation="infinity" variant="warning" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-4">
  <span class="loading loading-spinner loading-xs text-primary"></span>
  <span class="loading loading-spinner loading-sm text-primary"></span>
  <span class="loading loading-spinner text-primary"></span>
  <span class="loading loading-spinner loading-lg text-primary"></span>
  <span class="loading loading-spinner loading-xl text-primary"></span>
</div>`,
      code: `<DuLoading animation="spinner" size="xs" variant="primary" />
<DuLoading animation="spinner" size="sm" variant="primary" />
<DuLoading animation="spinner" variant="primary" />
<DuLoading animation="spinner" size="lg" variant="primary" />
<DuLoading animation="spinner" size="xl" variant="primary" />`,
    },
  ],
} satisfies DocPageData
