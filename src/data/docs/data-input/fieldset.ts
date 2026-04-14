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
  <DuLabel type="fieldset-label">Email</DuLabel>
  <DuInputField type="email" placeholder="your@email.com" />
  <DuLabel type="fieldset-label">Password</DuLabel>
  <DuInputField type="password" placeholder="••••••••" />
</DuFieldset>`,
      code: `<DuFieldset legend="Account">
  <DuLabel type="fieldset-label">Email</DuLabel>
  <DuInputField v-model="email" type="email" placeholder="your@email.com" />
  <DuLabel type="fieldset-label">Password</DuLabel>
  <DuInputField v-model="password" type="password" />
</DuFieldset>`,
    },
    {
      title: 'With helper text',
      preview: `<DuFieldset legend="Profile" label="All fields are required." class="w-72">
  <DuLabel type="fieldset-label">Name</DuLabel>
  <DuInputField placeholder="John Doe" />
</DuFieldset>`,
      code: `<DuFieldset legend="Profile" label="All fields are required.">
  <DuLabel type="fieldset-label">Name</DuLabel>
  <DuInputField v-model="name" placeholder="John Doe" />
</DuFieldset>`,
    },
    {
      title: 'With background and border',
      description: 'Use Tailwind utility classes to add a card-like appearance.',
      preview: `<DuFieldset
  legend="Page details"
  class="w-72 bg-base-200 border border-base-300 p-4 rounded-box"
>
  <DuLabel type="fieldset-label">Title</DuLabel>
  <DuInputField placeholder="My awesome page" />
  <DuLabel type="fieldset-label">Slug</DuLabel>
  <DuInputField placeholder="my-awesome-page" />
</DuFieldset>`,
      code: `<DuFieldset
  legend="Page details"
  class="bg-base-200 border border-base-300 p-4 rounded-box"
>
  <DuLabel type="fieldset-label">Title</DuLabel>
  <DuInputField v-model="title" placeholder="My awesome page" />
  <DuLabel type="fieldset-label">Slug</DuLabel>
  <DuInputField v-model="slug" placeholder="my-awesome-page" />
</DuFieldset>`,
    },
    {
      title: 'Login form',
      preview: `<DuFieldset
  legend="Login"
  class="w-72 bg-base-200 border border-base-300 p-4 rounded-box"
>
  <DuLabel type="fieldset-label">Email</DuLabel>
  <DuInputField type="email" placeholder="your@email.com" />
  <DuLabel type="fieldset-label">Password</DuLabel>
  <DuInputField type="password" placeholder="••••••••" />
  <DuButton variant="neutral" class="mt-2">Login</DuButton>
</DuFieldset>`,
      code: `<DuFieldset legend="Login" class="bg-base-200 border border-base-300 p-4 rounded-box">
  <DuLabel type="fieldset-label">Email</DuLabel>
  <DuInputField v-model="email" type="email" placeholder="your@email.com" />
  <DuLabel type="fieldset-label">Password</DuLabel>
  <DuInputField v-model="password" type="password" />
  <DuButton variant="neutral" class="mt-2" @click="login">Login</DuButton>
</DuFieldset>`,
    },
  ],
} satisfies DocPageData
