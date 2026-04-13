import type { DocPageData } from '@/types/docs'

export default {
  title: 'Link',
  description: 'Link is a styled anchor element.',
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
      { class: 'link-hover', desc: 'Only shows underline on hover' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<a class="link link-primary">Click here</a>`,
      code: `<DuLink href="/docs" variant="primary">Click here</DuLink>`,
    },
    {
      title: 'Hover only underline',
      preview: `<a class="link link-hover link-secondary">Hover me</a>`,
      code: `<DuLink href="/" variant="secondary" :hoverOnly="true">Hover me</DuLink>`,
    },
    {
      title: 'Inline in text',
      preview: `<p class="text-sm">Read our <a class="link link-primary">documentation</a> to get started.</p>`,
      code: `<p>Read our <DuLink href="/docs" variant="primary">documentation</DuLink> to get started.</p>`,
    },
  ],
} satisfies DocPageData
