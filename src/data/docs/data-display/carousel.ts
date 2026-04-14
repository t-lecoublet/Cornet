import type { DocPageData } from '@/types/docs'

export default {
  title: 'Carousel',
  description: 'Carousel shows several items along a scrollable axis with optional snap alignment.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/carousel/',
  classnames: {
    modifier: [
      { class: 'start', desc: 'Snaps to the start of each item (prop: start)', default: true },
      { class: 'center', desc: 'Snaps to center of each item (prop: center)' },
      { class: 'end', desc: 'Snaps to end of each item (prop: end)' },
      { class: 'vertical', desc: 'Vertical scroll direction (prop: vertical)' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuCarousel class="rounded-xl w-72">
  <DuCarouselItem>
    <div class="bg-primary/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 1</div>
  </DuCarouselItem>
  <DuCarouselItem>
    <div class="bg-secondary/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 2</div>
  </DuCarouselItem>
  <DuCarouselItem>
    <div class="bg-accent/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 3</div>
  </DuCarouselItem>
</DuCarousel>`,
      code: `<DuCarousel>
  <DuCarouselItem>
    <div class="bg-primary/20 w-full h-32 flex items-center justify-center">Slide 1</div>
  </DuCarouselItem>
  <DuCarouselItem>
    <div class="bg-secondary/20 w-full h-32 flex items-center justify-center">Slide 2</div>
  </DuCarouselItem>
  <DuCarouselItem>
    <div class="bg-accent/20 w-full h-32 flex items-center justify-center">Slide 3</div>
  </DuCarouselItem>
</DuCarousel>`,
    },
    {
      title: 'Center snap',
      preview: `<DuCarousel :center="true" class="w-72 rounded-xl">
  <DuCarouselItem v-for="n in 5" :key="n">
    <div class="w-48 h-32 bg-base-200 flex items-center justify-center rounded-xl font-medium">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
      code: `<!-- Each item snaps to the center of the viewport -->
<DuCarousel :center="true">
  <DuCarouselItem v-for="n in 5" :key="n">
    <div class="w-64 h-40 bg-base-200 flex items-center justify-center rounded-xl">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
    },
    {
      title: 'Vertical',
      preview: `<DuCarousel :vertical="true" class="h-48 w-72 rounded-xl">
  <DuCarouselItem v-for="n in 4" :key="n">
    <div class="h-24 w-full bg-base-200 flex items-center justify-center font-medium">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
      code: `<DuCarousel :vertical="true" class="h-48">
  <DuCarouselItem v-for="n in 4" :key="n">
    <div class="h-24 w-full bg-base-200 flex items-center justify-center">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
    },
    {
      title: 'Dynamic items prop',
      code: `<DuCarousel
  :items="[
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' },
    { src: '/img3.jpg', alt: 'Image 3' },
  ]"
/>`,
    },
  ],
} satisfies DocPageData
