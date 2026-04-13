import type { DocPageData } from '@/types/docs'

export default {
  title: 'Carousel',
  description: 'Carousel shows several items along a scrollable axis.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/carousel/',
  classnames: {
    modifier: [
      { class: 'carousel-start', desc: 'Snaps to the start of each item' },
      { class: 'carousel-center', desc: 'Snaps to the center' },
      { class: 'carousel-end', desc: 'Snaps to the end' },
      { class: 'carousel-vertical', desc: 'Vertical scrolling' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="carousel w-72 rounded-xl">
  <div class="carousel-item w-full">
    <div class="bg-primary/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 1</div>
  </div>
  <div class="carousel-item w-full">
    <div class="bg-secondary/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 2</div>
  </div>
  <div class="carousel-item w-full">
    <div class="bg-accent/20 w-full h-32 flex items-center justify-center rounded-xl font-bold">Slide 3</div>
  </div>
</div>`,
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
      title: 'With snap center',
      code: `<DuCarousel snap="center">
  <DuCarouselItem v-for="n in 5" :key="n">
    <div class="w-64 h-40 bg-base-200 flex items-center justify-center rounded-xl">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
    },
    {
      title: 'Vertical',
      code: `<DuCarousel vertical class="h-48">
  <DuCarouselItem v-for="n in 4" :key="n">
    <div class="h-24 w-full bg-base-200 flex items-center justify-center">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>`,
    },
  ],
} satisfies DocPageData
