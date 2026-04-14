import type { DocPageData } from '@/types/docs'

export default {
  title: 'Dropdown',
  description: 'Dropdown can open a menu or any other element when the button is clicked. Supports multiple placement formats: string, comma-separated, array, and object.',
  category: 'Actions',
  source: 'https://daisyui.com/components/dropdown/',
  props: [
    {
      title: 'hover',
      description: 'Open dropdown on hover instead of click',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'open',
      description: 'Force dropdown to be open',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'placement',
      description: 'Dropdown position (supports string, comma-separated, array, and object formats)',
      type: 'string | string[] | object',
      default: '"bottom"',
    },
  ],
  slots: [
    {
      title: 'Slot #trigger',
      description: 'Element that triggers the dropdown',
      preview: `<DuDropdown>
  <template #trigger>
    <DuButton soft>Click me</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>`,
      code: `<DuDropdown>
  <template #trigger>
    <DuButton>Click me</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>`,
    },
    {
      title: 'Slot #content',
      description: 'Content displayed in the dropdown panel',
      preview: `<DuDropdown>
  <template #trigger>
    <DuButton soft>Menu</DuButton>
  </template>
  <template #content>
    <DuMenu :items="items" class="bg-base-200 w-40" />
  </template>
</DuDropdown>`,
      code: `<DuDropdown>
  <template #trigger>
    <DuButton>Menu</DuButton>
  </template>
  <template #content>
    <div class="p-4">Custom content here</div>
  </template>
</DuDropdown>`,
    },
  ],
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
    <DuButton soft>Click me</DuButton>
  </template>
  <DuMenu
    :items="[
      { label: 'Item 1' },
      { label: 'Item 2' }
    ]"
    class="bg-base-200 w-40"
  />
</DuDropdown>`,
      code: `<DuDropdown>
  <template #trigger>
    <DuButton>Click me</DuButton>
  </template>
  <DuMenu
    :items="[
      { label: 'Item 1' },
      { label: 'Item 2' }
    ]"
    class="bg-base-200 w-40"
  />
</DuDropdown>`,
    },
    {
      title: 'Open on hover',
      preview: `<DuDropdown hover>
  <template #trigger>
    <DuButton soft>Hover me</DuButton>
  </template>
  <DuMenu
    :items="[
      { label: 'Item 1' },
      { label: 'Item 2' }
    ]"
    class="bg-base-200 w-40"
  />
</DuDropdown>`,
      code: `<DuDropdown hover>
  <template #trigger>
    <DuButton>Hover me</DuButton>
  </template>
  <DuMenu
    :items="[
      { label: 'Item 1' },
      { label: 'Item 2' }
    ]"
    class="bg-base-200 w-40"
  />
</DuDropdown>`,
    },
    {
      title: 'Placement',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <DuDropdown placement="left">
    <template #trigger><DuButton>Left</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
  </DuDropdown>
    <DuDropdown placement="top">
    <template #trigger><DuButton>Top</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
  </DuDropdown>
    <DuDropdown placement="bottom">
    <template #trigger><DuButton>Bottom</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
  </DuDropdown>
  <DuDropdown placement="right">
    <template #trigger><DuButton>Right</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
  </DuDropdown>
</div>`,
      code: `<DuDropdown placement="left">
  <template #trigger><DuButton>Left</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>

  <DuDropdown placement="top">
  <template #trigger><DuButton>Top</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>

  <DuDropdown placement="bottom">
  <template #trigger><DuButton>Bottom</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>

<DuDropdown placement="right">
  <template #trigger><DuButton>Right</DuButton></template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />
</DuDropdown>`,
    },
    {
      title: 'Forced open',
      preview: `<DuDropdown :open="true">
  <template #trigger>
    <DuButton soft>Always open</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />

</DuDropdown>`,
      code: `<DuDropdown :open="true">
  <template #trigger>
    <DuButton>Always open</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item 1' }]" class="bg-base-200 w-40" />

</DuDropdown>`,
    },
    {
      title: 'Combined placement',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <DuDropdown placement="top,end">
    <template #trigger><DuButton>top,end</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
  </DuDropdown>
  <DuDropdown :placement="['bottom', 'start']">
    <template #trigger><DuButton>Array</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
  </DuDropdown>
  <DuDropdown :placement="{ right: true }">
    <template #trigger><DuButton>Object</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
  </DuDropdown>
</div>`,
      code: `<!-- String with comma -->
<DuDropdown placement="top,end">
  <template #trigger>
    <DuButton>top,end</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
</DuDropdown>

<!-- Array -->
<DuDropdown :placement="['bottom', 'start']">
  <template #trigger>
    <DuButton>Array</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
</DuDropdown>

<!-- Object shorthand -->
<DuDropdown :placement="{ right: true }">
  <template #trigger>
    <DuButton>Object</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" class="bg-base-200" />
</DuDropdown>`,
    },
  ],
} satisfies DocPageData
