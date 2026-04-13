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
      preview: `<div class="card bg-base-100 border border-base-300 w-72">
  <div class="card-body">
    <h2 class="card-title">Card title</h2>
    <p>Card content goes here.</p>
  </div>
</div>`,
      code: `<DuCard bordered title="Card title">
  Card content goes here.
</DuCard>`,
    },
    {
      title: 'With actions slot',
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
      preview: `<div class="card bg-base-100 border border-base-300 w-72">
  <figure><img src="https://picsum.photos/seed/cornet/400/200" alt="placeholder" class="w-full h-36 object-cover" /></figure>
  <div class="card-body">
    <h2 class="card-title">Card with image</h2>
    <p>A beautiful card.</p>
  </div>
</div>`,
      code: `<DuCard bordered title="Card with image">
  <template #image>
    <img src="/image.jpg" alt="..." />
  </template>
  A beautiful card.
</DuCard>`,
    },
    {
      title: 'Side image',
      code: `<DuCard bordered side title="Side card">
  <template #image>
    <img src="/image.jpg" alt="..." class="w-32 object-cover" />
  </template>
  Content next to the image.
</DuCard>`,
    },
    {
      title: 'Dashed border',
      preview: `<div class="card card-border w-72 border-2 border-dashed border-base-300">
  <div class="card-body">
    <h2 class="card-title">Dashed card</h2>
    <p>Drop zone or placeholder.</p>
  </div>
</div>`,
      code: `<DuCard dash title="Dashed card">
  Drop zone or placeholder.
</DuCard>`,
    },
    {
      title: 'Custom class',
      code: `<DuCard bordered customClass="bg-primary/10 border-primary/30" title="Styled card">
  Custom styled card content.
</DuCard>`,
    },
  ],
} satisfies DocPageData
