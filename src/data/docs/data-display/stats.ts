import type { DocPageData } from '@/types/docs'

export default {
  title: 'Stats',
  description: 'Stats groups multiple DuStat components in a horizontal or vertical layout. Use the `vertical` boolean prop to switch direction. Pass an `items` array for dynamic rendering, or nest DuStat elements in the default slot.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/stat/',
  classnames: {
    modifier: [
      { class: 'stats-horizontal', desc: 'Horizontal layout (default, vertical: false)', default: true },
      { class: 'stats-vertical', desc: 'Vertical layout (prop: vertical)' },
    ],
  },
  sections: [
    {
      title: 'Horizontal stats (slot mode)',
      preview: `<DuStats>
  <DuStat>
    <template #title>Downloads</template>
    <template #value>31K</template>
    <template #desc>Jan 1st - Feb 1st</template>
  </DuStat>
  <DuStat valueClass="text-primary" descClass="text-primary">
    <template #title>Users</template>
    <template #value>4.2K</template>
    <template #desc>↗ 40 (2%)</template>
  </DuStat>
  <DuStat valueClass="text-secondary" descClass="text-secondary">
    <template #title>New Registers</template>
    <template #value>1,200</template>
    <template #desc>↘ 90 (14%)</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats>
  <DuStat>
    <template #title>Downloads</template>
    <template #value>31K</template>
    <template #desc>Jan 1st - Feb 1st</template>
  </DuStat>
  <DuStat valueClass="text-primary" descClass="text-primary">
    <template #title>Users</template>
    <template #value>4.2K</template>
    <template #desc>↗ 40 (2%)</template>
  </DuStat>
  <DuStat valueClass="text-secondary" descClass="text-secondary">
    <template #title>New Registers</template>
    <template #value>1,200</template>
    <template #desc>↘ 90 (14%)</template>
  </DuStat>
</DuStats>`,
    },
    {
      title: 'Vertical stats',
      preview: `<DuStats :vertical="true">
  <DuStat>
    <template #title>Downloads</template>
    <template #value>31K</template>
  </DuStat>
  <DuStat valueClass="text-primary">
    <template #title>Users</template>
    <template #value>4.2K</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats :vertical="true">
  <DuStat>
    <template #title>Downloads</template>
    <template #value>31K</template>
  </DuStat>
  <DuStat valueClass="text-primary">
    <template #title>Users</template>
    <template #value>4.2K</template>
  </DuStat>
</DuStats>`,
    },
    {
      title: 'Dynamic items mode',
      description: 'Pass an `items` array to DuStats. Each item supports `title`, `value`, `description`, `figure`, `figureClass`, `valueClass`, `descClass`, `titleClass`.',
      preview: `<DuStats
  :items="[
    { title: 'Downloads', value: '31K', description: 'Jan 1st - Feb 1st' },
    { title: 'Users', value: '4.2K', description: '↗ 40 (2%)', valueClass: 'text-primary' },
  ]"
/>`,
      code: `<DuStats
  :items="[
    { title: 'Downloads', value: '31K', description: 'Jan 1st - Feb 1st' },
    { title: 'Users', value: '4.2K', description: '↗ 40 (2%)', valueClass: 'text-primary' },
    { title: 'New Registers', value: '1,200', description: '↘ 90 (14%)', valueClass: 'text-secondary' },
  ]"
/>`,
    },
    {
      title: 'With shadow',
      preview: `<DuStats shadow>
  <DuStat>
    <template #title>Total Revenue</template>
    <template #value>$89,400</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats shadow>
  <DuStat>
    <template #title>Total Revenue</template>
    <template #value>$89,400</template>
  </DuStat>
</DuStats>`,
    },
  ],
} satisfies DocPageData
