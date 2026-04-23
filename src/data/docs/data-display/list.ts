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
      description: 'Each DuListRow has a single default slot — use flex layout inside to position content (avatar, text, actions).',
      links: [
        { label: 'DuAvatar docs', href: '/docs/data-display/avatar' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
        // { label: 'Vue v-for docs', href: 'https://vuejs.org/guide/essentials/list.html' },
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
    {
      title: 'With badges and status',
      description: 'Nest any components inside DuListRow. Use `ml-auto` on the last element to push it to the right.',
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
      ],
      preview: `<DuList class="w-80">
  <DuListRow>
    <span class="text-lg">🚀</span>
    <div class="flex-1">
      <div class="font-medium">Deploy to production</div>
      <div class="text-xs text-base-content/50">2 minutes ago</div>
    </div>
    <DuBadge variant="success" size="sm">Done</DuBadge>
  </DuListRow>
  <DuListRow>
    <span class="text-lg">🐛</span>
    <div class="flex-1">
      <div class="font-medium">Fix login bug</div>
      <div class="text-xs text-base-content/50">10 minutes ago</div>
    </div>
    <DuBadge variant="warning" size="sm">In progress</DuBadge>
  </DuListRow>
  <DuListRow>
    <span class="text-lg">📝</span>
    <div class="flex-1">
      <div class="font-medium">Update documentation</div>
      <div class="text-xs text-base-content/50">1 hour ago</div>
    </div>
    <DuBadge variant="error" soft size="sm">Blocked</DuBadge>
  </DuListRow>
</DuList>`,
      code: `<DuList>
  <DuListRow v-for="task in tasks" :key="task.id">
    <span class="text-lg">{{ task.icon }}</span>
    <div class="flex-1">
      <div class="font-medium">{{ task.name }}</div>
      <div class="text-xs text-base-content/50">{{ task.time }}</div>
    </div>
    <DuBadge :variant="task.variant" size="sm">{{ task.status }}</DuBadge>
  </DuListRow>
</DuList>`,
    },
    {
      title: 'Selectable rows',
      description: 'Wrap each DuListRow content in a label + checkbox or radio for selectable lists. Use `customClass` on DuListRow for hover effects.',
      links: [
        { label: 'DuCheckbox docs', href: '/docs/data-input/checkbox' },
      ],
      script: `
      const tasks = ref([
  { id: 1, label: 'Design review', done: false },
  { id: 2, label: 'Write unit tests', done: true },
  { id: 3, label: 'Deploy to staging', done: false },
])
  return { tasks }`,
      preview: `<DuList>
    <DuListRow v-for="task in tasks" :key="task.id" as="label">
      <input
        type="checkbox"
        class="checkbox checkbox-sm checkbox-primary"
        v-model="task.done"
      />
      <div class="flex-1" :class="{ 'line-through opacity-50': task.done }">
        {{ task.label }}
      </div>
    </DuListRow>
  </DuList>`,
      code: `<script setup lang="ts">
const tasks = ref([
  { id: 1, label: 'Design review', done: false },
  { id: 2, label: 'Write unit tests', done: true },
  { id: 3, label: 'Deploy to staging', done: false },
])
</script>

<template>
  <DuList>
    <DuListRow v-for="task in tasks" :key="task.id" as="label">
      <input
        type="checkbox"
        class="checkbox checkbox-sm checkbox-primary"
        v-model="task.done"
      />
      <div class="flex-1" :class="{ 'line-through opacity-50': task.done }">
        {{ task.label }}
      </div>
    </DuListRow>
  </DuList>
</template>`,
    },
  ],
} satisfies DocPageData
