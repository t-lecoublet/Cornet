import type { Meta, StoryObj } from "@storybook/vue3"
import DuFieldset from "./du-fieldset.vue"
import DuInputField from "../du-input-field/du-input-field.vue"
import DuLabel from "../du-label/du-label.vue"
import DuButton from "../../Actions/du-button/du-button.vue"

const meta: Meta<typeof DuFieldset> = {
  title: "Components/DataInput/Fieldset",
  component: DuFieldset,
  tags: ['autodocs'],
  argTypes: {
    legend: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
  },
}

export default meta

type Story = StoryObj<typeof DuFieldset>

const defaultTplStr = `
<DuFieldset legend="Page title" label="You can edit page title later on from settings" v-bind="args">
  <DuInputField placeholder="Type here" />
</DuFieldset>
`

const FieldsetWithBackgroundAndBorderTplStr = `
<DuFieldset 
  legend="Page title" 
  label="You can edit page title later on from settings" 
  v-bind="args" 
  class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <DuInputField placeholder="Type here" />
</DuFieldset>
`

const FieldsetWithMultipleInputsTplStr = `
<DuFieldset 
  legend="Page details" 
  v-bind="args"
  class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <DuLabel type="fieldset-label">Title</DuLabel>
  <DuInputField placeholder="My awesome page" />
  <DuLabel type="fieldset-label">Slug</DuLabel>
  <DuInputField placeholder="my-awesome-page" />
  <DuLabel type="fieldset-label">Author</DuLabel>
  <DuInputField placeholder="Name" />
</DuFieldset>
`

const LoginFormTplStr = `
<DuFieldset 
  legend="Login" 
  v-bind="args"
  class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <DuLabel type="fieldset-label">Email</DuLabel>
  <DuInputField placeholder="Email" />
  <DuLabel type="fieldset-label">Password</DuLabel>
  <DuInputField placeholder="Password" />
  <DuButton variant="neutral" class="mt-4">Login</DuButton>
</DuFieldset>
`

// DEFAULT

const DefaultLabelTemplate: Story = {
  render: (args: any) => ({
    components: { DuFieldset, DuInputField },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const DefaultLabel = { ...DefaultLabelTemplate }

// FIELDSET WITH BACKGROUND AND BORDER

const FieldsetWithBackgroundAndBorderTemplate: Story = {
  render: (args: any) => ({
    components: { DuFieldset, DuInputField },
    setup() {
      return { args }
    },
    template: FieldsetWithBackgroundAndBorderTplStr,
  }),
}
export const FieldsetWithBackgroundAndBorder = {
  ...FieldsetWithBackgroundAndBorderTemplate,
}
FieldsetWithBackgroundAndBorder.args = {}

// FIELDSET WITH MULTIPLE INPUTS

const FieldsetWithMultipleInputsTemplate: Story = {
  render: (args: any) => ({
    components: { DuFieldset, DuInputField, DuLabel },
    setup() {
      return { args }
    },
    template: FieldsetWithMultipleInputsTplStr,
  }),
}
export const FieldsetWithMultipleInputs = {
  ...FieldsetWithMultipleInputsTemplate,
}
FieldsetWithMultipleInputs.args = {}

// LOGIN FORM

const LoginFormTemplate: Story = {
  render: (args: any) => ({
    components: { DuFieldset, DuInputField, DuButton },
    setup() {
      return { args }
    },
    template: LoginFormTplStr,
  }),
}
export const LoginForm = { ...LoginFormTemplate }
LoginForm.args = {} 