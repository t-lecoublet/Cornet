import type { Meta, StoryObj } from "@storybook/vue3"
import DuLabel from "./du-label.vue"
import DuInputField from "../du-input-field/du-input-field.vue"
import DuSelect from "../du-select/du-select.vue"

const meta: Meta<typeof DuLabel> = {
  title: "Components/DataInput/Label",
  component: DuLabel,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["input", "select", "floating-label", "fieldset-label"],
    },
  },
}

export default meta

type Story = StoryObj<typeof DuLabel>

const defaultTplStr = `
<DuLabel v-bind="args">
  <span class="label">https://</span>
  <DuInputField placeholder="URL" />
</DuLabel>
`

const LabelForInputAtTheEndTplStr = `
<DuLabel v-bind="args">
  <DuInputField placeholder="domain name" />
  <span class="label">.com</span>
</DuLabel>`

const LabelForSelectTplStr = `
<DuLabel type="select" v-bind="args">
  <span class="label">Type</span>
  <DuSelect>
    <option>Personal</option>
    <option>Business</option>
  </DuSelect>
</DuLabel>`

const LabelForDateInputTplStr = `
<DuLabel v-bind="args">
  <span class="label">Date</span>
  <DuInputField type="date" />
</DuLabel>
`

const FloatingLabelTplStr = `
<DuLabel v-bind="args" type="floating-label">
  <span class="label">Your name</span>
  <DuInputField placeholder="Your name" />
</DuLabel>
`

const FloatingLabelWithDifferentSizesTplStr = `
<div class="flex flex-col gap-2">
  <DuLabel v-bind="args" type="floating-label">
    <DuInputField size="xs" />
    <span>Extra Small</span>
  </DuLabel>
  <DuLabel v-bind="args" type="floating-label">
    <DuInputField size="sm" />
    <span>Small</span>
  </DuLabel>
  <DuLabel v-bind="args" type="floating-label">
    <DuInputField size="md" />
    <span>Medium</span>
  </DuLabel>
  <DuLabel v-bind="args" type="floating-label">
    <DuInputField size="lg" />
    <span>Large</span>
  </DuLabel>
  <DuLabel v-bind="args" type="floating-label">
    <DuInputField size="xl" />
    <span>Extra Large</span>
  </DuLabel>
</div>
`

// DEFAULT

const DefaultLabelTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const DefaultLabel = { ...DefaultLabelTemplate }

// LABEL FOR INPUT AT THE END
const LabelForInputAtTheEndTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField },
    setup() {
      return { args }
    },
    template: LabelForInputAtTheEndTplStr,
  }),
}
export const LabelForInputAtTheEnd = { ...LabelForInputAtTheEndTemplate }

// LABEL FOR SELECT
const LabelForSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField, DuSelect },
    setup() {
      return { args }
    },
    template: LabelForSelectTplStr,
  }),
}
export const LabelForSelect = { ...LabelForSelectTemplate }

// LABEL FOR DATE INPUT
const LabelForDateInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField },
    setup() {
      return { args }
    },
    template: LabelForDateInputTplStr,
  }),
}
export const LabelForDateInput = { ...LabelForDateInputTemplate }

// FLOATING LABEL
const FloatingLabelTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField },
    setup() {
      return { args }
    },
    template: FloatingLabelTplStr,
  }),
}
export const FloatingLabel = { ...FloatingLabelTemplate }

// FLOATING LABEL WITH DIFFERENT SIZES

const FloatingLabelWithDifferentSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuLabel, DuInputField },
    setup() {
      return { args }
    },
    template: FloatingLabelWithDifferentSizesTplStr,
  }),
}
export const FloatingLabelWithDifferentSizes = {
  ...FloatingLabelWithDifferentSizesTemplate,
} 