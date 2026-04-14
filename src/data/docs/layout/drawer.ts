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
      preview: `<DuDrawer v-model="open">
  <template #sidebar>
    <nav class="p-4">
      <ul class="menu">
        <li><a>Dashboard</a></li>
        <li><a>Settings</a></li>
      </ul>
    </nav>
  </template>
  <div class="p-4">
    <h1>Page Content</h1>
  </div>
</DuDrawer>`,
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
      preview: `<DuDrawer v-model="open">
  <template #sidebar>
    <nav class="p-4"><ul class="menu"><li><a>Link</a></li></ul></nav>
  </template>
  <template #content>
    <div class="p-4">
      <h1>Main Content</h1>
    </div>
  </template>
</DuDrawer>`,
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
      code: `<script setup lang="ts">
const drawerOpen = ref(false)
</script>

<template>
  <DuDrawer v-model="drawerOpen">
    <!-- Sidebar content -->
    <template #sidebar>
      <nav class="p-4">
        <ul class="menu">
          <li><a>Dashboard</a></li>
          <li><a>Settings</a></li>
        </ul>
      </nav>
    </template>

    <!-- Page content -->
    <DuNavbar>
      <template #start>
        <DuButton @click="drawerOpen = true" ghost square>
          <MenuIcon />
        </DuButton>
      </template>
    </DuNavbar>
    <main class="p-4">
      <RouterView />
    </main>
  </DuDrawer>
</template>`,
    },
    {
      title: 'Responsive sidebar',
      description: 'The drawer becomes a persistent sidebar on large screens.',
      code: `<DuDrawer v-model="drawerOpen" responsive position="start">
  <template #sidebar>
    <!-- Sidebar nav -->
  </template>
  <!-- Page content -->
</DuDrawer>`,
    },
    {
      title: 'With DuMenu items',
      code: `<DuDrawer v-model="open" :items="menuItems">
  <template #default>
    <!-- page content -->
  </template>
</DuDrawer>`,
    },
  ],
} satisfies DocPageData
