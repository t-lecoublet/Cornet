import type { DocPageData } from '@/types/docs'

export default {
  title: 'FileInput',
  description: 'FileInput is a styled file upload input.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/file-input/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuFileInput class="w-72" />`,
      code: `<DuFileInput v-model="file" />`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuFileInput variant="primary" />
  <DuFileInput variant="success" />
  <DuFileInput variant="error" />
</div>`,
      code: `<DuFileInput v-model="file" variant="primary" />
<DuFileInput v-model="file" variant="success" />
<DuFileInput v-model="file" variant="error" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuFileInput size="xs" />
  <DuFileInput size="sm" />
  <DuFileInput />
  <DuFileInput size="lg" />
</div>`,
      code: `<DuFileInput v-model="file" size="xs" />
<DuFileInput v-model="file" size="sm" />
<DuFileInput v-model="file" />
<DuFileInput v-model="file" size="lg" />`,
    },
    {
      title: 'Accept specific types',
      links: [
        { label: 'MDN input accept attribute', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept' },
      ],
      code: `<DuFileInput v-model="image" accept="image/*" />
<DuFileInput v-model="pdf" accept=".pdf" />
<DuFileInput v-model="files" accept="image/*,.pdf" multiple />`,
    },
  ],
} satisfies DocPageData
