import type { DocPageData } from '@/types/docs'

export default {
  title: 'Navbar',
  description: 'Navbar is used as a horizontal navigation bar at the top of the page. It provides start, center, and end slots for flexible layout.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/navbar/',
  slots: [
    {
      title: 'Slot #start',
      description: 'Content aligned to the left side of the navbar (navbar-start)',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" class="text-xl">Logo</DuButton>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #start>
    <img src="/logo.svg" alt="Logo" class="h-8" />
  </template>
</DuNavbar>`,
    },
    {
      title: 'Slot #center',
      description: 'Content centered in the navbar (navbar-center)',
      links: [
        { label: 'Vue Router RouterLink docs', href: 'https://router.vuejs.org/guide/essentials/navigation.html' },
      ],
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #center>
    <nav class="flex gap-4 text-sm">
      <a>Home</a>
      <a>About</a>
      <a>Contact</a>
    </nav>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #center>
    <nav class="menu menu-horizontal px-1">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
      <li><RouterLink to="/contact">Contact</RouterLink></li>
    </nav>
  </template>
</DuNavbar>`,
    },
    {
      title: 'Slot #end',
      description: 'Content aligned to the right side of the navbar (navbar-end)',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #end>
    <DuButton variant="primary" size="sm">Get Started</DuButton>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #end>
    <DuButton variant="primary" size="sm">Get Started</DuButton>
  </template>
</DuNavbar>`,
    },
    {
      title: 'All slots combined',
      description: 'Full navbar with start, center, and end sections',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" class="text-xl">Logo</DuButton>
  </template>
  <template #center>
    <nav class="hidden lg:flex gap-4 text-sm">
      <a>Home</a>
      <a>About</a>
    </nav>
  </template>
  <template #end>
    <DuButton variant="primary" size="sm">Get Started</DuButton>
  </template>
</DuNavbar>`,
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
  ],
  sections: [
    {
      title: 'Basic',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" class="text-xl">Logo</DuButton>
  </template>
  <template #center>
    <nav class="hidden lg:flex gap-4 text-sm">
      <a>Home</a>
      <a>About</a>
    </nav>
  </template>
  <template #end>
    <DuButton variant="primary" size="sm">Get Started</DuButton>
  </template>
</DuNavbar>`,
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
      title: 'With icons',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" square>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </DuButton>
  </template>
  <template #center>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <DuButton variant="ghost" square>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
    </DuButton>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #start>
    <DuButton variant="ghost" square>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </DuButton>
  </template>
  <template #center>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <DuButton variant="ghost" square>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
    </DuButton>
  </template>
</DuNavbar>`,
    },
    {
      title: 'With menu',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <ul class="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #start>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <ul class="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </template>
</DuNavbar>`,
    },
    {
      title: 'With search input',
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #start>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <DuInputField placeholder="Search" class="w-24 md:w-auto" />
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #start>
    <DuButton variant="ghost" class="text-xl">daisyUI</DuButton>
  </template>
  <template #end>
    <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
  </template>
</DuNavbar>`,
    },
    {
      title: 'Sticky with blur',
      preview: `<DuNavbar class="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300 w-full">
  <template #start>
    <img src="/logo.svg" alt="Cornet" class="h-8" />
  </template>
</DuNavbar>`,
      code: `<DuNavbar class="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
  <template #start>
    <img src="/logo.svg" alt="Cornet" class="h-8" />
  </template>
</DuNavbar>`,
    },
    {
      title: 'With dropdown menu',
      links: [
        { label: 'DuDropdown docs', href: '/docs/actions/dropdown' },
        { label: 'DuAvatar docs', href: '/docs/data-display/avatar' },
      ],
      preview: `<DuNavbar class="border border-base-300 rounded-lg w-full">
  <template #end>
    <DuDropdown placement="end">
      <template #trigger>
        <DuAvatar size="sm" rounded="full" class="cursor-pointer">
          <img src="https://i.pravatar.cc/32?img=5" alt="User" />
        </DuAvatar>
      </template>
      <ul class="menu menu-sm w-40">
        <li><a>Profile</a></li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </DuDropdown>
  </template>
</DuNavbar>`,
      code: `<DuNavbar>
  <template #end>
    <DuDropdown placement="end">
      <template #trigger>
        <DuAvatar size="sm" rounded="full" class="cursor-pointer">
          <img src="/user.jpg" alt="User" />
        </DuAvatar>
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
