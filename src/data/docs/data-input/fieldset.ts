import type { DocPageData } from '@/types/docs'

export default {
  title: 'Fieldset',
  description: 'Fieldset groups related form fields with a legend and optional hint text.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/fieldset/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuFieldset legend="Account" class="w-72">
  <DuLabel type="label">
    Email
    <DuInputField type="email" placeholder="your@email.com" />
  </DuLabel>
  <DuLabel type="label">
    Password
    <DuInputField type="password" placeholder="••••••••" />
  </DuLabel>
</DuFieldset>`,
      code: `<DuFieldset legend="Account">
  <DuLabel type="label">
    Email
    <DuInputField v-model="email" type="email" placeholder="your@email.com" />
  </DuLabel>
  <DuLabel type="label">
    Password
    <DuInputField v-model="password" type="password" />
  </DuLabel>
</DuFieldset>`,
    },
    {
      title: 'With helper text',
      preview: `<DuFieldset legend="Profile" label="All fields are required." class="w-72">
  <DuLabel type="label">
    Name
    <DuInputField placeholder="John Doe" />
  </DuLabel>
</DuFieldset>`,
      code: `<DuFieldset legend="Profile" label="All fields are required.">
  <DuLabel type="label">
    Name
    <DuInputField v-model="name" placeholder="John Doe" />
  </DuLabel>
</DuFieldset>`,
    },
  ],
} satisfies DocPageData
