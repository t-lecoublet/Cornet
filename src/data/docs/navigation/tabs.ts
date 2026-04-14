import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tabs',
  description: 'Tabs organize content into separate panels, showing one at a time.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/tabs/',
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
      title: 'Border style',
      preview: `<DuTabs
  :items="[{ label: 'Overview' }, { label: 'Settings' }, { label: 'Analytics' }]"
  type="border"
  name="preview_border"
>
  <template #content-0><p class="p-4 text-sm">Overview content</p></template>
  <template #content-1><p class="p-4 text-sm">Settings content</p></template>
  <template #content-2><p class="p-4 text-sm">Analytics content</p></template>
</DuTabs>`,
      code: `<DuTabs v-model="activeTab" :items="tabs" type="border" name="main_tabs">
  <template #content-0>Content for tab 1</template>
  <template #content-1>Content for tab 2</template>
  <template #content-2>Content for tab 3</template>
</DuTabs>`,
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
      code: `<DuTabs v-model="activeTab" :items="tabs" type="box" name="box_tabs">
  <template #content-0>Content 1</template>
  <template #content-1>Content 2</template>
</DuTabs>`,
    },
    {
      title: 'Lifted style',
      preview: `<DuTabs
  :items="[{ label: 'Tab A' }, { label: 'Tab B' }]"
  type="lift"
  name="preview_lift"
>
  <template #content-0><p class="p-4 text-sm">Content A</p></template>
  <template #content-1><p class="p-4 text-sm">Content B</p></template>
</DuTabs>`,
      code: `<DuTabs v-model="activeTab" :items="tabs" type="lift" name="lift_tabs">
  <template #content-0>Content 1</template>
  <template #content-1>Content 2</template>
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
      code: `<DuTabs v-model="activeTab" :items="tabs" type="border" :bottom="true" name="bottom_tabs">
  <template #content-0>Content 1</template>
</DuTabs>`,
    },
    {
      title: 'Defining tab items',
      code: `<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)

const tabs = [
  { label: 'Overview' },
  { label: 'Settings' },
  { label: 'Analytics', disabled: true },
]
</script>`,
    },
  ],
} satisfies DocPageData
