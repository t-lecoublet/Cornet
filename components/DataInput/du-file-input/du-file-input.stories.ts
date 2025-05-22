import type { Meta, StoryObj } from "@storybook/vue3"
import DuFileInput from "./du-file-input.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"

const meta: Meta<typeof DuFileInput> = {
  title: "Components/DataInput/FileInput",
  component: DuFileInput,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    ghost: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta

type Story = StoryObj<typeof DuFileInput>

const defaultTplStr = `
  <DuFileInput v-bind="args" />
`

const FileInputSizesTplStr = `
<div class="flex flex-col gap-4">
  <DuFileInput size="xs" v-bind="args" />
  <DuFileInput size="sm" v-bind="args" />
  <DuFileInput size="md" v-bind="args" />
  <DuFileInput size="lg" v-bind="args" />
  <DuFileInput size="xl" v-bind="args" />
</div>`

const FileInputColorsTplStr = `
<div class="flex flex-col gap-4">
  <DuFileInput variant="primary" v-bind="args" />
  <DuFileInput variant="secondary" v-bind="args" />
  <DuFileInput variant="accent" v-bind="args" />
  <DuFileInput variant="info" v-bind="args" />
  <DuFileInput variant="success" v-bind="args" />
  <DuFileInput variant="warning" v-bind="args" />
  <DuFileInput variant="error" v-bind="args" />
</div>`

const GhostFileInputTplStr = `
  <DuFileInput ghost v-bind="args" />
`

const DisabledFileInputTplStr = `
  <DuFileInput disabled v-bind="args" />
`

// DEFAULT
const TemplateFileInput: Story = {
  render: (args: any) => ({
    components: { DuFileInput },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const Default = { ...TemplateFileInput }

// FILE INPUT SIZES
const FileInputSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuFileInput },
    setup() {
      return { args }
    },
    template: FileInputSizesTplStr,
  }),
}
export const FileInputSizes = { ...FileInputSizesTemplate }

// FILE INPUT COLORS
const FileInputColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuFileInput },
    setup() {
      return { args }
    },
    template: FileInputColorsTplStr,
  }),
}
export const FileInputColors = { ...FileInputColorsTemplate }

// GHOST FILE INPUT
const GhostFileInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuFileInput },
    setup() {
      return { args }
    },
    template: GhostFileInputTplStr,
  }),
}
export const GhostFileInput = { ...GhostFileInputTemplate }

// DISABLED FILE INPUT
const DisabledFileInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuFileInput },
    setup() {
      return { args }
    },
    template: DisabledFileInputTplStr,
  }),
}
export const DisabledFileInput = { ...DisabledFileInputTemplate } 