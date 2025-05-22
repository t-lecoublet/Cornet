import type { Meta, StoryObj } from "@storybook/vue3"
import DuInputField from "./du-input-field.vue"
import DuLabel from "../du-label/du-label.vue"
import DuKbd from "../../DataDisplay/du-kbd/du-kbd.vue"
import DuBadge from "../../DataDisplay/du-badge/du-badge.vue"
import DuFieldset from "../du-fieldset/du-fieldset.vue"

// Note: SearchIcon and FileIcon seraient à adapter avec les nouveaux composants d'icônes

const meta: Meta<typeof DuInputField> = {
  title: "Components/DataInput/InputField",
  component: DuInputField,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
  },
}

export default meta

type Story = StoryObj<typeof DuInputField>

const defaultTplStr = `
  <DuInputField placeholder="Type here" v-bind="args" />
`

const TextInputWithLabelInsideTplStr = `
<div class="flex flex-col gap-2">
  <DuLabel>
    <!-- Placeholder pour SearchIcon -->
    <span class="opacity-50">🔍</span>
    <DuInputField type="search" placeholder="Search" class="grow" v-bind="args" />
    <DuKbd>⌘</DuKbd>
    <DuKbd>K</DuKbd>
  </DuLabel>
  <DuLabel>
    <!-- Placeholder pour FileIcon -->
    <span class="opacity-50">📄</span>
    <DuInputField placeholder="index.php" class="grow" v-bind="args" />
  </DuLabel>
  <DuLabel>
    Path
    <DuInputField placeholder="src/app/" class="grow" v-bind="args" />
    <DuBadge variant="neutral" size="xs">Optional</DuBadge>
  </DuLabel>
</div>`

const WithFieldsetAndFieldsetLegendTplStr = `
<DuFieldset legend="What is your name?" label="optional">
  <DuInputField v-bind="args" />
</DuFieldset>
`

const ColorsInputTplStr = `
<div class="flex flex-col gap-4">
  <DuInputField placeholder="neutral" variant="neutral" v-bind="args" />
  <DuInputField placeholder="primary" variant="primary" v-bind="args" />
  <DuInputField placeholder="secondary" variant="secondary" v-bind="args" />
  <DuInputField placeholder="accent" variant="accent" v-bind="args" />
  
  <DuInputField placeholder="info" variant="info" v-bind="args" />
  <DuInputField placeholder="success" variant="success" v-bind="args" />
  <DuInputField placeholder="warning" variant="warning" v-bind="args" />
  <DuInputField placeholder="error" variant="error" v-bind="args" />
</div>`

const SizesInputTplStr = `
<div class="flex flex-col gap-4">
  <DuInputField placeholder="XSmall" size="xs" v-bind="args" />
  <DuInputField placeholder="Small" size="sm" v-bind="args" />
  <DuInputField placeholder="Medium" size="md" v-bind="args" />
  <DuInputField placeholder="Large" size="lg" v-bind="args" />
  <DuInputField placeholder="XLarge" size="xl" v-bind="args" />
</div>`

const DisabledInputTplStr = `
<DuInputField placeholder="You can't touch this" disabled v-bind="args" />`

const TextInputWithDataListSuggestionTplStr = `
<DuInputField 
  placeholder="Which browser do you use" 
  suggestion-name="browsers" 
  :suggestion-list="['Chrome', 'Firefox', 'Safari', 'Opera', 'Edge']" 
  v-bind="args" />`

// DEFAULT

const DefaultInputFieldTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const DefaultInputField = { ...DefaultInputFieldTemplate }

// TEXT INPUT WITH LABEL INSIDE
const TextInputWithLabelInsideTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField, DuLabel, DuKbd, DuBadge },
    setup() {
      return { args }
    },
    template: TextInputWithLabelInsideTplStr,
  }),
}
export const TextInputWithLabelInside = { ...TextInputWithLabelInsideTemplate }
TextInputWithLabelInside.args = {}

// GHOST STYLE

export const GhostStyle = { ...DefaultInputFieldTemplate }
GhostStyle.args = {
  ghost: true,
}

// WITH FIELDSET AND FIELDSET LEGEND

const WithFieldsetAndFieldsetLegendTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField, DuFieldset, DuLabel },
    setup() {
      return { args }
    },
    template: WithFieldsetAndFieldsetLegendTplStr,
  }),
}
export const WithFieldsetAndFieldsetLegend = {
  ...WithFieldsetAndFieldsetLegendTemplate,
}
WithFieldsetAndFieldsetLegend.args = {}

// COLORS INPUT

const ColorsInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField },
    setup() {
      return { args }
    },
    template: ColorsInputTplStr,
  }),
}
export const ColorsInput = { ...ColorsInputTemplate }
ColorsInput.args = {}

// SIZES INPUT

const SizesInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField },
    setup() {
      return { args }
    },
    template: SizesInputTplStr,
  }),
}
export const SizesInput = { ...SizesInputTemplate }
SizesInput.args = {}

// DISABLED INPUT

const DisabledInputTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField },
    setup() {
      return { args }
    },
    template: DisabledInputTplStr,
  }),
}
export const DisabledInput = { ...DisabledInputTemplate }
DisabledInput.args = {}

// TEXT INPUT WITH DATA LIST SUGGESTION

const TextInputWithDataListSuggestionTemplate: Story = {
  render: (args: any) => ({
    components: { DuInputField },
    setup() {
      return { args }
    },
    template: TextInputWithDataListSuggestionTplStr,
  }),
}
export const TextInputWithDataListSuggestion = {
  ...TextInputWithDataListSuggestionTemplate,
}
TextInputWithDataListSuggestion.args = {}

// DATE INPUT

export const DateInputField = {
  ...DefaultInputFieldTemplate,
}
DateInputField.args = {
  type: "date",
}

// TIME INPUT

export const TimeInputField = {
  ...DefaultInputFieldTemplate,
}
TimeInputField.args = {
  type: "time",
}

// DATA-TIME LOCAL INPUT

export const DateTimeLocalInputField = {
  ...DefaultInputFieldTemplate,
}
DateTimeLocalInputField.args = {
  type: "datetime-local",
} 