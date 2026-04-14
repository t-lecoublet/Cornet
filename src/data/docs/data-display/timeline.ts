import type { DocPageData } from '@/types/docs'

export default {
  title: 'Timeline',
  description: 'Timeline displays events in chronological order. Each DuTimelineItem has `start`, `middle`, and `end` string props (or corresponding named slots). The `valid` boolean prop colors the connector line and icon: `true` = primary, `false` = error, `undefined` = neutral.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/timeline/',
  classnames: {
    modifier: [
      { class: 'timeline-vertical', desc: 'Vertical layout', default: true },
      { class: 'timeline-horizontal', desc: 'Horizontal layout' },
      { class: 'timeline-snap-icon', desc: 'Snaps icon to middle of item' },
      { class: 'timeline-box', desc: 'Adds box styling to end content' },
      { class: 'timeline-compact', desc: 'Compact single-side layout' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      description: 'DuTimelineItem uses `start` for the date/label and `end` for the event content. A default circle icon is shown in the middle.',
      preview: `<DuTimeline>
  <DuTimelineItem start="2020" end="Company founded" :valid="true" />
  <DuTimelineItem start="2022" end="First product launch" :valid="true" />
  <DuTimelineItem start="2024" end="Series A funding" />
</DuTimeline>`,
      code: `<DuTimeline>
  <DuTimelineItem start="2020" end="Company founded" />
  <DuTimelineItem start="2022" end="First product launch" />
  <DuTimelineItem start="2024" end="Series A funding" />
</DuTimeline>`,
    },
    {
      title: 'With validation state',
      description: 'Set `valid` on each item to color the connector line: `true` = primary (done), `false` = error, `undefined` = neutral (pending).',
      preview: `<DuTimeline>
  <DuTimelineItem start="Step 1" end="Account created" :valid="true" />
  <DuTimelineItem start="Step 2" end="Email verified" :valid="true" />
  <DuTimelineItem start="Step 3" end="Profile setup" />
  <DuTimelineItem start="Step 4" end="First purchase" />
</DuTimeline>`,
      code: `<DuTimeline>
  <DuTimelineItem start="Step 1" end="Account created" :valid="true" />
  <DuTimelineItem start="Step 2" end="Email verified" :valid="true" />
  <DuTimelineItem start="Step 3" end="Profile setup" :valid="undefined" />
  <DuTimelineItem start="Step 4" end="First purchase" :valid="undefined" />
</DuTimeline>`,
    },
    {
      title: 'Horizontal',
      preview: `<DuTimeline direction="timeline-horizontal" class="overflow-x-auto pb-2">
  <DuTimelineItem start="2020" end="Founded" :valid="true" />
  <DuTimelineItem start="2022" end="Launch" :valid="true" />
  <DuTimelineItem start="2024" end="Series A" />
</DuTimeline>`,
      code: `<DuTimeline direction="timeline-horizontal">
  <DuTimelineItem start="2020" end="Founded" :valid="true" />
  <DuTimelineItem start="2022" end="Launch" :valid="true" />
  <DuTimelineItem start="2024" end="Series A" />
</DuTimeline>`,
    },
    {
      title: 'Dynamic items via prop',
      description: 'Pass an `items` array to DuTimeline for programmatic rendering.',
      preview: `<DuTimeline
  :items="[
    { start: '2020', end: 'Company founded', valid: true },
    { start: '2022', end: 'First product launch', valid: true },
    { start: '2024', end: 'Series A funding' },
  ]"
/>`,
      code: `<DuTimeline
  :items="[
    { start: '2020', end: 'Company founded', valid: true },
    { start: '2022', end: 'First product launch', valid: true },
    { start: '2024', end: 'Series A funding' },
  ]"
/>`,
    },
    {
      title: 'Custom middle slot',
      description: 'Override the default check icon with a custom element using the `#middle` slot.',
      preview: `<DuTimeline>
  <DuTimelineItem start="Jan" end="Design phase">
    <template #middle>
      <div class="w-4 h-4 rounded-full bg-primary"></div>
    </template>
  </DuTimelineItem>
  <DuTimelineItem start="Feb" end="Development">
    <template #middle>
      <div class="w-4 h-4 rounded-full bg-secondary"></div>
    </template>
  </DuTimelineItem>
</DuTimeline>`,
      code: `<DuTimeline>
  <DuTimelineItem start="Jan" end="Design phase">
    <template #middle>
      <div class="w-4 h-4 rounded-full bg-primary"></div>
    </template>
  </DuTimelineItem>
  <DuTimelineItem start="Feb" end="Development">
    <template #middle>
      <div class="w-4 h-4 rounded-full bg-secondary"></div>
    </template>
  </DuTimelineItem>
</DuTimeline>`,
    },
  ],
} satisfies DocPageData
