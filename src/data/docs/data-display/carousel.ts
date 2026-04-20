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
    {
      title: 'With navigation buttons',
      description: 'Add prev/next anchors inside each DuCarouselItem using `id` attributes for scroll targeting.',
      links: [
        { label: 'CSS scroll snap docs', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap' },
      ],
      preview: `<DuCarousel class="w-72 rounded-xl">
  <DuCarouselItem id="nav-slide1" class="relative w-full">
    <div class="bg-primary/20 h-32 w-72 flex items-center justify-center rounded-xl font-bold text-lg">Slide 1</div>
    <div class="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#nav-slide3" class="btn btn-circle btn-sm">❮</a>
      <a href="#nav-slide2" class="btn btn-circle btn-sm">❯</a>
    </div>
  </DuCarouselItem>
  <DuCarouselItem id="nav-slide2" class="relative w-full">
    <div class="bg-secondary/20 h-32 w-72 flex items-center justify-center rounded-xl font-bold text-lg">Slide 2</div>
    <div class="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#nav-slide1" class="btn btn-circle btn-sm">❮</a>
      <a href="#nav-slide3" class="btn btn-circle btn-sm">❯</a>
    </div>
  </DuCarouselItem>
  <DuCarouselItem id="nav-slide3" class="relative w-full">
    <div class="bg-accent/20 h-32 w-72 flex items-center justify-center rounded-xl font-bold text-lg">Slide 3</div>
    <div class="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#nav-slide2" class="btn btn-circle btn-sm">❮</a>
      <a href="#nav-slide1" class="btn btn-circle btn-sm">❯</a>
    </div>
  </DuCarouselItem>
</DuCarousel>`,
      code: `<DuCarousel class="w-full rounded-xl">
  <DuCarouselItem id="slide1" class="relative w-full">
    <img src="/img1.jpg" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide3" class="btn btn-circle">❮</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </DuCarouselItem>
  <DuCarouselItem id="slide2" class="relative w-full">
    <img src="/img2.jpg" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide1" class="btn btn-circle">❮</a>
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </DuCarouselItem>
  <DuCarouselItem id="slide3" class="relative w-full">
    <img src="/img3.jpg" class="w-full" />
    <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide2" class="btn btn-circle">❮</a>
      <a href="#slide1" class="btn btn-circle">❯</a>
    </div>
  </DuCarouselItem>
</DuCarousel>`,
    },
  ],
} satisfies DocPageData
