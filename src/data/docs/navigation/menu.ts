import type { DocPageData } from '@/types/docs'

export default {
  title: 'Menu',
  description: 'Menu is used for navigation and list-style layouts with optional sub-menus.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/menu/',
  sections: [
    {
      title: 'Basic vertical',
      preview: `<ul class="menu bg-base-100 rounded-xl border border-base-300 w-48 p-2">
  <li><a>Dashboard</a></li>
  <li><a>Products</a></li>
  <li><a>Settings</a></li>
</ul>`,
      code: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Settings', href: '/settings' },
  ]"
  direction="vertical"
/>`,
    },
    {
      title: 'Horizontal',
      code: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]"
  direction="horizontal"
/>`,
    },
    {
      title: 'With sub-menus',
      code: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'List', href: '/products' },
        { label: 'Add new', href: '/products/new' },
        { label: 'Categories', href: '/products/categories' },
      ],
    },
    { label: 'Settings', href: '/settings', disabled: true },
  ]"
  direction="vertical"
  :activeItem="currentRoute"
/>`,
    },
    {
      title: 'Active item',
      code: `<DuMenu
  :items="navItems"
  :activeItem="$route.path"
  direction="vertical"
/>`,
    },
  ],
} satisfies DocPageData
