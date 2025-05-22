import type { Meta, StoryObj } from '@storybook/vue3'
import DuDiff from './du-diff.vue'

const meta = {
  title: 'Components/DataDisplay/Diff',
  component: DuDiff,
  tags: ['autodocs'],
  argTypes: {
    item1: {
      control: 'text',
      description: 'URL for the first item image',
    },
    item2: {
      control: 'text',
      description: 'URL for the second item image',
    },
    aspectRatio: {
      control: 'select',
      options: [
        null,
        'aspect-16/9',
        'aspect-4/3',
        'aspect-1/1',
        'aspect-video',
        'aspect-square',
      ],
      description:
        'Aspect ratio for the diff component (can be null for no aspect ratio)',
    },
  },
  args: {
    item1: 'https://picsum.photos/id/1/200/200',
    item2: 'https://picsum.photos/id/2/200/200',
    aspectRatio: 'aspect-16/9',
  },
} satisfies Meta<typeof DuDiff>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DifferentAspectRatios: Story = {
  render: (args: any) => ({
    components: { DuDiff },
    setup() {
      return {}
    },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-lg font-bold mb-2">No aspect ratio (class : h-24)</h3>
          <DuDiff 
            item1="https://picsum.photos/id/1/800/400" 
            item2="https://picsum.photos/id/2/800/400" 
            :aspect-ratio="null" 
            class="h-24"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Aspect ratio 16/9</h3>
          <DuDiff 
            item1="https://picsum.photos/id/1/800/450" 
            item2="https://picsum.photos/id/2/800/450" 
            aspect-ratio="aspect-16/9" 
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Aspect ratio 4/3</h3>
          <DuDiff 
            item1="https://picsum.photos/id/3/800/600" 
            item2="https://picsum.photos/id/4/800/600" 
            aspect-ratio="aspect-4/3" 
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-2">Aspect ratio 1/1 (square)</h3>
          <DuDiff 
            item1="https://picsum.photos/id/5/500/500" 
            item2="https://picsum.photos/id/6/500/500" 
            aspect-ratio="aspect-square" 
          />
        </div>
      </div>
    `,
  }),
}

export const WithColorBackgrounds: Story = {
  render: (args: any) => ({
    components: { DuDiff },
    setup() {
      return {}
    },
    template: `
      <DuDiff aspect-ratio="aspect-16/9">
        <template #item1>
          <div class="bg-primary text-primary-content flex items-center justify-center h-full">
            <div class="text-center p-4">
              <h2 class="text-2xl font-bold">Design A</h2>
              <p>This is the first design option with primary colors</p>
            </div>
          </div>
        </template>
        <template #item2>
          <div class="bg-secondary text-secondary-content flex items-center justify-center h-full">
            <div class="text-center p-4">
              <h2 class="text-2xl font-bold">Design B</h2>
              <p>This is the second design option with secondary colors</p>
            </div>
          </div>
        </template>
      </DuDiff>
    `,
  }),
}

export const WithCustomContent: Story = {
  render: (args: any) => ({
    components: { DuDiff },
    setup() {
      return {}
    },
    template: `
      <DuDiff aspect-ratio="aspect-[4/3]">
        <template #item1>
          <div class="grid place-content-center h-full bg-base-200">
            <div class="flex flex-col items-center gap-4 p-4 bg-base-100 shadow-xl rounded-xl">
              <h2 class="text-2xl font-bold">Light Theme</h2>
              <div class="flex gap-2">
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-secondary">Secondary</span>
                <span class="badge badge-accent">Accent</span>
              </div>
              <button class="btn btn-primary">Button</button>
            </div>
          </div>
        </template>
        <template #item2>
          <div class="grid place-content-center h-full bg-base-200 dark:bg-slate-800">
            <div class="flex flex-col items-center gap-4 p-4 bg-base-100 shadow-xl rounded-xl dark:bg-slate-900 dark:text-white">
              <h2 class="text-2xl font-bold">Dark Theme</h2>
              <div class="flex gap-2">
                <span class="badge badge-primary">Primary</span>
                <span class="badge badge-secondary">Secondary</span>
                <span class="badge badge-accent">Accent</span>
              </div>
              <button class="btn btn-primary">Button</button>
            </div>
          </div>
        </template>
      </DuDiff>
    `,
  }),
} 