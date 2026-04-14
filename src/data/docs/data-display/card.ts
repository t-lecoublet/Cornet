import type { DocPageData } from '@/types/docs'

export default {
  title: 'Card',
  description: 'Cards are used to group and display content in a visually distinct container.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/card/',
  classnames: {
    style: [
      { class: 'card-border', desc: 'Adds a border around the card' },
      { class: 'card-dash', desc: 'Dashed border' },
      { class: 'card-side', desc: 'Image is placed on the side' },
      { class: 'image-full', desc: 'Image covers the full card' },
    ],
    size: [
      { class: 'card-xs', desc: 'Extra small padding' },
      { class: 'card-sm', desc: 'Small padding' },
      { class: 'card-md', desc: 'Medium padding', default: true },
      { class: 'card-lg', desc: 'Large padding' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuCard bordered title="Card title" class="w-72">
  Card content goes here.
</DuCard>`,
      code: `<DuCard bordered title="Card title">
  Card content goes here.
</DuCard>`,
    },
    {
      title: 'With actions slot',
      preview: `<DuCard bordered title="My Product" class="w-72">
  <p>A great product description.</p>
  <template #actions>
    <DuButton variant="primary" size="sm">Buy now</DuButton>
    <DuButton ghost size="sm">Details</DuButton>
  </template>
</DuCard>`,
      code: `<DuCard bordered title="My Product">
  <p>A great product description.</p>
  <template #actions>
    <DuButton variant="primary" size="sm">Buy now</DuButton>
    <DuButton ghost size="sm">Details</DuButton>
  </template>
</DuCard>`,
    },
    {
      title: 'With image',
      preview: `<DuCard bordered title="Card with image" class="w-72">
  <template #image>
    <img src="https://picsum.photos/seed/cornet/400/200" alt="placeholder" class="w-full h-36 object-cover" />
  </template>
  A beautiful card.
</DuCard>`,
      code: `<DuCard bordered title="Card with image">
  <template #image>
    <img src="/image.jpg" alt="..." />
  </template>
  A beautiful card.
</DuCard>`,
    },
    {
      title: 'Side image',
      preview: `<DuCard bordered side title="Side card" class="w-72">
  Content next to the image.
</DuCard>`,
      code: `<DuCard bordered side title="Side card">
  <template #image>
    <img src="/image.jpg" alt="..." class="w-32 object-cover" />
  </template>
  Content next to the image.
</DuCard>`,
    },
    {
      title: 'Dashed border',
      preview: `<DuCard dash title="Dashed card" class="w-72">
  Drop zone or placeholder.
</DuCard>`,
      code: `<DuCard dash title="Dashed card">
  Drop zone or placeholder.
</DuCard>`,
    },
    {
      title: 'Custom class',
      preview: `<DuCard bordered customClass="bg-primary/10 border-primary/30" title="Styled card" class="w-72">
  Custom styled card content.
</DuCard>`,
      code: `<DuCard bordered customClass="bg-primary/10 border-primary/30" title="Styled card">
  Custom styled card content.
</DuCard>`,
    },
  ],
} satisfies DocPageData
