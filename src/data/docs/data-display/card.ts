import type { DocPageData } from '@/types/docs'

export default {
  title: 'Card',
  description: 'Cards are used to group and display content in a visually distinct container.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/card/',
  props: [
    {
      title: 'title',
      description: 'Card title rendered in the body',
      type: 'string',
      default: "''",
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'bordered',
      description: 'Add a border around the card',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'dash',
      description: 'Dashed border style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'side',
      description: 'Lay the figure and body out side by side',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'responsive',
      description: 'Only switch to the side layout from `lg` up',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'imageFull',
      description: 'Render the figure as a full-bleed background behind the body',
      type: 'boolean',
      default: 'false',
    },
  ],
  classnames: {
    component: [
      { class: 'card', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
      { class: 'card-body', desc: 'Padded content wrapper.' },
      { class: 'card-title', desc: 'Title element, rendered when title is set.' },
      { class: 'card-actions', desc: 'Footer wrapper, rendered when the actions slot is used.' },
    ],
    style: [
      { class: 'card-border', desc: 'Bordered card — bordered' },
      { class: 'card-dash', desc: 'Dashed border — dash' },
      { class: 'card-side', desc: 'Figure beside the body — side' },
      { class: 'lg:card-side', desc: 'Side layout only from lg up — responsive' },
      { class: 'image-full', desc: 'Figure as a full-bleed background — imageFull' },
    ],
    size: [
      { class: 'card-xs', desc: 'size="xs"' },
      { class: 'card-sm', desc: 'size="sm"' },
      { class: 'card-md', desc: 'size="md"' },
      { class: 'card-lg', desc: 'size="lg"' },
      { class: 'card-xl', desc: 'size="xl"' },
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
      links: [
        { label: 'DuBadge docs', href: '/docs/data-display/badge' },
        { label: 'Vue named slots docs', href: 'https://vuejs.org/guide/components/slots.html#named-slots' },
      ],
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
      <DuBadge variant="primary" size="sm">NEW</DuBadge>
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
