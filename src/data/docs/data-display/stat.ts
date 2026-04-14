import type { DocPageData } from '@/types/docs'

export default {
  title: 'Stat',
  description: 'Stat displays a single statistic. It is entirely slot-based: use #title, #value, #desc, #figure, and #actions named slots to populate each section. Style props (titleClass, valueClass, descClass, figureClass) allow per-section class overrides.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/stat/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuStats>
  <DuStat valueClass="text-primary">
    <template #title>Total Users</template>
    <template #value>31K</template>
    <template #desc>21% more than last month</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats>
  <DuStat valueClass="text-primary">
    <template #title>Total Users</template>
    <template #value>31K</template>
    <template #desc>21% more than last month</template>
  </DuStat>
</DuStats>`,
    },
    {
      title: 'With figure icon',
      description: 'Place an icon or image in the `#figure` slot — it renders to the right of the stat.',
      preview: `<DuStats>
  <DuStat valueClass="text-success">
    <template #figure>
      <span class="text-4xl text-success">💰</span>
    </template>
    <template #title>Revenue</template>
    <template #value>$4,200</template>
    <template #desc>+12% this week</template>
  </DuStat>
</DuStats>`,
      code: `<DuStats>
  <DuStat valueClass="text-success">
    <template #figure>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </template>
    <template #title>Revenue</template>
    <template #value>$4,200</template>
    <template #desc>+12% this week</template>
  </DuStat>
</DuStats>`,
    },
    {
      title: 'With actions',
      description: 'Place buttons or links in the `#actions` slot.',
      preview: `<DuStats>
  <DuStat>
    <template #title>New Messages</template>
    <template #value>12</template>
    <template #actions>
      <DuButton size="xs" variant="success">See all</DuButton>
      <DuButton size="xs" ghost>Ignore</DuButton>
    </template>
  </DuStat>
</DuStats>`,
      code: `<DuStats>
  <DuStat>
    <template #title>New Messages</template>
    <template #value>12</template>
    <template #actions>
      <DuButton size="xs" variant="success">See all</DuButton>
      <DuButton size="xs" ghost>Ignore</DuButton>
    </template>
  </DuStat>
</DuStats>`,
    },
  ],
} satisfies DocPageData
