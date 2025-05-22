import type { Meta, StoryObj } from '@storybook/vue3'
import DuStatus from './du-status.vue'

const meta: Meta<typeof DuStatus> = {
  title: 'Components/DataDisplay/Status',
  component: DuStatus,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof DuStatus>

const defaultTplStr = `
  <DuStatus v-bind="args" />
`
const StatusSizesTplStr = `
<div class="flex gap-2 items-center">
  <DuStatus v-bind="args" size="xs" />
  <DuStatus v-bind="args" size="sm" />
  <DuStatus v-bind="args" size="md" />
  <DuStatus v-bind="args" size="lg" />
  <DuStatus v-bind="args" size="xl" />
</div>
`
const StatusWithColorsTplStr = `
<div class="flex gap-2 items-center">
  <DuStatus v-bind="args" variant="primary" />
  <DuStatus v-bind="args" variant="secondary" />
  <DuStatus v-bind="args" variant="accent" />
  <DuStatus v-bind="args" variant="neutral" />
  <DuStatus v-bind="args" variant="info" />
  <DuStatus v-bind="args" variant="success" />
  <DuStatus v-bind="args" variant="warning" />
  <DuStatus v-bind="args" variant="error" />
</div>`
const StatusWithPingAnimationTplStr = `
<DuStatus v-bind="args" variant="info" ping /> Server is down`
const StatusWithBounceAnimationTplStr = `
<DuStatus v-bind="args" variant="info" bounce /> Unread messages`

// DEFAULT

const DefaultTemplate: Story = {
  render: (args: any) => ({
    components: { DuStatus },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const Default = { ...DefaultTemplate }
Default.args = {}

// STATUS SIZES

const StatusSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuStatus },
    setup() {
      return { args }
    },
    template: StatusSizesTplStr,
  }),
  args: {},
}
export const StatusSizes = { ...StatusSizesTemplate }
StatusSizes.args = {}

// STATUS COLOR

const StatusWithColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuStatus },
    setup() {
      return { args }
    },
    template: StatusWithColorsTplStr,
  }),
  args: {},
}
export const StatusWithColors = { ...StatusWithColorsTemplate }
StatusWithColors.args = {}

// STATUS WITH PING ANIMATION
const StatusWithPingAnimationTemplate: Story = {
  render: (args: any) => ({
    components: { DuStatus },
    setup() {
      return { args }
    },
    template: StatusWithPingAnimationTplStr,
  }),
}
export const StatusWithPingAnimation = { ...StatusWithPingAnimationTemplate }

// STATUS WITH BOUNCE ANIMATION
const StatusWithBounceAnimationTemplate: Story = {
  render: (args: any) => ({
    components: { DuStatus },
    setup() {
      return { args }
    },
    template: StatusWithBounceAnimationTplStr,
  }),
}
export const StatusWithBounceAnimation = {
  ...StatusWithBounceAnimationTemplate,
} 