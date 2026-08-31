import type { DocPageData } from '@/types/docs'

export default {
  title: 'FileInput',
  description: 'FileInput is a styled file upload input. It reports what was chosen through `v-model` and `@change` as a `File[]` — it emitted nothing at all before, so there was no way to read the selection.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/file-input/',
  props: [
    {
      title: 'modelValue',
      description: 'The chosen files. **Read-only in practice**: a file input\'s value cannot be set from script — the browser forbids it — so the model reports rather than restores. Assigning an empty array does clear the field, which is what a form reset needs.',
      type: 'File[]',
    },
    {
      title: 'multiple',
      description: 'Accept more than one file.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'accept',
      description: 'Native `accept` filter, e.g. `"image/*,.pdf"`.',
      type: 'string',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name, when no visible label provides one.',
      type: 'string',
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'ghost',
      description: 'Ghost style — no background until focused',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the input',
      type: 'boolean',
      default: 'false',
    },
  ],
  sections: [
    {
      title: 'Basic',
      preview: `<DuFileInput class="w-72" />`,
      code: `<DuFileInput v-model="file" />`,
    },
    {
      title: 'Reading the selection',
      description: '`v-model` and `@change` both carry a `File[]`. The model reports what the user picked; it cannot put files back into the field, because no browser lets script do that. Assign `[]` to clear it.',
      script: `
      const files = ref([])
      return { files }
      `,
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuFileInput v-model="files" multiple ariaLabel="Attachments" />
  <ul class="text-sm text-base-content/70 list-disc pl-5">
    <li v-for="file in files" :key="file.name">{{ file.name }} — {{ Math.round(file.size / 1024) }} KB</li>
    <li v-if="!files.length" class="list-none pl-0 text-base-content/50">Nothing selected</li>
  </ul>
  <DuButton size="sm" ghost @click="files = []">Clear</DuButton>
</div>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const files = ref<File[]>([])

async function upload() {
  const body = new FormData()
  files.value.forEach((file) => body.append('files', file))
  await fetch('/api/upload', { method: 'POST', body })
  files.value = []   // clears the field too
}
</script>

<template>
  <DuFileInput v-model="files" multiple ariaLabel="Attachments" />
  <DuButton @click="upload">Upload</DuButton>
</template>`,
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
