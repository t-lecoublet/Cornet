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
      title: 'Label prefix',
      description: 'Place a `<span class="label">` before the input to show a prefix.',
      preview: `<DuLabel class="w-72">
  <span class="label">https://</span>
  <DuInputField placeholder="mysite.com" />
</DuLabel>`,
      code: `<DuLabel>
  <span class="label">https://</span>
  <DuInputField v-model="url" placeholder="mysite.com" />
</DuLabel>`,
    },
    {
      title: 'Label suffix',
      description: 'Place a `<span class="label">` after the input to show a suffix.',
      preview: `<DuLabel class="w-72">
  <DuInputField placeholder="domain name" />
  <span class="label">.com</span>
</DuLabel>`,
      code: `<DuLabel>
  <DuInputField v-model="domain" placeholder="domain name" />
  <span class="label">.com</span>
</DuLabel>`,
    },
    {
      title: 'Label for select',
      description: 'Use `type="select"` when wrapping a select element.',
      preview: `<DuLabel type="select" class="w-72">
  <span class="label">Type</span>
  <DuSelect>
    <option>Personal</option>
    <option>Business</option>
  </DuSelect>
</DuLabel>`,
      code: `<DuLabel type="select">
  <span class="label">Type</span>
  <DuSelect v-model="type">
    <option value="personal">Personal</option>
    <option value="business">Business</option>
  </DuSelect>
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
    },
    {
      title: 'With alt text',
      preview: `<DuLabel type="label" class="w-72">
  Username
  <DuInputField placeholder="john_doe" />
  <template #alt>Max 20 characters</template>
</DuLabel>`,
      code: `<DuLabel type="label">
  Username
  <DuInputField v-model="username" placeholder="john_doe" />
  <template #alt>Max 20 characters</template>
</DuLabel>`,
    },
  ],
} satisfies DocPageData
