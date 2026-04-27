import type { DocPageData } from '@/types/docs'

export default {
  title: 'Label',
  description: 'Label wraps an input with an accessible label. Use it to associate text with form fields.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/label/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuLabel type="label" class="w-72">
  Email
  <DuInputField type="email" placeholder="your@email.com" />
</DuLabel>`,
      code: `<DuLabel type="label">
  Email
  <DuInputField v-model="email" type="email" placeholder="your@email.com" />
</DuLabel>`,
    },
    {
      title: 'Label with fieldset',
      description: 'When wrapping a fieldset, the label could be placed inside the fieldset and use `type="label"`.',
      links: [
        { label: 'DuFieldset docs', href: '/docs/data-input/fieldset' },
      ],
      preview: `<div class="flex flex-col">
<DuFieldset>
  <DuLabel type="label">Enter your email</DuLabel>
  <DuInputField type="email" placeholder="your@email.com" />
</DuFieldset>
</div>`,
      code: `<div class="flex flex-col">
  <DuFieldset>
    <DuLabel type="label">Enter your email</DuLabel>
    <DuInputField type="email" placeholder="your@email.com" />
  </DuFieldset>
</div>`,
    },
    {
      title: 'Label prefix',
      description: 'Place a `<span class="label">` before the input to show a prefix.',
      preview: `<DuLabel type="input" class="w-72">
  <span class="label">https://</span>
  <DuInputField placeholder="mysite.com" />
</DuLabel>`,
      code: `<DuLabel type="input">
  <span class="label">https://</span>
  <DuInputField v-model="url" placeholder="mysite.com" />
</DuLabel>`,
    },
    {
      title: 'Label suffix',
      description: 'Place a `<span class="label">` after the input to show a suffix.',
      preview: `<DuLabel type="input" class="w-72">
  <DuInputField placeholder="domain name" />
  <span class="label">.com</span>
</DuLabel>`,
      code: `<DuLabel type="input">
  <DuInputField v-model="domain" placeholder="domain name" />
  <span class="label">.com</span>
</DuLabel>`,
    },
    {
      title: 'Label for select',
      description: 'Used when wrapping a select element.',
      links: [
        { label: 'DuSelect docs', href: '/docs/data-input/select' },
      ],
      preview: `<DuLabel type="select" class="w-72">
  <span class="label">Type</span>
  <DuSelect :options="[
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]" />
</DuLabel>`,
      code: `<DuLabel type="select">
  <span class="label">Type</span>
  <DuSelect v-model="type" 
    :option="[
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]" 
  />
</DuLabel>`,
    },
    {
      title: 'Floating label',
      preview: `<DuLabel type="floating-label" class="w-72">
  <span class="label">Your name</span>
  <DuInputField placeholder="Your name" />
</DuLabel>`,
      code: `<DuLabel type="floating-label">
  <span class="label">Your name</span>
  <DuInputField v-model="name" placeholder="Your name" />
</DuLabel>`,
    }
  ],
} satisfies DocPageData
