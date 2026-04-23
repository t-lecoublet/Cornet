import type { DocPageData } from '@/types/docs'

export default {
  title: 'Steps',
  description: 'Steps component shows a wizard-style progression through a sequence of steps.',
  category: 'Navigation',
  source: 'https://daisyui.com/components/steps/',
  props: [
    {
      title: 'items',
      description: 'Array of step items with label, active, customClass, and dataContent properties',
      type: 'StepItem[]',
    },
    {
      title: 'direction',
      description: 'Layout direction of steps',
      type: 'string',
      default: '"steps-horizontal"',
      options: ['steps-horizontal', 'steps-vertical'],
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for the steps container',
      type: 'string',
    },
    {
      title: 'responsive',
      description: 'Make steps vertical on mobile and horizontal on larger screens',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'activeSteps',
      description: 'Array of step indices to mark as active/completed',
      type: 'number[]',
    },
    {
      title: 'variant',
      description: 'Color variant for active steps',
      type: 'string',
      default: '"primary"',
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error', 'ghost', 'link'],
    },
  ],
  slots: [
    {
      title: 'Step slots (#step, #step-{index})',
      description: 'Customize individual steps with slot props: item, index. Use `#step-{n}` for a specific step or `#step` for all.',
      preview: `<DuSteps
  :items="[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]"
  :activeSteps="[0, 1]"
>
  <template #step-0="{ item, index }">
    <span class="badge badge-primary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
  <template #step-1="{ item, index }">
    <span class="badge badge-secondary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
</DuSteps>`,
      code: `<DuSteps :items="items" :activeSteps="activeSteps">
  <template #step-0="{ item, index }">
    <span class="badge badge-primary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
</DuSteps>`,
    },
    {
      title: 'Step icon slots (#step-icon, #step-icon-{index})',
      description: 'Add custom icons to steps',
      preview: `<DuSteps
  :items="[
    { label: 'Cart' },
    { label: 'Payment' },
    { label: 'Confirm' },
  ]"
  :activeSteps="[0, 1]"
>
  <template #step-icon-0>
    <span class="text-xl">🛒</span>
  </template>
  <template #step-icon-1>
    <span class="text-xl">💳</span>
  </template>
  <template #step-icon-2>
    <span class="text-xl">✅</span>
  </template>
</DuSteps>`,
      code: `<DuSteps :items="items" :activeSteps="activeSteps">
  <template #step-icon-0>
    <CheckIcon class="w-5 h-5" />
  </template>
</DuSteps>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Use default slot for manual HTML step structure',
      preview: `<DuSteps direction="steps-horizontal" class="w-full">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Verify</li>
  <li class="step">Profile</li>
  <li class="step">Finish</li>
</DuSteps>`,
      code: `<DuSteps direction="steps-horizontal">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Verify</li>
  <li class="step">Profile</li>
  <li class="step">Finish</li>
</DuSteps>`,
    },
  ],
  classnames: {
    modifier: [
      { class: 'steps-horizontal', desc: 'Horizontal layout', default: true },
      { class: 'steps-vertical', desc: 'Vertical layout' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuSteps
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
      preview: `<DuSteps
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
      title: 'Custom data content',
      description: 'Use dataContent for custom icons or numbers',
      preview: `<DuSteps
  :items="[
    { label: 'Cart', dataContent: '🛒' },
    { label: 'Payment', dataContent: '💳' },
    { label: 'Done', dataContent: '✓' },
  ]"
  :activeSteps="[0]"
  variant="primary"
/>`,
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
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-6">
  <DuSteps
    :items="[{ label: 'Step' }, { label: 'Step' }]"
    :activeSteps="[0]"
    variant="primary"
    direction="steps-horizontal"
  />
  <DuSteps
    :items="[{ label: 'Step' }, { label: 'Step' }]"
    :activeSteps="[0]"
    variant="secondary"
    direction="steps-horizontal"
  />
  <DuSteps
    :items="[{ label: 'Step' }, { label: 'Step' }]"
    :activeSteps="[0]"
    variant="accent"
    direction="steps-horizontal"
  />
  <DuSteps
    :items="[{ label: 'Step' }, { label: 'Step' }]"
    :activeSteps="[0]"
    variant="success"
    direction="steps-horizontal"
  />
</div>`,
      code: `<DuSteps :items="items" :activeSteps="[0]" variant="primary" />`,
    },
    {
      title: 'Responsive steps',
      description: 'Vertical on mobile, horizontal on larger screens',
      preview: `<DuSteps
  :items="[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]"
  :activeSteps="[0, 1]"
  variant="primary"
  :responsive="true"
/>`,
      code: `<DuSteps :items="items" :activeSteps="[0, 1]" variant="primary" :responsive="true" />`,
    },
    {
      title: 'All steps completed',
      preview: `<DuSteps
  :items="[
    { label: 'Register' },
    { label: 'Verify' },
    { label: 'Profile' },
    { label: 'Finish' },
  ]"
  :activeSteps="[0, 1, 2, 3]"
  variant="success"
/>`,
      code: `<DuSteps
  :items="items"
  :activeSteps="[0, 1, 2, 3]"
  variant="success"
/>`,
    },
    {
      title: 'No active steps',
      preview: `<DuSteps
  :items="[
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]"
/>`,
      code: `<DuSteps :items="items" />`,
    },
    {
      title: 'Custom step content with scoped slots',
      description: 'Numbered template slots like `#step-0`, `#step-1` expose `{ item, index }` as slot props. Use `#step` (without index) to apply the same template to all steps.',
      links: [
        { label: 'Vue scoped slots docs', href: 'https://vuejs.org/guide/components/slots.html#scoped-slots' },
      ],
      preview: `<DuSteps
  :items="[
    { label: 'Register' },
    { label: 'Verify' },
    { label: 'Profile' },
  ]"
  :activeSteps="[0, 1]"
>
  <template #step-0="{ item, index }">
    <DuBadge variant="primary" size="sm">{{ index + 1 }}</DuBadge>
    {{ item.label }}
  </template>
  <template #step-1="{ item }">
    <DuBadge variant="secondary" size="sm">✓</DuBadge>
    {{ item.label }}
  </template>
</DuSteps>`,
      code: `<!-- Per-step override -->
<DuSteps :items="steps" :activeSteps="[0, 1]">
  <template #step-0="{ item, index }">
    <span class="badge badge-primary">{{ index + 1 }}</span>
    {{ item.label }}
  </template>
  <template #step-1="{ item }">
    <span class="badge badge-secondary">✓</span>
    {{ item.label }}
  </template>
</DuSteps>

<!-- Same template for all steps -->
<DuSteps :items="steps" :activeSteps="activeSteps">
  <template #step="{ item, index }">
    <span class="font-bold text-primary">{{ index + 1 }}.</span>
    {{ item.label }}
  </template>
</DuSteps>`,
    },
    {
      title: 'Icon slots per step (#step-icon-{n})',
      description: 'Use `#step-icon-{n}` to set a custom icon inside the step circle for a specific step.',
      preview: `<DuSteps
  :items="[
    { label: 'Cart' },
    { label: 'Payment' },
    { label: 'Confirm' },
  ]"
  :activeSteps="[0, 1]"
>
  <template #step-icon-0>🛒</template>
  <template #step-icon-1>💳</template>
  <template #step-icon-2>✅</template>
</DuSteps>`,
      code: `<DuSteps :items="checkoutSteps" :activeSteps="[0, 1]">
  <template #step-icon-0>
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
    </svg>
  </template>
  <template #step-icon-1>
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  </template>
  <template #step-icon-2>
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
  </template>
</DuSteps>`,
    },
  ],
} satisfies DocPageData
