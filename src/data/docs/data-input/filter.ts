import type { DocPageData } from '@/types/docs'

export default {
  title: 'Filter',
  description: 'Filter is a radio-button-style toggle group for picking one category. It renders a `<fieldset>` with a `<legend>` naming the group — a set of radios with no name for the whole set leaves a screen reader unable to say what the buttons have in common. The reset (×) button appears only when something is selected.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/filter/',
  props: [
    {
      title: 'items',
      description: 'Filter items: `title`, `value` (stable identity for v-model — falls back to `title`, then to the index), `checked` (selected initially when uncontrolled), `customClass`, `buttonsArgs`. Extra keys ride along untouched into the `change` payload.',
      type: 'DuFilterItem[]',
    },
    {
      title: 'modelValue',
      description: 'The selected filter\'s value, or `null` for none. Omit it and the filter owns its state; pass it (`v-model`) and yours decides.',
      type: 'string | number | null | undefined',
      default: 'undefined',
    },
    {
      title: 'legend',
      description: 'Names the group of filters. Rendered as a `<legend>`, visually hidden unless `showLegend`.',
      type: 'string',
    },
    {
      title: 'showLegend',
      description: 'Show the legend rather than only exposing it to assistive tech.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'resetLabel',
      description: 'Accessible name of the reset button, whose only visible content is a ×.',
      type: 'string',
      default: "'Clear filter'",
    },
    {
      title: 'name',
      description: 'Radio group name. Derived from `useId()` per instance when omitted, so two filters on a page never share one.',
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
      title: 'v-model',
      description: 'Give each item a `value` and `v-model` carries the selected one, or `null` for none. An item with no `value` falls back to its `title`. The `change` emit still fires alongside it, with the whole item.',
      script: `
        const status = ref('active')
        return { status }
      `,
      preview: `<div class="flex flex-col items-center gap-3">
  <DuFilter
    v-model="status"
    legend="Status"
    :items="[
      { title: 'All', value: 'all' },
      { title: 'Active', value: 'active' },
      { title: 'Archived', value: 'archived' },
    ]"
  />
  <p class="text-sm text-base-content/60">Selected: <strong class="text-base-content">{{ status ?? 'none' }}</strong></p>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const status = ref<string | null>('active')
</script>

<template>
  <DuFilter
    v-model="status"
    legend="Status"
    :items="[
      { title: 'All', value: 'all' },
      { title: 'Active', value: 'active' },
      { title: 'Archived', value: 'archived' },
    ]"
  />
</template>`,
    },
    {
      title: 'Naming the group',
      description: 'The filter is a `<fieldset>` and `legend` is its `<legend>`. It is visually hidden by default — the buttons already read as a group on screen — and `showLegend` puts it back on the page. Give one to every filter: without it, a screen reader announces three unrelated radio buttons.',
      preview: `<div class="flex flex-col items-center gap-4">
  <DuFilter
    legend="Framework"
    showLegend
    :items="[
      { title: 'Vue', checked: true },
      { title: 'React' },
      { title: 'Svelte' },
    ]"
  />
</div>`,
      code: `<!-- exposed to assistive tech, not shown -->
<DuFilter legend="Framework" :items="items" />

<!-- shown too -->
<DuFilter legend="Framework" showLegend :items="items" />`,
    },
    {
      title: 'Named group',
      description: 'Each filter derives its own radio-group `name` from `useId()`, so two filters on one page no longer share a group. Pass `name` only when you need a fixed one — a form posting a plain HTML body, say.',
      preview: `<DuFilter
  name="status-filter"
  legend="Status"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Inactive' },
  ]"
/>`,
      code: `<DuFilter
  name="status-filter"
  legend="Status"
  :items="[
    { title: 'All', checked: true },
    { title: 'Active' },
    { title: 'Inactive' },
  ]"
/>`,
    },
    {
      title: 'Manual slot mode',
      description: 'When `items` is not passed, DuFilter renders its default slot. Use DuButton with `checked` to build filter items yourself. In this mode the component cannot know what is selected, so the reset button is not rendered — wire your own.',
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
