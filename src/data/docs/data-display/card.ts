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
  <template #figure>
    <figure><img src="https://picsum.photos/seed/cornet/400/200" alt="placeholder" class="w-full h-36 object-cover" /></figure>
  </template>
  A beautiful card.
</DuCard>`,
      code: `<DuCard bordered title="Card with image">
  <template #figure>
    <figure><img src="/image.jpg" alt="..." /></figure>
  </template>
  A beautiful card.
</DuCard>`,
    },
    {
      title: 'Side image',
      preview: `<DuCard bordered side class="w-72">
  <template #figure>
    <figure><img src="https://picsum.photos/seed/cornet4/200/200" alt="side" class="w-28 object-cover h-full" /></figure>
  </template>
  <template #title>Side card</template>
  Content next to the image.
</DuCard>`,
      code: `<DuCard bordered side>
  <template #figure>
    <figure><img src="/image.jpg" alt="..." class="w-32 object-cover" /></figure>
  </template>
  <template #title>Side card</template>
  Content next to the image.
</DuCard>`,
    },
    {
      title: 'Image full (background image)',
      description: 'Use `imageFull` to make the image cover the entire card as a background.',
      preview: `<DuCard imageFull class="w-72 h-64">
  <template #figure>
    <figure><img src="https://picsum.photos/seed/cornet2/400/300" alt="background" class="w-full h-full object-cover" /></figure>
  </template>
  <template #title>Overlay title</template>
  The content is displayed on top of the image.
  <template #actions>
    <DuButton size="sm">View more</DuButton>
  </template>
</DuCard>`,
      code: `<DuCard imageFull class="h-64">
  <template #figure>
    <figure><img src="/hero.jpg" alt="background" /></figure>
  </template>
  <template #title>Overlay title</template>
  The content is displayed on top of the image.
  <template #actions>
    <DuButton>View more</DuButton>
  </template>
</DuCard>`,
    },
    {
      title: 'Custom title slot',
      description: 'Use the `#title` slot to replace the default title with any custom content.',
      preview: `<DuCard bordered class="w-72">
  <template #title>
    <div class="flex items-center gap-2">
      <DuBadge variant="primary" size="sm">NEW</DuBadge>
      Custom title
    </div>
  </template>
  Card content goes here.
  <template #actions>
    <DuButton variant="primary" size="sm">Buy now</DuButton>
  </template>
</DuCard>`,
      code: `<DuCard bordered>
  <template #title>
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm">NEW</span>
      Custom title
    </div>
  </template>
  Card content.
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
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-3 items-start">
  <DuCard size="xs" bordered title="Extra small" class="w-72">XS card content.</DuCard>
  <DuCard size="sm" bordered title="Small" class="w-72">SM card content.</DuCard>
  <DuCard size="md" bordered title="Medium" class="w-72">MD card content.</DuCard>
  <DuCard size="lg" bordered title="Large" class="w-72">LG card content.</DuCard>
</div>`,
      code: `<DuCard size="xs" bordered title="Extra small">XS card content.</DuCard>
<DuCard size="sm" bordered title="Small">SM card content.</DuCard>
<DuCard size="md" bordered title="Medium">MD card content.</DuCard>
<DuCard size="lg" bordered title="Large">LG card content.</DuCard>`,
    },
    {
      title: 'Responsive side layout',
      description: 'Use `responsive` to stack vertically on mobile and switch to side layout on large screens.',
      preview: `<DuCard responsive bordered title="Responsive card" class="w-full max-w-sm">
  <template #figure>
    <figure><img src="https://picsum.photos/seed/cornet3/200/200" alt="photo" class="w-32 object-cover" /></figure>
  </template>
  Stacks on mobile, side layout on desktop.
</DuCard>`,
      code: `<DuCard responsive bordered title="Responsive card">
  <template #figure>
    <figure><img src="/photo.jpg" class="w-32 object-cover" /></figure>
  </template>
  Stacks on mobile, side layout on desktop.
</DuCard>`,
    },
  ],
} satisfies DocPageData
