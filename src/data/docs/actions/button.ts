import type { DocPageData } from '@/types/docs'

export default {
  title: 'Button',
  description: 'Buttons allow users to take actions and make choices with a single tap.',
  category: 'Actions',
  source: 'https://daisyui.com/components/button/',
  classnames: {
    component: [
      { class: 'btn', desc: 'Base button class' },
    ],
    style: [
      { class: 'outline', desc: 'Transparent background with colored border' },
      { class: 'soft', desc: 'Low-contrast soft style' },
      { class: 'dash', desc: 'Dashed border style' },
      { class: 'ghost', desc: 'No background, inherits text color' },
      { class: 'link', desc: 'Looks like a hyperlink' },
      { class: 'wide', desc: 'Extra horizontal padding' },
      { class: 'block', desc: 'Full width button' },
      { class: 'circle', desc: 'Circular button (equal width/height)' },
      { class: 'square', desc: 'Square button (equal width/height)' },
    ],
    color: [
      { class: 'primary', desc: 'Primary color' },
      { class: 'secondary', desc: 'Secondary color' },
      { class: 'accent', desc: 'Accent color' },
      { class: 'neutral', desc: 'Neutral color' },
      { class: 'info', desc: 'Info color' },
      { class: 'success', desc: 'Success color' },
      { class: 'warning', desc: 'Warning color' },
      { class: 'error', desc: 'Error color' },
    ],
    size: [
      { class: 'xs', desc: 'Extra small' },
      { class: 'sm', desc: 'Small' },
      { class: 'md', desc: 'Medium', default: true },
      { class: 'lg', desc: 'Large' },
      { class: 'xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: '<button class="btn">Button</button>',
      code: `<DuButton>Button</DuButton>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
  <button class="btn btn-neutral">Neutral</button>
  <button class="btn btn-info">Info</button>
  <button class="btn btn-success">Success</button>
  <button class="btn btn-warning">Warning</button>
  <button class="btn btn-error">Error</button>
</div>`,
      code: `<DuButton variant="primary">Primary</DuButton>
<DuButton variant="secondary">Secondary</DuButton>
<DuButton variant="accent">Accent</DuButton>
<DuButton variant="neutral">Neutral</DuButton>
<DuButton variant="info">Info</DuButton>
<DuButton variant="success">Success</DuButton>
<DuButton variant="warning">Warning</DuButton>
<DuButton variant="error">Error</DuButton>`,
    },
    {
      title: 'Outline style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <button class="btn btn-outline btn-primary">Primary</button>
  <button class="btn btn-outline btn-secondary">Secondary</button>
  <button class="btn btn-outline btn-accent">Accent</button>
</div>`,
      code: `<DuButton variant="primary" outline>Primary</DuButton>
<DuButton variant="secondary" outline>Secondary</DuButton>
<DuButton variant="accent" outline>Accent</DuButton>`,
    },
    {
      title: 'Soft style',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <button class="btn btn-soft btn-primary">Primary</button>
  <button class="btn btn-soft btn-secondary">Secondary</button>
  <button class="btn btn-soft btn-error">Error</button>
</div>`,
      code: `<DuButton variant="primary" soft>Primary</DuButton>
<DuButton variant="secondary" soft>Secondary</DuButton>
<DuButton variant="error" soft>Error</DuButton>`,
    },
    {
      title: 'Ghost & Link',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-link">Link</button>
</div>`,
      code: `<DuButton ghost>Ghost</DuButton>
<DuButton link>Link</DuButton>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <button class="btn btn-xs">XSmall</button>
  <button class="btn btn-sm">Small</button>
  <button class="btn btn-md">Medium</button>
  <button class="btn btn-lg">Large</button>
  <button class="btn btn-xl">XLarge</button>
</div>`,
      code: `<DuButton size="xs">XSmall</DuButton>
<DuButton size="sm">Small</DuButton>
<DuButton size="md">Medium</DuButton>
<DuButton size="lg">Large</DuButton>
<DuButton size="xl">XLarge</DuButton>`,
    },
    {
      title: 'Circle & Square',
      preview: `<div class="flex flex-wrap items-center gap-2 justify-center">
  <button class="btn btn-circle btn-primary">✕</button>
  <button class="btn btn-square btn-neutral">★</button>
</div>`,
      code: `<DuButton circle variant="primary">✕</DuButton>
<DuButton square variant="neutral">★</DuButton>`,
    },
    {
      title: 'Block (full width)',
      preview: `<button class="btn btn-primary btn-block">Block button</button>`,
      code: `<DuButton variant="primary" block>Block button</DuButton>`,
    },
    {
      title: 'Disabled',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <button class="btn" disabled>Disabled</button>
  <button class="btn btn-primary" disabled>Disabled</button>
</div>`,
      code: `<DuButton disabled>Disabled</DuButton>
<DuButton variant="primary" disabled>Disabled</DuButton>`,
    },
    {
      title: 'As a link (as prop)',
      description: 'Use the `as` prop to render the button as an anchor or RouterLink element.',
      code: `<!-- Render as <a> tag -->
<DuButton as="a" href="/docs" variant="primary">Go to docs</DuButton>

<!-- Render as RouterLink (requires vue-router) -->
<DuButton as="RouterLink" to="/docs" variant="primary">Go to docs</DuButton>`,
    },
    {
      title: 'Loading state',
      description: 'Disable the button and add a loading spinner during async operations.',
      preview: `<button class="btn btn-primary"><span class="loading loading-spinner loading-sm"></span> Loading...</button>`,
      code: `<DuButton variant="primary" :disabled="loading">
  <span v-if="loading" class="loading loading-spinner loading-sm" />
  {{ loading ? 'Loading...' : 'Submit' }}
</DuButton>`,
    },
  ],
} satisfies DocPageData
