import type { DocPageData } from '@/types/docs'

export default {
  title: 'Steps',
  description: 'Steps component shows a wizard-style progression through a sequence of steps.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/steps/',
  classnames: {
    modifier: [
      { class: 'steps-horizontal', desc: 'Horizontal layout', default: true },
      { class: 'steps-vertical', desc: 'Vertical layout' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<ul class="steps w-full">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Verify</li>
  <li class="step">Profile</li>
  <li class="step">Finish</li>
</ul>`,
      code: `<DuSteps
  :items="[
    { label: 'Register', dataContent: '1' },
    { label: 'Verify', dataContent: '2' },
    { label: 'Profile', dataContent: '3' },
    { label: 'Finish', dataContent: '4' },
  ]"
  :activeSteps="[0, 1]"
  variant="primary"
  direction="steps-horizontal"
/>`,
    },
    {
      title: 'Vertical steps',
      code: `<DuSteps
  :items="[
    { label: 'Order placed' },
    { label: 'Processing' },
    { label: 'Shipped' },
    { label: 'Delivered' },
  ]"
  :activeSteps="[0, 1, 2]"
  variant="success"
  direction="steps-vertical"
/>`,
    },
    {
      title: 'Custom icons',
      code: `<DuSteps
  :items="[
    { label: 'Cart', dataContent: '🛒' },
    { label: 'Payment', dataContent: '💳' },
    { label: 'Done', dataContent: '✓' },
  ]"
  :activeSteps="[0]"
  variant="primary"
/>`,
    },
  ],
} satisfies DocPageData
