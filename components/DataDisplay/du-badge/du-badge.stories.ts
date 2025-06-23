import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import DuBadge from './du-badge.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'
import { useVariantStoriesControl } from '../../../composables/useVariantProps'

const meta: Meta<typeof DuBadge> = {
  title: 'Components/DataDisplay/Badge',
  component: DuBadge,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl as ArgTypes,
    ...useSizeStoriesControl as ArgTypes,
    soft: { 
      control: 'boolean',
      description: 'Applies a soft color style to the badge'
    },
    outline: { 
      control: 'boolean',
      description: 'Adds an outline style to the badge'
    },
    dash: { 
      control: 'boolean',
      description: 'Adds a dashed style to the badge'
    },
    ghost: { 
      control: 'boolean',
      description: 'Makes the badge more subtle'
    },
    icon: { 
      control: 'boolean',
      description: 'Adds an icon to the badge based on the variant'
    }
  },
}

export default meta

type Story = StoryObj<typeof DuBadge>

const defaultTplStr = `
<DuBadge>Badge</DuBadge>
`

const badgeSizesTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge size="xs">Xsmall</DuBadge>
  <DuBadge size="sm">Small</DuBadge>
  <DuBadge size="md">Medium</DuBadge>
  <DuBadge size="lg">Large</DuBadge>
  <DuBadge size="xl">Xlarge</DuBadge>
</div>
`

const badgeColorsTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge variant="primary">Primary</DuBadge>
  <DuBadge variant="secondary">Secondary</DuBadge>
  <DuBadge variant="accent">Accent</DuBadge>
  <DuBadge variant="neutral">Neutral</DuBadge>
  <DuBadge variant="info">Info</DuBadge>
  <DuBadge variant="success">Success</DuBadge>
  <DuBadge variant="warning">Warning</DuBadge>
  <DuBadge variant="error">Error</DuBadge>
</div>
`

const badgeSoftTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge variant="primary" soft>Primary</DuBadge>
  <DuBadge variant="secondary" soft>Secondary</DuBadge>
  <DuBadge variant="accent" soft>Accent</DuBadge>
  <DuBadge variant="neutral" soft>Neutral</DuBadge>
  <DuBadge variant="info" soft>Info</DuBadge>
  <DuBadge variant="success" soft>Success</DuBadge>
  <DuBadge variant="warning" soft>Warning</DuBadge>
  <DuBadge variant="error" soft>Error</DuBadge>
</div>
`

const badgeOutlineTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge variant="primary" outline>Primary</DuBadge>
  <DuBadge variant="secondary" outline>Secondary</DuBadge>
  <DuBadge variant="accent" outline>Accent</DuBadge>
  <DuBadge variant="neutral" outline>Neutral</DuBadge>
  <DuBadge variant="info" outline>Info</DuBadge>
  <DuBadge variant="success" outline>Success</DuBadge>
  <DuBadge variant="warning" outline>Warning</DuBadge>
  <DuBadge variant="error" outline>Error</DuBadge>
</div>
`

const badgeDashTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge variant="primary" dash>Primary</DuBadge>
  <DuBadge variant="secondary" dash>Secondary</DuBadge>
  <DuBadge variant="accent" dash>Accent</DuBadge>
  <DuBadge variant="neutral" dash>Neutral</DuBadge>
  <DuBadge variant="info" dash>Info</DuBadge>
  <DuBadge variant="success" dash>Success</DuBadge>
  <DuBadge variant="warning" dash>Warning</DuBadge>
  <DuBadge variant="error" dash>Error</DuBadge>
</div>
`

const badgeGhostTplStr = `
<DuBadge ghost>Ghost Badge</DuBadge>
`

const emptyBadgeTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge size="lg" variant="primary"></DuBadge>
  <DuBadge size="md" variant="primary"></DuBadge>
  <DuBadge size="sm" variant="primary"></DuBadge>
  <DuBadge size="xs" variant="primary"></DuBadge>
</div>
`

const badgeWithIconTplStr = `
<div class="flex gap-2 items-center">
  <DuBadge variant="info" icon>Info</DuBadge>
  <DuBadge variant="success" icon>Success</DuBadge>
  <DuBadge variant="warning" icon>Warning</DuBadge>
  <DuBadge variant="error" icon>Error</DuBadge>
</div>
`

const badgeInTextTplStr = `
<div class="flex flex-col gap-2">
  <h1 class="text-xl font-semibold">
    Heading 1 <DuBadge size="xl">Badge</DuBadge>
  </h1>
  <h2 class="text-lg font-semibold">
    Heading 2 <DuBadge size="lg">Badge</DuBadge>
  </h2>
  <h3 class="text-base font-semibold">
    Heading 3 <DuBadge size="md">Badge</DuBadge>
  </h3>
  <h4 class="text-sm font-semibold">
    Heading 4 <DuBadge size="sm">Badge</DuBadge>
  </h4>
  <h5 class="text-xs font-semibold">
    Heading 5 <DuBadge size="xs">Badge</DuBadge>
  </h5>
  <p class="text-xs">
    Paragraph <DuBadge size="xs">Badge</DuBadge>
  </p>
</div>
`

const badgeInButtonTplStr = `
<div class="flex justify-center gap-2">
  <button class="btn">
    Inbox <DuBadge size="sm">+99</DuBadge>
  </button>
  <button class="btn">
    Inbox <DuBadge size="sm" variant="secondary">+99</DuBadge>
  </button>
</div>
`

// Stories
export const DefaultBadge: Story = {
  render: (args) => ({
    components: { DuBadge },
    setup() {
      return { args }
    },
    template: `<DuBadge v-bind="args">Badge</DuBadge>`,
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

export const BadgeSizes: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeSizesTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeSizesTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeColors: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeColorsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeColorsTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeWithSoftStyle: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeSoftTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeSoftTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeWithOutlineStyle: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeOutlineTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeOutlineTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeWithDashStyle: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeDashTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeDashTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeGhost: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeGhostTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeGhostTplStr,
        language: 'html',
      },
    },
  },
}

export const EmptyBadge: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: emptyBadgeTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: emptyBadgeTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeWithIcon: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeWithIconTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeWithIconTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeInText: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeInTextTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeInTextTplStr,
        language: 'html',
      },
    },
  },
}

export const BadgeInButton: Story = {
  render: () => ({
    components: { DuBadge },
    setup() {
      return {}
    },
    template: badgeInButtonTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: badgeInButtonTplStr,
        language: 'html',
      },
    },
  },
}