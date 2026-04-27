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
    { label: 'Home', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25\\' /></svg>' },
    { label: 'Settings', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z\\' /><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M15 12a3 3 0 11-6 0 3 3 0 016 0z\\' /></svg>' },
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
    { label: 'Home', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25\\' /></svg>' },
    { label: 'Settings', icon: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'currentColor\\' class=\\'w-5 h-5\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28zM15 12a3 3 0 11-6 0 3 3 0 016 0z\\' /></svg>' },
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
