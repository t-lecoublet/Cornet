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
      code: `<DuTabs v-model="activeTab" :items="tabs" type="border" name="main_tabs">
  <template #content-0>Content for tab 1</template>
  <template #content-1>Content for tab 2</template>
  <template #content-2>Content for tab 3</template>
</DuTabs>`,
    },
    {
      title: 'Box (pill) style',
      code: `<DuTabs v-model="activeTab" :items="tabs" type="box" name="box_tabs">
  <template #content-0>Content 1</template>
  <template #content-1>Content 2</template>
</DuTabs>`,
    },
    {
      title: 'Lifted style',
      code: `<DuTabs v-model="activeTab" :items="tabs" type="lift" name="lift_tabs">
  <template #content-0>Content 1</template>
  <template #content-1>Content 2</template>
</DuTabs>`,
    },
    {
      title: 'Tabs at bottom',
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
