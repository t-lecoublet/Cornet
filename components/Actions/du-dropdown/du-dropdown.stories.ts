import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
    popover: { control: 'boolean' },
    disabled: { control: 'boolean' },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
    closeOnClickOutside: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    placement: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'top', 'bottom', 'left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof DuDropdown>

/**
 * Spread `triggerProps` on whatever opens the dropdown. It carries
 * `aria-expanded`, `aria-haspopup`, `aria-controls` and the click / ArrowDown
 * wiring — without it the trigger is a button that does nothing.
 */
const ITEMS = `
    <Menu class="w-56">
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </Menu>`

const one = (attrs: string, label: string) => `
  <DuDropdown ${attrs}>
    <template #trigger="{ triggerProps }">
      <DuButton v-bind="triggerProps" class="m-1">${label}</DuButton>
    </template>${ITEMS}
  </DuDropdown>`

const story = (template: string, components: Record<string, unknown> = {}): Story['render'] =>
  (args) => ({
    components: { DuDropdown, DuButton, Menu, ...components },
    setup: () => ({ args }),
    template,
  })

const withSource = (template: string, render: Story['render']): Story => ({
  render,
  parameters: { docs: { source: { code: template.trim(), language: 'html' } } },
})

// DEFAULT
const defaultTpl = `<div class="flex justify-center p-16">${one('v-bind="args"', 'Click me !')}</div>`
export const DefaultDropdown: Story = withSource(defaultTpl, story(defaultTpl))

// PLACEMENTS — which edge the panel hangs off
const placementsTpl = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  ${['top', 'bottom', 'left', 'right'].map((side) => one(`placement="${side}"`, side)).join('')}
</div>`
export const DropdownPlacements: Story = withSource(placementsTpl, story(placementsTpl))

// ALIGNMENTS — how the panel lines up along that edge
const alignmentsTpl = `
<div class="flex flex-wrap gap-4 justify-center p-16">
  ${['start', 'center', 'end'].map((align) => one(`placement="${align}"`, align)).join('')}
</div>`
export const DropdownAlignments: Story = withSource(alignmentsTpl, story(alignmentsTpl))

// HOVER — opens on pointer hover and on keyboard focus, after a short delay
const hoverTpl = `<div class="flex justify-center p-16">${one('hover', 'Hover or focus me !')}</div>`
export const DropdownHover: Story = withSource(hoverTpl, story(hoverTpl))

/**
 * A dropdown inside `overflow: hidden` is clipped by its ancestor. `popover`
 * renders the panel in the top layer instead, pinned to the trigger with CSS
 * anchor positioning — the same escape hatch `DuSelect` and `DuSearch` use.
 */
const clippedTpl = `
<div class="flex gap-8 justify-center p-16">
  <div class="overflow-hidden h-24 w-56 rounded-box border border-base-300 p-4">
    <p class="text-xs mb-2 opacity-70">clipped</p>
    ${one('', 'Default')}
  </div>
  <div class="overflow-hidden h-24 w-56 rounded-box border border-base-300 p-4">
    <p class="text-xs mb-2 opacity-70">top layer</p>
    ${one('popover', 'popover')}
  </div>
</div>`
export const DropdownInOverflowHidden: Story = withSource(clippedTpl, story(clippedTpl))

/**
 * With an `open` prop the parent decides. The dropdown emits `update:open` and
 * shows nothing until the prop moves — here the checkbox is the only thing
 * that can open it, and clicking outside cannot close it behind the parent's back.
 */
const controlledTpl = `
<div class="flex flex-col items-center gap-4 p-16">
  <label class="flex items-center gap-2">
    <input type="checkbox" class="checkbox" v-model="open" />
    <span>open</span>
  </label>
  <DuDropdown v-model:open="open">
    <template #trigger="{ triggerProps }">
      <DuButton v-bind="triggerProps" class="m-1">Controlled</DuButton>
    </template>${ITEMS}
  </DuDropdown>
</div>`
export const DropdownControlled: Story = withSource(controlledTpl, () => ({
  components: { DuDropdown, DuButton, Menu },
  setup: () => ({ open: ref(false) }),
  template: controlledTpl,
}))
