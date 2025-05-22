import type { Meta, StoryObj } from "@storybook/vue3"
import DuCheckbox from "./du-checkbox.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"

const meta: Meta<typeof DuCheckbox> = {
  title: "Components/DataInput/Checkbox",
  component: DuCheckbox,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
}

export default meta

type Story = StoryObj<typeof DuCheckbox>

const defaultTplStr = `
  <DuCheckbox v-bind="args" />
`

const TemplateCheckbox: Story = {
  render: (args: any) => ({
    components: { DuCheckbox },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const Default = { ...TemplateCheckbox }

const CheckboxColorsTplStr = `
<div class="flex gap-4">
    <DuCheckbox checked variant="primary" /> 
    <DuCheckbox checked variant="secondary" />
    <DuCheckbox checked variant="accent" />
    <DuCheckbox checked variant="info" />
    <DuCheckbox checked variant="success" />
    <DuCheckbox checked variant="warning" />
    <DuCheckbox checked variant="error" />
</div>`

const CheckboxColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuCheckbox },
    setup() {
      return { args }
    },
    template: CheckboxColorsTplStr,
  }),
}
export const CheckboxColors = { ...CheckboxColorsTemplate }

const CheckboxSizesTplStr = `
<div class="flex items-center gap-4">
  <div class="flex items-center gap-2">
    <DuCheckbox size="xs" />
    <span>XS</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox size="sm" />
    <span>SM</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox size="md" />
    <span>MD</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox size="lg" />
    <span>LG</span>
  </div>
</div>`

const CheckboxSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuCheckbox },
    setup() {
      return { args }
    },
    template: CheckboxSizesTplStr,
  }),
}
export const CheckboxSizes = { ...CheckboxSizesTemplate }

const CheckboxStatesTplStr = `
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <DuCheckbox checked />
    <span>Checked</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox />
    <span>Unchecked</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox indeterminate />
    <span>Indeterminate</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox disabled />
    <span>Disabled</span>
  </div>
  <div class="flex items-center gap-2">
    <DuCheckbox checked disabled />
    <span>Checked & Disabled</span>
  </div>
</div>`

const CheckboxStatesTemplate: Story = {
  render: (args: any) => ({
    components: { DuCheckbox },
    setup() {
      return { args }
    },
    template: CheckboxStatesTplStr,
  }),
}
export const CheckboxStates = { ...CheckboxStatesTemplate } 