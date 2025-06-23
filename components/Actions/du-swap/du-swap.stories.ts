import type { Meta, StoryObj } from '@storybook/vue3'
import DuSwap from './du-swap.vue'

const meta = {
  title: 'Components/Actions/Swap',
  component: DuSwap,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Controls the active state of the swap component',
    },
    rotate: {
      control: 'boolean',
      description: 'Adds a rotate animation',
    },
    flip: {
      control: 'boolean',
      description: 'Adds a flip animation',
    },
    useCheckbox: {
      control: 'boolean',
      description: 'Use checkbox to control the swap state',
    },
  },
  args: {
    modelValue: false,
    rotate: false,
    flip: false,
    useCheckbox: true,
  },
} satisfies Meta<typeof DuSwap>

export default meta
type Story = StoryObj<typeof meta>

const defaultTplStr = `
<DuSwap v-bind="args" v-model="args.modelValue" class="text-4xl">
  <template #on>ON</template>
  <template #off>OFF</template>
</DuSwap>
`

const rotateTplStr = `
<DuSwap rotate class="text-4xl">
  <template #on>🌞</template>
  <template #off>🌜</template>
</DuSwap>
`

const flipTplStr = `
<DuSwap flip class="text-4xl">
  <template #on>🥞</template>
  <template #off>🍔</template>
</DuSwap>
`

const classNameTplStr = `
<DuSwap class="text-5xl">
  <template #on>😈</template>
  <template #off>😇</template>
</DuSwap>
`

const indeterminateTplStr = `
<DuSwap useCheckbox class="text-4xl">
  <template #on>ON</template>
  <template #off>OFF</template>
  <template #indeterminate>INDETERMINATE</template>
</DuSwap>
`

// DEFAULT SWAP
export const Default: Story = {
  render: (args) => ({
    components: { DuSwap },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTplStr,
        language: 'html',
      },
    },
  },
}

// SWAP WITH ROTATE
export const WithRotate: Story = {
  render: (args) => ({
    components: { DuSwap },
    setup() {
      return { args }
    },
    template: rotateTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: rotateTplStr,
        language: 'html',
      },
    },
  },
}

// SWAP WITH FLIP
export const WithFlip: Story = {
  render: (args) => ({
    components: { DuSwap },
    setup() {
      return { args }
    },
    template: flipTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: flipTplStr,
        language: 'html',
      },
    },
  },
}

// SWAP WITH CLASS NAME
export const WithClassName: Story = {
  render: (args) => ({
    components: { DuSwap },
    setup() {
      return { args }
    },
    template: classNameTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: classNameTplStr,
        language: 'html',
      },
    },
  },
}

// SWAP WITH INDETERMINATE STATE
export const WithIndeterminate: Story = {
  render: (args) => ({
    components: { DuSwap },
    setup() {
      return { args }
    },
    template: indeterminateTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: indeterminateTplStr,
        language: 'html',
      },
    },
  },
}