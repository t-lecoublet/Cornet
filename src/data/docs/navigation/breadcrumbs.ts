import type { DocPageData } from '@/types/docs'

export default {
  title: 'Breadcrumbs',
  description: 'Breadcrumbs show the current page location within a hierarchical navigation structure.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/breadcrumbs/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuBreadcrumbs
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/docs' },
    { label: 'Breadcrumbs' },
  ]"
/>`,
      code: `<DuBreadcrumbs
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/docs' },
    { label: 'Breadcrumbs' },
  ]"
/>`,
    },
    {
      title: 'With icons',
      preview: `<DuBreadcrumbs
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Breadcrumbs' },
  ]"
/>`,
      code: `<DuBreadcrumbs
  :items="[
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'Docs', href: '/docs', icon: BookIcon },
    { label: 'Breadcrumbs' },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
