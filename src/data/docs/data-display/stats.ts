import type { DocPageData } from '@/types/docs'

export default {
  title: 'Stats',
  description: 'Stats wrapper groups multiple Stat components in a horizontal or vertical layout.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/stat/',
  classnames: {
    modifier: [
      { class: 'stats-horizontal', desc: 'Horizontal layout', default: true },
      { class: 'stats-vertical', desc: 'Vertical layout' },
    ],
  },
  sections: [
    {
      title: 'Horizontal stats',
      preview: `<div class="stats shadow border border-base-300">
  <div class="stat">
    <div class="stat-title">Downloads</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Jan 1st - Feb 1st</div>
  </div>
  <div class="stat">
    <div class="stat-title">Users</div>
    <div class="stat-value text-primary">4.2K</div>
    <div class="stat-desc text-primary">↗ 40 (2%)</div>
  </div>
  <div class="stat">
    <div class="stat-title">New Registers</div>
    <div class="stat-value text-secondary">1,200</div>
    <div class="stat-desc text-secondary">↘ 90 (14%)</div>
  </div>
</div>`,
      code: `<DuStats direction="horizontal">
  <DuStat title="Downloads" value="31K" description="Jan 1st - Feb 1st" />
  <DuStat title="Users" value="4.2K" description="↗ 40 (2%)" variant="primary" />
  <DuStat title="New Registers" value="1,200" description="↘ 90 (14%)" variant="secondary" />
</DuStats>`,
    },
    {
      title: 'Vertical stats',
      code: `<DuStats direction="vertical">
  <DuStat title="Downloads" value="31K" />
  <DuStat title="Users" value="4.2K" variant="primary" />
</DuStats>`,
    },
  ],
} satisfies DocPageData
