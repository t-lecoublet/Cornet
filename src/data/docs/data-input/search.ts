import type { DocPageData } from '@/types/docs'

export default {
  title: 'Search',
  description: 'Search input with optional autocomplete suggestions via a datalist.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/input/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuSearch placeholder="Search..." class="w-72" />`,
      code: `<DuSearch v-model="query" placeholder="Search..." />`,
    },
    {
      title: 'With autocomplete list',
      preview: `<DuSearch
  placeholder="Search author..."
  :listValues="[
    { id: 1, name: 'Alice Martin' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]"
  :limit="5"
  class="w-72"
/>`,
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
      preview: `<DuSearch variant="primary" size="lg" placeholder="Search..." class="w-72" />`,
      code: `<DuSearch v-model="query" variant="primary" size="lg" placeholder="Search..." />`,
    },
  ],
} satisfies DocPageData
