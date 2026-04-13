import type { DocPageData } from '@/types/docs'

export default {
  title: 'Navbar',
  description: 'Navbar is used as a horizontal navigation bar at the top of the page.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/navbar/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="navbar bg-base-100 border border-base-300 rounded-xl">
  <div class="navbar-start"><a class="btn btn-ghost text-xl">Logo</a></div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>Home</a></li><li><a>About</a></li>
    </ul>
  </div>
  <div class="navbar-end"><a class="btn btn-primary">Get Started</a></div>
</div>`,
      code: `<DuNavbar>
  <template #start>
    <RouterLink to="/" class="btn btn-ghost text-xl">Logo</RouterLink>
  </template>
  <template #center>
    <nav class="hidden lg:flex gap-4 text-sm">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </template>
  <template #end>
    <DuButton variant="primary" size="sm">Get Started</DuButton>
  </template>
</DuNavbar>`,
    },
    {
      title: 'Sticky with blur',
      code: `<DuNavbar class="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
  <template #start>
    <img src="/logo.svg" alt="Cornet" class="h-8" />
  </template>
</DuNavbar>`,
    },
    {
      title: 'With dropdown menu',
      code: `<DuNavbar>
  <template #end>
    <DuDropdown placement="end">
      <template #trigger>
        <DuAvatar src="/user.jpg" size="sm" class="cursor-pointer" />
      </template>
      <ul class="menu menu-sm w-40">
        <li><a>Profile</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </DuDropdown>
  </template>
</DuNavbar>`,
    },
  ],
} satisfies DocPageData
