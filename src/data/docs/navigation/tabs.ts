import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tabs',
  description: 'Tabs organize content into separate panels, showing one at a time. Supports icons, custom content, and multiple styles.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/tabs/',
  props: [
    {
      title: 'size',
      description: 'Size of tabs',
      type: 'string',
      default: '"default"',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'items',
      description: 'Array of tab items with label, icon, active, disabled, onClick, and content properties',
      type: 'TabItem[]',
    },
    {
      title: 'type',
      description: 'Visual style of tabs',
      type: 'string',
      options: ['lift', 'border', 'box'],
    },
    {
      title: 'bottom',
      description: 'Place tabs at the bottom instead of top',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'name',
      description: 'Name attribute for radio inputs (must be unique per tab group)',
      type: 'string',
      default: '"my_tabs"',
    },
    {
      title: 'modelValue',
      description: 'Currently active tab index (use with v-model)',
      type: 'number',
    },
  ],
  slots: [
    {
      title: 'Tab slots (#tab, #tab-{index})',
      description: 'Customize individual tabs with slot props: item, index',
      preview: `<DuTabs
  :items="[{ label: 'Custom Tab 1' }, { label: 'Custom Tab 2' }]"
  class="w-full"
>
  <template #tab-0="{ item, index }">
    <span class="badge badge-primary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
  <template #tab-1="{ item, index }">
    <span class="badge badge-secondary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
</DuTabs>`,
      code: `<DuTabs :items="tabs">
  <template #tab-0="{ item, index }">
    <span class="badge badge-primary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
</DuTabs>`,
    },
    {
      title: 'Content slots (#content, #content-{index})',
      description: 'Customize tab panel content with slot props: item, index',
      preview: `<DuTabs
  :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }]"
  type="border"
>
  <template #content-0>
    <div class="p-4">
      <p class="font-semibold">Custom Content 1</p>
      <p class="text-sm text-base-content/70">This is custom content for tab 1</p>
    </div>
  </template>
  <template #content-1>
    <div class="p-4">
      <p class="font-semibold">Custom Content 2</p>
      <p class="text-sm text-base-content/70">This is custom content for tab 2</p>
    </div>
  </template>
</DuTabs>`,
      code: `<DuTabs :items="tabs" type="border">
  <template #content-0="{ item }">
    <div class="p-4">
      <p>{{ item.label }} content</p>
    </div>
  </template>
</DuTabs>`,
    },
    {
      title: 'Icon slot (#icon)',
      description: 'Default slot for icons across all tabs (override with #tab-{n} slot)',
      preview: `<DuTabs
  :items="[
    { label: 'Home', icon: '<svg class=\\"w-5 h-5\\"><path d=\\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\\"/></svg>' },
    { label: 'Settings', icon: '<svg class=\\"w-5 h-5\\"><path d=\\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\\"/></svg>' },
  ]"
>
  <template #icon="{ item }">
    <span v-html="item.icon"></span>
  </template>
</DuTabs>`,
      code: `<DuTabs :items="tabs">
  <template #icon="{ item }">
    <component :is="item.icon" class="w-5 h-5" />
  </template>
</DuTabs>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use default slot for manual HTML tab structure',
      preview: `<DuTabs class="w-full">
  <a class="tab tab-active">Tab 1</a>
  <a class="tab">Tab 2</a>
  <a class="tab">Tab 3</a>
</DuTabs>`,
      code: `<DuTabs>
  <a class="tab tab-active">Tab 1</a>
  <a class="tab">Tab 2</a>
  <a class="tab">Tab 3</a>
</DuTabs>`,
    },
  ],
  classnames: {
    style: [
      { class: 'tabs-lift', desc: 'Lifted tab style' },
      { class: 'tabs-border', desc: 'Border underline style' },
      { class: 'tabs-box', desc: 'Box/pill style' },
    ],
    size: [
      { class: 'tabs-xs', desc: 'Extra small' },
      { class: 'tabs-sm', desc: 'Small' },
      { class: 'tabs-md', desc: 'Medium', default: true },
      { class: 'tabs-lg', desc: 'Large' },
      { class: 'tabs-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic tabs',
      preview: `<DuTabs
  :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]"
  class="w-full"
/>`,
      code: `<DuTabs
  :items="[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ]"
/>`,
    },
    {
      title: 'Default style',
      preview: `<DuTabs
  :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }]"
  class="w-full"
/>`,
      code: `<DuTabs :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]" />`,
    },
    {
      title: 'Lifted style',
      preview: `<DuTabs
  :items="[{ label: 'Tab A' }, { label: 'Tab B' }]"
  type="lift"
  class="w-full"
/>`,
      code: `<DuTabs :items="[{ label: 'Tab A' }, { label: 'Tab B' }]" type="lift" />`,
    },
    {
      title: 'Border style',
      links: [
        { label: 'Vue v-model docs', href: 'https://vuejs.org/guide/components/v-model.html' },
      ],
      preview: `<DuTabs
  :items="[{ label: 'Overview' }, { label: 'Settings' }, { label: 'Analytics' }]"
  type="border"
  name="preview_border"
>
  <template #content-0><p class="p-4 text-sm">Overview content</p></template>
  <template #content-1><p class="p-4 text-sm">Settings content</p></template>
  <template #content-2><p class="p-4 text-sm">Analytics content</p></template>
</DuTabs>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref(0)
const tabs = [{ label: 'Overview' }, { label: 'Settings' }, { label: 'Analytics' }]
</script>

<template>
  <DuTabs v-model="activeTab" :items="tabs" type="border" name="main_tabs">
    <template #content-0><div class="p-4">Overview content</div></template>
    <template #content-1><div class="p-4">Settings content</div></template>
    <template #content-2><div class="p-4">Analytics content</div></template>
  </DuTabs>
</template>`,
    },
    {
      title: 'Box (pill) style',
      preview: `<DuTabs
  :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]"
  type="box"
  name="preview_box"
>
  <template #content-0><p class="p-4 text-sm">Content 1</p></template>
  <template #content-1><p class="p-4 text-sm">Content 2</p></template>
  <template #content-2><p class="p-4 text-sm">Content 3</p></template>
</DuTabs>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref(0)
</script>

<template>
  <DuTabs v-model="activeTab" :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }]" type="box" name="box_tabs">
    <template #content-0><div class="p-4">Content 1</div></template>
    <template #content-1><div class="p-4">Content 2</div></template>
    <template #content-2><div class="p-4">Content 3</div></template>
  </DuTabs>
</template>`,
    },
    {
      title: 'With icons',
      description: 'Pass an icon via the `icon` property on each item (SVG string or component). Use the `#icon` scoped slot to render it — receives `{ item }` as slot props.',
      links: [
        { label: 'Heroicons', href: 'https://heroicons.com/' },
        { label: 'Vue scoped slots docs', href: 'https://vuejs.org/guide/components/slots.html#scoped-slots' },
      ],
      preview: `<DuTabs
  :items="[
    { label: 'Home', icon: '<svg class=\\"w-5 h-5\\"><path d=\\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\\"/></svg>' },
    { label: 'Settings', icon: '<svg class=\\"w-5 h-5\\"><path d=\\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\\"/></svg>' },
  ]"
  class="w-full"
/>`,
      code: `<!-- Icon as an SVG string in items -->
<DuTabs
  :items="[
    { label: 'Home', icon: '<svg ...>...</svg>' },
    { label: 'Settings', icon: '<svg ...>...</svg>' },
  ]"
>
  <template #icon="{ item }">
    <span v-html="item.icon" class="w-5 h-5" />
  </template>
</DuTabs>`,
    },
    {
      title: 'With content slots',
      description: 'Use `#content-{n}` (numbered) slots to render custom content for each tab panel. The index matches the tab position in the `items` array.',
      links: [
        { label: 'Vue named slots docs', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
      ],
      preview: `<DuTabs
  :items="[{ label: 'Description' }, { label: 'Reviews' }]"
  type="border"
>
  <template #content-0>
    <div class="p-4">
      <h3 class="font-semibold">Product Description</h3>
      <p class="text-sm mt-2">This is the product description content.</p>
    </div>
  </template>
  <template #content-1>
    <div class="p-4">
      <h3 class="font-semibold">Customer Reviews</h3>
      <p class="text-sm mt-2">No reviews yet.</p>
    </div>
  </template>
</DuTabs>`,
      code: `<DuTabs :items="[{ label: 'Description' }, { label: 'Reviews' }]" type="border">
  <template #content-0>
    <div class="p-4">
      <h3>Product Description</h3>
      <p>Content here...</p>
    </div>
  </template>
  <template #content-1>
    <div class="p-4">
      <h3>Reviews</h3>
      <p>No reviews yet.</p>
    </div>
  </template>
</DuTabs>`,
    },
    {
      title: 'Tabs at bottom',
      preview: `<DuTabs
  :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }]"
  type="border"
  :bottom="true"
  name="preview_bottom"
>
  <template #content-0><p class="p-4 text-sm">Content 1</p></template>
  <template #content-1><p class="p-4 text-sm">Content 2</p></template>
</DuTabs>`,
      code: `<DuTabs :items="[{ label: 'Tab 1' }, { label: 'Tab 2' }]" type="border" :bottom="true" name="bottom_tabs">
  <template #content-0><div class="p-4">Content 1</div></template>
  <template #content-1><div class="p-4">Content 2</div></template>
</DuTabs>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-4">
  <div>
    <p class="text-sm font-medium mb-1">Extra Small (xs)</p>
    <DuTabs :items="[{ label: 'T1' }, { label: 'T2' }]" size="xs" class="w-full" />
  </div>
  <div>
    <p class="text-sm font-medium mb-1">Small (sm)</p>
    <DuTabs :items="[{ label: 'T1' }, { label: 'T2' }]" size="sm" class="w-full" />
  </div>
  <div>
    <p class="text-sm font-medium mb-1">Medium (md)</p>
    <DuTabs :items="[{ label: 'T1' }, { label: 'T2' }]" size="md" class="w-full" />
  </div>
  <div>
    <p class="text-sm font-medium mb-1">Large (lg)</p>
    <DuTabs :items="[{ label: 'T1' }, { label: 'T2' }]" size="lg" class="w-full" />
  </div>
</div>`,
      code: `<div class="flex flex-col gap-4">
  <DuTabs :items="tabs" size="xs" />
  <DuTabs :items="tabs" size="sm" />
  <DuTabs :items="tabs" size="md" />
  <DuTabs :items="tabs" size="lg" />
</div>`,
    },
    {
      title: 'With onClick handler',
      description: 'Handle tab clicks via onClick callback in items',
      preview: `<DuTabs
  :items="[
    { label: 'Tab 1', onClick: () => console.log('Tab 1 clicked') },
    { label: 'Tab 2', onClick: () => console.log('Tab 2 clicked') },
  ]"
  class="w-full"
/>`,
      code: `<DuTabs
  :items="[
    { label: 'Tab 1', onClick: () => handleTabClick(1) },
    { label: 'Tab 2', onClick: () => handleTabClick(2) },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
