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
      description: 'Dropdown position. Accepts a single value, a comma-separated string, an array, or an object — in object form only the keys set to `true` are applied.',
      type: 'DuDropdownPlacementInput',
      default: '"bottom"',
      options: ['start', 'center', 'end', 'top', 'bottom', 'left', 'right'],
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
    component: [
      { class: 'dropdown', desc: 'Base class on the wrapper, always applied.' },
      { class: 'dropdown-content', desc: 'The panel. Ships with bg-base-100 rounded-box shadow-sm.' },
    ],
    modifier: [
      { class: 'dropdown-hover', desc: 'Opens on hover — hover' },
      { class: 'dropdown-open', desc: 'Forced open — open' },
    ],
    placement: [
      { class: 'dropdown-top', desc: 'placement="top"' },
      { class: 'dropdown-bottom', desc: 'placement="bottom"' },
      { class: 'dropdown-left', desc: 'placement="left"' },
      { class: 'dropdown-right', desc: 'placement="right"' },
      { class: 'dropdown-start', desc: 'placement="start"' },
      { class: 'dropdown-center', desc: 'placement="center"' },
      { class: 'dropdown-end', desc: 'placement="end"' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      description: 'Use `#trigger` for the element that opens the dropdown, and the default slot (or `#content`) for the panel. Any component can go in the content slot — not just DuMenu.',
      links: [
        { label: 'Vue named slots docs', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
        { label: 'DuMenu docs', href: '/docs/navigation/menu' },
      ],
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
      title: 'Custom content (not DuMenu)',
      description: "The content slot accepts any element — use a card, form, or any custom UI inside the dropdown. You just need to add 'tabindex=0' to the trigger element to make it focusable if it's needed.",
      preview: `<DuDropdown placement="bottom,end">
  <template #trigger>
    <DuAvatar size="sm" rounded="full" ring ringColor="primary" placeholder variant="primary" tabindex="0" class="cursor-pointer">JD</DuAvatar>
  </template>
  <div class="bg-base-100 border border-base-300 rounded-xl shadow-lg p-4 w-56 flex flex-col gap-3 mt-2">
    <div class="flex items-center gap-3">
      <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
      <div>
        <div class="font-semibold text-sm">John Doe</div>
        <div class="text-xs text-base-content/50">john@example.com</div>
      </div>
    </div>
    <div class="divider my-0"></div>
    <DuButton ghost size="sm" class="justify-start">Profile</DuButton>
    <DuButton ghost size="sm" class="justify-start">Settings</DuButton>
    <DuButton variant="error" soft size="sm" class="justify-start">Sign out</DuButton>
  </div>
</DuDropdown>`,
      code: `<DuDropdown placement="bottom,end">
  <template #trigger>
    <DuAvatar size="sm" rounded="full" placeholder variant="primary" tabindex="0" class="cursor-pointer">JD</DuAvatar>
  </template>
  <div class="bg-base-100 border border-base-300 rounded-xl shadow-lg p-4 w-56">
    <div class="flex items-center gap-3 mb-3">
      <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
      <div>
        <div class="font-semibold text-sm">{{ user.name }}</div>
        <div class="text-xs text-base-content/50">{{ user.email }}</div>
      </div>
    </div>
    <div class="divider my-0"></div>
    <DuButton ghost size="sm" class="w-full justify-start" @click="goToProfile">Profile</DuButton>
    <DuButton variant="error" soft size="sm" class="w-full justify-start" @click="signOut">Sign out</DuButton>
  </div>
</DuDropdown>`,
    },
    {
      title: 'Combined placement',
      description: 'In object form only the keys set to `true` are applied — `{ top: true, end: false }` yields `dropdown-top` alone.',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <DuDropdown placement="top,end">
    <template #trigger><DuButton>top,end</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" />
  </DuDropdown>
  <DuDropdown :placement="['bottom', 'start']">
    <template #trigger><DuButton>Array</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" />
  </DuDropdown>
  <DuDropdown :placement="{ top: true, end: false }">
    <template #trigger><DuButton>Object</DuButton></template>
    <DuMenu :items="[{ label: 'Item' }]" />
  </DuDropdown>
</div>`,
      code: `<!-- String with comma -->
<DuDropdown placement="top,end">
  <template #trigger>
    <DuButton>top,end</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" />
</DuDropdown>

<!-- Array -->
<DuDropdown :placement="['bottom', 'start']">
  <template #trigger>
    <DuButton>Array</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" />
</DuDropdown>

<!-- Object: only truthy keys apply → dropdown-top -->
<DuDropdown :placement="{ top: true, end: false }">
  <template #trigger>
    <DuButton>Object</DuButton>
  </template>
  <DuMenu :items="[{ label: 'Item' }]" />
</DuDropdown>`,
    },
    {
      title: 'Default content styling',
      description: 'The `.dropdown-content` wrapper ships with `bg-base-100 rounded-box shadow-sm`, so a dropdown looks right out of the box — you no longer need to add a background to whatever you put inside it. Add your own classes to the child to override.',
      preview: `<DuDropdown placement="bottom">
  <template #trigger><DuButton>Open</DuButton></template>
  <div class="p-4 w-52 text-sm">
    <p class="font-medium">No background needed</p>
    <p class="text-base-content/60 text-xs mt-1">The dropdown supplies it.</p>
  </div>
</DuDropdown>`,
      code: `<DuDropdown placement="bottom">
  <template #trigger>
    <DuButton>Open</DuButton>
  </template>
  <!-- .dropdown-content already has bg-base-100 rounded-box shadow-sm -->
  <div class="p-4 w-52">
    Any content
  </div>
</DuDropdown>`,
    },
  ],
} satisfies DocPageData
