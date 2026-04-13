import type { DocPageData } from '@/types/docs'

export default {
  title: 'Search',
  description: 'Search input with optional autocomplete suggestions via a datalist.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/input/',
  sections: [
    {
      title: 'Basic',
      preview: `<label class="input w-72">
  <svg class="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
  <input type="search" placeholder="Search..." />
</label>`,
      code: `<DuSearch v-model="query" placeholder="Search..." />`,
    },
    {
      title: 'With autocomplete list',
      code: `<DuSearch
  v-model="author"
  name="author"
  id="author-search"
  placeholder="Search author..."
  :listValues="[
    { id: 1, name: 'Alice Martin' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]"
  :limit="5"
/>`,
    },
    {
      title: 'Variant and size',
      code: `<DuSearch v-model="query" variant="primary" size="lg" placeholder="Search..." />`,
    },
  ],
} satisfies DocPageData
