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
      title: 'Floating label',
      preview: `<DuLabel type="floating-label" class="w-72">
  Name
  <DuInputField placeholder=" " />
</DuLabel>`,
      code: `<DuLabel type="floating-label">
  Name
  <DuInputField v-model="name" placeholder=" " />
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
