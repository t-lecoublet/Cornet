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
      title: 'Flower layout',
      code: `<DuFab
  modifier="fab-flower"
  :mainAction="{ icon: PlusIcon, variant: 'primary' }"
  :items="[
    { icon: PencilIcon, tooltip: 'Edit' },
    { icon: ShareIcon, tooltip: 'Share' },
    { icon: TrashIcon, tooltip: 'Delete' },
    { icon: StarIcon, tooltip: 'Favorite' },
  ]"
/>`,
    },
    {
      title: 'With click handlers',
      code: `<DuFab
  :mainAction="{ label: '+', variant: 'primary', onClick: () => console.log('main') }"
  :items="[
    { label: 'Edit', onClick: () => edit() },
    { label: 'Delete', onClick: () => remove(), customClass: 'btn-error' },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
