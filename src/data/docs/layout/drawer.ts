import type { DocPageData } from '@/types/docs'

export default {
  title: 'Drawer',
  description: 'Drawer is a side panel that slides in from the edge of the screen. Supports manual sidebar content or dynamic menu items.',
  category: 'Layout',
  source: 'https://daisyui.com/components/drawer/',
  props: [
    {
      title: 'modelValue / open',
      description: 'Whether the drawer is open (use with v-model)',
      type: 'boolean',
      default: 'false',
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
      description: 'Makes drawer responsive (changes behavior based on screen size)',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'alwaysOpenOnLarge',
      description: 'Drawer stays open as sidebar on large screens',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'items',
      description: 'Menu items to display in sidebar (uses DuMenu)',
      type: 'DRAWERItem[]',
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
      title: 'id',
      description: 'Unique identifier for the drawer',
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
    placement: [
      { class: 'start', desc: 'Slides from the left', default: true },
      { class: 'end', desc: 'Slides from the right' },
    ],
    modifier: [
      { class: 'responsive', desc: 'Always visible as a sidebar on lg+ screens' },
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
      description: 'The drawer becomes a persistent sidebar on large screens.',
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
      code: `<DuDrawer responsive>
  <template #sidebar>
    <!-- Sidebar nav -->
  </template>
  <!-- Page content -->
</DuDrawer>`,
    },
    {
      title: 'With DuMenu items',
      description: 'Pass an `items` array to automatically render a DuMenu inside the sidebar.',
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
