import type { DocPageData } from '@/types/docs'

export default {
  title: 'Drawer',
  description: 'Drawer is a side panel at the edge of the screen. Below the pinned breakpoint it floats over the page as a **dialog** — focus trapped, the content behind it `inert`, Escape and outside presses closing it. Above the breakpoint it is a plain part of the page, with none of that.',
  category: 'Layout',
  source: 'https://daisyui.com/components/drawer/',
  props: [
    {
      title: 'modelValue / open',
      description: 'Whether the drawer is open. **Omit both and the drawer owns its state; pass either one and yours decides** — `:open="x"` without an `@update:open` listener (or a `v-model`) now emits and stays put instead of closing itself. `open` wins when both are given.',
      type: 'boolean | undefined',
      default: 'undefined',
    },
    {
      title: 'position',
      description: 'Which side of the screen the drawer opens from',
      type: 'string',
      default: '"start"',
      options: ['start', 'end'],
    },
    {
      title: 'responsive',
      description: 'Breakpoint from which the drawer stops overlaying and becomes a permanent sidebar. `true` is equivalent to `"lg"`.',
      type: "boolean | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'false',
      options: ['true', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'alwaysOpenOnLarge',
      description: 'Drawer stays open as sidebar on large screens. Kept for backwards compatibility — prefer `responsive`, which takes precedence when both are set.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'items',
      description: 'Menu items rendered as a DuMenu inside the sidebar. `icon` is an `IconSource` — a Vue component, an image URL, or an HTML string.',
      type: 'DuDrawerItem[]',
    },
    {
      title: 'iconOnly',
      description: 'Enable collapsible icon-only mode for sidebar',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'sidebarClass',
      description: 'Additional CSS classes for sidebar container',
      type: 'string',
    },
    {
      title: 'sidebarWrapperClass',
      description: 'Additional CSS classes for sidebar wrapper',
      type: 'string',
    },
    {
      title: 'contentClass',
      description: 'Additional CSS classes for content area',
      type: 'string',
    },
    {
      title: 'overlayClass',
      description: 'Additional CSS classes for overlay',
      type: 'string',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the sidebar while it floats over the page as a dialog.',
      type: 'string',
      default: "'Sidebar'",
    },
    {
      title: 'inertTarget',
      description: 'CSS selector for what to make `inert` while the sidebar floats over it. Defaults to the drawer\'s own content pane — point it elsewhere when the page has chrome outside the drawer.',
      type: 'string',
    },
    {
      title: 'closeOnEscape',
      description: 'Close on Escape.',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'closeOnClickOutside',
      description: 'Close when a press lands outside the sidebar. Only applies while it floats — a pinned sidebar is part of the page, not something you dismiss.',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'id',
      description: 'Unique identifier for the drawer. Auto-generated from `useId()` when omitted, so a server render and a client render agree.',
      type: 'string',
    },
  ],
  slots: [
    {
      title: 'Slot #sidebar',
      description: 'Sidebar content when not using items prop',
      preview: `<div class="h-44 overflow-hidden rounded-lg border border-base-300" style="transform: translate(0, 0)">
  <DuDrawer :modelValue="true" overlayClass="hidden">
    <template #sidebar>
      <nav class="p-4 bg-base-200 h-full w-44">
        <ul class="menu text-sm">
          <li><a>Dashboard</a></li>
          <li><a>Settings</a></li>
        </ul>
      </nav>
    </template>
    <div class="p-4 text-sm text-base-content/60">Page Content</div>
  </DuDrawer>
</div>`,
      code: `<DuDrawer v-model="open">
  <template #sidebar>
    <nav class="p-4">
      <ul class="menu">
        <li><a>Dashboard</a></li>
        <li><a>Settings</a></li>
      </ul>
    </nav>
  </template>
  <!-- Page content -->
</DuDrawer>`,
    },
    {
      title: 'Slot #content',
      description: 'Main content area (default slot content)',
      preview: `<div class="h-44 overflow-hidden rounded-lg border border-base-300" style="transform: translate(0, 0)">
  <DuDrawer :modelValue="true" overlayClass="hidden">
    <template #sidebar>
      <nav class="p-4 bg-base-200 h-full w-44"><ul class="menu text-sm"><li><a>Link</a></li></ul></nav>
    </template>
    <template #content>
      <div class="p-4 text-sm text-base-content/60">Main Content</div>
    </template>
  </DuDrawer>
</div>`,
      code: `<DuDrawer v-model="open">
  <template #sidebar>...</template>
  <template #content>
    <main>Page content here</main>
  </template>
</DuDrawer>`,
    },
  ],
  classnames: {
    component: [
      { class: 'drawer', desc: 'Base class on the wrapper, always applied.' },
      { class: 'drawer-toggle', desc: 'The hidden checkbox driving the open state.' },
      { class: 'drawer-content', desc: 'The page-content side.' },
      { class: 'drawer-side', desc: 'The sidebar side.' },
      { class: 'drawer-overlay', desc: 'The click-outside backdrop.' },
    ],
    modifier: [
      { class: 'sm:drawer-open', desc: 'Permanent sidebar from sm up — responsive="sm"' },
      { class: 'md:drawer-open', desc: 'Permanent sidebar from md up — responsive="md"' },
      { class: 'lg:drawer-open', desc: 'Permanent sidebar from lg up — responsive / responsive="lg"' },
      { class: 'xl:drawer-open', desc: 'Permanent sidebar from xl up — responsive="xl"' },
    ],
    placement: [
      { class: 'drawer-end', desc: 'position="end" — position="start" is the default and adds no class' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      script: `
        const drawerOpen = ref(false)
        const { width, onResizeStart } = useResize(700)
        return { drawerOpen, width, onResizeStart }
      `,
      preview: `<div
  class="relative h-64 overflow-hidden rounded-lg border border-base-300"
  :style="{ width: width + 'px' }"
  style="transform: translate(0, 0)"
>
  <DuDrawer v-model="drawerOpen">
    <div class="flex flex-col items-center justify-center h-64">
      <DuButton @click="drawerOpen = true">Open drawer</DuButton>
      <p class="mt-4 text-sm text-base-content/60">Page content here</p>
    </div>
    <template #sidebar>
      <ul class="w-full h-full bg-base-100 p-2">
        <li><a>This is the sidebar</a></li>
      </ul>
    </template>
  </DuDrawer>
  <div
    class="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-20 grid place-items-center group/itemdrag"
    @pointerdown.prevent="onResizeStart"
  >
    <div class="w-1 h-1/2 bg-base-300 group-hover/itemdrag:bg-neutral rounded-full"></div>
  </div>
</div>`,
      code: `<script setup lang="ts">
const drawerOpen = ref(false)
</script>

<template>
<DuDrawer v-model="drawerOpen">
    <div class="flex flex-col items-center justify-center h-64">
      <DuButton as="label" @click="drawerOpen = true">
        Open drawer
      </DuButton>
      <p class="mt-4">Page content here</p>
    </div>
  
  <template #sidebar>
    <ul class="w-full h-full bg-base-100 p-2">
      <li><a>This is the sidebar</a></li>
    </ul>
  </template>
</DuDrawer>
</template>`,
    },
    {
      title: 'With navbar and menu',
      links: [
        { label: 'DuNavbar docs', href: '/docs/navigation/navbar' },
        { label: 'DuMenu docs', href: '/docs/navigation/menu' },
      ],
      script: `
        const drawerOpen = ref(false)
        const { width, onResizeStart } = useResize(700)
        return { drawerOpen, width, onResizeStart }
      `,
      preview: `<div
  class="relative h-64 overflow-hidden rounded-lg border border-base-300"
  :style="{ width: width + 'px' }"
  style="transform: translate(0, 0)"
>
  <DuDrawer v-model="drawerOpen">
    <template #sidebar>
      <div class="bg-base-200 h-full">
        <DuMenu>
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </DuMenu>
      </div>
    </template>
    <DuNavbar>
      <template #start>
        <DuButton ghost square size="sm" @click="drawerOpen = !drawerOpen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </DuButton>
        <span class="ml-1 font-medium">My App</span>
      </template>
    </DuNavbar>
    <div class="p-4">
      <p class="text-base-content/60 text-xs">Page content</p>
    </div>
  </DuDrawer>
  <div
    class="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-30 grid place-items-center group/itemdrag"
    @pointerdown.prevent="onResizeStart"
  >
    <div class="w-1 h-1/2 bg-base-300 group-hover/itemdrag:bg-neutral rounded-full"></div>
  </div>
</div>`,
      code: `<script setup lang="ts">
const drawerOpen = ref(false)
</script>

<template>
  <DuDrawer v-model="drawerOpen">
    <!-- Sidebar content -->
    <template #sidebar>
      <div class="bg-base-200 h-full">
        <DuMenu>
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </DuMenu>
      </div>
    </template>

    <!-- Page content -->
    <DuNavbar>
      <template #start>
        <DuButton ghost square size="sm" @click="drawerOpen = !drawerOpen">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </DuButton>
        <span class="ml-1 font-medium">My App</span>
      </template>
    </DuNavbar>

    <main class="p-4">
      <p class="text-base-content/60 text-xs">Page content</p>
    </main>

  </DuDrawer>
</template>`,
    },
    {
      title: 'Responsive sidebar',
      description: 'The drawer stops overlaying and becomes a persistent sidebar from the `responsive` breakpoint up. Pass `sm`, `md`, `lg` or `xl` to pick it — bare `responsive` means `lg`.',
      script: `
        const drawerOpen = ref(false)
        const { width, onResizeStart } = useResize(700)
        return { drawerOpen, width, onResizeStart }
      `,
      preview: `<div
  class="relative h-64 overflow-hidden rounded-lg border border-base-300"
  :style="{ width: width + 'px' }"
  style="transform: translate(0, 0)"
>
  <DuDrawer v-model="drawerOpen" :class="{'drawer-open': (width >= 500)}">
    <template #sidebar>
      <nav class="p-4 bg-base-200 h-full w-48">
        <ul class="menu text-sm">
          <li><a>Dashboard</a></li>
          <li><a>Projects</a></li>
          <li><a>Settings</a></li>
        </ul>
      </nav>
    </template>
    <div class="p-4 text-sm">
      <div class="font-medium mb-1">Main content</div>
      <p class="text-base-content/60 text-xs">Sidebar always visible on large screens</p>
      <DuButton class="mt-4" :class="{'hidden':!(width < 500)}" @click="drawerOpen = !drawerOpen">Open</DuButton>
    </div>
  </DuDrawer>
  <div
    class="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-20 grid place-items-center group/itemdrag"
    @pointerdown.prevent="onResizeStart"
  >
    <div class="w-1 h-1/2 bg-base-300 group-hover/itemdrag:bg-neutral rounded-full"></div>
  </div>
</div>`,
      code: `<!-- Permanent sidebar from lg+ -->
<DuDrawer responsive>
  <template #sidebar>
    <!-- Sidebar nav -->
  </template>
  <!-- Page content -->
</DuDrawer>

<!-- Pick a different breakpoint -->
<DuDrawer responsive="md">…</DuDrawer>
<DuDrawer responsive="xl">…</DuDrawer>`,
    },
    {
      title: 'Keyboard & focus',
      description: 'While the sidebar floats it is a real dialog: `role="dialog"`, `aria-modal="true"`, an accessible name from `ariaLabel`, **focus trapped inside it**, and the content behind it `inert` — so Tab cannot walk into a page nobody can see. <kbd>Escape</kbd> closes it and focus returns to whatever opened it. Above the pinned breakpoint none of that applies: the sidebar is simply part of the page.',
      script: `
        const drawerOpen = ref(false)
        return { drawerOpen }
      `,
      preview: `<div class="relative h-64 w-full overflow-hidden rounded-lg border border-base-300" style="transform: translate(0, 0)">
  <DuDrawer v-model="drawerOpen">
    <template #sidebar>
      <nav class="p-4 bg-base-200 h-full w-48">
        <ul class="menu text-sm">
          <li><a>Dashboard</a></li>
          <li><a>Projects</a></li>
          <li><a>Settings</a></li>
        </ul>
      </nav>
    </template>
    <div class="p-4 text-sm">
      <DuButton variant="primary" @click="drawerOpen = true">Open, then press Escape</DuButton>
    </div>
  </DuDrawer>
</div>`,
      code: `<DuDrawer v-model="drawerOpen">
  <template #sidebar>
    <!-- focus lands here on open -->
  </template>
  <!-- Escape closes and returns focus to the trigger -->
</DuDrawer>`,
    },
    {
      title: 'With DuMenu items',
      description: 'Pass an `items` array to automatically render a DuMenu inside the sidebar.',
      links: [
        { label: 'DuMenu docs', href: '/docs/navigation/menu' },
      ],
      script: `
        const drawerOpen = ref(true)
        return { drawerOpen }
      `,
      preview: `<div class="h-56 overflow-hidden rounded-lg border border-base-300" style="transform: translate(0, 0)">
  <DuDrawer
    v-model="drawerOpen"
    overlayClass="hidden"
    sidebarWrapperClass="bg-base-200 w-48"
    :items="[
      { label: 'Dashboard', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Settings', href: '/settings' },
    ]"
  >
    <div class="p-4 text-sm">
      <div class="font-medium mb-1">Main content</div>
      <p class="text-base-content/60 text-xs">Sidebar powered by DuMenu</p>
    </div>
  </DuDrawer>
</div>`,
      code: `<DuDrawer v-model="open" :items="menuItems">
  <!-- page content -->
</DuDrawer>`,
    },
  ],
} satisfies DocPageData
