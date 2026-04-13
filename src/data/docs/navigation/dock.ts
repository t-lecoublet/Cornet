import type { DocPageData } from '@/types/docs'

export default {
  title: 'Dock',
  description: 'Dock is a fixed bottom navigation bar, often used in mobile apps.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/dock/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="dock">
  <button class="dock-active">
    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    <span class="dock-label">Home</span>
  </button>
  <button>
    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    <span class="dock-label">Info</span>
  </button>
  <button>
    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    <span class="dock-label">Settings</span>
  </button>
</div>`,
      code: `<DuDock
  :items="[
    { label: 'Home', icon: HomeIcon, href: '/', active: true },
    { label: 'Info', icon: InfoIcon, href: '/about' },
    { label: 'Settings', icon: CogIcon, href: '/settings' },
  ]"
/>`,
    },
    {
      title: 'Variant',
      code: `<DuDock
  variant="primary"
  :items="[
    { label: 'Home', icon: HomeIcon, active: true },
    { label: 'Profile', icon: UserIcon },
    { label: 'Settings', icon: CogIcon },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
