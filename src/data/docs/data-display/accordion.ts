import type { DocPageData } from '@/types/docs'

export default {
  title: 'Accordion',
  description: 'Accordion shows and hides content in collapsible panels, one open at a time by default. It follows the WAI-ARIA accordion pattern: each header is a real `<button aria-expanded>` naming a `role="region"` — no hidden radio inputs anywhere.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/accordion/',
  props: [
    {
      title: 'items',
      description: 'Accordion items: `title`, `content`, `value` (stable identity for v-model), `checked` (open initially when uncontrolled), `disabled`, `customClass`.',
      type: 'DuAccordionItemData[]',
    },
    {
      title: 'modelValue',
      description: 'Which panel is open — its `value`, or `null` for none. An array when `multiple`. Omit it and the accordion owns its state; pass it (`v-model`) and yours decides.',
      type: 'string | number | (string | number)[] | null | undefined',
      default: 'undefined',
    },
    {
      title: 'multiple',
      description: 'Allow several panels open at once. `modelValue` is then an array.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'collapsible',
      description: 'Single mode only: allow clicking the open panel to close it, leaving none open. Set it to `false` for an accordion that must always show something.',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'modifier',
      description: 'Indicator style for the accordion items.',
      type: 'DuAccordionModifier',
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
      title: 'Basic — slot mode',
      description: 'Wrap `DuAccordionItem` elements inside `DuAccordion`. Panels find each other through a context — there is no `name` to pass any more, and two accordions on the same page can no longer interfere with each other.',
      preview: `<div class="w-72">
  <DuAccordion modifier="collapse-arrow">
    <DuAccordionItem title="What is Cornet?" :checked="true">
      A Vue 3 component library powered by DaisyUI 5.
    </DuAccordionItem>
    <DuAccordionItem title="Is it free?">
      Yes, open source and free.
    </DuAccordionItem>
  </DuAccordion>
</div>`,
      code: `<DuAccordion modifier="collapse-arrow">
  <DuAccordionItem title="What is Cornet?" :checked="true">
    A Vue 3 component library powered by DaisyUI 5.
  </DuAccordionItem>
  <DuAccordionItem title="Is it free?">
    Yes, open source and free.
  </DuAccordionItem>
  <DuAccordionItem title="How do I install it?">
    Add it as a git submodule and run npm install.
  </DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Dynamic items mode',
      description: 'Pass an `items` array to render programmatically.',
      preview: `<div class="w-72">
  <DuAccordion
    modifier="collapse-arrow"
    :items="[
      { title: 'What is Cornet?', content: 'A Vue 3 component library.' },
      { title: 'Is it free?', content: 'Yes, open source.' },
    ]"
  />
</div>`,
      code: `<DuAccordion
  modifier="collapse-arrow"
  :items="[
    { title: 'What is Cornet?', content: 'A Vue 3 component library.' },
    { title: 'Is it free?', content: 'Yes, open source.' },
  ]"
/>`,
    },
    {
      title: 'Controlling which panel is open',
      description: 'Give each item a `value` and `v-model` carries the open one. An item with no `value` falls back to its index. Omit `modelValue` and the accordion opens whatever is marked `checked` and manages itself from there.',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuAccordion
    v-model="open"
    modifier="collapse-arrow"
    :items="[
      { title: 'Shipping', content: 'Ships in 2 days.', value: 'shipping' },
      { title: 'Returns', content: '30-day window.', value: 'returns' },
      { title: 'Warranty', content: 'Two years.', value: 'warranty' },
    ]"
  />
  <p class="text-sm text-base-content/70">Open: <code>{{ open ?? 'none' }}</code></p>
  <DuButton size="sm" variant="primary" @click="open = 'warranty'">Open warranty</DuButton>
</div>`,
      script: `
      const open = ref('shipping')
      return { open }
      `,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const open = ref('shipping')
</script>

<template>
  <DuAccordion
    v-model="open"
    modifier="collapse-arrow"
    :items="[
      { title: 'Shipping', content: 'Ships in 2 days.', value: 'shipping' },
      { title: 'Returns', content: '30-day window.', value: 'returns' },
      { title: 'Warranty', content: 'Two years.', value: 'warranty' },
    ]"
  />
</template>`,
    },
    {
      title: 'Several panels at once',
      description: '`multiple` lets more than one panel stay open, and `modelValue` becomes an array of the open values.',
      preview: `<div class="flex flex-col gap-3 w-72">
  <DuAccordion
    v-model="opened"
    multiple
    modifier="collapse-plus"
    :items="[
      { title: 'Section 1', content: 'Content 1', value: 'a' },
      { title: 'Section 2', content: 'Content 2', value: 'b' },
      { title: 'Section 3', content: 'Content 3', value: 'c' },
    ]"
  />
  <p class="text-sm text-base-content/70">Open: <code>{{ opened.join(', ') || 'none' }}</code></p>
</div>`,
      script: `
      const opened = ref(['a'])
      return { opened }
      `,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const opened = ref(['a'])
</script>

<template>
  <DuAccordion v-model="opened" multiple modifier="collapse-plus" :items="items" />
</template>`,
    },
    {
      title: 'Always keep one open',
      description: 'By default clicking the open panel closes it, leaving none. `:collapsible="false"` makes the open panel refuse to close — useful when the accordion is the page\'s only content.',
      preview: `<div class="w-72">
  <DuAccordion
    :collapsible="false"
    modifier="collapse-arrow"
    :items="[
      { title: 'Always something open', content: 'Click me again — nothing happens.', checked: true },
      { title: 'Second', content: 'Content 2' },
    ]"
  />
</div>`,
      code: `<DuAccordion :collapsible="false" modifier="collapse-arrow" :items="items" />`,
    },
    {
      title: 'Disabled panels',
      description: 'A `disabled` item renders a disabled header: it cannot be opened, and it is announced as unavailable rather than silently doing nothing.',
      preview: `<div class="w-72">
  <DuAccordion
    modifier="collapse-arrow"
    :items="[
      { title: 'Available', content: 'Open me.' },
      { title: 'Not yet', content: 'Never shown.', disabled: true },
    ]"
  />
</div>`,
      code: `<DuAccordion
  modifier="collapse-arrow"
  :items="[
    { title: 'Available', content: 'Open me.' },
    { title: 'Not yet', content: 'Never shown.', disabled: true },
  ]"
/>`,
    },
    {
      title: 'Plus/minus indicator',
      preview: `<div class="w-72">
  <DuAccordion modifier="collapse-plus">
    <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
    <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
  </DuAccordion>
</div>`,
      code: `<DuAccordion modifier="collapse-plus">
  <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
  <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Custom title slot',
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
        { label: 'Vue named slots docs', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
      ],
      preview: `<div class="w-72">
  <DuAccordion modifier="collapse-arrow">
    <DuAccordionItem>
      <template #title>
        <div class="flex items-center gap-2">
          <DuBadge variant="primary" size="sm">NEW</DuBadge>
          Custom title
        </div>
      </template>
      Content here.
    </DuAccordionItem>
    <DuAccordionItem title="Normal title">Normal content.</DuAccordionItem>
  </DuAccordion>
</div>`,
      code: `<DuAccordion modifier="collapse-arrow">
  <DuAccordionItem>
    <template #title>
      <div class="flex items-center gap-2">
        <span class="badge badge-primary badge-sm">NEW</span>
        Custom title
      </div>
    </template>
    Content here.
  </DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Per-item slots (#title-0, #content-0)',
      description: 'Override the title or content for a specific item by index when using the `items` prop. An indexed slot **beats** the global one — it used to be the other way round, which made the override unusable as soon as a global slot was given.',
      links: [
        { label: 'Vue scoped slots docs', href: 'https://vuejs.org/guide/components/slots.html#scoped-slots' },
      ],
      preview: `<div class="w-72">
  <DuAccordion
    modifier="collapse-arrow"
    :items="[
      { title: 'Custom title', content: 'Default content.', checked: true },
      { title: 'Normal item', content: 'Normal content.' },
    ]"
  >
    <template #title-0="{ item }">
      <div class="flex items-center gap-2">
        <DuBadge variant="primary" size="sm">NEW</DuBadge>
        {{ item.title }}
      </div>
    </template>
    <template #content-0="{ item }">
      <div class="flex flex-col gap-2">
        <p>{{ item.content }}</p>
        <DuButton variant="primary" size="sm">Action</DuButton>
      </div>
    </template>
  </DuAccordion>
</div>`,
      code: `<DuAccordion modifier="collapse-arrow" :items="items">
  <template #title-0="{ item }">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">NEW</span>
      {{ item.title }}
    </div>
  </template>
  <template #content-0="{ item }">
    <div class="flex flex-col gap-2">
      <p>{{ item.content }}</p>
      <DuButton variant="primary" size="sm">Action</DuButton>
    </div>
  </template>
</DuAccordion>`,
    },
    {
      title: 'Global slots (#title, #content)',
      description: 'Apply the same template to every item with the global `#title` and `#content` slots. Indexed slots override them item by item.',
      links: [
        { label: 'Vue scoped slots docs', href: 'https://vuejs.org/guide/components/slots.html#scoped-slots' },
      ],
      preview: `<div class="w-72">
  <DuAccordion
    modifier="collapse-arrow"
    :items="[
      { title: 'First item', content: 'Content 1', checked: true },
      { title: 'Second item', content: 'Content 2' },
      { title: 'Third item', content: 'Content 3' },
    ]"
  >
    <template #title="{ item, index }">
      <div class="flex items-center gap-2">
        <DuBadge variant="secondary" size="sm">{{ index + 1 }}</DuBadge>
        {{ item.title }}
      </div>
    </template>
  </DuAccordion>
</div>`,
      code: `<DuAccordion modifier="collapse-arrow" :items="items">
  <template #title="{ item, index }">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">{{ index + 1 }}</span>
      {{ item.title }}
    </div>
  </template>
  <template #content="{ item, index }">
    <div class="flex flex-col gap-2">
      <p>{{ item.content }}</p>
      <p class="text-sm text-base-content/50">Item {{ index + 1 }}</p>
    </div>
  </template>
</DuAccordion>`,
    },
    {
      title: 'Two accordions on one page',
      description: 'Nothing to configure. Each `DuAccordion` is its own group — the shared radio-group `name` that used to make one accordion close a panel in the other is gone, along with the `name` prop.',
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuAccordion
    modifier="collapse-arrow"
    :items="[
      { title: 'Group 1 — Item A', content: 'Content A', checked: true },
      { title: 'Group 1 — Item B', content: 'Content B' },
    ]"
  />
  <DuAccordion
    modifier="collapse-plus"
    :items="[
      { title: 'Group 2 — Item A', content: 'Content A', checked: true },
      { title: 'Group 2 — Item B', content: 'Content B' },
    ]"
  />
</div>`,
      code: `<DuAccordion modifier="collapse-arrow" :items="firstGroup" />

<!-- Independent from the first: no shared name to collide on -->
<DuAccordion modifier="collapse-plus" :items="secondGroup" />`,
    },
  ],
} satisfies DocPageData
