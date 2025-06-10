import type { Meta, StoryObj } from '@storybook/vue3'
import DuDropdown from './du-dropdown.vue'
import DuButton from '../du-button/du-button.vue'
import Menu from '../../../components/Navigation/du-menu/du-menu.vue'

const meta: Meta<typeof DuDropdown> = {
  title: 'Components/Actions/Dropdown',
  component: DuDropdown,
  tags: ['autodocs'],
  argTypes: {
    hover: { control: 'boolean' },
    open: { control: 'boolean' },
    placement: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'top', 'bottom', 'left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof DuDropdown>

const defaultTplStr = `
  <DuDropdown v-bind="args">
    <template #trigger>
      <DuButton class="m-1">Click me !</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </Menu>
  </DuDropdown>
`

const placementsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  <DuDropdown placement="top">
    <template #trigger>
      <DuButton class="m-1">Top</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown placement="bottom">
    <template #trigger>
      <DuButton class="m-1">Bottom</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown placement="left">
    <template #trigger>
      <DuButton class="m-1">Left</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown placement="right">
    <template #trigger>
      <DuButton class="m-1">Right</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const alignmentsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  <DuDropdown placement="start">
    <template #trigger>
      <DuButton class="m-1">Start</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown placement="center">
    <template #trigger>
      <DuButton class="m-1">Center</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown placement="end">
    <template #trigger>
      <DuButton class="m-1">End</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const hoverTplStr = `
<div class="flex justify-center p-16">
  <DuDropdown hover>
    <template #trigger>
      <DuButton class="m-1">Hover me !</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const openTplStr = `
<div class="flex justify-center p-16">
  <DuDropdown open>
    <template #trigger>
      <DuButton class="m-1">Always open</DuButton>
    </template>
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

// DEFAULT DROPDOWN
export const DefaultDropdown: Story = {
  render: (args) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `
<DuDropdown>
  <template #trigger>
    <DuButton class="m-1">Click me !</DuButton>
  </template>
  <Menu class="w-56">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </Menu>
</DuDropdown>`,
        language: 'html',
        type: 'auto'
      }
    },
  },
}

// DROPDOWN PLACEMENTS
export const DropdownPlacements: Story = {
  render: (args) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { }
    },
    template: placementsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: placementsTplStr,
        language: 'html',
      },
    },
  },
}

// DROPDOWN ALIGNMENTS
export const DropdownAlignments: Story = {
  render: (args) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { }
    },
    template: alignmentsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: alignmentsTplStr,
        language: 'html',
      },
    },
  },
}

// DROPDOWN HOVER
export const DropdownHover: Story = {
  render: (args) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { }
    },
    template: hoverTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: hoverTplStr,
        language: 'html',
      },
    },
  },
}

// DROPDOWN OPEN
export const DropdownOpen: Story = {
  render: (args) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { }
    },
    template: openTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: openTplStr,
        language: 'html',
      },
    },
  },
}

// STORY EXEMPLE
export const DropdownExample: Story = {
  render: () => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { }
    },
    template: `
      <DuDropdown>
        <template #trigger>
          <DuButton class="m-1">Example</DuButton>
        </template>
        <Menu class="w-56">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
          <li><a>Item 3</a></li>
        </Menu>
      </DuDropdown>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `
<DuDropdown>
  <template #trigger>
    <DuButton class="m-1">Example</DuButton>
  </template>
  <Menu class="w-56">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </Menu>
</DuDropdown>`,
        language: 'html',
      },
    },
  },
}