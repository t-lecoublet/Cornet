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
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuFileInput accept="image/*" />
  <DuFileInput accept=".pdf" />
  <DuFileInput accept="image/*,.pdf" multiple />
</div>`,
      code: `<!-- images only -->
<DuFileInput v-model="image" accept="image/*" />

<!-- PDF only -->
<DuFileInput v-model="pdf" accept=".pdf" />

<!-- multiple files, mixed types -->
<DuFileInput v-model="files" accept="image/*,.pdf" multiple />`,
    },
    {
      title: 'Ghost style',
      description: 'Use `ghost` for a transparent background with no border — blends into any surface.',
      preview: `<DuFileInput ghost class="w-72" />`,
      code: `<DuFileInput v-model="file" ghost />`,
    },
    {
      title: 'Disabled',
      preview: `<DuFileInput disabled class="w-72" />`,
      code: `<DuFileInput v-model="file" disabled />`,
    },
    {
      title: 'With label and fieldset',
      description: 'Wrap inside DuFieldset + DuLabel for accessible file upload forms.',
      links: [
        { label: 'DuFieldset docs', href: '/docs/data-input/fieldset' },
        { label: 'DuLabel docs', href: '/docs/data-input/label' },
      ],
      preview: `<DuFieldset legend="Attachments">
  <DuLabel type="label">Profile picture</DuLabel>
    <DuFileInput accept="image/*" variant="primary" />
  <DuLabel type="label">CV (PDF only)</DuLabel>
    <DuFileInput accept=".pdf" />
</DuFieldset>`,
      code: `<DuFieldset legend="Attachments">
  <DuLabel type="label">Profile picture</DuLabel>
  <DuFileInput accept="image/*" variant="primary" />
  <DuLabel type="label">CV (PDF only)</DuLabel>
  <DuFileInput accept=".pdf" />
</DuFieldset>`,
    },
  ],
} satisfies DocPageData
