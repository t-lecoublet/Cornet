import type { Meta, StoryObj } from '@storybook/vue3'
import DuStats from './du-stats.vue'
import DuStat from '../du-stat/du-stat.vue'
import DuBadge from '../../DataDisplay/du-badge/du-badge.vue'

const meta = {
  title: 'Components/DataDisplay/Stats',
  component: DuStats,
  tags: ['autodocs'],
  argTypes: {
    vertical: { control: 'boolean' },
    shadow: { control: 'boolean' },
  },
} satisfies Meta<typeof DuStats>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Total Page Views',
        value: '89,400',
        description: '21% more than last month',
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        title: 'Total Likes',
        value: '25.6K',
        description: '21% more than last month',
        figure: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
        figureClass: 'text-primary',
        valueClass: 'text-primary',
      },
      {
        title: 'Page Views',
        value: '2.6M',
        description: '21% more than last month',
        figure: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
        figureClass: 'text-secondary',
        valueClass: 'text-secondary',
      },
    ],
    shadow: true,
  },
}

export const WithImage: Story = {
  args: {
    items: [
      {
        title: 'Tasks done',
        value: '86%',
        description: '31 tasks remaining',
        figure:
          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        figureClass: 'w-12 rounded-full overflow-hidden',
        descClass: 'text-secondary',
      },
    ],
    shadow: true,
  },
}

export const WithSlots: Story = {
  args: {
    shadow: true,
  },
  render: (args) => ({
    components: { DuStats, DuStat },
    setup() {
      return { args }
    },
    template: `
      <DuStats v-bind="args">
        <DuStat :figureClass="'text-primary'" :valueClass="'text-primary'">
          <template #figure>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </template>
          <template #title>Total Likes</template>
          <template #value>25.6K</template>
          <template #desc>21% more than last month</template>
        </DuStat>
        
        <DuStat :figureClass="'text-secondary'" :valueClass="'text-secondary'">
          <template #figure>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </template>
          <template #title>Page Views</template>
          <template #value>2.6M</template>
          <template #desc>21% more than last month</template>
        </DuStat>
      </DuStats>
    `,
  }),
}

export const WithCustomSlots: Story = {
  args: {
    items: [
      {
        title: 'Custom Title',
        value: 'Custom Value',
        description: 'Custom Description',
        tags: ['First Tag', 'Another Tag'],
      },
    ],
    shadow: true,
  },
  render: (args) => ({
    components: { DuStats, DuBadge },
    setup() {
      return { args }
    },
    template: `
      <DuStats v-bind="args">
        <template #title="{ item }">
          <span class="text-primary">{{ item.title }}</span>
        </template>
        <template #value="{ item }">
          <span class="text-secondary">{{ item.value }}</span>
        </template>
        <template #desc="{ item }">
          <span class="text-accent">{{ item.description }}</span>
        </template>
        <template #actions="{ item }">
          <DuBadge v-for="tag in item.tags" size="sm" ghost class="mr-2">{{ tag }}</DuBadge>
        </template>
      </DuStats>
    `,
  }),
} 