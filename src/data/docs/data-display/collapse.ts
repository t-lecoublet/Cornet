import type { DocPageData } from '@/types/docs'

export default {
  title: 'Collapse',
  description: 'Collapse shows or hides content with a smooth animation. Each panel is **independent** of the others — that is the difference from Accordion. It follows the WAI-ARIA disclosure pattern: every header is a real `<button aria-expanded>` naming a `role="region"`, with no hidden checkbox anywhere.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/collapse/',
  props: [
    {
      title: 'items',
      description: 'Collapse items: `title`, `content`, `value` (stable identity for v-model), `open` (expanded initially when uncontrolled), `disabled`, `customClass`.',
      type: 'DuCollapseItem[]',
    },
    {
      title: 'modelValue',
      description: 'Which panels are open, as an **array** of values — always an array, because the panels are independent. Omit it and the component owns its state; pass it (`v-model`) and yours decides.',
      type: '(string | number)[] | undefined',
      default: 'undefined',
    },
    {
      title: 'modifier',
      description: 'Indicator style for the collapse items.',
      type: 'DuCollapseModifier',
      options: ['collapse-arrow', 'collapse-plus'],
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes for each item.',
      type: 'string',
    },
  ],
  classnames: {
    component: [
      { class: 'collapse', desc: 'Base class on each item, always applied.' },
      { class: 'collapse-title', desc: 'The header. It is a real <button aria-expanded>.' },
      { class: 'collapse-content', desc: 'The revealed body — a role="region" named by its header.' },
    ],
    modifier: [
      { class: 'collapse-arrow', desc: 'Chevron indicator — modifier="collapse-arrow"' },
      { class: 'collapse-plus', desc: 'Plus/minus indicator — modifier="collapse-plus"' },
      { class: 'collapse-open', desc: 'Applied by the component while a panel is open. Not something to pass as a modifier — the open state drives it.' },
      { class: 'collapse-close', desc: 'Applied while it is closed. One of the two is always present.' },
    ],
  },
  sections: [
    {
      title: 'Dynamic items mode',
      description: 'Pass an `items` array to render collapses automatically. Each item has `title`, `content`, and optional `open` boolean.',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'What is Cornet?', content: 'A Vue 3 component library powered by DaisyUI 5.' },
      { title: 'Is it free?', content: 'Yes, open source and free.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'What is Cornet?', content: 'A Vue 3 component library powered by DaisyUI 5.' },
    { title: 'Is it free?', content: 'Yes, open source and free.' },
    { title: 'How do I install it?', content: 'Add it as a git submodule and run npm install.' },
  ]"
/>`,
    },
    {
      title: 'Item open by default',
      description: 'Set `open: true` on an item to have it expanded initially.',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'Open by default', content: 'This is visible on load.', open: true },
      { title: 'Closed', content: 'Click to expand.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'Open by default', content: 'This is visible on load.', open: true },
    { title: 'Closed', content: 'Click to expand.' },
  ]"
/>`,
    },
    {
      title: 'Controlling the open panels',
      description: 'Give each item a `value` and `v-model` holds the array of open ones. It is always an array, even with a single panel — independent panels are the point of this component. Omit `modelValue` and the component opens whatever is marked `open` and manages itself from there.',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuCollapse
    v-model="opened"
    modifier="collapse-arrow"
    :items="[
      { title: 'Filters', content: 'Filter controls.', value: 'filters' },
      { title: 'Sorting', content: 'Sort controls.', value: 'sorting' },
      { title: 'Columns', content: 'Column picker.', value: 'columns' },
    ]"
  />
  <p class="text-sm text-base-content/70">Open: <code>{{ opened.join(', ') || 'none' }}</code></p>
  <DuButton size="sm" variant="primary" @click="opened = []">Close all</DuButton>
</div>`,
      script: `
      const opened = ref(['filters'])
      return { opened }
      `,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const opened = ref(['filters'])
</script>

<template>
  <DuCollapse
    v-model="opened"
    modifier="collapse-arrow"
    :items="[
      { title: 'Filters', content: 'Filter controls.', value: 'filters' },
      { title: 'Sorting', content: 'Sort controls.', value: 'sorting' },
      { title: 'Columns', content: 'Column picker.', value: 'columns' },
    ]"
  />

  <DuButton @click="opened = []">Close all</DuButton>
</template>`,
    },
    {
      title: 'Accordion or Collapse?',
      description: 'Both render the same daisyUI `.collapse` markup and the same disclosure semantics. The difference is what the panels know about each other: **DuAccordion** panels are one group, and opening one closes the rest unless you ask for `multiple`. **DuCollapse** panels are independent, and its `v-model` is always an array. Reach for Collapse for a set of unrelated sections — a filter sidebar, a settings page — and for Accordion for a FAQ where one answer at a time is the point.',
      links: [
        { label: 'DuAccordion docs', href: '/docs/data-display/accordion' },
      ],
    },
    {
      title: 'Plus indicator',
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-plus"
    :items="[
      { title: 'Click to expand', content: 'Revealed content.' },
    ]"
  />
</div>`,
      code: `<DuCollapse
  modifier="collapse-plus"
  :items="[
    { title: 'Click to expand', content: 'Revealed content.' },
  ]"
/>`,
    },
    {
      title: 'Custom slot per item',
      description: 'Override any item\'s title or content with named slots (`#title-{index}`, `#content-{index}`).',
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
        { label: 'DuButton docs', href: '/docs/actions/button' },
      ],
      preview: `<div class="w-72">
  <DuCollapse
    modifier="collapse-arrow"
    :items="[
      { title: 'Custom title', content: 'Default content.', open: true },
      { title: 'Badge item', content: 'Special content.' },
    ]"
  >
    <template #title-1>
      <div class="flex items-center gap-2">
        <DuBadge variant="primary" size="sm">NEW</DuBadge>
        Badge item
      </div>
    </template>
    <template #content-1>
      <div class="flex flex-col gap-2">
        <p>Special content with custom rendering.</p>
        <DuButton variant="primary" size="sm">Action</DuButton>
      </div>
    </template>
  </DuCollapse>
</div>`,
      code: `<DuCollapse
  modifier="collapse-arrow"
  :items="[
    { title: 'Custom title', content: 'Default content.' },
    { title: 'Badge item', content: '' },
  ]"
>
  <template #title-1>
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">NEW</span>
      Badge item
    </div>
  </template>
  <template #content-1>
    <div class="flex flex-col gap-2">
      <p>Special content.</p>
      <DuButton variant="primary" size="sm">Action</DuButton>
    </div>
  </template>
</DuCollapse>`,
    },
    {
      title: 'Manual mode (default slot)',
      description: 'Fill the default slot and DuCollapse steps out of the way — you write the markup, and you own the ARIA. The daisyUI checkbox mechanism below still works as plain CSS, but nothing about it is announced: prefer the `items` API, which gives you real `<button aria-expanded>` headers.',
      preview: `<div class="flex flex-col gap-2 w-72">
  <DuCollapse>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" checked />
      <div class="collapse-title font-medium">Manual item 1 (open)</div>
      <div class="collapse-content">
        <p>Custom HTML content with full control.</p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="checkbox" />
      <div class="collapse-title font-medium">Manual item 2</div>
      <div class="collapse-content">
        <p>Another custom collapse item.</p>
      </div>
    </div>
  </DuCollapse>
</div>`,
      code: `<DuCollapse>
  <div class="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="checkbox" checked />
    <div class="collapse-title font-medium">Manual item 1 (open)</div>
    <div class="collapse-content">
      <p>Custom HTML content.</p>
    </div>
  </div>
  <div class="collapse collapse-arrow bg-base-100 border border-base-300">
    <input type="checkbox" />
    <div class="collapse-title font-medium">Manual item 2</div>
    <div class="collapse-content">
      <p>Another item.</p>
    </div>
  </div>
</DuCollapse>`,
    },
  ],
} satisfies DocPageData
