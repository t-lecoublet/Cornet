import type { DocPageData } from '@/types/docs'

export default {
  title: 'Filter',
  description: 'Filter component provides a set of toggle-button filters, useful for category selection.',
  category: 'Data Input',
  sections: [
    {
      title: 'Basic',
      code: `<DuFilter v-model="active" :options="['All', 'Active', 'Archived']" />`,
    },
    {
      title: 'With variant',
      code: `<DuFilter
  v-model="active"
  :options="['All', 'Active', 'Pending', 'Closed']"
  variant="primary"
/>`,
    },
    {
      title: 'Object options',
      code: `<DuFilter
  v-model="status"
  :options="[
    { label: 'All', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ]"
  trackBy="value"
  labelBy="label"
/>`,
    },
  ],
} satisfies DocPageData
