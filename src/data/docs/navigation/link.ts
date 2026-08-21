import type { DocPageData } from '@/types/docs'

export default {
  title: 'Link',
  description: 'Link renders a styled `<a>` element. The `href` attribute is passed through via Vue\'s attribute fallthrough (not a declared prop). Use `onlyUnderlineOnHover` to hide the underline until hover.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/link/',
  props: [
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'onlyUnderlineOnHover',
      description: 'Only underline the link while hovered',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'ghost',
      description: 'Ghost style — inherits the surrounding text color',
      type: 'boolean',
      default: 'false',
    },
  ],
  classnames: {
    component: [
      { class: 'link', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'link-primary', desc: 'variant="primary"' },
      { class: 'link-secondary', desc: 'variant="secondary"' },
      { class: 'link-accent', desc: 'variant="accent"' },
      { class: 'link-neutral', desc: 'variant="neutral"' },
      { class: 'link-info', desc: 'variant="info"' },
      { class: 'link-success', desc: 'variant="success"' },
      { class: 'link-warning', desc: 'variant="warning"' },
      { class: 'link-error', desc: 'variant="error"' },
    ],
    modifier: [
      { class: 'link-hover', desc: 'Underline only on hover — onlyUnderlineOnHover' },
      { class: 'link-ghost', desc: 'Inherit the surrounding text color — ghost' },
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
