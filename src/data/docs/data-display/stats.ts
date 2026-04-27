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
    { title: 'New Registers', value: '1,200', description: '↘ 90 (14%)', valueClass: 'text-secondary' },
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
    {
      title: 'With icons (figure prop)',
      description: 'Pass an SVG string to the `figure` property. Use `figureClass` and `valueClass` to color them.',
      preview: `<DuStats shadow
  :items="[
    {
      title: 'Total Likes',
      value: '25.6K',
      description: '21% more than last month',
      figure: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' class=\\'inline-block w-8 h-8 stroke-current\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\\'></path></svg>',
      figureClass: 'text-primary',
      valueClass: 'text-primary',
    },
    {
      title: 'Page Views',
      value: '2.6M',
      description: '21% more than last month',
      figure: '<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' class=\\'inline-block w-8 h-8 stroke-current\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M13 10V3L4 14h7v7l9-11h-7z\\'></path></svg>',
      figureClass: 'text-secondary',
      valueClass: 'text-secondary',
    },
  ]"
/>`,
      code: `<DuStats
  :items="[
    {
      title: 'Total Likes',
      value: '25.6K',
      description: '21% more than last month',
      figure: heartIconSvg,
      figureClass: 'text-primary',
      valueClass: 'text-primary',
    },
    {
      title: 'Page Views',
      value: '2.6M',
      description: '21% more than last month',
      figure: boltIconSvg,
      figureClass: 'text-secondary',
      valueClass: 'text-secondary',
    },
  ]"
  shadow
/>`,
    },
    {
      title: 'With image (figure as URL)',
      description: 'Pass an image URL string to `figure` to show an avatar or thumbnail.',
      preview: `<DuStats shadow
  :items="[
    {
      title: 'Tasks done',
      titleClass: 'text-primary',
      value: '86%',
      description: '31 tasks remaining',
      figure: 'https://i.pravatar.cc/48?img=3',
      figureClass: 'w-12 rounded-full overflow-hidden',
      descClass: 'text-secondary',
    },
  ]"
/>`,
      code: `<DuStats
  :items="[
    {
      title: 'Tasks done',
      titleClass: 'text-primary',
      value: '86%',
      description: '31 tasks remaining',
      figure: avatarUrl,
      figureClass: 'w-12 rounded-full overflow-hidden',
      descClass: 'text-secondary',
    },
  ]"
  shadow
/>`,
    },
    {
      title: 'With figure slot (slot mode)',
      description: 'Use the `#figure` slot inside DuStat for full control over the icon or image.',
      preview: `<DuStats shadow>
  <DuStat figureClass="text-primary" valueClass="text-primary">
    <template #figure>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    </template>
    <template #title>Total Likes</template>
    <template #value>25.6K</template>
    <template #desc>21% more than last month</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats shadow>
  <DuStat figureClass="text-primary" valueClass="text-primary">
    <template #figure>
      <svg ...>...</svg>
    </template>
    <template #title>Total Likes</template>
    <template #value>25.6K</template>
    <template #desc>21% more than last month</template>
  </DuStat>
</DuStats>`,
    },
  ],
} satisfies DocPageData
