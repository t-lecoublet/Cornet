import type { DocPageData } from '@/types/docs'

export default {
  title: 'Diff',
  description: 'Diff component shows a comparison between two elements side by side.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/diff/',
  sections: [
    {
      title: 'Basic (images)',
      preview: `<DuDiff class="rounded-xl w-72 aspect-video">
  <template #item1>
    <img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" alt="Before" />
  </template>
  <template #item2>
    <img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" alt="After" />
  </template>
</DuDiff>`,
      code: `<DuDiff>
  <template #item1>
    <img src="https://placehold.co/600x400?text=Before" alt="Before" />
  </template>
  <template #item2>
    <img src="https://placehold.co/600x400?text=After" alt="After" />
  </template>
</DuDiff>`,
    },
    {
      title: 'Text comparison',
      preview: `<DuDiff class="rounded-xl w-72 h-32">
  <template #item1>
    <div class="bg-base-200 h-full flex items-center justify-center">
      <p class="text-6xl font-black opacity-20">OLD</p>
    </div>
  </template>
  <template #item2>
    <div class="bg-primary/20 h-full flex items-center justify-center">
      <p class="text-6xl font-black opacity-20">NEW</p>
    </div>
  </template>
</DuDiff>`,
      code: `<DuDiff>
  <template #item1>
    <div class="bg-base-200 h-full flex items-center justify-center">
      <p class="text-8xl font-black opacity-20">OLD</p>
    </div>
  </template>
  <template #item2>
    <div class="bg-primary/20 h-full flex items-center justify-center">
      <p class="text-8xl font-black opacity-20">NEW</p>
    </div>
  </template>
</DuDiff>`,
    },
    {
      title: 'Prop shorthand (item1 / item2)',
      description: 'Pass image URLs directly via `item1` and `item2` props instead of using template slots.',
      preview: `<DuDiff
  item1="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp"
  item2="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp"
  aspectRatio="aspect-video"
  class="rounded-xl w-72"
/>`,
      code: `<DuDiff
  item1="https://example.com/before.jpg"
  item2="https://example.com/after.jpg"
  aspectRatio="aspect-video"
  class="rounded-xl"
/>`,
    },
    {
      title: 'Aspect ratio',
      description: 'Use the `aspectRatio` prop to control the shape of the diff container. Accepts Tailwind aspect-ratio classes.',
      links: [
        { label: 'Tailwind aspect-ratio docs', href: 'https://tailwindcss.com/docs/aspect-ratio' },
      ],
      preview: `<div class="flex flex-col gap-4 items-start w-full max-w-sm">
  <div class="w-full">
    <p class="text-xs text-base-content/50 mb-1">aspect-video (16/9)</p>
    <DuDiff aspectRatio="aspect-video" class="rounded-xl w-full">
      <template #item1><img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" /></template>
      <template #item2><img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" /></template>
    </DuDiff>
  </div>
  <div class="w-full max-w-xs">
    <p class="text-xs text-base-content/50 mb-1">aspect-square (1/1)</p>
    <DuDiff aspectRatio="aspect-square" class="rounded-xl w-40">
      <template #item1><img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp" class="h-full object-cover" /></template>
      <template #item2><img src="https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp" class="h-full object-cover" /></template>
    </DuDiff>
  </div>
</div>`,
      code: `<!-- Available: aspect-16/9 | aspect-4/3 | aspect-1/1 | aspect-video | aspect-square -->
<DuDiff aspectRatio="aspect-video" class="rounded-xl">
  <template #item1><img src="/before.jpg" /></template>
  <template #item2><img src="/after.jpg" /></template>
</DuDiff>

<DuDiff aspectRatio="aspect-square" class="rounded-xl">
  <template #item1><img src="/before.jpg" /></template>
  <template #item2><img src="/after.jpg" /></template>
</DuDiff>`,
    },
  ],
} satisfies DocPageData
