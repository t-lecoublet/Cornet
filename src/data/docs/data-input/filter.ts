import type { DocPageData } from '@/types/docs'

export default {
  title: 'Filter',
  description: 'Filter provides a radio-button-style toggle group for category filtering. Pass an `items` array where each item has a `title` (display label), optional `checked` boolean, and optional style overrides via `buttonsArgs`. A reset button is always rendered automatically.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/filter/',
  props: [
    {
      title: 'items',
      description: 'Array of filter items with title, checked, customClass and buttonsArgs',
      type: 'DuFilterItem[]',
    },
    {
      title: 'name',
      description: 'Radio group name. Generated per instance when omitted.',
      type: 'string',
    },
    {
      title: 'buttonsArgs',
      description: 'DuButton props applied to every filter button. A per-item `buttonsArgs` takes priority.',
      type: 'DuFilterButtonArgs',
    },
  ],
  sections: [
    {
      title: 'Basic',
      preview: `<DuFilter
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Archived' },
  ]"
/>`,
      code: `<DuFilter
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Archived' },
  ]"
/>`,
    },
    {
      title: 'change event',
      description: 'The `change` event fires with the clicked item — or `undefined` when the reset (×) button is used.',
      script: `
        const active = ref('All')
        return { active }
      `,
      preview: `<div class="flex flex-col items-center gap-3">
  <DuFilter
    :items="[
      { title: 'All', checked: true },
      { title: 'Active' },
      { title: 'Archived' },
    ]"
    @change="(item) => active = item ? item.title : 'All'"
  />
  <p class="text-sm text-base-content/60">Active: <strong class="text-base-content">{{ active }}</strong></p>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
import type { DuFilterItem } from 'cornet-ui/types'

const active = ref<string | undefined>('All')

function onChange(item: DuFilterItem | undefined) {
  // undefined = the reset (×) button was clicked
  active.value = item?.title
}
</script>

<template>
  <DuFilter
    :items="[
      { title: 'All', checked: true },
      { title: 'Active' },
      { title: 'Archived' },
    ]"
    @change="onChange"
  />
</template>`,
    },
    {
      title: 'With button style',
      description: 'Use `buttonsArgs` on DuFilter to style all buttons, or per-item `buttonsArgs` for individual overrides.',
      preview: `<DuFilter
  :buttonsArgs="{ variant: 'primary', outline: true }"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Pending' },
    { title: 'Closed' },
  ]"
/>`,
      code: `<DuFilter
  :buttonsArgs="{ variant: 'primary', outline: true }"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Pending' },
    { title: 'Closed' },
  ]"
/>`,
    },
    {
      title: 'Per-item style override',
      preview: `<DuFilter
  :items="[
    { title: 'All', checked: true },
    { title: 'In Progress', buttonsArgs: { variant: 'warning', soft: true } },
    { title: 'Done', buttonsArgs: { variant: 'success', soft: true } },
    { title: 'Blocked', buttonsArgs: { variant: 'error', soft: true } },
  ]"
/>`,
      code: `<DuFilter
  :items="[
    { title: 'All', checked: true },
    { title: 'In Progress', buttonsArgs: { variant: 'warning', soft: true } },
    { title: 'Done', buttonsArgs: { variant: 'success', soft: true } },
    { title: 'Blocked', buttonsArgs: { variant: 'error', soft: true } },
  ]"
/>`,
    },
    {
      title: 'Named group',
      description: 'Use `name` to group filters. Defaults to a random ID. Useful when you have multiple filter groups on the same page.',
      preview: `<DuFilter
  name="status-filter"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Inactive' },
  ]"
/>`,
      code: `<DuFilter
  name="status-filter"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Inactive' },
  ]"
/>`,
    },
    {
      title: 'Manual slot mode',
      description: 'When `items` is not passed, DuFilter renders its default slot. Use DuButton with `checked` to build custom filter items manually. The reset button is still rendered automatically at the start.',
      links: [
        { label: 'DuButton docs', href: '/docs/actions/button' },
        { label: 'DaisyUI filter docs', href: 'https://daisyui.com/components/filter/' },
      ],
      preview: `<DuFilter name="manual-demo">
  <DuButton label="Vue" :checked="true" customClass="btn filter-item" />
  <DuButton label="React" customClass="btn filter-item" />
  <DuButton label="Svelte" customClass="btn filter-item" />
</DuFilter>`,
      code: `<DuFilter name="framework-filter">
  <DuButton label="Vue" :checked="true" customClass="btn filter-item" />
  <DuButton label="React" customClass="btn filter-item" />
  <DuButton label="Svelte" customClass="btn filter-item" />
  <DuButton label="Angular" customClass="btn filter-item" />
</DuFilter>`,
    },
    {
      title: 'Dynamic items from data',
      description: 'Generate filter items from an array with `v-for` using the `items` prop.',
      links: [
        { label: 'Vue v-for docs', href: 'https://vuejs.org/guide/essentials/list.html' },
      ],
      preview: `<DuFilter
  :items="[
    { title: 'All', checked: true },
    { title: 'Design' },
    { title: 'Development' },
    { title: 'Marketing' },
  ]"
/>`,
      code: `<script setup lang="ts">
const categories = ['All', 'Design', 'Development', 'Marketing', 'Sales']
const selected = ref('All')

const filterItems = computed(() =>
  categories.map(c => ({ title: c, checked: c === selected.value }))
)
</script>

<template>
  <DuFilter :items="filterItems" @change="selected = $event.target.value" />
</template>`,
    },
  ],
} satisfies DocPageData
