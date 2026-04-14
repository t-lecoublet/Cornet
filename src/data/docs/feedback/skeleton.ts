import type { DocPageData } from '@/types/docs'

export default {
  title: 'Skeleton',
  description: 'Skeleton is a placeholder that mimics the shape of content while it is loading.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/skeleton/',
  sections: [
    {
      title: 'Basic',
      preview: `<DuSkeleton class="h-24 w-72 rounded-xl" />`,
      code: `<DuSkeleton class="h-24 w-full" />`,
    },
    {
      title: 'Card skeleton',
      preview: `<div class="flex flex-col gap-3 w-64">
  <DuSkeleton class="h-36 w-full rounded-xl" />
  <DuSkeleton class="h-4 w-3/4" />
  <DuSkeleton class="h-4 w-1/2" />
</div>`,
      code: `<div class="flex flex-col gap-3 w-64">
  <DuSkeleton class="h-36 w-full rounded-xl" />
  <DuSkeleton class="h-4 w-3/4" />
  <DuSkeleton class="h-4 w-1/2" />
</div>`,
    },
    {
      title: 'List skeleton',
      preview: `<div class="flex flex-col gap-3 w-72">
  <div class="flex items-center gap-3">
    <DuSkeleton class="w-10 h-10 rounded-full shrink-0" />
    <div class="flex flex-col gap-2 flex-1">
      <DuSkeleton class="h-3 w-32" />
      <DuSkeleton class="h-3 w-24" />
    </div>
  </div>
  <div class="flex items-center gap-3">
    <DuSkeleton class="w-10 h-10 rounded-full shrink-0" />
    <div class="flex flex-col gap-2 flex-1">
      <DuSkeleton class="h-3 w-28" />
      <DuSkeleton class="h-3 w-20" />
    </div>
  </div>
</div>`,
      code: `<div v-for="n in 3" :key="n" class="flex items-center gap-3">
  <DuSkeleton class="w-10 h-10 rounded-full shrink-0" />
  <div class="flex flex-col gap-2 flex-1">
    <DuSkeleton class="h-3 w-32" />
    <DuSkeleton class="h-3 w-24" />
  </div>
</div>`,
    },
  ],
} satisfies DocPageData
