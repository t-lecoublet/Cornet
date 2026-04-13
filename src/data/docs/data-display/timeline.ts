import type { DocPageData } from '@/types/docs'

export default {
  title: 'Timeline',
  description: 'Timeline component displays a list of events in chronological order.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/timeline/',
  classnames: {
    modifier: [
      { class: 'timeline-vertical', desc: 'Vertical layout', default: true },
      { class: 'timeline-horizontal', desc: 'Horizontal layout' },
      { class: 'timeline-snap-icon', desc: 'Snaps icon to middle of item' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<ul class="timeline timeline-vertical w-72">
  <li>
    <div class="timeline-start text-xs">2020</div>
    <div class="timeline-middle"><div class="w-3 h-3 bg-primary rounded-full"></div></div>
    <div class="timeline-end timeline-box text-sm">Company founded</div>
    <hr/>
  </li>
  <li>
    <hr/>
    <div class="timeline-start text-xs">2022</div>
    <div class="timeline-middle"><div class="w-3 h-3 bg-primary rounded-full"></div></div>
    <div class="timeline-end timeline-box text-sm">First product launch</div>
    <hr/>
  </li>
  <li>
    <hr/>
    <div class="timeline-start text-xs">2024</div>
    <div class="timeline-middle"><div class="w-3 h-3 bg-primary rounded-full"></div></div>
    <div class="timeline-end timeline-box text-sm">Series A funding</div>
  </li>
</ul>`,
      code: `<DuTimeline>
  <DuTimelineItem label="2020" side="end">Company founded</DuTimelineItem>
  <DuTimelineItem label="2022" side="end">First product launch</DuTimelineItem>
  <DuTimelineItem label="2024" side="end">Series A funding</DuTimelineItem>
</DuTimeline>`,
    },
    {
      title: 'Horizontal',
      code: `<DuTimeline direction="horizontal">
  <DuTimelineItem label="Step 1">Register</DuTimelineItem>
  <DuTimelineItem label="Step 2">Verify</DuTimelineItem>
  <DuTimelineItem label="Step 3">Complete</DuTimelineItem>
</DuTimeline>`,
    },
    {
      title: 'With variant colors',
      code: `<DuTimeline>
  <DuTimelineItem label="Done" variant="success">Account created</DuTimelineItem>
  <DuTimelineItem label="Done" variant="success">Email verified</DuTimelineItem>
  <DuTimelineItem label="Current" variant="primary">Profile setup</DuTimelineItem>
  <DuTimelineItem label="Pending">First purchase</DuTimelineItem>
</DuTimeline>`,
    },
  ],
} satisfies DocPageData
