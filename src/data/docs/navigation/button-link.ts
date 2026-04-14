import type { DocPageData } from '@/types/docs'

export default {
  title: 'ButtonLink',
  description: 'ButtonLink renders as a button-styled `<a>` element. Pass `href` as an HTML attribute (fallthrough). It supports all the same style props as DuButton: `variant`, `size`, `outline`, `soft`, `ghost`, `link`, `wide`, `square`, `circle`, `block`, `active`, `dash`.',
  category: 'Navigation',
  sections: [
    {
      title: 'Basic',
      preview: `<a class="btn btn-primary" href="#">Go to docs</a>`,
      code: `<DuButtonLink href="/docs" variant="primary">Go to docs</DuButtonLink>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-2 justify-center">
  <a class="btn btn-primary" href="#">Primary</a>
  <a class="btn btn-secondary" href="#">Secondary</a>
  <a class="btn btn-outline btn-neutral" href="#">Neutral outline</a>
</div>`,
      code: `<DuButtonLink href="/" variant="primary">Primary</DuButtonLink>
<DuButtonLink href="/" variant="secondary">Secondary</DuButtonLink>
<DuButtonLink href="/" variant="neutral" outline>Neutral outline</DuButtonLink>`,
    },
    {
      title: 'Sizes',
      code: `<DuButtonLink href="/" variant="primary" size="sm">Small</DuButtonLink>
<DuButtonLink href="/" variant="primary">Medium</DuButtonLink>
<DuButtonLink href="/" variant="primary" size="lg">Large</DuButtonLink>`,
    },
    {
      title: 'Styles',
      code: `<DuButtonLink href="/" variant="primary" soft>Soft</DuButtonLink>
<DuButtonLink href="/" ghost>Ghost</DuButtonLink>
<DuButtonLink href="/" link>Link style</DuButtonLink>`,
    },
    {
      title: 'Full width',
      code: `<DuButtonLink href="/" variant="primary" block>Full width</DuButtonLink>`,
    },
  ],
} satisfies DocPageData
