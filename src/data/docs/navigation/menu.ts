import type { DocPageData } from '@/types/docs'

export default {
  title: 'Menu',
  description: 'Menu is used for navigation and list-style layouts with optional sub-menus.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/menu/',
  sections: [
    {
      title: 'Basic vertical',
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Settings', href: '/settings' },
  ]"
  direction="vertical"
/>`,
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
      preview: `<DuMenu
  :items="[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]"
  direction="horizontal"
/>`,
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
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', href: '/' },
    {
      label: 'Products',
      subItems: [
        { label: 'List', href: '/products' },
        { label: 'Add new', href: '/products/new' },
      ],
    },
    { label: 'Settings', href: '/settings', disabled: true },
  ]"
  direction="vertical"
/>`,
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
      preview: `<DuMenu
  :items="[
    { label: 'Dashboard', value: '/dashboard', href: '#' },
    { label: 'Settings', value: '/settings', href: '#' },
    { label: 'Profile', value: '/profile', href: '#' },
  ]"
  activeItem="/dashboard"
  direction="vertical"
/>`,
      code: `<DuMenu
  :items="navItems"
  :activeItem="$route.path"
  direction="vertical"
/>`,
    },
  ],
} satisfies DocPageData
