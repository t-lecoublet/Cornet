import type { Meta, StoryObj } from '@storybook/vue3'
import DuCarousel from './du-carousel.vue'
import DuCarouselItem from './du-carousel-item.vue'
import DuButton from '../../Actions/du-button/du-button.vue'

const meta: Meta<typeof DuCarousel> = {
  title: 'Components/DataDisplay/Carousel',
  component: DuCarousel,
  tags: ['autodocs'],
  argTypes: {
    start: { control: 'boolean', description: 'Snap elements to start' },
    center: { control: 'boolean', description: 'Snap elements to center' },
    end: { control: 'boolean', description: 'Snap elements to end' },
    vertical: { control: 'boolean', description: 'Use vertical layout' },
  },
}

export default meta
type Story = StoryObj<typeof DuCarousel>

const basicCarouselTplStr = `
  <DuCarousel v-bind="args">
    <DuCarouselItem>
      <img
      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      alt="Cone" />
    </DuCarouselItem>
    <DuCarouselItem>
          <img
      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
      alt="Grape" />
    </DuCarouselItem>
    <DuCarouselItem>
      <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
      alt="Lemon" />
    </DuCarouselItem>
    <DuCarouselItem>
      <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
      alt="Pineapple" />
    </DuCarouselItem>
    <DuCarouselItem>
      <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
      alt="Cherry" />
    </DuCarouselItem>
    <DuCarouselItem>
      <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
      alt="Strawberry" />
    </DuCarouselItem>
  </DuCarousel>
`

const carouselWithNavigationTplStr = `
  <DuCarousel v-bind="args" class="w-full">
    <DuCarouselItem id="slide1" class="relative w-full">
      <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp" class="w-full" />
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide4" class="btn btn-circle">❮</a>
        <a href="#slide2" class="btn btn-circle">❯</a>
      </div>
    </DuCarouselItem>
    <DuCarouselItem id="slide2" class="relative w-full">
      <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp" class="w-full" />
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" class="btn btn-circle">❮</a>
        <a href="#slide3" class="btn btn-circle">❯</a>
      </div>
    </DuCarouselItem>
    <DuCarouselItem id="slide3" class="relative w-full">
      <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp" class="w-full" />
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" class="btn btn-circle">❮</a>
        <a href="#slide4" class="btn btn-circle">❯</a>
      </div>
    </DuCarouselItem>
    <DuCarouselItem id="slide4" class="relative w-full">
      <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp" class="w-full" />
      <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" class="btn btn-circle">❮</a>
        <a href="#slide1" class="btn btn-circle">❯</a>
      </div>
    </DuCarouselItem>
  </DuCarousel>
`

const verticalCarouselTplStr = `
  <DuCarousel v-bind="args" vertical class="h-96 rounded-box">
    <DuCarouselItem class="h-full">
      <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Carousel image" />
    </DuCarouselItem>
    <DuCarouselItem class="h-full">
      <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Carousel image" />
    </DuCarouselItem>
    <DuCarouselItem class="h-full">
      <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Carousel image" />
    </DuCarouselItem>
    <DuCarouselItem class="h-full">
      <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Carousel image" />
    </DuCarouselItem>
    <DuCarouselItem class="h-full">
      <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Carousel image" />
    </DuCarouselItem>
  </DuCarousel>
`

const centeredCarouselTplStr = `
  <DuCarousel v-bind="args" center class="py-4 w-full">
    <DuCarouselItem class="mx-4 ml-[calc(1/3_*_100%)] w-1/3">
      <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Carousel image" class="rounded-box" />
    </DuCarouselItem>
    <DuCarouselItem class="mx-4 w-1/3">
      <img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Carousel image" class="rounded-box" />
    </DuCarouselItem>
    <DuCarouselItem class="mx-4 w-1/3">
      <img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Carousel image" class="rounded-box" />
    </DuCarouselItem>
    <DuCarouselItem class="mx-4 w-1/3">
      <img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Carousel image" class="rounded-box" />
    </DuCarouselItem>
    <DuCarouselItem class="mx-4 mr-[calc(1/3_*_100%)] w-1/3">
      <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Carousel image" class="rounded-box" />
    </DuCarouselItem>
  </DuCarousel>
`

const cardCarouselTplStr = `
  <DuCarousel v-bind="args" center class="py-4 w-full">
    <DuCarouselItem class="mx-2 w-1/3">
      <div class="card bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Card 1" /></figure>
        <div class="card-body">
          <h2 class="card-title">Card 1</h2>
          <p>A nice example of a card in a carousel.</p>
          <div class="card-actions justify-end">
            <DuButton variant="primary">Learn more</DuButton>
          </div>
        </div>
      </div>
    </DuCarouselItem>
    <DuCarouselItem class="mx-2 w-1/3">
      <div class="card bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp" alt="Card 2" /></figure>
        <div class="card-body">
          <h2 class="card-title">Card 2</h2>
          <p>A nice example of a card in a carousel.</p>
          <div class="card-actions justify-end">
            <DuButton variant="primary">Learn more</DuButton>
          </div>
        </div>
      </div>
    </DuCarouselItem>
    <DuCarouselItem class="mx-2 w-1/3">
      <div class="card bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp" alt="Card 3" /></figure>
        <div class="card-body">
          <h2 class="card-title">Card 3</h2>
          <p>A nice example of a card in a carousel.</p>
          <div class="card-actions justify-end">
            <DuButton variant="primary">Learn more</DuButton>
          </div>
        </div>
      </div>
    </DuCarouselItem>
    <DuCarouselItem class="mx-2 w-1/3">
      <div class="card bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp" alt="Card 4" /></figure>
        <div class="card-body">
          <h2 class="card-title">Card 4</h2>
          <p>A nice example of a card in a carousel.</p>
          <div class="card-actions justify-end">
            <DuButton variant="primary">Learn more</DuButton>
          </div>
        </div>
      </div>
    </DuCarouselItem>
  </DuCarousel>
`

export const Basic: Story = {
  args: {
    start: true,
    center: false,
    end: false,
    vertical: false,
  },
  render: (args) => ({
    components: { DuCarousel, DuCarouselItem },
    setup() {
      return { args }
    },
    template: basicCarouselTplStr,
  }),
}

export const WithNavigation: Story = {
  args: {
    start: true,
    center: false,
    end: false,
    vertical: false,
  },
  render: (args) => ({
    components: { DuCarousel, DuCarouselItem },
    setup() {
      return { args }
    },
    template: carouselWithNavigationTplStr,
  }),
}

export const VerticalCarousel: Story = {
  args: {
    start: true,
    center: false,
    end: false,
    vertical: true,
  },
  render: (args) => ({
    components: { DuCarousel, DuCarouselItem },
    setup() {
      return { args }
    },
    template: verticalCarouselTplStr,
  }),
}

export const CenteredCarousel: Story = {
  args: {
    start: false,
    center: true,
    end: false,
    vertical: false,
  },
  render: (args) => ({
    components: { DuCarousel, DuCarouselItem },
    setup() {
      return { args }
    },
    template: centeredCarouselTplStr,
  }),
}

export const CardCarousel: Story = {
  args: {
    start: false,
    center: true,
    end: false,
    vertical: false,
  },
  render: (args) => ({
    components: { DuCarousel, DuCarouselItem, DuButton },
    setup() {
      return { args }
    },
    template: cardCarouselTplStr,
  }),
} 