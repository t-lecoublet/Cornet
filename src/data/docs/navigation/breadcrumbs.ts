import type { DocPageData } from '@/types/docs'

export default {
  title: 'Breadcrumbs',
  description: 'Breadcrumbs show the current page location within a hierarchical navigation structure.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/breadcrumbs/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Components</a></li>
    <li>Breadcrumbs</li>
  </ul>
</div>`,
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
