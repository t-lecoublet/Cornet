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
  ],
} satisfies DocPageData
