import type { DocPageData } from '@/types/docs'

export default {
  title: 'Pagination',
  description: 'Pagination component to navigate through pages of content.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/pagination/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuPagination :modelValue="3" :total="100" :perPage="10" />`,
      code: `<DuPagination v-model="page" :total="100" :perPage="10" />`,
    },
    {
      title: 'With first/last buttons',
      preview: `<DuPagination :modelValue="5" :total="250" :perPage="10" showFirst showLast variant="primary" />`,
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
      preview: `<DuPagination :modelValue="6" :total="500" :perPage="10" showFirst showLast showEllipsis :maxPages="5" variant="primary" />`,
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
      preview: `<div class="flex flex-col gap-3 items-start">
  <DuPagination :modelValue="2" :total="100" :perPage="10" variant="primary" />
  <DuPagination :modelValue="2" :total="100" :perPage="10" variant="secondary" />
  <DuPagination :modelValue="2" :total="100" :perPage="10" size="sm" />
</div>`,
      code: `<DuPagination v-model="page" :total="100" :perPage="10" variant="primary" />
<DuPagination v-model="page" :total="100" :perPage="10" variant="secondary" />
<DuPagination v-model="page" :total="100" :perPage="10" size="sm" />
<DuPagination v-model="page" :total="100" :perPage="10" size="xs" />`,
    },
  ],
} satisfies DocPageData
