import type { DocPageData } from '@/types/docs'

export default {
  title: 'List',
  description: 'List component displays a vertical list of items with optional actions.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/list/',
  sections: [
    {
      title: 'Basic',
      preview: `<ul class="list bg-base-100 border border-base-300 rounded-xl w-72">
  <li class="list-row">
    <div class="list-col-grow">Item 1</div>
  </li>
  <li class="list-row">
    <div class="list-col-grow">Item 2</div>
  </li>
  <li class="list-row">
    <div class="list-col-grow">Item 3</div>
  </li>
</ul>`,
      code: `<DuList>
  <DuListRow>Item 1</DuListRow>
  <DuListRow>Item 2</DuListRow>
  <DuListRow>Item 3</DuListRow>
</DuList>`,
    },
    {
      title: 'With avatar and actions',
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
