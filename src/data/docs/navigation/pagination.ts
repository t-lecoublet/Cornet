import type { DocPageData } from '@/types/docs'

export default {
  title: 'Pagination',
  description: 'Pagination component to navigate through pages of content.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/pagination/',
  sections: [
    {
      title: 'Basic',
      code: `<DuPagination v-model="page" :total="100" :perPage="10" />`,
    },
    {
      title: 'With first/last buttons',
      code: `<DuPagination
  v-model="page"
  :total="250"
  :perPage="10"
  showFirst
  showLast
  variant="primary"
/>`,
    },
    {
      title: 'With ellipsis',
      code: `<DuPagination
  v-model="page"
  :total="500"
  :perPage="10"
  showFirst
  showLast
  showEllipsis
  :maxPages="5"
  variant="primary"
/>`,
    },
    {
      title: 'Variants & sizes',
      code: `<DuPagination v-model="page" :total="100" :perPage="10" variant="primary" />
<DuPagination v-model="page" :total="100" :perPage="10" variant="secondary" />
<DuPagination v-model="page" :total="100" :perPage="10" size="sm" />
<DuPagination v-model="page" :total="100" :perPage="10" size="xs" />`,
    },
  ],
} satisfies DocPageData
