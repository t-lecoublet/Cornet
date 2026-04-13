import type { DocPageData } from '@/types/docs'

export default {
  title: 'Fieldset',
  description: 'Fieldset groups related form fields with a legend and optional hint text.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/fieldset/',
  sections: [
    {
      title: 'Basic',
      preview: `<fieldset class="fieldset border border-base-300 rounded-xl p-4 w-72">
  <legend class="fieldset-legend px-2">Account</legend>
  <label class="label">Email<input type="email" class="input" placeholder="your@email.com" /></label>
  <label class="label">Password<input type="password" class="input" /></label>
</fieldset>`,
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
      code: `<DuFieldset legend="Profile" hint="All fields are required.">
  <DuLabel type="label">
    Name
    <DuInputField v-model="name" placeholder="John Doe" />
  </DuLabel>
</DuFieldset>`,
    },
  ],
} satisfies DocPageData
