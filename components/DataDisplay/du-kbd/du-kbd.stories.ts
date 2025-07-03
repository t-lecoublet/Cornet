import type { Meta, StoryObj } from '@storybook/vue3'
import DuKbd from './du-kbd.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'
import type { ArgTypes } from "@storybook/vue3";

const meta: Meta<typeof DuKbd> = {
  title: 'Components/DataDisplay/Kbd',
  component: DuKbd,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl as ArgTypes,
  },
}

export default meta

type Story = StoryObj<typeof DuKbd>

const defaultTplStr = `
  <DuKbd v-bind="args">K</DuKbd>
`
const KbdSizesTplStr = `
<div class="flex gap-2 items-center">
  <DuKbd size="xs">XSmall</DuKbd>
  <DuKbd size="sm">Small</DuKbd>
  <DuKbd size="md">Medium</DuKbd>
  <DuKbd size="lg">Large</DuKbd>
  <DuKbd size="xl">XLarge</DuKbd>
</div>`
const InTextKbdTplStr = `
<div class="flex gap-2 items-center">
  <p>
    Press <DuKbd>F</DuKbd> to pay respects.
  </p>
</div>
`
const KeyCombinationsTplStr = `
<div>
  <DuKbd>ctrl</DuKbd> + <DuKbd>shift</DuKbd> + <DuKbd>del</DuKbd>
</div>
`
const FunctionKeysTplStr = `
<div class="flex gap-2 m-4">
  <DuKbd>⌘</DuKbd>
  <DuKbd>⌥</DuKbd>
  <DuKbd>⇧</DuKbd>
  <DuKbd>⌃</DuKbd>
</div>
`
const FullKeyboardTplStr = `
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd>q</DuKbd>
  <DuKbd>w</DuKbd>
  <DuKbd>e</DuKbd>
  <DuKbd>r</DuKbd>
  <DuKbd>t</DuKbd>
  <DuKbd>y</DuKbd>
  <DuKbd>u</DuKbd>
  <DuKbd>i</DuKbd>
  <DuKbd>o</DuKbd>
  <DuKbd>p</DuKbd>
</div>
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd>a</DuKbd>
  <DuKbd>s</DuKbd>
  <DuKbd>d</DuKbd>
  <DuKbd>f</DuKbd>
  <DuKbd>g</DuKbd>
  <DuKbd>h</DuKbd>
  <DuKbd>j</DuKbd>
  <DuKbd>k</DuKbd>
  <DuKbd>l</DuKbd>
</div>
<div class="my-1 flex w-full justify-center gap-1">
  <DuKbd>z</DuKbd>
  <DuKbd>x</DuKbd>
  <DuKbd>c</DuKbd>
  <DuKbd>v</DuKbd>
  <DuKbd>b</DuKbd>
  <DuKbd>n</DuKbd>
  <DuKbd>m</DuKbd>
  <DuKbd>/</DuKbd>
</div>
`
const ArrowKeysTplStr = `
<div class="flex w-full justify-center">
  <DuKbd>▲</DuKbd>
</div>
<div class="flex w-full justify-center gap-12">
  <DuKbd>◀︎</DuKbd>
  <DuKbd>▶︎</DuKbd>
</div>
<div class="flex w-full justify-center">
  <DuKbd>▼</DuKbd>
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
  parameters: {
    docs: {
      source: {
        code: KbdSizesTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: InTextKbdTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: KeyCombinationsTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: FunctionKeysTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: FullKeyboardTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: ArrowKeysTplStr,
        language: 'html',
      },
    },
  },
}
export const ArrowKeys = { ...ArrowKeysTemplate }
ArrowKeys.args = {} 