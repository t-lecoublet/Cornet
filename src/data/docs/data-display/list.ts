import type { DocPageData } from '@/types/docs'

export default {
  title: 'List',
  description: 'List component displays a vertical list of items with optional actions.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/list/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuList class="w-72">
  <DuListRow>Item 1</DuListRow>
  <DuListRow>Item 2</DuListRow>
  <DuListRow>Item 3</DuListRow>
</DuList>`,
      code: `<DuList>
  <DuListRow>Item 1</DuListRow>
  <DuListRow>Item 2</DuListRow>
  <DuListRow>Item 3</DuListRow>
</DuList>`,
    },
    {
      title: 'With avatar and actions',
      links: [
        { label: 'DuAvatar docs', href: '/docs/data-display/avatar' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<DuList class="w-72">
  <DuListRow>
    <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/32?img=1" alt="Alice" /></DuAvatar>
    <div>
      <div class="font-medium">Alice Martin</div>
      <div class="text-sm text-base-content/50">alice@example.com</div>
    </div>
    <DuButton size="xs" ghost>Edit</DuButton>
  </DuListRow>
  <DuListRow>
    <DuAvatar size="sm" rounded="full"><img src="https://i.pravatar.cc/32?img=2" alt="Bob" /></DuAvatar>
    <div>
      <div class="font-medium">Bob Smith</div>
      <div class="text-sm text-base-content/50">bob@example.com</div>
    </div>
    <DuButton size="xs" ghost>Edit</DuButton>
  </DuListRow>
</DuList>`,
      code: `<DuList>
  <DuListRow v-for="user in users" :key="user.id">
    <DuAvatar size="sm" rounded="full">
      <img :src="user.avatar" :alt="user.name" />
    </DuAvatar>
    <div>
      <div class="font-medium">{{ user.name }}</div>
      <div class="text-sm text-base-content/50">{{ user.email }}</div>
    </div>
    <DuButton size="xs" ghost>Edit</DuButton>
  </DuListRow>
</DuList>`,
    },
  ],
} satisfies DocPageData
