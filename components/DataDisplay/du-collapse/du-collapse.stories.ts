import type { Meta, StoryObj } from '@storybook/vue3'
import DuCollapse from './du-collapse.vue'
import DuButton from '../../../components/Actions/du-button/du-button.vue'

const meta = {
  title: 'Components/DataDisplay/Collapse',
  component: DuCollapse,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description:
        'Array of collapse items with title, content, open and customClass properties',
    },
    modifier: {
      control: { type: 'select' },
      options: [
        'collapse-arrow',
        'collapse-plus',
        'collapse-open',
        'collapse-close',
      ],
      description: 'Modifier for the collapse appearance',
    },
    customClass: {
      control: 'text',
      description: 'Custom class to apply to all collapse elements',
    },
  },
  args: {
    items: [
      {
        title: 'Click to open this one and close others',
        content:
          'This is the first collapse content. It can contain any HTML content.',
        open: true,
      },
      {
        title: 'Click to open this one and close others',
        content:
          'This is the second collapse content. It can contain any HTML content.',
        open: false,
      },
      {
        title: 'Click to open this one and close others',
        content:
          'This is the third collapse content. It can contain any HTML content.',
        open: false,
      },
    ],
    modifier: 'collapse-arrow',
    customClass: '',
  },
} satisfies Meta<typeof DuCollapse>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPlusIcon: Story = {
  args: {
    modifier: 'collapse-plus',
  },
}

export const WithCustomContent: Story = {
  render: (args: any) => ({
    components: { DuCollapse, DuButton },
    setup() {
      const items = [
        {
          title: 'Collapse with custom content',
          content: '',
          open: true,
        },
        {
          title: 'Another collapse with custom content',
          content: '',
          open: false,
        },
      ]

      return { items }
    },
    template: `
      <div class="flex flex-col gap-2">
        <DuCollapse :items="items" modifier="collapse-arrow">
          <template #content-0>
            <div class="p-2">
              <p>This is custom content for the first collapse.</p>
              <div class="flex gap-2 mt-4">
                <DuButton variant="primary">Action</DuButton>
                <DuButton variant="outline">Cancel</DuButton>
              </div>
            </div>
          </template>
          <template #content-1>
            <div class="p-2">
              <p>This is custom content for the second collapse.</p>
              <div class="flex gap-2 mt-4">
                <DuButton variant="secondary">Action</DuButton>
                <DuButton variant="outline">Cancel</DuButton>
              </div>
            </div>
          </template>
        </DuCollapse>
      </div>
    `,
  }),
}

export const ManualMode: Story = {
  render: (args: any) => ({
    components: { DuCollapse, DuButton },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-2">
        <DuCollapse>
          <div class="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" checked />
            <div class="collapse-title">
              Manual collapse item 1
            </div>
            <div class="collapse-content">
              <p>This is the content for the first manual collapse item.</p>
            </div>
          </div>
          
          <div class="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" />
            <div class="collapse-title">
              Manual collapse item 2
            </div>
            <div class="collapse-content">
              <p>This is the content for the second manual collapse item.</p>
              <DuButton variant="primary" class="mt-2">Action</DuButton>
            </div>
          </div>
        </DuCollapse>
      </div>
    `,
  }),
}

export const OpenByDefault: Story = {
  args: {
    items: [
      {
        title: 'This one is open by default',
        content:
          "This collapse is open by default because the 'open' property is set to true.",
        open: true,
      },
      {
        title: 'This one is closed by default',
        content:
          "This collapse is closed by default because the 'open' property is set to false.",
        open: false,
      },
    ],
    modifier: 'collapse-arrow',
  },
}

export const WithoutModifier: Story = {
  args: {
    modifier: undefined,
  },
} 