import type { DocPageData } from '@/types/docs'

export default {
  title: 'LabelInputValidator',
  description: 'LabelInputValidator wraps an input with a label and HTML5 validation feedback message.',
  category: 'Data Input',
  sections: [
    {
      title: 'Basic',
      preview: `<DuLabelInputValidator
  type="label"
  inputType="email"
  placeholder="your@email.com"
  class="w-72"
>
  Email
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator
  type="label"
  inputType="email"
  placeholder="your@email.com"
  required
  :pattern="'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'"
  title="Please enter a valid email address"
  v-model="email"
>
  Email
</DuLabelInputValidator>`,
    },
    {
      title: 'Text input with min length',
      preview: `<DuLabelInputValidator
  type="label"
  inputType="text"
  placeholder="At least 3 characters"
  class="w-72"
>
  Username
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator
  type="label"
  inputType="text"
  placeholder="At least 3 characters"
  required
  :minlength="3"
  title="Minimum 3 characters required"
  v-model="username"
>
  Username
</DuLabelInputValidator>`,
    },
    {
      title: 'Password with pattern',
      preview: `<DuLabelInputValidator
  type="label"
  inputType="password"
  placeholder="Strong password"
  class="w-72"
>
  Password
</DuLabelInputValidator>`,
      code: `<DuLabelInputValidator
  type="label"
  inputType="password"
  placeholder="Strong password"
  required
  :pattern="'(?=.*[A-Z])(?=.*[0-9]).{8,}'"
  title="Min 8 chars, at least one uppercase and one number"
  v-model="password"
>
  Password
</DuLabelInputValidator>`,
    },
  ],
} satisfies DocPageData
