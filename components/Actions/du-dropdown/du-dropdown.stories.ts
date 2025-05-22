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
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </Menu>
  </DuDropdown>
`

const placementsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  <DuDropdown v-bind="args" placement="top">
    <template #trigger>
      <DuButton class="m-1">Top</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown v-bind="args" placement="bottom">
    <template #trigger>
      <DuButton class="m-1">Bottom</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown v-bind="args" placement="left">
    <template #trigger>
      <DuButton class="m-1">Left</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown v-bind="args" placement="right">
    <template #trigger>
      <DuButton class="m-1">Right</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const alignmentsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  <DuDropdown v-bind="args" placement="start">
    <template #trigger>
      <DuButton class="m-1">Start</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown v-bind="args" placement="center">
    <template #trigger>
      <DuButton class="m-1">Center</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
  
  <DuDropdown v-bind="args" placement="end">
    <template #trigger>
      <DuButton class="m-1">End</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const hoverTplStr = `
<div class="flex justify-center p-16">
  <DuDropdown v-bind="args" hover>
    <template #trigger>
      <DuButton class="m-1">Hover me !</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

const openTplStr = `
<div class="flex justify-center p-16">
  <DuDropdown v-bind="args" open>
    <template #trigger>
      <DuButton class="m-1">Always open</DuButton>
    </template>
    <Menu v-bind="args" class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </Menu>
  </DuDropdown>
</div>
`

// DEFAULT DROPDOWN

const TemplateDropdown: Story = {
  render: (args: any) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const DefaultDropdown = { ...TemplateDropdown }

// DROPDOWN PLACEMENTS

const DropdownPlacementsTemplate: Story = {
  render: (args: any) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: placementsTplStr,
  }),
  args: {},
}
export const DropdownPlacements = { ...DropdownPlacementsTemplate }

// DROPDOWN ALIGNMENTS

const DropdownAlignmentsTemplate: Story = {
  render: (args: any) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: alignmentsTplStr,
  }),
  args: {},
}
export const DropdownAlignments = { ...DropdownAlignmentsTemplate }

// DROPDOWN HOVER

const DropdownHoverTemplate: Story = {
  render: (args: any) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: hoverTplStr,
  }),
  args: {},
}
export const DropdownHover = { ...DropdownHoverTemplate }

// DROPDOWN OPEN

const DropdownOpenTemplate: Story = {
  render: (args: any) => ({
    components: { DuDropdown, DuButton, Menu },
    setup() {
      return { args }
    },
    template: openTplStr,
  }),
  args: {},
}
export const DropdownOpen = { ...DropdownOpenTemplate } 