import type { Meta, StoryObj } from "@storybook/vue3"
import DuFileInput from "./du-file-input.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"
import type { ArgTypes } from "@storybook/vue3";

const meta: Meta<typeof DuFileInput> = {
  title: "Components/DataInput/FileInput",
  component: DuFileInput,
  tags: ['autodocs'],
  argTypes: {
    ...(() => {
      const { size, ...restSize } = useSizeStoriesControl as ArgTypes;
      const { variant, ...restVariant } = useVariantStoriesControl as ArgTypes;
      return { ...restSize, ...restVariant };
    })(),
    size: {
      control: { type: 'select' },
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Taille du champ fichier',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
      description: 'Couleur du champ fichier',
    },
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
  parameters: {
    docs: {
      source: {
        code: FileInputSizesTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: FileInputColorsTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: GhostFileInputTplStr,
        language: 'html',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: DisabledFileInputTplStr,
        language: 'html',
      },
    },
  },
}
export const DisabledFileInput = { ...DisabledFileInputTemplate } 