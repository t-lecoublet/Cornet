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
      preview: `<div class="overflow-x-auto rounded-xl border border-base-300 w-full">
  <table class="table">
    <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
    <tbody>
      <tr><td>Alice</td><td>alice@example.com</td><td>Admin</td></tr>
      <tr><td>Bob</td><td>bob@example.com</td><td>User</td></tr>
    </tbody>
  </table>
</div>`,
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
      code: `<DuTable size="xs" :columns="columns" :rows="rows" />
<DuTable size="sm" :columns="columns" :rows="rows" />
<DuTable size="md" :columns="columns" :rows="rows" />
<DuTable size="lg" :columns="columns" :rows="rows" />`,
    },
  ],
} satisfies DocPageData
