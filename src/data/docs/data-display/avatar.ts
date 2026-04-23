import type { DocPageData } from '@/types/docs'

export default {
  title: 'Avatar',
  description: 'Avatars are used to show a thumbnail representation of a person or object. DuAvatar is slot-based — pass an image or text inside the default slot.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/avatar/',
  classnames: {
    modifier: [
      { class: 'online', desc: 'Shows an online indicator ring' },
      { class: 'offline', desc: 'Shows an offline indicator ring' },
      { class: 'placeholder', desc: 'Removes background image, shows initials/text' },
      { class: 'ring', desc: 'Adds a ring border' },
    ],
    size: [
      { class: 'xs', desc: 'Extra small' },
      { class: 'sm', desc: 'Small' },
      { class: 'md', desc: 'Medium', default: true },
      { class: 'lg', desc: 'Large' },
      { class: 'xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'With image',
      preview: `<DuAvatar size="lg" rounded="full">
  <img src="https://i.pravatar.cc/64" alt="avatar" />
</DuAvatar>`,
      code: `<DuAvatar size="lg" rounded="full">
  <img src="https://i.pravatar.cc/64" alt="User" />
</DuAvatar>`,
    },
    {
      title: 'Placeholder (initials)',
      description: 'Set `placeholder` and use `variant` to color the background. Pass the initials text inside the slot.',
      preview: `<div class="flex items-center gap-3">
  <DuAvatar placeholder variant="primary" size="md" rounded="full">JD</DuAvatar>
  <DuAvatar placeholder variant="secondary" size="md" rounded="full">AB</DuAvatar>
</div>`,
      code: `<DuAvatar placeholder variant="primary" size="md" rounded="full">
  JD
</DuAvatar>

<DuAvatar placeholder variant="secondary" size="md" rounded="full">
  AB
</DuAvatar>`,
    },
    {
      title: 'Online / offline status',
      preview: `<div class="flex gap-4 items-center">
  <DuAvatar size="md" rounded="full" online>
    <img src="https://i.pravatar.cc/48?img=1" alt="user" />
  </DuAvatar>
  <DuAvatar size="md" rounded="full" offline>
    <img src="https://i.pravatar.cc/48?img=2" alt="user" />
  </DuAvatar>
</div>`,
      code: `<DuAvatar size="md" rounded="full" online>
  <img src="/user1.jpg" alt="User" />
</DuAvatar>

<DuAvatar size="md" rounded="full" offline>
  <img src="/user2.jpg" alt="User" />
</DuAvatar>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-wrap items-center gap-3">
  <DuAvatar size="xs" rounded="full"><img src="https://i.pravatar.cc/32" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/40" /></DuAvatar>
  <DuAvatar size="md" rounded="full"><img src="https://i.pravatar.cc/64" /></DuAvatar>
  <DuAvatar size="lg" rounded="full"><img src="https://i.pravatar.cc/80" /></DuAvatar>
</div>`,
      code: `<DuAvatar size="xs" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="sm" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="md" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="lg" rounded="full"><img src="/user.jpg" /></DuAvatar>`,
    },
    {
      title: 'Avatar group',
      links: [
        { label: 'DaisyUI avatar group docs', href: 'https://daisyui.com/components/avatar/#avatar-group' },
      ],
      preview: `<div class="avatar-group -space-x-4 rtl:space-x-reverse">
  <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/40?img=1" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/40?img=2" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/40?img=3" /></DuAvatar>
  <DuAvatar size="sm" rounded="full" placeholder variant="neutral">+5</DuAvatar>
</div>`,
      code: `<div class="avatar-group -space-x-4">
  <DuAvatar size="sm" rounded="full"><img src="/u1.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="/u2.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="/u3.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full" placeholder variant="neutral">+5</DuAvatar>
</div>`,
    },
    {
      title: 'Ring border',
      description: 'Set `ring` to add a colored ring. Use `ringColor` (Tailwind color token) and `ringOffset` (offset in px) to customize it.',
      links: [
        { label: 'Tailwind ring utilities', href: 'https://tailwindcss.com/docs/ring-color' },
      ],
      preview: `<div class="flex items-center gap-4">
  <DuAvatar size="md" rounded="full" ring ringColor="primary">
    <img src="https://i.pravatar.cc/64?img=5" alt="user" />
  </DuAvatar>
  <DuAvatar size="md" rounded="full" ring ringColor="success">
    <img src="https://i.pravatar.cc/64?img=6" alt="user" />
  </DuAvatar>
  <DuAvatar size="md" rounded="full" ring ringColor="error">
    <img src="https://i.pravatar.cc/64?img=7" alt="user" />
  </DuAvatar>
  <DuAvatar size="md" rounded="full" ring ringColor="warning" :ringOffset="4">
    <img src="https://i.pravatar.cc/64?img=8" alt="user" />
  </DuAvatar>
</div>`,
      code: `<!-- ring applies a colored border around the avatar -->
<DuAvatar size="md" rounded="full" ring ringColor="primary">
  <img src="/user.jpg" alt="User" />
</DuAvatar>

<!-- custom offset -->
<DuAvatar size="md" rounded="full" ring ringColor="success" :ringOffset="4">
  <img src="/user.jpg" alt="User" />
</DuAvatar>`,
    },
    {
      title: 'Mask shapes',
      description: 'Use the `mask` prop to clip the avatar into different shapes. Works best without `rounded`.',
      links: [
        { label: 'DaisyUI mask docs', href: 'https://daisyui.com/components/mask/' },
      ],
      preview: `<div class="flex flex-wrap items-center gap-4">
  <DuAvatar size="md" mask="heart">
    <img src="https://i.pravatar.cc/64?img=9" alt="heart" />
  </DuAvatar>
  <DuAvatar size="md" mask="squircle">
    <img src="https://i.pravatar.cc/64?img=10" alt="squircle" />
  </DuAvatar>
  <DuAvatar size="md" mask="hexagon">
    <img src="https://i.pravatar.cc/64?img=11" alt="hexagon" />
  </DuAvatar>
  <DuAvatar size="md" mask="star">
    <img src="https://i.pravatar.cc/64?img=12" alt="star" />
  </DuAvatar>
  <DuAvatar size="md" mask="diamond">
    <img src="https://i.pravatar.cc/64?img=13" alt="diamond" />
  </DuAvatar>
</div>`,
      code: `<!-- Available masks: heart, squircle, hexagon, hexagon-2, decagon, pentagon, diamond, square, circle, parallelogram, star, star-2 -->
<DuAvatar size="md" mask="heart">
  <img src="/user.jpg" alt="User" />
</DuAvatar>

<DuAvatar size="md" mask="squircle">
  <img src="/user.jpg" alt="User" />
</DuAvatar>

<DuAvatar size="md" mask="hexagon">
  <img src="/user.jpg" alt="User" />
</DuAvatar>`,
    },
    {
      title: 'Rounded variants',
      description: 'Control the border radius with the `rounded` prop.',
      preview: `<div class="flex flex-wrap items-center gap-3">
  <DuAvatar size="md" rounded="sm"><img src="https://i.pravatar.cc/64?img=14" alt="sm" /></DuAvatar>
  <DuAvatar size="md" rounded="md"><img src="https://i.pravatar.cc/64?img=15" alt="md" /></DuAvatar>
  <DuAvatar size="md" rounded="lg"><img src="https://i.pravatar.cc/64?img=16" alt="lg" /></DuAvatar>
  <DuAvatar size="md" rounded="xl"><img src="https://i.pravatar.cc/64?img=17" alt="xl" /></DuAvatar>
  <DuAvatar size="md" rounded="full"><img src="https://i.pravatar.cc/64?img=18" alt="full" /></DuAvatar>
</div>`,
      code: `<!-- rounded values: sm | md | lg | xl | full -->
<DuAvatar size="md" rounded="sm"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="md" rounded="md"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="md" rounded="xl"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="md" rounded="full"><img src="/user.jpg" /></DuAvatar>`,
    },
  ],
} satisfies DocPageData
