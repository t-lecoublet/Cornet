import type { DocPageData } from '@/types/docs'

export default {
  title: 'Timeline',
  description: 'Timeline displays events in chronological order. Each DuTimelineItem has `start`, `middle`, and `end` string props (or corresponding named slots). The `valid` boolean prop colors the connector line and icon: `true` = success, `false` = error, `undefined` = neutral.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/timeline/',
  props: [
    {
      title: 'items',
      description: 'Array of timeline items with start, middle, end, customClass, valid, hrClass and boxed properties',
      type: 'DuTimelineItemData[]',
    },
    {
      title: 'direction',
      description: 'Timeline layout direction',
      type: 'string',
      default: '"timeline-vertical"',
      options: ['timeline-vertical', 'timeline-horizontal'],
    },
    {
      title: 'modifier',
      description: 'Root-level layout modifier. Note `timeline-box` is not one of these — it applies per start/end box, use the `boxed` prop instead.',
      type: 'string',
      options: ['timeline-snap-icon', 'timeline-compact'],
    },
    {
      title: 'boxed',
      description: 'Apply `timeline-box` styling to every item\'s start/end boxes. A per-item `boxed` overrides this.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for the timeline container',
      type: 'string',
    },
    {
      title: 'responsive',
      description: 'Make timeline horizontal on larger screens',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'validItems',
      description: 'Array of boolean values to color connector lines (true = success, false = error)',
      type: '(boolean | undefined)[]',
    },
    {
      title: 'hrClasses',
      description: 'Custom CSS classes for connector lines',
      type: 'string[]',
    },
  ],
  slots: [
    {
      title: 'Item slots (#start, #start-{n}, #middle, #middle-{n}, #end, #end-{n})',
      description: 'Customize timeline items with slot props: item, index',
      preview: `<DuTimeline
  :items="[
    { start: 'Jan', end: 'Design phase' },
    { start: 'Feb', end: 'Development' },
  ]"
>
  <template #middle="{ index }">
    <div :class="[
      'w-4 h-4 rounded-full',
      index === 0 ? 'bg-primary' : 'bg-secondary'
    ]"></div>
  </template>
</DuTimeline>`,
      code: `<DuTimeline :items="items">
  <template #middle="{ index }">
    <div :class="[
      'w-4 h-4 rounded-full',
      index === 0 ? 'bg-primary' : 'bg-secondary'
    ]"></div>
  </template>
</DuTimeline>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use default slot for manual timeline HTML structure',
      preview: `<DuTimeline class="w-full">
  <li>
    <hr class="bg-success" />
    <div class="timeline-start">2020</div>
    <div class="timeline-middle">
      <svg class="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="timeline-end timeline-box">Company founded</div>
  </li>
</DuTimeline>`,
      code: `<DuTimeline>
  <li>
    <hr class="bg-success" />
    <div class="timeline-start">2020</div>
    <div class="timeline-middle">...</div>
    <div class="timeline-end">Event content</div>
  </li>
</DuTimeline>`,
    },
  ],
  classnames: {
    component: [
      { class: 'timeline', desc: 'Base class on the <ul>, always applied.' },
      { class: 'timeline-start', desc: 'The start box of an item.' },
      { class: 'timeline-middle', desc: 'The icon slot between the two boxes.' },
      { class: 'timeline-end', desc: 'The end box of an item.' },
      { class: 'timeline-box', desc: 'Box styling applied per start/end box — boxed (not a root modifier)' },
    ],
    modifier: [
      { class: 'timeline-vertical', desc: 'Vertical layout — direction (default)' },
      { class: 'timeline-horizontal', desc: 'Horizontal layout — direction' },
      { class: 'lg:timeline-horizontal', desc: 'Horizontal only from lg up — responsive' },
      { class: 'timeline-snap-icon', desc: 'Snaps the icon to the middle — modifier' },
      { class: 'timeline-compact', desc: 'Compact single-side layout — modifier' },
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
      description: 'Set `valid` on each item to color the connector line: `true` = success (done), `false` = error, `undefined` = neutral (pending).',
      preview: `<DuTimeline>
  <DuTimelineItem start="Step 1" end="Account created" :valid="true" />
  <DuTimelineItem start="Step 2" end="Email verified" :valid="true" />
  <DuTimelineItem start="Step 3" end="Profile setup" />
  <DuTimelineItem start="Step 4" end="First purchase" />
</DuTimeline>`,
      code: `<DuTimeline>
  <DuTimelineItem start="Step 1" end="Account created" :valid="true" />
  <DuTimelineItem start="Step 2" end="Email verified" :valid="true" />
  <DuTimelineItem start="Step 3" end="Profile setup" />
  <DuTimelineItem start="Step 4" end="First purchase" />
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
      title: 'Boxed items',
      description: 'Set `boxed` on DuTimeline to give every item\'s start/end content the `timeline-box` treatment. A per-item `boxed` overrides the parent — set it to `false` to opt a single item out.',
      preview: `<DuTimeline boxed>
  <DuTimelineItem start="2020" end="Company founded" :valid="true" />
  <DuTimelineItem start="2022" end="First product launch" :valid="true" />
  <DuTimelineItem start="2024" end="Series A funding" />
</DuTimeline>`,
      code: `<!-- Every item boxed -->
<DuTimeline boxed>
  <DuTimelineItem start="2020" end="Company founded" />
  <DuTimelineItem start="2022" end="First product launch" />
</DuTimeline>

<!-- Per-item override in dynamic mode -->
<DuTimeline
  :items="[
    { start: '2020', end: 'Company founded', boxed: true },
    { start: '2022', end: 'First product launch' },
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
    {
      title: 'validItems array prop',
      description: 'Pass `validItems` to DuTimeline to color connector lines from the parent — useful with dynamic items.',
      script: `
const steps = [
  { start: 'Step 1', end: 'Account created', completed: true },
  { start: 'Step 2', end: 'Email verified', completed: true },
  { start: 'Step 3', end: 'Profile setup', completed: false },
  { start: 'Step 4', end: 'First purchase' },
]
return { steps }`,
      preview: `<DuTimeline
  :items="steps"
  :validItems="steps.map(s => s.completed)"
/>`,
      code: `<script setup lang="ts">
const steps = [
  { start: 'Step 1', end: 'Account created', completed: true },
  { start: 'Step 2', end: 'Email verified', completed: true },
  { start: 'Step 3', end: 'Profile setup', completed: false },
  { start: 'Step 4', end: 'First purchase' },
]
</script>

<template> 
  <DuTimeline
    :items="steps"
    :validItems="steps.map(s => s.completed)"
  />
</template>`,
    },
    {
      title: 'hrClasses array prop',
      description: 'Pass `hrClasses` to customize connector line classes for each item individually.',
      script: `const milestones = [
  { start: '2020', end: 'Founded', color: 'bg-success' },
  { start: '2022', end: 'Launch', color: 'bg-warning' },
  { start: '2024', end: 'Series A' },
]
return { milestones }`,
      preview: `<DuTimeline
  :items="milestones"
  :hrClasses="milestones.map(m => m.color)"
/>`,
      code: `<script setup lang="ts">
const milestones = [
  { start: '2020', end: 'Founded', color: 'bg-success' },
  { start: '2022', end: 'Launch', color: 'bg-warning' },
  { start: '2024', end: 'Series A' },
]
</script>

<template>
  <DuTimeline
    :items="milestones"
    :hrClasses="milestones.map(m => m.color)"
  />
</template>`,
    },
  ],
} satisfies DocPageData
