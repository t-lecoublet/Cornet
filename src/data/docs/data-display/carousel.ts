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
      script: `
        const { width, onResizeStart } = useResize(700)
        return { width, onResizeStart }
      `,
      preview: `<div
  class="relative h-96 overflow-hidden rounded-lg border border-base-300"
  :style="{ width: width + 'px' }"
>
<DuCarousel>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" />
  </DuCarouselItem>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" />
  </DuCarouselItem>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" />
  </DuCarouselItem>
</DuCarousel>
  <div
    class="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-20 grid place-items-center group/itemdrag"
    @pointerdown.prevent="onResizeStart"
  >
    <div class="w-1 h-1/2 bg-base-300 group-hover/itemdrag:bg-neutral rounded-full"></div>
  </div>
</div>`,
      code: `<DuCarousel>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" />
  </DuCarouselItem>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" />
  </DuCarouselItem>
  <DuCarouselItem>
    <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" />
  </DuCarouselItem>
</DuCarousel>`,
    },
    {
      title: 'Center snap',
      script: `
        const { width, onResizeStart } = useResize(300)
        return { width, onResizeStart }
      `,
      preview: `<div
  class="relative h-32 overflow-hidden rounded-lg border border-base-300"
  :style="{ width: width + 'px' }"
>
  <DuCarousel :center="true" class="w-full">
  <DuCarouselItem v-for="n in 5" :key="n">
    <div class="w-48 h-32 bg-base-200 flex items-center justify-center font-medium">
      Slide {{ n }}
    </div>
  </DuCarouselItem>
</DuCarousel>
  <div
    class="absolute right-0 top-0 h-full w-2 cursor-ew-resize z-20 grid place-items-center group/itemdrag"
    @pointerdown.prevent="onResizeStart"
  >
    <div class="w-1 h-1/2 bg-base-300 group-hover/itemdrag:bg-neutral rounded-full"></div>
  </div>
</div>`,
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
      description: 'Pass an `items` array where each item has `src` and `alt`. The component renders each as a DuCarouselItem automatically.',
      preview: `<DuCarousel
  class="w-72 rounded-xl"
  :items="[
    { src: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp', alt: 'Slide 1' },
    { src: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp', alt: 'Slide 2' },
    { src: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp', alt: 'Slide 3' },
  ]"
/>`,
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
