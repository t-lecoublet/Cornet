import type { DocPageData } from '@/types/docs'

export default {
  title: 'ButtonLink',
  description: 'ButtonLink renders as a button-styled `<a>` element. Pass `href` as an HTML attribute (fallthrough). It supports all the same style props as DuButton: `variant`, `size`, `outline`, `soft`, `ghost`, `link`, `wide`, `square`, `circle`, `block`, `active`, `dash`.',
  category: 'Navigation',
  sections: [
    {
      title: 'Basic',
      preview: `<DuButtonLink href="#" variant="primary">Go to docs</DuButtonLink>`,
      code: `<DuButtonLink href="/docs" variant="primary">Go to docs</DuButtonLink>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButtonLink href="#" variant="primary">Primary</DuButtonLink>
  <DuButtonLink href="#" variant="secondary">Secondary</DuButtonLink>
  <DuButtonLink href="#" variant="neutral" outline>Neutral outline</DuButtonLink>
</div>`,
      code: `<DuButtonLink href="/" variant="primary">Primary</DuButtonLink>
<DuButtonLink href="/" variant="secondary">Secondary</DuButtonLink>
<DuButtonLink href="/" variant="neutral" outline>Neutral outline</DuButtonLink>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap gap-2 items-center justify-center">
  <DuButtonLink href="#" variant="primary" size="sm">Small</DuButtonLink>
  <DuButtonLink href="#" variant="primary">Medium</DuButtonLink>
  <DuButtonLink href="#" variant="primary" size="lg">Large</DuButtonLink>
</div>`,
      code: `<DuButtonLink href="/" variant="primary" size="sm">Small</DuButtonLink>
<DuButtonLink href="/" variant="primary">Medium</DuButtonLink>
<DuButtonLink href="/" variant="primary" size="lg">Large</DuButtonLink>`,
    },
    {
      title: 'Styles',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <DuButtonLink href="#" variant="primary" soft>Soft</DuButtonLink>
  <DuButtonLink href="#" ghost>Ghost</DuButtonLink>
  <DuButtonLink href="#" link>Link style</DuButtonLink>
</div>`,
      code: `<DuButtonLink href="/" variant="primary" soft>Soft</DuButtonLink>
<DuButtonLink href="/" ghost>Ghost</DuButtonLink>
<DuButtonLink href="/" link>Link style</DuButtonLink>`,
    },
    {
      title: 'Full width',
      preview: `<DuButtonLink href="#" variant="primary" block>Full width</DuButtonLink>`,
      code: `<DuButtonLink href="/" variant="primary" block>Full width</DuButtonLink>`,
    },
  ],
} satisfies DocPageData
