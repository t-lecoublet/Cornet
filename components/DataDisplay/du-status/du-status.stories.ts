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
  <DuStatus size="xs" />
  <DuStatus size="sm" />
  <DuStatus size="md" />
  <DuStatus size="lg" />
  <DuStatus size="xl" />
</div>
`
const StatusWithColorsTplStr = `
<div class="flex gap-2 items-center">
  <DuStatus variant="primary" />
  <DuStatus variant="secondary" />
  <DuStatus variant="accent" />
  <DuStatus variant="neutral" />
  <DuStatus variant="info" />
  <DuStatus variant="success" />
  <DuStatus variant="warning" />
  <DuStatus variant="error" />
</div>`
const StatusWithPingAnimationTplStr = `
<DuStatus variant="info" ping /> Server is down`
const StatusWithBounceAnimationTplStr = `
<DuStatus variant="info" bounce /> Unread messages`

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
  parameters: {
    docs: {
      source: {
        code: StatusSizesTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: StatusWithColorsTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: StatusWithPingAnimationTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: StatusWithBounceAnimationTplStr,
        language: 'html',
      },
    },
  },
}
export const StatusWithBounceAnimation = { ...StatusWithBounceAnimationTemplate } 