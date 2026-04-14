import type { DocPageData } from '@/types/docs'

export default {
  title: 'Modal',
  description: 'Modal is used to show a dialog or a box when you click a button.',
  category: 'Actions',
  source: 'https://daisyui.com/components/modal/',
  props: [
    {
      title: 'open',
      description: 'Whether the modal is open (use with v-model:open)',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'closeButton',
      description: 'Show close button in top right corner',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'closeOnEscape',
      description: 'Close modal when Escape is pressed',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'closeBackdrop',
      description: 'Close modal when clicking the backdrop',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'placement',
      description: 'Position of the modal on screen',
      type: 'string',
      default: '"middle"',
      options: ['top', 'middle', 'bottom', 'start', 'end', 'responsive'],
    },
    {
      title: 'classBox',
      description: 'Additional CSS classes for the modal box',
      type: 'string',
    },
    {
      title: 'id',
      description: 'Unique identifier for the modal',
      type: 'string',
    },
  ],
  slots: [
    {
      title: 'Slot #actions',
      description: 'Action buttons displayed at the bottom of the modal',
      preview: `<DuButton onclick="document.getElementById('modal-actions').showModal()">Open</DuButton>
<DuModal id="modal-actions" closeButton class="w-72">
  <h3 class="font-bold text-lg mb-2">Confirm Action</h3>
  <p class="text-base-content/70 mb-4">Are you sure you want to continue?</p>
  <template #actions>
    <DuButton variant="primary">Confirm</DuButton>
  </template>
</DuModal>`,
      code: `<DuModal closeButton>
  <h3 class="font-bold text-lg mb-2">Title</h3>
  <p>Content</p>
  <template #actions>
    <DuButton variant="neutral">Cancel</DuButton>
    <DuButton variant="primary">Confirm</DuButton>
  </template>
</DuModal>`,
    },
  ],
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
      title: 'With v-model',
      description: 'Use `v-model:open` to control modal state reactively — the Vue way.',
      preview: `<DuButton onclick="document.getElementById('modal-vmodel').showModal()" variant="primary">Open</DuButton>
<DuModal id="modal-vmodel" closeButton>
  <h3 class="font-bold text-lg mb-2">Hello!</h3>
  <p class="text-base-content/70">This modal is controlled via v-model.</p>
</DuModal>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <DuButton @click="isOpen = true" variant="primary">Open Modal</DuButton>
  <DuModal v-model:open="isOpen" closeButton>
    <h3 class="font-bold text-lg mb-2">Hello!</h3>
    <p>Click the ✕ or backdrop to close.</p>
  </DuModal>
</template>`,
    },
    {
      title: 'Basic usage',
      description: 'Use a unique `id` and `document.getElementById().showModal()` to control the modal.',
      preview: `<DuButton onclick="document.getElementById('modal-basic').showModal()">Open Modal</DuButton>

<DuModal id="modal-basic" closeButton>
  <h3 class="font-bold text-lg mb-2">Hello!</h3>
  <p class="text-base-content/70">This is the modal content.</p>
</DuModal>`,
      code: `<DuButton onclick="document.getElementById('my-modal').showModal()">Open Modal</DuButton>

<DuModal id="my-modal" closeButton>
  <h3 class="font-bold text-lg mb-2">Hello!</h3>
  <p>This is the modal content.</p>
</DuModal>`,
    },
    {
      title: 'Placements',
      description: 'Control where the modal appears with the `placement` prop.',
      preview: `<DuButton onclick="document.getElementById('modal-top').showModal()">Top</DuButton>
<DuButton onclick="document.getElementById('modal-bottom').showModal()">Bottom</DuButton>
<DuButton onclick="document.getElementById('modal-start').showModal()">Left</DuButton>
<DuButton onclick="document.getElementById('modal-end').showModal()">Right</DuButton>

<DuModal id="modal-top" placement="top"><h3>Top modal</h3></DuModal>
<DuModal id="modal-bottom" placement="bottom"><h3>Bottom modal</h3></DuModal>
<DuModal id="modal-start" placement="start"><h3>Left modal</h3></DuModal>
<DuModal id="modal-end" placement="end"><h3>Right modal</h3></DuModal>`,
      code: `<DuModal placement="top">Top modal</DuModal>
<DuModal placement="bottom">Bottom modal</DuModal>
<DuModal placement="start">Left modal</DuModal>
<DuModal placement="end">Right modal</DuModal>`,
    },
    {
      title: 'Close options',
      description: 'Control how the modal can be closed.',
      preview: `<DuButton onclick="document.getElementById('modal-close').showModal()">Show modal</DuButton>

<DuModal id="modal-close" closeButton :closeBackdrop="false" :closeOnEscape="false">
  <h3 class="font-bold text-lg mb-2">Custom Close</h3>
  <p class="text-base-content/70">Backdrop click and Escape are disabled.</p>
</DuModal>`,
      code: `<!-- Close button in the top right corner -->
<DuModal closeButton>Content</DuModal>

<!-- Disable backdrop click -->
<DuModal :closeBackdrop="false">Content</DuModal>

<!-- Disable Escape key -->
<DuModal :closeOnEscape="false">Content</DuModal>`,
    },
    {
      title: 'Confirmation dialog',
      preview: `<DuButton onclick="document.getElementById('modal-confirm').showModal()" variant="error">Delete Item</DuButton>

<DuModal id="modal-confirm" closeButton>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-lg">Are you sure?</h3>
    <p class="text-base-content/60 text-sm">This action cannot be undone.</p>
  </div>
  <template #actions>
    <DuButton variant="error">Delete</DuButton>
  </template>
</DuModal>`,
      code: `<DuButton onclick="document.getElementById('confirm-modal').showModal()">Delete</DuButton>

<DuModal id="confirm-modal" closeButton>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-lg">Are you sure?</h3>
    <p class="text-sm">This action cannot be undone.</p>
  </div>
  <template #actions>
    <DuButton variant="error">Delete</DuButton>
  </template>
</DuModal>`,
    },
    {
      title: 'With actions slot',
      description: 'Use the `#actions` slot to add action buttons at the bottom.',
      preview: `<DuButton onclick="document.getElementById('modal-form').showModal()">Open Form</DuButton>

<DuModal id="modal-form" closeButton>
  <h3 class="font-bold text-lg mb-2">Form Title</h3>
  <p class="text-base-content/70 mb-4">Form description goes here.</p>
  <template #actions>
    <DuButton variant="primary">Save</DuButton>
  </template>
</DuModal>`,
      code: `<DuButton onclick="document.getElementById('form-modal').showModal()">Open</DuButton>

<DuModal id="form-modal" closeButton>
  <h3 class="font-bold text-lg mb-2">Form Title</h3>
  <p>Form description goes here.</p>
  <template #actions>
    <DuButton variant="primary">Save</DuButton>
  </template>
</DuModal>`,
    },
    {
      title: 'Custom box class',
      description: 'Use `classBox` to add custom classes to the modal box.',
      preview: `<DuButton onclick="document.getElementById('modal-custom').showModal()">Open Custom</DuButton>

<DuModal id="modal-custom" closeButton classBox="rounded-2xl shadow-2xl">
  <h3 class="font-bold text-lg mb-2">Custom Styled</h3>
  <p class="text-base-content/70">This modal has a rounded-2xl box with shadow.</p>
</DuModal>`,
      code: `<DuButton onclick="document.getElementById('my-modal').showModal()">Open</DuButton>

<DuModal id="my-modal" classBox="rounded-lg">
  <h3 class="font-bold text-lg mb-2">Custom Styled</h3>
  <p>This modal has a rounded-lg box.</p>
</DuModal>`,
    },
  ],
} satisfies DocPageData