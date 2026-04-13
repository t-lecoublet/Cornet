import type { DocPageData } from '@/types/docs'

export default {
  title: 'Diff',
  description: 'Diff component shows a comparison between two elements side by side.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/diff/',
  sections: [
    {
      title: 'Basic (images)',
      preview: `<div class="diff aspect-video w-72 rounded-xl border border-base-300">
  <div class="diff-item-1"><div class="bg-primary/30 w-full h-full flex items-center justify-center text-lg font-bold">Before</div></div>
  <div class="diff-item-2"><div class="bg-secondary/30 w-full h-full flex items-center justify-center text-lg font-bold">After</div></div>
  <div class="diff-resizer"></div>
</div>`,
      code: `<DuDiff>
  <template #item1>
    <img src="/before.jpg" alt="Before" />
  </template>
  <template #item2>
    <img src="/after.jpg" alt="After" />
  </template>
</DuDiff>`,
    },
    {
      title: 'Text comparison',
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
