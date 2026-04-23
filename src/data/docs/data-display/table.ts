import type { DocPageData } from '@/types/docs'

export default {
  title: 'Table',
  description: 'Table is used to display tabular data with headers, rows, and optional actions. Supports both dynamic mode with columns/rows and manual mode for full control.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/table/',
  props: [
    {
      title: 'columns',
      description: 'Array of column definitions with key, label, and customClass',
      type: 'TABLEColumn[]',
    },
    {
      title: 'rows',
      description: 'Array of row data objects with id and values for each column key',
      type: 'TABLERow[]',
    },
    {
      title: 'zebra',
      description: 'Apply alternating row colors',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'pinRows',
      description: 'Pin header and footer rows on scroll',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'pinCols',
      description: 'Pin first/last columns on scroll',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'size',
      description: 'Size of table rows',
      type: 'string',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for the table element',
      type: 'string',
    },
    {
      title: 'header',
      description: 'Show table header row',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'footer',
      description: 'Show table footer row',
      type: 'boolean',
      default: 'false',
    },
  ],
  slots: [
    {
      title: 'Cell slots (#cell-{key})',
      description: 'Customize cells with slot props: row, column, value',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
  ]"
>
  <template #cell-status="{ value }">
    <DuBadge :variant="value === 'active' ? 'success' : 'error'" size="sm">
      {{ value }}
    </DuBadge>
  </template>
  <template #cell-actions="{ row }">
    <DuButton size="xs" ghost>Edit</DuButton>
  </template>
</DuTable>`,
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
      title: 'Header slots (#header-{key})',
      description: 'Customize header cells with slot props: column',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ]"
>
  <template #header-name="{ column }">
    <span class="flex items-center gap-1">
      <span>👤</span>
      {{ column.label }}
    </span>
  </template>
</DuTable>`,
      code: `<DuTable :columns="columns" :rows="rows">
  <template #header-name="{ column }">
    <span class="text-primary">{{ column.label }}</span>
  </template>
</DuTable>`,
    },
    {
      title: 'Footer slots (#footer-{key})',
      description: 'Customize footer cells with slot props: column',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ]"
  :footer="true"
>
  <template #footer-name>
    <span class="font-bold">Total</span>
  </template>
</DuTable>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  :footer="true"
>
  <template #footer-name>
    <span class="font-bold">Total: {{ rows.length }}</span>
  </template>
</DuTable>`,
    },
    {
      title: 'Custom header slot (#header)',
      description: 'Replace entire header with custom content',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'job', label: 'Job' },
    { key: 'status', label: 'Status' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', job: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob', job: 'Designer', status: 'Away' },
  ]"
>
  <template #header>
    <tr>
      <th class="bg-primary text-primary-content">Name</th>
      <th class="bg-primary text-primary-content">Job</th>
      <th class="bg-primary text-primary-content">Status</th>
    </tr>
  </template>
</DuTable>`,
      code: `<DuTable :columns="columns" :rows="rows">
  <template #header>
    <tr>
      <th>Custom Header</th>
      <th>Custom Header</th>
    </tr>
  </template>
</DuTable>`,
    },
    {
      title: 'Custom footer slot (#footer)',
      description: 'Replace entire footer with custom content',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'job', label: 'Job' },
    { key: 'status', label: 'Status' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', job: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob', job: 'Designer', status: 'Away' },
  ]"
  :footer="true"
>
  <template #footer>
    <tr>
      <td colspan="3" class="text-right font-bold">
        Total employees: 2
      </td>
    </tr>
  </template>
</DuTable>`,
      code: `<DuTable :columns="columns" :rows="rows" :footer="true">
  <template #footer>
    <tr>
      <td colspan="3" class="text-right font-bold">
        Total: {{ rows.length }} rows
      </td>
    </tr>
  </template>
</DuTable>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use default slot for manual table HTML structure',
      preview: `<DuTable zebra class="w-full">
  <thead>
    <tr>
      <th>Name</th>
      <th>Job</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Developer</td>
      <td><DuBadge variant="success" size="sm">Active</DuBadge></td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Designer</td>
      <td><DuBadge variant="warning" size="sm">Away</DuBadge></td>
    </tr>
  </tbody>
</DuTable>`,
      code: `<DuTable zebra>
  <thead>
    <tr>
      <th>Name</th>
      <th>Job</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Developer</td>
      <td>Active</td>
    </tr>
  </tbody>
</DuTable>`,
    },
  ],
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
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  ]"
/>`,
      code: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
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
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Charlie', role: 'User' },
  ]"
/>`,
      code: `<DuTable zebra :columns="columns" :rows="rows" />`,
    },
    {
      title: 'With custom cell slots',
      description: 'Use `#cell-{key}` to customize a cell by column key. Slot props: `{ value, row, column }`. Use `value` for the cell content, `row` for the full row object.',
      links: [
        { label: 'Vue scoped slots docs', href: 'https://vuejs.org/guide/components/slots.html#scoped-slots' },
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', status: 'active' },
    { id: 2, name: 'Bob', status: 'inactive' },
  ]"
>
  <template #cell-status="{ value }">
    <DuBadge :variant="value === 'active' ? 'success' : 'error'" size="sm">
      {{ value }}
    </DuBadge>
  </template>
  <template #cell-action="{ row }">
    <DuButton size="xs" ghost>Edit</DuButton>
  </template>
</DuTable>`,
      code: `<DuTable :columns="columns" :rows="rows">
  <template #cell-status="{ value }">
    <DuBadge :variant="value === 'active' ? 'success' : 'error'" size="sm">
      {{ value }}
    </DuBadge>
  </template>
  <template #cell-action="{ row }">
    <DuButton size="xs" ghost @click="edit(row)">Edit</DuButton>
  </template>
</DuTable>`,
    },
    {
      title: 'With footer',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'job', label: 'Job' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', job: 'Developer' },
    { id: 2, name: 'Bob', job: 'Designer' },
  ]"
  :footer="true"
/>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  :footer="true"
/>`,
    },
    {
      title: 'Pinned rows',
      description: 'Header and footer stay fixed on scroll',
      preview: `<div class="h-48 overflow-auto">
  <DuTable
    :columns="[
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
    ]"
    :rows="[
      { id: 1, name: 'Alice', role: 'Admin' },
      { id: 2, name: 'Bob', role: 'User' },
      { id: 3, name: 'Charlie', role: 'User' },
      { id: 4, name: 'Diana', role: 'Admin' },
      { id: 5, name: 'Eve', role: 'User' },
      { id: 6, name: 'Frank', role: 'User' },
    ]"
    :pinRows="true"
  />
</div>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  :pinRows="true"
  class="h-48"
/>`,
    },
    {
      title: 'Pinned columns',
      description: 'First column stays fixed on horizontal scroll',
      preview: `<DuTable
  :columns="[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', department: 'IT' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', department: 'Sales' },
  ]"
  :pinCols="true"
/>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  :pinCols="true"
/>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-4">
  <DuTable size="xs"
    :columns="[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]"
    :rows="[{ id: 1, name: 'Alice', role: 'Admin' }, { id: 2, name: 'Bob', role: 'User' }]"
  />
  <DuTable size="lg"
    :columns="[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }]"
    :rows="[{ id: 1, name: 'Alice', role: 'Admin' }, { id: 2, name: 'Bob', role: 'User' }]"
  />
</div>`,
      code: `<DuTable size="xs" :columns="columns" :rows="rows" />
<DuTable size="sm" :columns="columns" :rows="rows" />
<DuTable size="md" :columns="columns" :rows="rows" />
<DuTable size="lg" :columns="columns" :rows="rows" />`,
    },
    {
      title: 'Without header',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ]"
  :header="false"
/>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  :header="false"
/>`,
    },
    {
      title: 'With custom class',
      preview: `<DuTable
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ]"
  :rows="[
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ]"
  class="border border-base-300 rounded-lg"
/>`,
      code: `<DuTable
  :columns="columns"
  :rows="rows"
  class="border border-base-300 rounded-lg"
/>`,
    },
  ],
} satisfies DocPageData
