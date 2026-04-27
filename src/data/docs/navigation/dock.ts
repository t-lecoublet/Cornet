import type { DocPageData } from '@/types/docs'

const homeIcon = `<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25\\' /></svg>`
const infoIcon = `<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z\\' /></svg>`
const chartIcon = `<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z\\' /></svg>`
const userIcon = `<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z\\' /></svg>`

export default {
  title: 'Dock',
  description: 'Fixed bottom navigation bar (macOS dock style). Supports icons, labels, sizes, events, scoped slots, and full manual mode.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/dock/',
  props: [
    {
      title: 'items',
      description: 'Array of dock items',
      type: 'DockItem[]',
    },
    {
      title: 'size',
      description: 'Size of the dock',
      type: 'Size',
      default: '"default"',
    },
    {
      title: 'reverseTheme',
      description: 'Apply a dark (neutral) background to the dock',
      type: 'boolean',
      default: 'false',
    },
  ],
  slots: [
    {
      title: 'Default slot (manual mode)',
      description: 'When the default slot is used, `items` is ignored and you control the buttons entirely. Use DaisyUI classes `dock-active` and `dock-label` on your elements.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute">
    <button class="dock-active">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
      <span class="dock-label">Home</span>
    </button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
      <span class="dock-label">Info</span>
    </button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
      <span class="dock-label">Profile</span>
    </button>
  </DuDock>
</div>`,
      code: `<DuDock>
  <button class="dock-active" @click="navigate('home')">
    <HomeIcon class="w-5 h-5" />
    <span class="dock-label">Home</span>
  </button>
  <button @click="navigate('info')">
    <InfoIcon class="w-5 h-5" />
    <span class="dock-label">Info</span>
  </button>
  <button @click="navigate('profile')">
    <UserIcon class="w-5 h-5" />
    <span class="dock-label">Profile</span>
  </button>
</DuDock>`,
    },
    {
      title: 'Slot #icon',
      description: 'Global slot to override the icon for all items. Slot props: `{ item, index }`.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[{ label: 'Home' }, { label: 'Stats' }, { label: 'Profile' }]">
    <template #icon="{ item }">
      <div class="flex items-center justify-center w-6 h-6 bg-primary text-primary-content rounded font-bold text-xs">
        {{ item.label?.charAt(0) }}
      </div>
    </template>
  </DuDock>
</div>`,
      code: `<DuDock :items="items">
  <template #icon="{ item, index }">
    <div class="w-6 h-6 bg-primary text-primary-content rounded flex items-center justify-center">
      {{ item.label?.charAt(0) }}
    </div>
  </template>
</DuDock>`,
    },
    {
      title: 'Slot #label',
      description: 'Global slot to override the label for all items. Slot props: `{ item, index }`.',
      code: `<DuDock :items="items">
  <template #label="{ item }">
    <span class="font-bold text-primary">{{ item.label }}</span>
  </template>
</DuDock>`,
    },
    {
      title: 'Slots #icon-{n} / #label-{n}',
      description: 'Per-item slots for granular control. `#icon-0`, `#icon-1`… override only the icon of the item at that index. Same for `#label-{n}`. Per-item slots take priority over the global `#icon` / `#label` slot.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[{ label: 'Home', active: true }, { label: 'Alerts' }, { label: 'Profile' }]">
    <template #icon-0>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    </template>
    <template #icon-1>
      <div class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
        <span class="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full text-white flex items-center justify-center" style="font-size:8px">3</span>
      </div>
    </template>
    <template #icon-2>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
    </template>
  </DuDock>
</div>`,
      code: `<DuDock :items="items">
  <!-- Custom icon only for item at index 1 -->
  <template #icon-1>
    <div class="relative">
      <BellIcon class="w-5 h-5" />
      <span class="badge badge-error badge-xs absolute -top-1 -right-1">3</span>
    </div>
  </template>
</DuDock>`,
    },
  ],
  sections: [
    {
      title: 'Basic',
      description: 'The `icon` property accepts a Vue component object, an SVG HTML string, or an image URL. The dock is `position: fixed` — wrap it in a `relative overflow-hidden` container for previews.',
      links: [
        { label: 'Heroicons', href: 'https://heroicons.com/' },
        { label: 'DaisyUI dock', href: 'https://daisyui.com/components/dock/' },
      ],
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[
    { label: 'Home', icon: '${homeIcon}', active: true },
    { label: 'Info', icon: '${infoIcon}' },
    { label: 'Stats', icon: '${chartIcon}' },
  ]" />
</div>`,
      code: `<script setup lang="ts">
import HomeIcon from '@heroicons/vue/24/outline/HomeIcon'
import InformationCircleIcon from '@heroicons/vue/24/outline/InformationCircleIcon'
import ChartBarIcon from '@heroicons/vue/24/outline/ChartBarIcon'
</script>

<template>
  <DuDock :items="[
    { label: 'Home', icon: HomeIcon, href: '/', active: true },
    { label: 'Info', icon: InformationCircleIcon, href: '/about' },
    { label: 'Stats', icon: ChartBarIcon, href: '/stats' },
  ]" />
</template>`,
    },
    {
      title: 'Icons only',
      description: 'Omit `label` to render icons without text.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[
    { icon: '${homeIcon}', active: true },
    { icon: '${infoIcon}' },
    { icon: '${chartIcon}' },
  ]" />
</div>`,
      code: `<DuDock :items="[
  { icon: HomeIcon, active: true },
  { icon: InfoIcon },
  { icon: ChartIcon },
]" />`,
    },
    {
      title: 'Labels only',
      description: 'Omit `icon` to show text labels only.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[
    { label: 'Home', active: true },
    { label: 'Info' },
    { label: 'Settings' },
  ]" />
</div>`,
      code: `<DuDock :items="[
  { label: 'Home', active: true },
  { label: 'Info' },
  { label: 'Settings' },
]" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-4 w-full">
  <div class="relative h-16 w-full rounded-xl border border-base-300 overflow-hidden">
    <DuDock class="absolute" size="sm" :items="[{ label: 'Home', icon: '${homeIcon}', active: true }, { label: 'Info', icon: '${infoIcon}' }, { label: 'Stats', icon: '${chartIcon}' }]" />
  </div>
  <div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
    <DuDock class="absolute" :items="[{ label: 'Home', icon: '${homeIcon}', active: true }, { label: 'Info', icon: '${infoIcon}' }, { label: 'Stats', icon: '${chartIcon}' }]" />
  </div>
  <div class="relative h-28 w-full rounded-xl border border-base-300 overflow-hidden">
    <DuDock class="absolute" size="lg" :items="[{ label: 'Home', icon: '${homeIcon}', active: true }, { label: 'Info', icon: '${infoIcon}' }, { label: 'Stats', icon: '${chartIcon}' }]" />
  </div>
</div>`,
      code: `<DuDock size="sm" :items="items" />
<DuDock :items="items" />
<DuDock size="lg" :items="items" />`,
    },
    {
      title: 'Reverse theme',
      description: 'Use `reverseTheme` for a dark dock (neutral background with neutral-content text).',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" reverseTheme :items="[
    { label: 'Home', icon: '${homeIcon}', active: true },
    { label: 'Info', icon: '${infoIcon}' },
    { label: 'Stats', icon: '${chartIcon}' },
  ]" />
</div>`,
      code: `<DuDock reverseTheme :items="[
  { label: 'Home', icon: HomeIcon, active: true },
  { label: 'Info', icon: InfoIcon },
  { label: 'Stats', icon: ChartIcon },
]" />`,
    },
    {
      title: 'Per-item class',
      description: 'Set `class` on individual items to apply custom Tailwind classes to that button.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[
    { label: 'Home', icon: '${homeIcon}', class: 'text-primary', active: true },
    { label: 'Info', icon: '${infoIcon}', class: 'text-secondary' },
    { label: 'Stats', icon: '${chartIcon}', class: 'text-accent' },
  ]" />
</div>`,
      code: `<DuDock :items="[
  { label: 'Home', icon: HomeIcon, class: 'text-primary', active: true },
  { label: 'Info', icon: InfoIcon, class: 'text-secondary' },
  { label: 'Stats', icon: ChartIcon, class: 'text-accent' },
]" />`,
    },
    {
      title: '@change event',
      description: 'Fires whenever the active item changes with the selected `DockItem` as payload. The component also exposes `activeItem` (index) and `selectedItem` (object) via `ref`.',
      links: [
        { label: 'Vue template refs', href: 'https://vuejs.org/guide/essentials/template-refs.html' },
        { label: 'Vue defineExpose', href: 'https://vuejs.org/api/sfc-script-setup.html#defineexpose' },
      ],
      script: `
      const selected = ref('Home')
      return { selected }`,
      preview: `<div class="flex flex-col gap-2 w-full">
  <div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
    <DuDock class="absolute"
      :items="[
        { label: 'Home', icon: '${homeIcon}', active: true },
        { label: 'Info', icon: '${infoIcon}' },
        { label: 'Stats', icon: '${chartIcon}' },
        { label: 'Profile', icon: '${userIcon}' },
      ]"
      @change="(item) => selected = item.label"
    />
  </div>
  <p class="text-sm text-center text-base-content/60">Active: <strong class="text-base-content">{{ selected }}</strong></p>
</div>`,
      code: `<script setup lang="ts">
import type { DockItem } from 'cornet/types'

const selected = ref<DockItem | null>(null)
const dockRef = ref()
</script>

<template>
  <DuDock
    ref="dockRef"
    :items="items"
    @change="(item) => selected = item"
  />
  <!-- dockRef.activeItem → current index -->
  <!-- dockRef.selectedItem → current DockItem -->
</template>`,
    },
    {
      title: 'onClick per item',
      description: 'Attach an `onClick` callback directly on each `DockItem`. It is called after `@change` fires.',
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute" :items="[
    { label: 'Home', icon: '${homeIcon}', active: true },
    { label: 'Info', icon: '${infoIcon}' },
    { label: 'Stats', icon: '${chartIcon}' },
  ]" />
</div>`,
      code: `<script setup lang="ts">
const router = useRouter()

const items = [
  { label: 'Home', icon: HomeIcon, active: true, onClick: () => router.push('/') },
  { label: 'Info', icon: InfoIcon, onClick: () => router.push('/about') },
  { label: 'Stats', icon: ChartIcon, onClick: () => router.push('/stats') },
]
</script>

<template>
  <DuDock :items="items" />
</template>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use the default slot to fully control the dock buttons — `items` is ignored. Apply `dock-active` on the active button and `dock-label` on the label span. Ideal for use with RouterLink.',
      links: [
        { label: 'Vue RouterLink', href: 'https://router.vuejs.org/api/#RouterLink' },
      ],
      preview: `<div class="relative h-24 w-full rounded-xl border border-base-300 overflow-hidden">
  <DuDock class="absolute">
    <button class="dock-active">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
      <span class="dock-label">Home</span>
    </button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
      <span class="dock-label">Info</span>
    </button>
    <button>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
      <span class="dock-label">Stats</span>
    </button>
  </DuDock>
</div>`,
      code: `<!-- RouterLink as dock items for native navigation -->
<DuDock>
  <RouterLink to="/" custom v-slot="{ navigate, isActive }">
    <button :class="isActive && 'dock-active'" @click="navigate">
      <HomeIcon class="w-5 h-5" />
      <span class="dock-label">Home</span>
    </button>
  </RouterLink>
  <RouterLink to="/about" custom v-slot="{ navigate, isActive }">
    <button :class="isActive && 'dock-active'" @click="navigate">
      <InfoIcon class="w-5 h-5" />
      <span class="dock-label">Info</span>
    </button>
  </RouterLink>
</DuDock>`,
    },
  ],
} satisfies DocPageData
