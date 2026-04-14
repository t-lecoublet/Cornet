import type { DocPageData } from '@/types/docs'

export default {
  title: 'Filter',
  description: 'Filter provides a radio-button-style toggle group for category filtering. Pass an `items` array where each item has a `title` (display label), optional `checked` boolean, and optional style overrides via `buttonsArgs`. A reset button is always rendered automatically.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/filter/',
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
      description: 'Use `name` to group filters. Defaults to a random ID.',
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
  ],
} satisfies DocPageData
