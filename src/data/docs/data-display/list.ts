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
      preview: `<DuList class="w-72">
  <DuListRow>
    <span class="font-medium">Alice Martin</span>
    <span class="text-sm text-base-content/50">alice@example.com</span>
    <template #end>
      <DuButton size="xs" ghost>Edit</DuButton>
    </template>
  </DuListRow>
  <DuListRow>
    <span class="font-medium">Bob Smith</span>
    <span class="text-sm text-base-content/50">bob@example.com</span>
    <template #end>
      <DuButton size="xs" ghost>Edit</DuButton>
    </template>
  </DuListRow>
</DuList>`,
      code: `<DuList>
  <DuListRow v-for="user in users" :key="user.id">
    <template #start>
      <DuAvatar :src="user.avatar" size="sm" />
    </template>
    <span class="font-medium">{{ user.name }}</span>
    <span class="text-sm text-base-content/50">{{ user.email }}</span>
    <template #end>
      <DuButton size="xs" ghost>Edit</DuButton>
    </template>
  </DuListRow>
</DuList>`,
    },
  ],
} satisfies DocPageData
