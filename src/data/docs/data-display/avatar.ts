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
      preview: `<div class="avatar">
  <div class="w-16 rounded-full">
    <img src="https://i.pravatar.cc/64" alt="avatar" />
  </div>
</div>`,
      code: `<DuAvatar size="lg" rounded="full">
  <img src="https://i.pravatar.cc/64" alt="User" />
</DuAvatar>`,
    },
    {
      title: 'Placeholder (initials)',
      description: 'Set `placeholder` and use `variant` to color the background. Pass the initials text inside the slot.',
      preview: `<div class="flex items-center gap-3">
  <div class="avatar avatar-placeholder">
    <div class="bg-primary text-primary-content rounded-full w-12 flex items-center justify-center">
      <span class="text-base font-semibold">JD</span>
    </div>
  </div>
  <div class="avatar avatar-placeholder">
    <div class="bg-secondary text-secondary-content rounded-full w-12 flex items-center justify-center">
      <span class="text-base font-semibold">AB</span>
    </div>
  </div>
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
  <div class="avatar avatar-online">
    <div class="w-12 rounded-full"><img src="https://i.pravatar.cc/48?img=1" alt="user" /></div>
  </div>
  <div class="avatar avatar-offline">
    <div class="w-12 rounded-full"><img src="https://i.pravatar.cc/48?img=2" alt="user" /></div>
  </div>
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
  <div class="avatar"><div class="w-6 rounded-full"><img src="https://i.pravatar.cc/32" /></div></div>
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40" /></div></div>
  <div class="avatar"><div class="w-16 rounded-full"><img src="https://i.pravatar.cc/64" /></div></div>
  <div class="avatar"><div class="w-20 rounded-full"><img src="https://i.pravatar.cc/80" /></div></div>
</div>`,
      code: `<DuAvatar size="xs" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="sm" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="md" rounded="full"><img src="/user.jpg" /></DuAvatar>
<DuAvatar size="lg" rounded="full"><img src="/user.jpg" /></DuAvatar>`,
    },
    {
      title: 'Avatar group',
      preview: `<div class="avatar-group -space-x-4 rtl:space-x-reverse">
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=1" /></div></div>
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=2" /></div></div>
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=3" /></div></div>
  <div class="avatar avatar-placeholder"><div class="bg-neutral text-neutral-content w-10 rounded-full flex items-center justify-center"><span class="text-xs">+5</span></div></div>
</div>`,
      code: `<div class="avatar-group -space-x-4">
  <DuAvatar size="sm" rounded="full"><img src="/u1.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="/u2.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full"><img src="/u3.jpg" /></DuAvatar>
  <DuAvatar size="sm" rounded="full" placeholder variant="neutral">+5</DuAvatar>
</div>`,
    },
  ],
} satisfies DocPageData
