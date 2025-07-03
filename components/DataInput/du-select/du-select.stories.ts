import type { ArgTypes, Meta, StoryObj } from "@storybook/vue3"
import DuSelect from "./du-select.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"
import { ref } from "vue"

const meta: Meta<typeof DuSelect> = {
  title: "Components/DataInput/Select",
  component: DuSelect,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl as ArgTypes,
    ...useSizeStoriesControl as ArgTypes,
    ghost: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    multiple: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
  },
}

export default meta

type Story = StoryObj<typeof DuSelect>

const DefaultTplStr = `
<DuSelect v-bind="args">
  <li><a data-select-option value="crimson">Crimson</a></li>
  <li><a data-select-option value="amber">Amber</a></li>
  <li><a data-select-option value="velvet">Velvet</a></li>
</DuSelect>
`

const GhostSelectTplStr = `
<DuSelect ghost v-bind="args">
  <li><a data-select-option value="inter">Inter</a></li>
  <li><a data-select-option value="poppins">Poppins</a></li>
  <li><a data-select-option value="raleway">Raleway</a></li>
</DuSelect>
`

const SelectWithFieldsetTplStr = `
<fieldset class="fieldset">
  <legend class="fieldset-legend">Browsers</legend>
  <DuSelect v-bind="args" placeholder="Pick a browser">
    <li><a data-select-option value="chrome">Chrome</a></li>
    <li><a data-select-option value="firefox">FireFox</a></li>
    <li><a data-select-option value="safari">Safari</a></li>
  </DuSelect>
  <span class="fieldset-label">Optional</span>
</fieldset>
`

const ColorsSelectTplStr = `
<div class="flex flex-col gap-4">
  <DuSelect v-bind="args" variant="primary" placeholder="Pick a text editor">
    <li><a data-select-option value="vscode">VScode</a></li>
    <li><a data-select-option value="vscode-fork">VScode fork</a></li>
    <li><a data-select-option value="another-vscode-fork">Another VScode fork</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="secondary" placeholder="Pick a language">
    <li><a data-select-option value="zig">Zig</a></li>
    <li><a data-select-option value="go">Go</a></li>
    <li><a data-select-option value="rust">Rust</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="accent" placeholder="Color scheme">
    <li><a data-select-option value="light">Light mode</a></li>
    <li><a data-select-option value="dark">Dark mode</a></li>
    <li><a data-select-option value="system">System</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="neutral" placeholder="Server location">
    <li><a data-select-option value="north-america">North America</a></li>
    <li><a data-select-option value="eu-west">EU west</a></li>
    <li><a data-select-option value="sea">South East Asia</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="info" placeholder="Pick a Framework">
    <li><a data-select-option value="react">React</a></li>
    <li><a data-select-option value="vue">Vue</a></li>
    <li><a data-select-option value="angular">Angular</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="success" placeholder="Pick a Runtime">
    <li><a data-select-option value="npm">npm</a></li>
    <li><a data-select-option value="bun">Bun</a></li>
    <li><a data-select-option value="yarn">yarn</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="warning" placeholder="Pick an OS">
    <li><a data-select-option value="windows">Windows</a></li>
    <li><a data-select-option value="macos">MacOS</a></li>
    <li><a data-select-option value="linux">Linux</a></li>
  </DuSelect>
  <DuSelect v-bind="args" variant="error" placeholder="Pick an AI Model">
    <li><a data-select-option value="gpt4">GPT-4</a></li>
    <li><a data-select-option value="claude">Claude</a></li>
    <li><a data-select-option value="llama">Llama</a></li>
  </DuSelect>
</div>`

const SizesSelectTplStr = `
<div class="flex flex-col gap-4">
  <DuSelect v-bind="args" size="xs" placeholder="Xsmall">
    <li><a data-select-option value="apple-xs">Xsmall Apple</a></li>
    <li><a data-select-option value="orange-xs">Xsmall Orange</a></li>
    <li><a data-select-option value="tomato-xs">Xsmall Tomato</a></li>
  </DuSelect>
  <DuSelect v-bind="args" size="sm" placeholder="Small">
    <li><a data-select-option value="apple-sm">Small Apple</a></li>
    <li><a data-select-option value="orange-sm">Small Orange</a></li>
    <li><a data-select-option value="tomato-sm">Small Tomato</a></li>
  </DuSelect>
  <DuSelect v-bind="args" size="md" placeholder="Medium">
    <li><a data-select-option value="apple-md">Medium Apple</a></li>
    <li><a data-select-option value="orange-md">Medium Orange</a></li>
    <li><a data-select-option value="tomato-md">Medium Tomato</a></li>
  </DuSelect>
  <DuSelect v-bind="args" size="lg" placeholder="Large">
    <li><a data-select-option value="apple-lg">Large Apple</a></li>
    <li><a data-select-option value="orange-lg">Large Orange</a></li>
    <li><a data-select-option value="tomato-lg">Large Tomato</a></li>
  </DuSelect>
  <DuSelect v-bind="args" size="xl" placeholder="Xlarge">
    <li><a data-select-option value="apple-xl">Xlarge Apple</a></li>
    <li><a data-select-option value="orange-xl">Xlarge Orange</a></li>
    <li><a data-select-option value="tomato-xl">Xlarge Tomato</a></li>
  </DuSelect>
</div>
`

const DisabledSelectTplStr = `
<DuSelect disabled v-bind="args" placeholder="Disabled select">
  <li><a data-select-option value="option1">You can't touch this</a></li>
</DuSelect>`

const DisabledOptionTplStr = `
<DuSelect v-bind="args" placeholder="With disabled option">
  <li><a data-select-option value="option1">Option 1</a></li>
  <li class="menu-disabled"><a data-select-option value="option2">Option 2 (disabled)</a></li>
  <li><a data-select-option value="option3">Option 3</a></li>
</DuSelect>`

const MultipleSelectTplStr = `
<div class="flex flex-col gap-4 w-72">
  <DuSelect v-model="selectedValues" multiple placeholder="Select multiple items">
    <li><a data-select-option value="apple">Apple</a></li>
    <li><a data-select-option value="orange">Orange</a></li>
    <li><a data-select-option value="banana">Banana</a></li>
    <li><a data-select-option value="grape">Grape</a></li>
    <li><a data-select-option value="pear">Pear</a></li>
  </DuSelect>
  <div>Selected: {{ selectedValues.join(', ') }}</div>
</div>
`

// DEFAULT

const DefaultSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: DefaultTplStr,
  }),
  args: {
    placeholder: "Pick a color"
  },
}
export const DefaultSelect = { ...DefaultSelectTemplate }

// GHOST SELECT

const GhostSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: GhostSelectTplStr,
  }),
  args: {
    placeholder: "Pick a font"
  },
}
export const GhostSelect = { ...GhostSelectTemplate }

// SELECT WITH FIELDSET

const SelectWithFieldsetTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: SelectWithFieldsetTplStr,
  }),
}
export const SelectWithFieldset = { ...SelectWithFieldsetTemplate }

// COLORS SELECT

const ColorsSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: ColorsSelectTplStr,
  }),
}
export const ColorsSelect = { ...ColorsSelectTemplate }

// SIZES SELECT

const SizesSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: SizesSelectTplStr,
  }),
}
export const SizesSelect = { ...SizesSelectTemplate }

// DISABLED SELECT

const DisabledSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: DisabledSelectTplStr,
  }),
}
export const DisabledSelect = { ...DisabledSelectTemplate }

// DISABLED OPTION

const DisabledOptionTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: DisabledOptionTplStr,
  }),
}
export const DisabledOption = { ...DisabledOptionTemplate }

// MULTIPLE SELECT

const MultipleSelectTemplate: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      const selectedValues = ref<string[]>([])
      return { args, selectedValues }
    },
    template: MultipleSelectTplStr,
  }),
}
export const MultipleSelect = { ...MultipleSelectTemplate }