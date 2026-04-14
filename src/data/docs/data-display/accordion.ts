import type { DocPageData } from '@/types/docs'

export default {
  title: 'Accordion',
  description: 'Accordion is used to show and hide content in a collapsible panel. Uses a radio group so only one item can be open at a time.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/accordion/',
  classnames: {
    modifier: [
      { class: 'collapse-arrow', desc: 'Chevron arrow indicator' },
      { class: 'collapse-plus', desc: 'Plus/minus indicator' },
      { class: 'collapse-open', desc: 'Force open state' },
      { class: 'collapse-close', desc: 'Force closed state' },
    ],
  },
  sections: [
    {
      title: 'Basic — slot mode',
      description: 'Wrap DuAccordionItem elements inside DuAccordion. Share the same `name` to link items in a radio group.',
      preview: `<div class="w-72">
  <DuAccordion name="demo-acc" modifier="collapse-arrow">
    <DuAccordionItem title="What is Cornet?" :checked="true">
      A Vue 3 component library powered by DaisyUI 5.
    </DuAccordionItem>
    <DuAccordionItem title="Is it free?">
      Yes, open source and free.
    </DuAccordionItem>
  </DuAccordion>
</div>`,
      code: `<DuAccordion name="faq" modifier="collapse-arrow">
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
      description: 'Pass an `items` array directly to DuAccordion to render programmatically.',
      preview: `<div class="w-72">
  <DuAccordion
    name="faq-dyn"
    modifier="collapse-arrow"
    :items="[
      { title: 'What is Cornet?', content: 'A Vue 3 component library.' },
      { title: 'Is it free?', content: 'Yes, open source.' },
    ]"
  />
</div>`,
      code: `<DuAccordion
  name="faq"
  modifier="collapse-arrow"
  :items="[
    { title: 'What is Cornet?', content: 'A Vue 3 component library.' },
    { title: 'Is it free?', content: 'Yes, open source.' },
  ]"
/>`,
    },
    {
      title: 'Plus/minus indicator',
      preview: `<div class="w-72">
  <DuAccordion name="plus-faq" modifier="collapse-plus">
    <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
    <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
  </DuAccordion>
</div>`,
      code: `<DuAccordion name="plus-faq" modifier="collapse-plus">
  <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
  <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Custom title slot',
      preview: `<div class="w-72">
  <DuAccordion name="custom-acc-prev" modifier="collapse-arrow">
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
      code: `<DuAccordion name="custom-acc" modifier="collapse-arrow">
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
      description: 'Override the title or content for a specific item by index when using the `items` prop.',
      preview: `<div class="w-72">
  <DuAccordion
    name="per-item-prev"
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
      code: `<DuAccordion name="faq" modifier="collapse-arrow" :items="items">
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
      description: 'Apply the same custom template to all items using the global `#title` and `#content` slots.',
      preview: `<div class="w-72">
  <DuAccordion
    name="global-slots-prev"
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
      code: `<DuAccordion name="faq" modifier="collapse-arrow" :items="items">
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
      title: 'Multiple groups',
      description: 'Use different `name` values to create independent accordion groups.',
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuAccordion
    name="group1-prev"
    modifier="collapse-arrow"
    :items="[
      { title: 'Group 1 — Item A', content: 'Content A', checked: true },
      { title: 'Group 1 — Item B', content: 'Content B' },
    ]"
  />
  <DuAccordion
    name="group2-prev"
    modifier="collapse-plus"
    :items="[
      { title: 'Group 2 — Item A', content: 'Content A', checked: true },
      { title: 'Group 2 — Item B', content: 'Content B' },
    ]"
  />
</div>`,
      code: `<!-- Group 1 (arrow) -->
<DuAccordion name="group1" modifier="collapse-arrow" :items="firstGroup" />

<!-- Group 2 (plus) — independent from group 1 -->
<DuAccordion name="group2" modifier="collapse-plus" :items="secondGroup" />`,
    },
  ],
} satisfies DocPageData
