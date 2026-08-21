import type { DocPageData } from '@/types/docs'

export default {
  title: 'Breadcrumbs',
  description: 'Breadcrumbs show the current page location within a hierarchical navigation structure.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/breadcrumbs/',
  props: [
    {
      title: 'items',
      description: 'Array of breadcrumb items with label, href and icon',
      type: 'DuBreadcrumbItem[]',
      required: true,
    },
    {
      title: 'separator',
      description: 'Character rendered between items',
      type: 'string',
    },
    {
      title: 'as',
      description: 'Element or component each linked item renders as (e.g. `RouterLink`)',
      type: 'string | Component',
      default: '"a"',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the breadcrumb navigation landmark',
      type: 'string',
      default: '"Breadcrumb"',
    },
  ],
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
      links: [
        { label: 'Heroicons', href: 'https://heroicons.com/' },
      ],
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
    {
      title: 'Accessibility',
      description: 'The root element is a `<nav>` landmark and the last item carries `aria-current="page"`. Use `ariaLabel` to name the landmark when a page has more than one breadcrumb trail — it defaults to `"Breadcrumb"`.',
      preview: `<DuBreadcrumbs
  ariaLabel="Documentation breadcrumb"
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Breadcrumbs' },
  ]"
/>`,
      code: `<DuBreadcrumbs
  ariaLabel="Documentation breadcrumb"
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Breadcrumbs' },
  ]"
/>

<!-- renders:
<nav class="breadcrumbs" aria-label="Documentation breadcrumb">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li aria-current="page">Breadcrumbs</li>
  </ul>
</nav>
-->`,
    },
  ],
} satisfies DocPageData
