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
  ],
} satisfies DocPageData
