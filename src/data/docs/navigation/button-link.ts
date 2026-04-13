import type { DocPageData } from '@/types/docs'

export default {
  title: 'ButtonLink',
  description: 'ButtonLink is a button-styled RouterLink for navigation.',
  category: 'Navigation',
  sections: [
    {
      title: 'Basic',
      code: `<DuButtonLink to="/docs" variant="primary">Go to docs</DuButtonLink>`,
    },
    {
      title: 'All variants',
      code: `<DuButtonLink to="/" variant="primary">Primary</DuButtonLink>
<DuButtonLink to="/" variant="secondary">Secondary</DuButtonLink>
<DuButtonLink to="/" variant="neutral" outline>Neutral outline</DuButtonLink>`,
    },
    {
      title: 'With size',
      code: `<DuButtonLink to="/" variant="primary" size="sm">Small</DuButtonLink>
<DuButtonLink to="/" variant="primary" size="lg">Large</DuButtonLink>`,
    },
  ],
} satisfies DocPageData
