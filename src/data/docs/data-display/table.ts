import type { DocPageData } from '@/types/docs'

export default {
  title: 'Table',
  description: 'Table is used to display tabular data with headers, rows, and optional actions.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/table/',
  classnames: {
    modifier: [
      { class: 'table-zebra', desc: 'Alternating row colors' },
      { class: 'table-pin-rows', desc: 'Pins header/footer rows on scroll' },
      { class: 'table-pin-cols', desc: 'Pins first/last columns on scroll' },
    ],
    size: [
      { class: 'table-xs', desc: 'Extra small rows' },
      { class: 'table-sm', desc: 'Small rows' },
      { class: 'table-md', desc: 'Medium rows', default: true },
      { class: 'table-lg', desc: 'Large rows' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
  ]"
/>`,
      code: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' },
  ]"
/>`,
    },
    {
      title: 'Zebra stripes',
      preview: `<DuTable
  zebra
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { name: 'Alice', role: 'Admin' },
    { name: 'Bob', role: 'User' },
    { name: 'Charlie', role: 'User' },
  ]"
/>`,
      code: `<DuTable zebra :columns="columns" :rows="rows" />`,
    },
    {
      title: 'With custom cell slot',
      code: `<DuTable :columns="columns" :rows="rows">
  <template #cell-status="{ value }">
    <DuBadge :variant="value === 'active' ? 'success' : 'error'" size="sm">
      {{ value }}
    </DuBadge>
  </template>
  <template #cell-actions="{ row }">
    <DuButton size="xs" ghost @click="edit(row)">Edit</DuButton>
  </template>
</DuTable>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-4">
  <DuTable size="xs"
    :columns="[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]"
    :rows="[{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'User' }]"
  />
  <DuTable size="lg"
    :columns="[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]"
    :rows="[{ name: 'Alice', role: 'Admin' }, { name: 'Bob', role: 'User' }]"
  />
</div>`,
      code: `<DuTable size="xs" :columns="columns" :rows="rows" />
<DuTable size="sm" :columns="columns" :rows="rows" />
<DuTable size="md" :columns="columns" :rows="rows" />
<DuTable size="lg" :columns="columns" :rows="rows" />`,
    },
  ],
} satisfies DocPageData
