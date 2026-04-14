import type { DocPageData } from '@/types/docs'

export default {
  title: 'Select',
  description: 'Select is a custom dropdown for picking a single or multiple values from a list of options.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/select/',
  classnames: {
    style: [
      { class: 'select-ghost', desc: 'Transparent ghost style' },
    ],
    color: [
      { class: 'select-primary', desc: 'Primary border on focus' },
      { class: 'select-secondary', desc: 'Secondary border' },
      { class: 'select-accent', desc: 'Accent border' },
      { class: 'select-error', desc: 'Error state' },
      { class: 'select-success', desc: 'Success state' },
    ],
    size: [
      { class: 'select-xs', desc: 'Extra small' },
      { class: 'select-sm', desc: 'Small' },
      { class: 'select-md', desc: 'Medium', default: true },
      { class: 'select-lg', desc: 'Large' },
      { class: 'select-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic (string options)',
      preview: `<DuSelect
  :options="['Apple', 'Banana', 'Cherry']"
  placeholder="Choose a fruit"
  class="w-72"
/>`,
      code: `<DuSelect
  v-model="selected"
  :options="['Apple', 'Banana', 'Cherry']"
  placeholder="Choose a fruit"
/>`,
    },
    {
      title: 'Object options',
      preview: `<DuSelect
  :options="[
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
  ]"
  trackBy="id"
  labelBy="name"
  placeholder="Choose a framework"
  class="w-72"
/>`,
      code: `<DuSelect
  v-model="selected"
  :options="[
    { id: 1, name: 'Vue' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Angular' },
  ]"
  trackBy="id"
  labelBy="name"
  placeholder="Choose a framework"
/>`,
    },
    {
      title: 'Return full object',
      code: `<DuSelect
  v-model="selectedItem"
  :options="items"
  trackBy="id"
  labelBy="name"
  returnObject
/>
<!-- selectedItem will be the full object, not just the id -->`,
    },
    {
      title: 'Multi-select',
      preview: `<DuSelect
  :options="['Vue', 'React', 'Angular', 'Svelte']"
  multiple
  placeholder="Select frameworks..."
  class="w-72"
/>`,
      code: `<DuSelect
  v-model="selectedTags"
  :options="tags"
  multiple
  trackBy="id"
  labelBy="name"
  placeholder="Select tags..."
/>`,
    },
    {
      title: 'Multi-select with checkboxes',
      preview: `<DuSelect
  :options="['Vue', 'React', 'Angular', 'Svelte']"
  multiple
  checkboxes
  placeholder="Select frameworks..."
  class="w-72"
/>`,
      code: `<DuSelect
  v-model="selectedTags"
  :options="tags"
  multiple
  checkboxes
  trackBy="id"
  labelBy="name"
  placeholder="Select tags..."
/>`,
    },
    {
      title: 'Searchable',
      preview: `<DuSelect
  :options="['Apple', 'Banana', 'Cherry', 'Grape', 'Mango', 'Orange']"
  searchable
  placeholder="Choose a fruit"
  class="w-72"
/>`,
      code: `<!-- Search field above the dropdown -->
<DuSelect
  v-model="selected"
  :options="countries"
  searchable
  trackBy="code"
  labelBy="name"
  placeholder="Choose a country"
/>

<!-- Search field inside the dropdown -->
<DuSelect
  v-model="selected"
  :options="countries"
  searchableInside
  trackBy="code"
  labelBy="name"
  placeholder="Choose a country"
/>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuSelect :options="['Apple', 'Banana']" size="xs" placeholder="XSmall" />
  <DuSelect :options="['Apple', 'Banana']" size="sm" placeholder="Small" />
  <DuSelect :options="['Apple', 'Banana']" placeholder="Medium" />
  <DuSelect :options="['Apple', 'Banana']" size="lg" placeholder="Large" />
</div>`,
      code: `<DuSelect v-model="val" :options="opts" size="xs" />
<DuSelect v-model="val" :options="opts" size="sm" />
<DuSelect v-model="val" :options="opts" />
<DuSelect v-model="val" :options="opts" size="lg" />`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuSelect :options="['Apple', 'Banana']" variant="primary" placeholder="Primary" />
  <DuSelect :options="['Apple', 'Banana']" variant="success" placeholder="Success" />
  <DuSelect :options="['Apple', 'Banana']" variant="error" placeholder="Error" />
</div>`,
      code: `<DuSelect v-model="val" :options="opts" variant="primary" />
<DuSelect v-model="val" :options="opts" variant="success" />
<DuSelect v-model="val" :options="opts" variant="error" />`,
    },
  ],
} satisfies DocPageData
