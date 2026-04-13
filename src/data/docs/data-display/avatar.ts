import type { DocPageData } from '@/types/docs'

export default {
  title: 'Avatar',
  description: 'Avatars are used to show a thumbnail representation of a person or object.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/avatar/',
  classnames: {
    modifier: [
      { class: 'avatar-online', desc: 'Shows an online status indicator' },
      { class: 'avatar-offline', desc: 'Shows an offline status indicator' },
      { class: 'avatar-placeholder', desc: 'Shows initials when no image is provided' },
    ],
    size: [
      { class: 'w-8', desc: 'Small (use Tailwind w-* utility)' },
      { class: 'w-16', desc: 'Medium' },
      { class: 'w-24', desc: 'Large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="avatar">
  <div class="w-16 rounded-full">
    <img src="https://i.pravatar.cc/64" alt="avatar" />
  </div>
</div>`,
      code: `<DuAvatar src="https://i.pravatar.cc/64" alt="User" size="lg" />`,
    },
    {
      title: 'With initials (placeholder)',
      preview: `<div class="avatar avatar-placeholder">
  <div class="bg-primary text-primary-content w-16 rounded-full">
    <span class="text-xl">JD</span>
  </div>
</div>`,
      code: `<DuAvatar placeholder initials="JD" variant="primary" size="lg" />`,
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
      code: `<DuAvatar src="..." online />
<DuAvatar src="..." offline />`,
    },
    {
      title: 'Avatar group',
      preview: `<div class="avatar-group -space-x-4 rtl:space-x-reverse">
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=1" /></div></div>
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=2" /></div></div>
  <div class="avatar"><div class="w-10 rounded-full"><img src="https://i.pravatar.cc/40?img=3" /></div></div>
  <div class="avatar avatar-placeholder"><div class="bg-neutral text-neutral-content w-10 rounded-full"><span>+2</span></div></div>
</div>`,
      code: `<div class="avatar-group -space-x-4">
  <DuAvatar src="..." />
  <DuAvatar src="..." />
  <DuAvatar src="..." />
  <DuAvatar placeholder initials="+2" variant="neutral" />
</div>`,
    },
  ],
} satisfies DocPageData
