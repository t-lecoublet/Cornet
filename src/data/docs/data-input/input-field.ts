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
      preview: `<input type="text" placeholder="Type here..." class="input w-72" />`,
      code: `<DuInputField v-model="value" placeholder="Type here..." />`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <input class="input input-primary" placeholder="Primary" />
  <input class="input input-secondary" placeholder="Secondary" />
  <input class="input input-accent" placeholder="Accent" />
  <input class="input input-error" placeholder="Error" />
  <input class="input input-success" placeholder="Success" />
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
  <input class="input input-xs" placeholder="XSmall" />
  <input class="input input-sm" placeholder="Small" />
  <input class="input" placeholder="Medium" />
  <input class="input input-lg" placeholder="Large" />
  <input class="input input-xl" placeholder="XLarge" />
</div>`,
      code: `<DuInputField v-model="val" size="xs" placeholder="XSmall" />
<DuInputField v-model="val" size="sm" placeholder="Small" />
<DuInputField v-model="val" placeholder="Medium" />
<DuInputField v-model="val" size="lg" placeholder="Large" />
<DuInputField v-model="val" size="xl" placeholder="XLarge" />`,
    },
    {
      title: 'Ghost style',
      preview: `<input class="input input-ghost w-72" placeholder="Ghost input" />`,
      code: `<DuInputField v-model="val" ghost placeholder="Ghost input" />`,
    },
    {
      title: 'Disabled',
      preview: `<input class="input w-72" disabled placeholder="Disabled" />`,
      code: `<DuInputField v-model="val" disabled placeholder="Disabled" />`,
    },
    {
      title: 'Input types',
      code: `<DuInputField v-model="email" type="email" placeholder="your@email.com" />
<DuInputField v-model="password" type="password" placeholder="Password" />
<DuInputField v-model="number" type="number" placeholder="0" />
<DuInputField v-model="date" type="date" />`,
    },
    {
      title: 'With HTML validation',
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
