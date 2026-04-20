import type { DocPageData } from '@/types/docs'

export default {
  title: 'FAB',
  description: 'Floating Action Button — a speed-dial button that reveals multiple actions on click.',
  category: 'Actions',
  source: 'https://daisyui.com/components/fab/',
  classnames: {
    modifier: [
      { class: 'fab-flower', desc: 'Flower layout for action items' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="relative h-32 w-64 border border-base-300 rounded-xl">
  <DuFab
    :mainAction="{ label: '+', variant: 'primary' }"
    :items="[
      { label: 'Edit' },
      { label: 'Share' },
      { label: 'Delete' },
    ]"
  />
</div>`,
      code: `<DuFab
  :mainAction="{ label: '+', variant: 'primary' }"
  :items="[
    { label: 'Edit', tooltip: 'Edit' },
    { label: 'Share', tooltip: 'Share' },
    { label: 'Delete', tooltip: 'Delete' },
  ]"
/>`,
    },
    {
      title: 'With icons',
      links: [
        { label: 'Heroicons', href: 'https://heroicons.com/' },
      ],
      preview: `<div class="relative h-32 w-64 border border-base-300 rounded-xl">
  <DuFab
    :mainAction="{ label: '+', variant: 'primary' }"
    :items="[
      { label: '✏️', tooltip: 'Edit', tooltipPosition: 'left' },
      { label: '🗑️', tooltip: 'Delete', tooltipPosition: 'left', customClass: 'btn-error' },
    ]"
  />
</div>`,
      code: `<DuFab
  :mainAction="{ icon: PlusIcon, variant: 'primary' }"
  :items="[
    { icon: PencilIcon, tooltip: 'Edit', tooltipPosition: 'left' },
    { icon: ShareIcon, tooltip: 'Share', tooltipPosition: 'left' },
    { icon: TrashIcon, tooltip: 'Delete', tooltipPosition: 'left', customClass: 'btn-error' },
  ]"
/>`,
    },
    {
      title: 'With click handlers',
      preview: `<div class="relative h-32 w-64 border border-base-300 rounded-xl">
  <DuFab
    :mainAction="{ label: '+', variant: 'primary' }"
    :items="[
      { label: 'Edit' },
      { label: 'Delete', customClass: 'btn-error' },
    ]"
  />
</div>`,
      code: `<DuFab
  :mainAction="{ label: '+', variant: 'primary', onClick: () => console.log('main') }"
  :items="[
    { label: 'Edit', onClick: () => edit() },
    { label: 'Delete', onClick: () => remove(), customClass: 'btn-error' },
  ]"
/>`,
    },
    {
      title: 'Flower modifier',
      description: 'Use `modifier="fab-flower"` for flower-style layout.',
      preview: `<div class="relative h-40 w-64 border border-base-300 rounded-xl">
  <DuFab
    modifier="fab-flower"
    :mainAction="{ label: '✕', variant: 'primary' }"
    :items="[
      { label: '📷', tooltip: 'Camera' },
      { label: '📁', tooltip: 'Folder' },
      { label: '⭐', tooltip: 'Star' },
    ]"
  />
</div>`,
      code: `<DuFab
  modifier="fab-flower"
  :mainAction="{ label: '✕', variant: 'primary' }"
  :items="[
    { label: '📷', tooltip: 'Camera' },
    { label: '📁', tooltip: 'Folder' },
    { label: '⭐', tooltip: 'Star' },
  ]"
/>`,
    },
    {
      title: 'Positions',
      description: 'Control where the FAB appears with `position` prop.',
      preview: `<div class="relative h-40 w-64 border border-base-300 rounded-xl">
  <DuFab
    :mainAction="{ label: '↗', variant: 'primary' }"
    :items="[{ label: 'Test' }]"
    position="top-right"
  />
</div>`,
      code: `<!-- Positions: top-right, top-left, bottom-right, bottom-left -->
<DuFab
  :mainAction="{ label: '↗', variant: 'primary' }"
  :items="[{ label: 'Test' }]"
  position="top-right"
/>`,
    },
    {
      title: 'With close button',
      description: 'Show a close button when the FAB is expanded.',
      preview: `<div class="relative h-32 w-64 border border-base-300 rounded-xl">
  <DuFab
    :mainAction="{ label: '+', variant: 'primary' }"
    :items="[{ label: 'Item 1' }]"
    :closeButton="{ label: 'Close' }"
  />
</div>`,
      code: `<DuFab
  :mainAction="{ label: '+', variant: 'primary' }"
  :items="[{ label: 'Item 1' }]"
  :closeButton="{ label: 'Close', variant: 'error' }"
/>`,
    },
    {
      title: 'Sizes & variants',
      preview: `<div class="flex flex-col gap-4 items-center">
  <div class="relative w-48 h-24 border border-base-300 rounded-xl">
    <DuFab
      :mainAction="{ label: 'S', variant: 'primary' }"
      size="sm"
      :items="[{ label: '1' }]"
    />
  </div>
  <div class="relative w-48 h-24 border border-base-300 rounded-xl">
    <DuFab
      :mainAction="{ label: 'M', variant: 'secondary' }"
      size="md"
      :items="[{ label: '1' }]"
    />
  </div>
  <div class="relative w-48 h-24 border border-base-300 rounded-xl">
    <DuFab
      :mainAction="{ label: 'L', variant: 'accent' }"
      size="lg"
      :items="[{ label: '1' }]"
    />
  </div>
</div>`,
      code: `<DuFab
  :mainAction="{ label: 'S', variant: 'primary' }"
  size="sm"
  :items="[{ label: '1' }]"
/>
<DuFab
  :mainAction="{ label: 'M', variant: 'secondary' }"
  size="md"
  :items="[{ label: '1' }]"
/>
<DuFab
  :mainAction="{ label: 'L', variant: 'accent' }"
  size="lg"
  :items="[{ label: '1' }]"
/>`,
    },
  ],
} satisfies DocPageData
