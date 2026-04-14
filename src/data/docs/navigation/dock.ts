import type { DocPageData } from '@/types/docs'

export default {
  title: 'Dock',
  description: 'Dock is a fixed bottom navigation bar, often used in mobile apps.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/dock/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuDock
  :items="[
    { label: 'Home', active: true },
    { label: 'Info' },
    { label: 'Settings' },
  ]"
/>`,
      code: `<DuDock
  :items="[
    { label: 'Home', icon: HomeIcon, href: '/', active: true },
    { label: 'Info', icon: InfoIcon, href: '/about' },
    { label: 'Settings', icon: CogIcon, href: '/settings' },
  ]"
/>`,
    },
    {
      title: 'Reverse theme',
      description: 'Use `reverseTheme` to apply a dark background to the dock.',
      preview: `<DuDock
  :reverseTheme="true"
  :items="[
    { label: 'Home', active: true },
    { label: 'Profile' },
    { label: 'Settings' },
  ]"
/>`,
      code: `<DuDock
  :reverseTheme="true"
  :items="[
    { label: 'Home', icon: HomeIcon, active: true },
    { label: 'Profile', icon: UserIcon },
    { label: 'Settings', icon: CogIcon },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
