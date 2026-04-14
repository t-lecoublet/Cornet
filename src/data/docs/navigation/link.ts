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
      preview: `<DuLink href="#" variant="primary">Click here</DuLink>`,
      code: `<DuLink href="/docs" variant="primary">Click here</DuLink>`,
    },
    {
      title: 'Hover only underline',
      description: 'The underline only appears on hover with `onlyUnderlineOnHover`.',
      preview: `<DuLink href="#" variant="secondary" :onlyUnderlineOnHover="true">Hover me</DuLink>`,
      code: `<DuLink href="/" variant="secondary" :onlyUnderlineOnHover="true">Hover me</DuLink>`,
    },
    {
      title: 'Ghost (no color)',
      preview: `<DuLink href="#">Ghost link</DuLink>`,
      code: `<DuLink href="/" ghost>Ghost link</DuLink>`,
    },
    {
      title: 'Inline in text',
      preview: `<p class="text-sm">Read our <DuLink href="#" variant="primary">documentation</DuLink> to get started.</p>`,
      code: `<p>Read our <DuLink href="/docs" variant="primary">documentation</DuLink> to get started.</p>`,
    },
    {
      title: 'All variants',
      preview: `<div class="flex flex-wrap gap-3">
  <DuLink href="#" variant="primary">Primary</DuLink>
  <DuLink href="#" variant="secondary">Secondary</DuLink>
  <DuLink href="#" variant="accent">Accent</DuLink>
  <DuLink href="#" variant="neutral">Neutral</DuLink>
  <DuLink href="#" variant="success">Success</DuLink>
  <DuLink href="#" variant="error">Error</DuLink>
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
