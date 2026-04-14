import type { DocPageData } from '@/types/docs'

export default {
  title: 'Dropdown',
  description: 'Dropdown can open a menu or any other element when the button is clicked.',
  category: 'Actions',
  source: 'https://daisyui.com/components/dropdown/',
  classnames: {
    placement: [
      { class: 'bottom', desc: 'Opens downward', default: true },
      { class: 'top', desc: 'Opens upward' },
      { class: 'left', desc: 'Opens to the left' },
      { class: 'right', desc: 'Opens to the right' },
      { class: 'start', desc: 'Aligns to start' },
      { class: 'center', desc: 'Aligns to center' },
      { class: 'end', desc: 'Aligns to end' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuDropdown>
  <template #trigger>
    <DuButton>Click me</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</DuDropdown>`,
      code: `<DuDropdown>
  <template #trigger>
    <DuButton>Click me</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</DuDropdown>`,
    },
    {
      title: 'Open on hover',
      preview: `<DuDropdown hover>
  <template #trigger>
    <DuButton>Hover me</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</DuDropdown>`,
      code: `<DuDropdown hover>
  <template #trigger>
    <DuButton>Hover me</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</DuDropdown>`,
    },
    {
      title: 'Placement',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <DuDropdown placement="top">
    <template #trigger><DuButton size="sm">Top</DuButton></template>
    <ul class="menu menu-sm w-36"><li><a>Item 1</a></li></ul>
  </DuDropdown>
  <DuDropdown placement="right">
    <template #trigger><DuButton size="sm">Right</DuButton></template>
    <ul class="menu menu-sm w-36"><li><a>Item 1</a></li></ul>
  </DuDropdown>
</div>`,
      code: `<!-- Opens upward -->
<DuDropdown placement="top">
  <template #trigger>
    <DuButton>Open top</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
  </ul>
</DuDropdown>

<!-- Opens to the right -->
<DuDropdown placement="right">
  <template #trigger>
    <DuButton>Open right</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
  </ul>
</DuDropdown>`,
    },
    {
      title: 'Forced open',
      preview: `<DuDropdown :open="true">
  <template #trigger>
    <DuButton>Always open</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</DuDropdown>`,
      code: `<DuDropdown :open="true">
  <template #trigger>
    <DuButton>Always open</DuButton>
  </template>
  <ul class="menu menu-sm w-48">
    <li><a>Item 1</a></li>
  </ul>
</DuDropdown>`,
    },
  ],
} satisfies DocPageData
