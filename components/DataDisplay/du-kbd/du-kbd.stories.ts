import type { Meta, StoryObj } from '@storybook/vue3'
import DuKbd from './du-kbd.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'

const meta: Meta<typeof DuKbd> = {
  title: 'Components/DataDisplay/Kbd',
  component: DuKbd,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl,
  },
}

export default meta

type Story = StoryObj<typeof DuKbd>

const defaultTplStr = `
  <DuKbd v-bind="args">K</DuKbd>
`
const KbdSizesTplStr = `
<div class="flex gap-2 items-center">
  <DuKbd size="xs" v-bind="args">XSmall</DuKbd>
  <DuKbd size="sm" v-bind="args">Small</DuKbd>
  <DuKbd size="md" v-bind="args">Medium</DuKbd>
  <DuKbd size="lg" v-bind="args">Large</DuKbd>
  <DuKbd size="xl" v-bind="args">XLarge</DuKbd>
</div>`
const InTextKbdTplStr = `
<div class="flex gap-2 items-center">
  <p>
    Press <DuKbd v-bind="args">F</DuKbd> to pay respects.
  </p>
</div>
`
const KeyCombinationsTplStr = `
<div>
  <DuKbd v-bind="args">ctrl</DuKbd> + <DuKbd v-bind="args">shift</DuKbd> + <DuKbd v-bind="args">del</DuKbd>
</div>
`
const FunctionKeysTplStr = `
<div class="flex gap-2 m-4">
  <DuKbd v-bind="args">⌘</DuKbd>
  <DuKbd v-bind="args">⌥</DuKbd>
  <DuKbd v-bind="args">⇧</DuKbd>
  <DuKbd v-bind="args">⌃</DuKbd>
</div>
`
const FullKeyboardTplStr = `
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd v-bind="args">q</DuKbd>
  <DuKbd v-bind="args">w</DuKbd>
  <DuKbd v-bind="args">e</DuKbd>
  <DuKbd v-bind="args">r</DuKbd>
  <DuKbd v-bind="args">t</DuKbd>
  <DuKbd v-bind="args">y</DuKbd>
  <DuKbd v-bind="args">u</DuKbd>
  <DuKbd v-bind="args">i</DuKbd>
  <DuKbd v-bind="args">o</DuKbd>
  <DuKbd v-bind="args">p</DuKbd>
</div>
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd v-bind="args">a</DuKbd>
  <DuKbd v-bind="args">s</DuKbd>
  <DuKbd v-bind="args">d</DuKbd>
  <DuKbd v-bind="args">f</DuKbd>
  <DuKbd v-bind="args">g</DuKbd>
  <DuKbd v-bind="args">h</DuKbd>
  <DuKbd v-bind="args">j</DuKbd>
  <DuKbd v-bind="args">k</DuKbd>
  <DuKbd v-bind="args">l</DuKbd>
</div>
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd v-bind="args">z</DuKbd>
  <DuKbd v-bind="args">x</DuKbd>
  <DuKbd v-bind="args">c</DuKbd>
  <DuKbd v-bind="args">v</DuKbd>
  <DuKbd v-bind="args">b</DuKbd>
  <DuKbd v-bind="args">n</DuKbd>
  <DuKbd v-bind="args">m</DuKbd>
  <DuKbd v-bind="args">/</DuKbd>
</div>
`
const ArrowKeysTplStr = `
<div class="flex w-full justify-center">
  <DuKbd v-bind="args">▲</DuKbd>
</div>
<div class="flex w-full justify-center gap-12">
  <DuKbd v-bind="args">◀︎</DuKbd>
  <DuKbd v-bind="args">▶︎</DuKbd>
</div>
<div class="flex w-full justify-center">
  <DuKbd v-bind="args">▼</DuKbd>
</div>
`

// DEFAULT

const DefaultTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const Default = { ...DefaultTemplate }
Default.args = {}

// KBD SIZES

const KbdSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: KbdSizesTplStr,
  }),
}
export const KbdSizes = { ...KbdSizesTemplate }
KbdSizes.args = {}

// IN TEXT KBD

const InTextKbdTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: InTextKbdTplStr,
  }),
}
export const InTextKbd = { ...InTextKbdTemplate }
InTextKbd.args = {}

// KEY COMBINATIONS

const KeyCombinationsTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: KeyCombinationsTplStr,
  }),
}
export const KeyCombinations = { ...KeyCombinationsTemplate }
KeyCombinations.args = {}

// FUNCTION KEYS

const FunctionKeysTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: FunctionKeysTplStr,
  }),
}
export const FunctionKeys = { ...FunctionKeysTemplate }
FunctionKeys.args = {}

// FULL KEYBOARD

const FullKeyboardTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: FullKeyboardTplStr,
  }),
}
export const FullKeyboard = { ...FullKeyboardTemplate }
FullKeyboard.args = {}

// ARROW KEYS

const ArrowKeysTemplate: Story = {
  render: (args: any) => ({
    components: { DuKbd },
    setup() {
      return { args }
    },
    template: ArrowKeysTplStr,
  }),
}
export const ArrowKeys = { ...ArrowKeysTemplate }
ArrowKeys.args = {} 