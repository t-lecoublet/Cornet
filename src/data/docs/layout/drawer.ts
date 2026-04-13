import type { DocPageData } from '@/types/docs'

export default {
  title: 'Drawer',
  description: 'Drawer is a side panel that slides in from the edge of the screen.',
  category: 'Layout',
  source: 'https://daisyui.com/components/drawer/',
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
