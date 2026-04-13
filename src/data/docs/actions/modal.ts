import type { DocPageData } from '@/types/docs'

export default {
  title: 'Modal',
  description: 'Modal is used to show a dialog or a box when you click a button.',
  category: 'Actions',
  source: 'https://daisyui.com/components/modal/',
  classnames: {
    placement: [
      { class: 'top', desc: 'Align to the top' },
      { class: 'middle', desc: 'Center of screen', default: true },
      { class: 'bottom', desc: 'Align to the bottom' },
      { class: 'start', desc: 'Align to the left' },
      { class: 'end', desc: 'Align to the right' },
      { class: 'responsive', desc: 'Bottom on mobile, middle on desktop' },
    ],
  },
  sections: [
    {
      title: 'Basic usage',
      description: 'Bind `v-model:open` to a ref to control the modal.',
      code: `<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <DuButton @click="isOpen = true" variant="primary">Open Modal</DuButton>

  <DuModal v-model:open="isOpen" closeButton closeOnEscape>
    <h3 class="font-bold text-lg mb-2">Hello!</h3>
    <p class="text-base-content/70">This is the modal content.</p>
    <div class="mt-4 flex justify-end">
      <DuButton @click="isOpen = false">Close</DuButton>
    </div>
  </DuModal>
</template>`,
    },
    {
      title: 'Placements',
      description: 'Control where the modal appears with the `placement` prop.',
      code: `<DuModal v-model:open="isOpen" placement="top">Top modal</DuModal>
<DuModal v-model:open="isOpen" placement="bottom">Bottom modal</DuModal>
<DuModal v-model:open="isOpen" placement="start">Left modal</DuModal>
<DuModal v-model:open="isOpen" placement="end">Right modal</DuModal>
<DuModal v-model:open="isOpen" placement="responsive">Responsive modal</DuModal>`,
    },
    {
      title: 'Close options',
      description: 'The modal can be closed via a button, clicking the backdrop, or pressing Escape.',
      code: `<!-- Close button in the top right corner -->
<DuModal v-model:open="isOpen" closeButton>Content</DuModal>

<!-- Click backdrop to close (default: true) -->
<DuModal v-model:open="isOpen" :closeBackdrop="true">Content</DuModal>

<!-- Press Escape to close (default: true) -->
<DuModal v-model:open="isOpen" :closeOnEscape="true">Content</DuModal>`,
    },
    {
      title: 'Confirmation dialog',
      code: `<DuModal v-model:open="confirmOpen" closeButton placement="middle">
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-lg">Are you sure?</h3>
    <p class="text-base-content/60 text-sm">This action cannot be undone.</p>
    <div class="flex gap-2 justify-end">
      <DuButton variant="neutral" ghost @click="confirmOpen = false">Cancel</DuButton>
      <DuButton variant="error" @click="confirm">Delete</DuButton>
    </div>
  </div>
</DuModal>`,
    },
  ],
} satisfies DocPageData
