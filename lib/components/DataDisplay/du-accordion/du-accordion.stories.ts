import type { Meta, StoryObj } from '@storybook/vue3'
import DuAccordion from './du-accordion.vue'
import DuButton from '../../../components/Actions/du-button/du-button.vue'
import DuAccordionItem from './du-accordion-item.vue'

const meta = {
  title: 'Components/DataDisplay/Accordion',
  component: DuAccordion,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description:
        'Array of accordion items with title, content and checked properties',
    },
    name: {
      control: 'text',
      description:
        'Name attribute for the radio inputs (must be unique for each accordion group)',
    },
    modifier: {
      control: { type: 'select' },
      options: [
        undefined,
        'collapse-arrow',
        'collapse-plus',
        'collapse-open',
        'collapse-close',
      ],
      description: 'Optional modifier class for the accordion',
    },
    customClass: {
      control: 'text',
      description: 'Custom class to apply to all collapse elements',
    },
  },
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Content of item 1. Click on another item to close this one.',
        checked: true,
      },
      {
        title: 'Item 2',
        content:
          'Content of item 2. The accordion allows you to show and hide content, but only one item can remain open at a time.',
      },
      {
        title: 'Item 3',
        content:
          'Content of item 3. All radio buttons with the same name work together.',
      },
    ],
    name: 'accordion-example',
    modifier: undefined,
    customClass: '',
  },
} satisfies Meta<typeof DuAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithArrow: Story = {
  args: {
    modifier: 'collapse-arrow',
  },
}

export const WithPlus: Story = {
  args: {
    modifier: 'collapse-plus',
  },
}

export const WithCustomClass: Story = {
  args: {
    customClass: 'border-primary',
    items: [
      {
        title: 'Item 1',
        content: 'Content with custom class',
        checked: true,
      },
      {
        title: 'Item 2',
        content: 'Content with custom class',
        customClass: 'border border-secondary',
      },
    ],
  },
}

const WithCustomSlotsTemplate = `
<div class="flex flex-col gap-2">
  <DuAccordion :items="items" name="custom-slots" modifier="collapse-arrow">
    <template #title-0="{ item }">
      <div class="flex items-center gap-2">
        <span class="badge badge-primary">Custom</span>
        <span>{{ item.title }}</span>
      </div>
    </template>
    <template #content-0="{ item }">
      <div class="flex flex-col gap-2">
        <p>{{ item.content }}</p>
        <DuButton variant="primary" size="sm">Custom action</DuButton>
      </div>
    </template>
  </DuAccordion>
</div>
`

export const WithCustomSlots: Story = {
  render: (args: any) => ({
    components: { DuAccordion, DuButton },
    setup() {
      const items = [
        {
          title: 'Custom title 1',
          content: 'Custom content 1',
          checked: true,
        },
        {
          title: 'Custom title 2',
          content: 'Custom content 2',
        },
      ]

      return { items }
    },
    template: WithCustomSlotsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: WithCustomSlotsTemplate,
        language: 'html',
      },
    },
  },
}

const WithGlobalSlotsTemplate = `
<div class="flex flex-col gap-2">
  <DuAccordion :items="items" name="global-slots" modifier="collapse-arrow">
    <template #title="{ item, index }">
      <div class="flex items-center gap-2">
        <span class="badge badge-primary">{{ index + 1 }}</span>
        <span>{{ item.title }}</span>
      </div>
    </template>
    <template #content="{ item, index }">
      <div class="flex flex-col gap-2">
        <p>{{ item.content }}</p>
        <p class="text-sm text-gray-500">Item number {{ index + 1 }}</p>
        <DuButton variant="primary" size="sm">Action</DuButton>
      </div>
    </template>
  </DuAccordion>
</div>
`

export const WithGlobalSlots: Story = {
  render: (args: any) => ({
    components: { DuAccordion, DuButton },
    setup() {
      const items = [
        {
          title: 'First item',
          content: 'Content of the first item',
          checked: true,
        },
        {
          title: 'Second item',
          content: 'Content of the second item',
        },
        {
          title: 'Third item',
          content: 'Content of the third item',
        },
      ]

      return { items }
    },
    template: WithGlobalSlotsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: WithGlobalSlotsTemplate,
        language: 'html',
      },
    },
  },
}

const MultipleGroupsTemplate = `
<div class="flex flex-col gap-2">
  <h3 class="mb-4">First accordion group</h3>
  <div class="join join-vertical">
    <DuAccordion :items="firstGroup" name="group1" modifier="collapse-arrow" customClass="join-item" />
  </div>

  <h3 class="mt-8 mb-4">Second accordion group</h3>
  <DuAccordion :items="secondGroup" name="group2" modifier="collapse-plus" />
</div>
`

export const MultipleGroups: Story = {
  render: (args: any) => ({
    components: { DuAccordion },
    setup() {
      const firstGroup = [
        {
          title: 'Group 1 - Item 1',
          content: 'Content of the first group, item 1',
          checked: true,
        },
        {
          title: 'Group 1 - Item 2',
          content: 'Content of the first group, item 2',
        },
      ]

      const secondGroup = [
        {
          title: 'Group 2 - Item 1',
          content: 'Content of the second group, item 1',
          checked: true,
        },
        {
          title: 'Group 2 - Item 2',
          content: 'Content of the second group, item 2',
        },
      ]

      return { firstGroup, secondGroup }
    },
    template: MultipleGroupsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: MultipleGroupsTemplate,
        language: 'html',
      },
    },
  },
} 