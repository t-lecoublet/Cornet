import type { DocPageData } from '@/types/docs'

export default {
  title: 'InputField',
  description: 'InputField is a styled text input element with support for variants, sizes, and validation.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/input/',
  classnames: {
    style: [
      { class: 'input-ghost', desc: 'Transparent ghost style' },
    ],
    color: [
      { class: 'input-primary', desc: 'Primary border on focus' },
      { class: 'input-secondary', desc: 'Secondary border' },
      { class: 'input-accent', desc: 'Accent border' },
      { class: 'input-error', desc: 'Error state (red border)' },
      { class: 'input-success', desc: 'Success state' },
      { class: 'input-warning', desc: 'Warning state' },
    ],
    size: [
      { class: 'input-xs', desc: 'Extra small' },
      { class: 'input-sm', desc: 'Small' },
      { class: 'input-md', desc: 'Medium', default: true },
      { class: 'input-lg', desc: 'Large' },
      { class: 'input-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuInputField placeholder="Type here..." class="w-72" />`,
      code: `<DuInputField v-model="value" placeholder="Type here..." />`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuInputField variant="primary" placeholder="Primary" />
  <DuInputField variant="secondary" placeholder="Secondary" />
  <DuInputField variant="accent" placeholder="Accent" />
  <DuInputField variant="error" placeholder="Error" />
  <DuInputField variant="success" placeholder="Success" />
</div>`,
      code: `<DuInputField v-model="val" variant="primary" placeholder="Primary" />
<DuInputField v-model="val" variant="secondary" placeholder="Secondary" />
<DuInputField v-model="val" variant="accent" placeholder="Accent" />
<DuInputField v-model="val" variant="error" placeholder="Error" />
<DuInputField v-model="val" variant="success" placeholder="Success" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuInputField size="xs" placeholder="XSmall" />
  <DuInputField size="sm" placeholder="Small" />
  <DuInputField placeholder="Medium" />
  <DuInputField size="lg" placeholder="Large" />
  <DuInputField size="xl" placeholder="XLarge" />
</div>`,
      code: `<DuInputField v-model="val" size="xs" placeholder="XSmall" />
<DuInputField v-model="val" size="sm" placeholder="Small" />
<DuInputField v-model="val" placeholder="Medium" />
<DuInputField v-model="val" size="lg" placeholder="Large" />
<DuInputField v-model="val" size="xl" placeholder="XLarge" />`,
    },
    {
      title: 'Ghost style',
      preview: `<DuInputField ghost placeholder="Ghost input" class="w-72" />`,
      code: `<DuInputField v-model="val" ghost placeholder="Ghost input" />`,
    },
    {
      title: 'Disabled',
      preview: `<DuInputField disabled placeholder="Disabled" class="w-72" />`,
      code: `<DuInputField v-model="val" disabled placeholder="Disabled" />`,
    },
    {
      title: 'Input types',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuInputField type="email" placeholder="your@email.com" />
  <DuInputField type="password" placeholder="Password" />
  <DuInputField type="number" placeholder="0" />
  <DuInputField type="date" />
</div>`,
      code: `<DuInputField v-model="email" type="email" placeholder="your@email.com" />
<DuInputField v-model="password" type="password" placeholder="Password" />
<DuInputField v-model="number" type="number" placeholder="0" />
<DuInputField v-model="date" type="date" />`,
    },
    {
      title: 'With HTML validation',
      links: [
        { label: 'HTML constraint validation docs', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation' },
      ],
      code: `<DuInputField
  v-model="email"
  type="email"
  placeholder="your@email.com"
  required
  :pattern="'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'"
  title="Please enter a valid email"
  :invalid="true"
/>`,
    },
  ],
} satisfies DocPageData
