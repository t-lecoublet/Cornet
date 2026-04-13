import type { DocPageData } from '@/types/docs'

export default {
  title: 'FileInput',
  description: 'FileInput is a styled file upload input.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/file-input/',
  sections: [
    {
      title: 'Basic',
      preview: `<input type="file" class="file-input w-72" />`,
      code: `<DuFileInput v-model="file" />`,
    },
    {
      title: 'Variants',
      code: `<DuFileInput v-model="file" variant="primary" />
<DuFileInput v-model="file" variant="success" />
<DuFileInput v-model="file" variant="error" />`,
    },
    {
      title: 'Sizes',
      code: `<DuFileInput v-model="file" size="xs" />
<DuFileInput v-model="file" size="sm" />
<DuFileInput v-model="file" />
<DuFileInput v-model="file" size="lg" />`,
    },
    {
      title: 'Accept specific types',
      code: `<DuFileInput v-model="image" accept="image/*" />
<DuFileInput v-model="pdf" accept=".pdf" />
<DuFileInput v-model="files" accept="image/*,.pdf" multiple />`,
    },
  ],
} satisfies DocPageData
