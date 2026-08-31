import type { DocPageData } from '@/types/docs'

export default {
  title: 'Carousel',
  description: 'Carousel shows several items along a scrollable axis with optional snap alignment. It is a named `role="region"` whose strip is focusable — a scrollable region nothing inside can focus cannot be scrolled by keyboard at all.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/carousel/',
  props: [
    {
      title: 'items',
      description: 'Carousel items: `id`, `src`, `alt`, `content`, `customClass`, `ariaLabel`. An item with `src` and no `alt` now renders `alt=""` rather than "Slide 2" — the position of a picture is not a description of it, and an empty alt at least tells a screen reader to skip it.',
      type: 'DuCarouselItemData[]',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the carousel as a whole. Required in practice: a `region` landmark with no name is a landmark nobody can navigate to.',
      type: 'string',
    },
    {
      title: 'slideLabel',
      description: 'Names each slide when it has no `ariaLabel` of its own: `(index, total) => string`, defaulting to `"2 of 5"`. Replace it for another language.',
      type: 'DuCarouselSlideLabel',
    },
    {
      title: 'controls',
      description: 'Render previous/next buttons that scroll the strip one slide at a time — measured from the slide, not assumed.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'previousLabel',
      description: 'Accessible name of the previous button.',
      type: 'string',
      default: "'Previous slide'",
    },
    {
      title: 'nextLabel',
      description: 'Accessible name of the next button.',
      type: 'string',
      default: "'Next slide'",
    },
    {
      title: 'start',
      description: 'Snap items to the start of the viewport',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'center',
      description: 'Snap items to the center of the viewport',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'end',
      description: 'Snap items to the end of the viewport',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'vertical',
      description: 'Scroll vertically instead of horizontally',
      type: 'boolean',
      default: 'false',
    },
  ],
  classnames: {
    component: [
      { class: 'carousel', desc: 'Base class on the wrapper, always applied.' },
      { class: 'carousel-item', desc: 'Each item, from DuCarouselItem or the items array.' },
    ],
    modifier: [
      { class: 'carousel-start', desc: 'Snap to the start — start (default)' },
      { class: 'carousel-center', desc: 'Snap to the center — center' },
      { class: 'carousel-end', desc: 'Snap to the end — end' },
      { class: 'carousel-vertical', desc: 'Vertical scrolling — vertical' },
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
      title: 'Built-in controls',
      description: '`controls` renders a named previous/next pair that scrolls one slide, measuring the slide rather than assuming a width. `next()` and `previous()` are exposed on the instance too. Prefer this over the hand-rolled anchors below: the anchors move the scroll position without telling anyone what happened.',
      preview: `<DuCarousel
  controls
  ariaLabel="Product photos"
  class="w-72 rounded-xl"
  :items="[
    { id: 'c1', content: 'Slide 1', customClass: 'w-full h-32 bg-primary/20 items-center justify-center rounded-xl font-bold text-lg' },
    { id: 'c2', content: 'Slide 2', customClass: 'w-full h-32 bg-secondary/20 items-center justify-center rounded-xl font-bold text-lg' },
    { id: 'c3', content: 'Slide 3', customClass: 'w-full h-32 bg-accent/20 items-center justify-center rounded-xl font-bold text-lg' },
  ]"
/>`,
      code: `<DuCarousel
  controls
  ariaLabel="Product photos"
  previousLabel="Previous photo"
  nextLabel="Next photo"
  :items="photos"
/>

<!-- or drive it from a ref -->
<script setup>
const carousel = ref()
</script>
<DuCarousel ref="carousel" ariaLabel="Product photos" :items="photos" />
<DuButton @click="carousel.next()">Next</DuButton>`,
    },
    {
      title: 'Naming the slides',
      description: 'Each slide is a `role="group"` with `aria-roledescription="slide"`, named `"2 of 5"` by default. Give a slide its own `ariaLabel` when it has a better name than its position, or replace `slideLabel` wholesale for another language.',
      lang: 'vue',
      code: `<DuCarousel
  ariaLabel="Galerie produit"
  :slideLabel="(index, total) => \`\${index} sur \${total}\`"
  :items="[
    { id: 'p1', src: '/red.jpg', alt: 'Sac à dos rouge, de face', ariaLabel: 'Vue de face' },
    { id: 'p2', src: '/red-back.jpg', alt: 'Le même sac, de dos' },
  ]"
/>`,
    },
    {
      title: 'With navigation buttons (manual)',
      description: 'Anchors inside each DuCarouselItem, using `id` attributes as scroll targets. This is the daisyUI pattern; `controls` above does the same job with real buttons and accessible names.',
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
