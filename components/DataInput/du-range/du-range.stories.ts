import type { Meta, StoryObj } from "@storybook/vue3"
import DuRange from "./du-range.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"
import { ref } from "vue"

const meta: Meta<typeof DuRange> = {
  title: "Components/DataInput/Range",
  component: DuRange,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    modelValue: { control: { type: "number" } },
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    disabled: { control: "boolean" },
  },
}

export default meta

type Story = StoryObj<typeof DuRange>

const defaultTplStr = `
  <div class="flex flex-col gap-4 w-80">
    <DuRange v-bind="args" v-model="rangeValue" />
    <div class="text-center">Value: {{ rangeValue }}</div>
  </div>
`

const RangeColorsTplStr = `
<div class="flex flex-col gap-6 w-80">
  <div class="flex flex-col gap-2">
    <span>Default</span>
    <DuRange v-model="values.default" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Primary</span>
    <DuRange variant="primary" v-model="values.primary" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Secondary</span>
    <DuRange variant="secondary" v-model="values.secondary" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Accent</span>
    <DuRange variant="accent" v-model="values.accent" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Info</span>
    <DuRange variant="info" v-model="values.info" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Success</span>
    <DuRange variant="success" v-model="values.success" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Warning</span>
    <DuRange variant="warning" v-model="values.warning" />
  </div>
  <div class="flex flex-col gap-2">
    <span>Error</span>
    <DuRange variant="error" v-model="values.error" />
  </div>
</div>
`

const RangeSizesTplStr = `
<div class="flex flex-col gap-6 w-80">
  <div class="flex flex-col gap-2">
    <span>XS</span>
    <DuRange size="xs" v-model="values.xs" />
  </div>
  <div class="flex flex-col gap-2">
    <span>SM</span>
    <DuRange size="sm" v-model="values.sm" />
  </div>
  <div class="flex flex-col gap-2">
    <span>MD</span>
    <DuRange size="md" v-model="values.md" />
  </div>
  <div class="flex flex-col gap-2">
    <span>LG</span>
    <DuRange size="lg" v-model="values.lg" />
  </div>
</div>
`

const DisabledRangeTplStr = `
<div class="flex flex-col gap-2 w-80">
  <span>Disabled Range</span>
  <DuRange disabled v-model="disabledValue" />
</div>
`

const SteppedRangeTplStr = `
<div class="flex flex-col gap-4 w-80">
  <DuRange :min="0" :max="100" :step="10" v-model="steppedValue" />
  <div class="text-center">Value: {{ steppedValue }} (step: 10)</div>
</div>
`

const TemplateRange: Story = {
  render: (args: any) => ({
    components: { DuRange },
    setup() {
      const rangeValue = ref(args.modelValue || 4)
      return { args, rangeValue }
    },
    template: defaultTplStr,
  }),
  args: {
    modelValue: 4,
    min: 0,
    max: 10,
    step: 1,
  },
}
export const Default = { ...TemplateRange }

const RangeColorsTemplate: Story = {
  render: () => ({
    components: { DuRange },
    setup() {
      const values = ref({
        default: 4,
        primary: 5,
        secondary: 6,
        accent: 7,
        info: 3,
        success: 8,
        warning: 2,
        error: 9,
      })
      return { values }
    },
    template: RangeColorsTplStr,
  }),
}
export const RangeColors = { ...RangeColorsTemplate }

const RangeSizesTemplate: Story = {
  render: () => ({
    components: { DuRange },
    setup() {
      const values = ref({
        xs: 3,
        sm: 4,
        md: 5,
        lg: 6,
      })
      return { values }
    },
    template: RangeSizesTplStr,
  }),
}
export const RangeSizes = { ...RangeSizesTemplate }

const DisabledRangeTemplate: Story = {
  render: () => ({
    components: { DuRange },
    setup() {
      const disabledValue = ref(5)
      return { disabledValue }
    },
    template: DisabledRangeTplStr,
  }),
}
export const DisabledRange = { ...DisabledRangeTemplate }

const SteppedRangeTemplate: Story = {
  render: () => ({
    components: { DuRange },
    setup() {
      const steppedValue = ref(50)
      return { steppedValue }
    },
    template: SteppedRangeTplStr,
  }),
}
export const SteppedRange = { ...SteppedRangeTemplate } 