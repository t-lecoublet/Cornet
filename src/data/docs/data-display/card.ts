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
  slots: [
    {
      title: 'Slot #figure',
      description: 'The image or media at the top of the card — rendered outside `.card-body`, which is what lets it bleed to the edges.',
      preview: `<DuCard bordered class="w-64">
  <template #figure>
    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="" />
  </template>
  <template #title>Sunset</template>
  <p class="text-sm">Taken on the coast road.</p>
</DuCard>`,
      code: `<DuCard bordered>
  <template #figure>
    <img src="/photo.jpg" alt="" />
  </template>
  <template #title>Sunset</template>
  <p>Taken on the coast road.</p>
</DuCard>`,
    },
    {
      title: 'Slot #title',
      description: 'Content of the `<h2 class="card-title">`. Use it instead of the `title` prop when the heading needs markup — a badge, an icon. Given both, the prop renders first and the slot after it, inside the same heading.',
      preview: `<DuCard bordered class="w-64">
  <template #title>
    Release
    <DuBadge variant="primary" size="sm">new</DuBadge>
  </template>
  <p class="text-sm">Shipped this morning.</p>
</DuCard>`,
      code: `<DuCard bordered>
  <template #title>
    Release
    <DuBadge variant="primary" size="sm">new</DuBadge>
  </template>
  <p>Shipped this morning.</p>
</DuCard>`,
    },
    {
      title: 'Slot #actions',
      description: 'Buttons at the foot of the card. It is wrapped in `.card-actions` for you — do not add that class yourself.',
      preview: `<DuCard bordered class="w-64">
  <template #title>Delete project?</template>
  <p class="text-sm">This cannot be undone.</p>
  <template #actions>
    <DuButton size="sm" ghost>Cancel</DuButton>
    <DuButton size="sm" variant="error">Delete</DuButton>
  </template>
</DuCard>`,
      code: `<DuCard bordered>
  <template #title>Delete project?</template>
  <p>This cannot be undone.</p>
  <template #actions>
    <DuButton ghost>Cancel</DuButton>
    <DuButton variant="error">Delete</DuButton>
  </template>
</DuCard>`,
    },
    {
      title: 'Slot #body',
      description: '**Replaces the whole `.card-body`**, heading and actions included — the escape hatch for a layout the default structure cannot express. Fill it and `#title` / `#actions` / the `title` prop stop rendering; the default slot then sits beside your body rather than inside a generated one. Reach for it last.',
      preview: `<DuCard bordered class="w-64">
  <template #body>
    <div class="p-4 grid grid-cols-2 gap-3 text-sm">
      <div>
        <p class="text-base-content/50 text-xs">Uptime</p>
        <p class="font-bold text-lg">99.9%</p>
      </div>
      <div>
        <p class="text-base-content/50 text-xs">Latency</p>
        <p class="font-bold text-lg">42 ms</p>
      </div>
    </div>
  </template>
</DuCard>`,
      code: `<!-- you own the padding and the layout here -->
<DuCard bordered>
  <template #body>
    <div class="p-4 grid grid-cols-2 gap-3">
      <div>…</div>
      <div>…</div>
    </div>
  </template>
</DuCard>`,
    },
    {
      title: 'Slot #content',
      description: 'Rendered **after** the card body, as a direct child of `.card` — outside the body padding. For a full-bleed footer: a progress bar across the bottom edge, a strip of thumbnails.',
      preview: `<DuCard bordered class="w-64 overflow-hidden">
  <template #title>Uploading</template>
  <p class="text-sm">3 of 4 files</p>
  <template #content>
    <DuProgress :value="75" :max="100" variant="primary" ariaLabel="Upload progress" class="w-full rounded-none" />
  </template>
</DuCard>`,
      code: `<DuCard bordered class="overflow-hidden">
  <template #title>Uploading</template>
  <p>3 of 4 files</p>
  <!-- outside .card-body: touches the card edges -->
  <template #content>
    <DuProgress :value="75" ariaLabel="Upload progress" class="w-full rounded-none" />
  </template>
</DuCard>`,
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
      description: 'DuCard has **no `customClass` prop** — unlike DuButton. Put your classes in `class` and Vue\'s attribute fallthrough puts them on the `.card` root.',
      links: [
        { label: 'Vue attribute fallthrough', href: 'https://vuejs.org/guide/components/attrs.html' },
      ],
      preview: `<DuCard bordered class="w-72 bg-primary/10 border-primary/30" title="Styled card">
  Custom styled card content.
</DuCard>`,
      code: `<DuCard bordered class="bg-primary/10 border-primary/30" title="Styled card">
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
