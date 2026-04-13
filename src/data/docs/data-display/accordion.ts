import type { DocPageData } from '@/types/docs'

export default {
  title: 'Accordion',
  description: 'Accordion is used to show and hide content in a collapsible panel.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/accordion/',
  sections: [
    {
      title: 'Basic',
      preview: `<div class="join join-vertical w-72">
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-1" checked />
    <div class="collapse-title font-semibold">What is Cornet?</div>
    <div class="collapse-content text-sm">A Vue 3 component library powered by DaisyUI 5.</div>
  </div>
  <div class="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="acc-1" />
    <div class="collapse-title font-semibold">Is it free?</div>
    <div class="collapse-content text-sm">Yes, Cornet is open source and free.</div>
  </div>
</div>`,
      code: `<DuAccordion name="faq">
  <DuAccordionItem title="What is Cornet?" :open="true">
    A Vue 3 component library powered by DaisyUI 5.
  </DuAccordionItem>
  <DuAccordionItem title="Is it free?">
    Yes, Cornet is open source and free.
  </DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Arrow indicator',
      code: `<DuAccordion name="arrow-acc" indicator="arrow">
  <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
  <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
</DuAccordion>`,
    },
    {
      title: 'Plus/minus indicator',
      code: `<DuAccordion name="plus-acc" indicator="plus">
  <DuAccordionItem title="Section 1">Content 1</DuAccordionItem>
  <DuAccordionItem title="Section 2">Content 2</DuAccordionItem>
</DuAccordion>`,
    },
  ],
} satisfies DocPageData
