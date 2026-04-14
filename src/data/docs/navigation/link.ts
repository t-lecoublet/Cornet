import type { DocPageData } from '@/types/docs'

export default {
  title: 'Link',
  description: 'Link renders a styled `<a>` element. The `href` attribute is passed through via Vue\'s attribute fallthrough (not a declared prop). Use `onlyUnderlineOnHover` to hide the underline until hover.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/link/',
  classnames: {
    color: [
      { class: 'link-primary', desc: 'Primary color' },
      { class: 'link-secondary', desc: 'Secondary color' },
      { class: 'link-accent', desc: 'Accent color' },
      { class: 'link-neutral', desc: 'Neutral color' },
      { class: 'link-success', desc: 'Success color' },
      { class: 'link-error', desc: 'Error color' },
    ],
    modifier: [
      { class: 'link-hover', desc: 'Only shows underline on hover (prop: onlyUnderlineOnHover)' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<a class="link link-primary" href="#">Click here</a>`,
      code: `<DuLink href="/docs" variant="primary">Click here</DuLink>`,
    },
    {
      title: 'Hover only underline',
      description: 'The underline only appears on hover with `onlyUnderlineOnHover`.',
      preview: `<a class="link link-hover link-secondary" href="#">Hover me</a>`,
      code: `<DuLink href="/" variant="secondary" :onlyUnderlineOnHover="true">Hover me</DuLink>`,
    },
    {
      title: 'Ghost (no color)',
      code: `<DuLink href="/" ghost>Ghost link</DuLink>`,
    },
    {
      title: 'Inline in text',
      preview: `<p class="text-sm">Read our <a class="link link-primary" href="#">documentation</a> to get started.</p>`,
      code: `<p>Read our <DuLink href="/docs" variant="primary">documentation</DuLink> to get started.</p>`,
    },
    {
      title: 'All variants',
      preview: `<div class="flex flex-wrap gap-3">
  <a class="link link-primary" href="#">Primary</a>
  <a class="link link-secondary" href="#">Secondary</a>
  <a class="link link-accent" href="#">Accent</a>
  <a class="link link-neutral" href="#">Neutral</a>
  <a class="link link-success" href="#">Success</a>
  <a class="link link-error" href="#">Error</a>
</div>`,
      code: `<DuLink href="/" variant="primary">Primary</DuLink>
<DuLink href="/" variant="secondary">Secondary</DuLink>
<DuLink href="/" variant="accent">Accent</DuLink>
<DuLink href="/" variant="neutral">Neutral</DuLink>
<DuLink href="/" variant="success">Success</DuLink>
<DuLink href="/" variant="error">Error</DuLink>`,
    },
  ],
} satisfies DocPageData
