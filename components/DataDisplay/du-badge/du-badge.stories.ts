import type { Meta, StoryObj } from '@storybook/vue3'
import DuBadge from './du-badge.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'
import { useVariantStoriesControl } from '../../../composables/useVariantProps'

const meta: Meta<typeof DuBadge> = {
  title: 'Components/DataDisplay/Badge',
  component: DuBadge,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    soft: { control: 'boolean' },
    outline: { control: 'boolean' },
    dash: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof DuBadge>

const defaultTplStr = `
  <DuBadge v-bind="args">Badge</DuBadge>
`

const BadgeSizesTplStr = `
  <div class="flex gap-2 items-center">
    <DuBadge size="xs">Xsmall</DuBadge>
    <DuBadge size="sm">Small</DuBadge>
    <DuBadge size="md">Medium</DuBadge>
    <DuBadge size="lg">Large</DuBadge>
    <DuBadge size="xl">Xlarge</DuBadge>
  </div>
`

const BadgeColorsTplStr = `
  <div class="flex gap-2 items-center">
    <DuBadge variant="primary" v-bind="args">Primary</DuBadge>
    <DuBadge variant="secondary" v-bind="args">Secondary</DuBadge>
    <DuBadge variant="accent" v-bind="args">Accent</DuBadge>
    <DuBadge variant="neutral" v-bind="args">Neutral</DuBadge>
    <DuBadge variant="info" v-bind="args">Info</DuBadge>
    <DuBadge variant="success" v-bind="args">Success</DuBadge>
    <DuBadge variant="warning" v-bind="args">Warning</DuBadge>
    <DuBadge variant="error" v-bind="args">Error</DuBadge>
  </div>
`

const EmptyBadgeTplStr = `
  <div class="flex gap-2 items-center">
    <DuBadge size="lg" v-bind="args"></DuBadge>
    <DuBadge size="md" v-bind="args"></DuBadge>
    <DuBadge size="sm" v-bind="args"></DuBadge>
    <DuBadge size="xs" v-bind="args"></DuBadge>
  </div>
`

const BadgeWithIconTplStr = `
  <div class="flex gap-2 items-center">
    <DuBadge variant="info" v-bind="args">Info</DuBadge>
    <DuBadge variant="success" v-bind="args">Success</DuBadge>
    <DuBadge variant="warning" v-bind="args">Warning</DuBadge>
    <DuBadge variant="error" v-bind="args">Error</DuBadge>
  </div>
`

const BadgeInATextTplStr = `
<div class="flex flex-col gap-2">
    <h1 class="text-xl font-semibold">
        Heading 1 <DuBadge size="xl" v-bind="args">Badge</DuBadge>
    </h1>
    <h2 class="text-lg font-semibold">
        Heading 2 <DuBadge size="lg" v-bind="args">Badge</DuBadge>
    </h2>
    <h3 class="text-base font-semibold">
      Heading 3 <DuBadge size="md" v-bind="args">Badge</DuBadge>
    </h3>
    <h4 class="text-sm font-semibold">
      Heading 4 <DuBadge size="sm" v-bind="args">Badge</DuBadge>
    </h4>
    <h5 class="text-xs font-semibold">
      Heading 5 <DuBadge size="xs" v-bind="args">Badge</DuBadge>
    </h5>
    <p class="text-xs">
      Paragraph <DuBadge size="xs" v-bind="args">Badge</DuBadge>
    </p>
</div>`

const BadgeInAButtonTplStr = `
<div class="flex justify-center gap-2">
    <button class="btn">
        Inbox <DuBadge size="sm" v-bind="args">+99</DuBadge>
    </button>
    <button class="btn">
        Inbox <DuBadge size="sm" variant="secondary" v-bind="args">+99</DuBadge>
    </button>
`

// BADGE

const TemplateBadge: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const DefaultBadge = { ...TemplateBadge }
DefaultBadge.args = {}

// BADGE SIZES

const BadgeSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: BadgeSizesTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const BadgeSizes = { ...BadgeSizesTemplate }
BadgeSizes.args = {}

// BADGE COLORS

const BadgeColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: BadgeColorsTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const BadgeColors = { ...BadgeColorsTemplate }
BadgeColors.args = {}

// BADGE WITH SOFT STYLE

export const BadgeWithSoftStyle = { ...BadgeColorsTemplate }
BadgeWithSoftStyle.args = {
  soft: true,
}

// BADGE WITH OUTLINE STYLE

export const BadgeWithOutlineStyle = { ...BadgeColorsTemplate }
BadgeWithOutlineStyle.args = {
  outline: true,
}

// BADGE WITH DASH STYLE

export const BadgeWithDashStyle = { ...BadgeColorsTemplate }
BadgeWithDashStyle.args = {
  dash: true,
}

// BADGE GHOST

export const BadgeGhost = { ...TemplateBadge }
BadgeGhost.args = {
  ghost: true,
}

// EMPTY BADGE

const EmptyBadgeTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: EmptyBadgeTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const EmptyBadge = { ...EmptyBadgeTemplate }
EmptyBadge.args = {
  variant: 'primary',
}

// BADGE WITH ICON

const BadgeWithIconTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: BadgeWithIconTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const WithIconBadge = { ...BadgeWithIconTemplate }
WithIconBadge.args = {
  icon: true,
}

// BADGE IN A TEXT

const BadgeInATextTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: BadgeInATextTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const BadgeInAText = { ...BadgeInATextTemplate }
BadgeInAText.args = {}

// BADGE IN A BUTTON

const BadgeInAButtonTemplate: Story = {
  render: (args: any) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: BadgeInAButtonTplStr,
  }),
}
export const BadgeInAButton = { ...BadgeInAButtonTemplate }
BadgeInAButton.args = {} 