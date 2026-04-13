import type { DocPageData } from '@/types/docs'

export default {
  title: 'Stat',
  description: 'Stat is used to display a single statistic with optional title, value, and description.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/stat/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="stats shadow border border-base-300">
  <div class="stat">
    <div class="stat-title">Total Users</div>
    <div class="stat-value text-primary">31K</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
</div>`,
      code: `<DuStats>
  <DuStat
    title="Total Users"
    value="31K"
    description="21% more than last month"
    variant="primary"
  />
</DuStats>`,
    },
    {
      title: 'With icon',
      code: `<DuStats>
  <DuStat
    title="Revenue"
    value="$4,200"
    description="+12% this week"
    variant="success"
  >
    <template #figure>
      <CurrencyDollarIcon class="w-8 h-8 text-success" />
    </template>
  </DuStat>
</DuStats>`,
    },
  ],
} satisfies DocPageData
