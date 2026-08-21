import type { DocPageData } from '@/types/docs'

export default {
  title: 'Loading',
  description: 'Loading spinner or dots to indicate that content is loading.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/loading/',
  props: [
    {
      title: 'animation',
      description: 'Which loading animation to render',
      type: 'DuLoadingAnimation',
      default: '"spinner"',
      options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
    },
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
  ],
  classnames: {
    component: [
      { class: 'loading', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'text-primary', desc: 'variant="primary" — the color goes through text-*, not loading-*' },
      { class: 'text-secondary', desc: 'variant="secondary"' },
      { class: 'text-accent', desc: 'variant="accent"' },
      { class: 'text-neutral', desc: 'variant="neutral"' },
      { class: 'text-info', desc: 'variant="info"' },
      { class: 'text-success', desc: 'variant="success"' },
      { class: 'text-warning', desc: 'variant="warning"' },
      { class: 'text-error', desc: 'variant="error"' },
    ],
    size: [
      { class: 'loading-xs', desc: 'size="xs"' },
      { class: 'loading-sm', desc: 'size="sm"' },
      { class: 'loading-md', desc: 'size="md"' },
      { class: 'loading-lg', desc: 'size="lg"' },
      { class: 'loading-xl', desc: 'size="xl"' },
    ],
    animation: [
      { class: 'loading-spinner', desc: 'animation="spinner" (default)' },
      { class: 'loading-dots', desc: 'animation="dots"' },
      { class: 'loading-ring', desc: 'animation="ring"' },
      { class: 'loading-ball', desc: 'animation="ball"' },
      { class: 'loading-bars', desc: 'animation="bars"' },
      { class: 'loading-infinity', desc: 'animation="infinity"' },
    ],
  },
  sections: [
    {
      title: 'Spinner',
      preview: `<DuLoading animation="spinner" size="lg" variant="primary" />`,
      code: `<DuLoading animation="spinner" size="lg" variant="primary" />`,
    },
    {
      title: 'All animations',
      preview: `<div class="flex flex-wrap gap-4 items-center justify-center">
  <DuLoading animation="spinner" variant="primary" />
  <DuLoading animation="dots" variant="secondary" />
  <DuLoading animation="ring" variant="accent" />
  <DuLoading animation="ball" variant="info" />
  <DuLoading animation="bars" variant="success" />
  <DuLoading animation="infinity" variant="warning" />
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
  <DuLoading animation="spinner" size="xs" variant="primary" />
  <DuLoading animation="spinner" size="sm" variant="primary" />
  <DuLoading animation="spinner" variant="primary" />
  <DuLoading animation="spinner" size="lg" variant="primary" />
  <DuLoading animation="spinner" size="xl" variant="primary" />
</div>`,
      code: `<DuLoading animation="spinner" size="xs" variant="primary" />
<DuLoading animation="spinner" size="sm" variant="primary" />
<DuLoading animation="spinner" variant="primary" />
<DuLoading animation="spinner" size="lg" variant="primary" />
<DuLoading animation="spinner" size="xl" variant="primary" />`,
    },
  ],
} satisfies DocPageData
