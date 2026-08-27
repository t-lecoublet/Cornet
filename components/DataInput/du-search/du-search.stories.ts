import type { ArgTypes, Meta, StoryObj } from "@storybook/vue3"
import DuSearch from "./du-search.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"
import { ref } from "vue"

const meta: Meta<typeof DuSearch> = {
  title: "Components/DataInput/Search",
  component: DuSearch,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl as ArgTypes,
    ...useSizeStoriesControl as ArgTypes,
    subSize: {
      control: { type: 'select' },
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the dropdown menu (defaults to size)',
    },
    creatable: { control: { type: "boolean" } },
    required: { control: { type: "boolean" } },
    multiple: { control: { type: "boolean" } },
    clearable: { control: { type: "boolean" }, description: "Permettre la déselection depuis le dropdown" },
    resultsLimit: { control: { type: "number" } },
    placeholder: { control: { type: "text" } },
    pattern: { control: { type: "text" } },
    type: { control: { type: "text" } },
    options: { control: { type: "object" } },
  },
  args: {
    creatable: false,
    required: false,
    multiple: false,
    resultsLimit: undefined,
    placeholder: "Rechercher...",
    type: "text",
    name: "search",
  },
}

export default meta

type Story = StoryObj<typeof DuSearch>

// DEFAULT SEARCH
export const Default: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValue?.name || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
      { id: 4, name: "Date" },
      { id: 5, name: "Elderberry" },
      { id: 6, name: "Fig" },
      { id: 7, name: "Grape" },
    ],
  },
}

// SEARCH WITH A CREATABLE ENTRY
export const Creatable: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValue?.name || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    creatable: true,
    options: [
      { id: 1, name: "React" },
      { id: 2, name: "Vue.js" },
      { id: 3, name: "Angular" },
      { id: 4, name: "Svelte" },
    ],
  },
}

// MULTIPLE SEARCH
export const Multiple: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValues = ref([])
      return { args, selectedValues }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValues" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValues.map(v => v.name).join(', ') || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    multiple: true,
    options: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Python" },
      { id: 4, name: "Java" },
      { id: 5, name: "C#" },
      { id: 6, name: "Ruby" },
      { id: 7, name: "Go" },
      { id: 8, name: "Rust" },
    ],
  },
}

// MULTIPLE SEARCH WITH ADD OPTION
export const MultipleCreatable: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValues = ref([])
      return { args, selectedValues }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValues" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValues.map(v => v.name).join(', ') || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    multiple: true,
    creatable: true,
    options: [
      { id: 1, name: "Red" },
      { id: 2, name: "Blue" },
      { id: 3, name: "Green" },
      { id: 4, name: "Yellow" },
    ],
  },
}

// SEARCH WITH LIMIT
export const ResultsLimit: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValue?.name || 'None' }}</div>
        <div class="text-xs text-gray-500">Limited to 3 results</div>
      </div>
    `,
  }),
  args: {
    resultsLimit: 3,
    options: [
      { id: 1, name: "Afghanistan" },
      { id: 2, name: "Albania" },
      { id: 3, name: "Algeria" },
      { id: 4, name: "Andorra" },
      { id: 5, name: "Angola" },
      { id: 6, name: "Argentina" },
      { id: 7, name: "Armenia" },
      { id: 8, name: "Australia" },
      { id: 9, name: "Austria" },
      { id: 10, name: "Azerbaijan" },
    ],
  },
}

// SIZES
export const Sizes: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" size="xs" placeholder="Extra Small" />
        <DuSearch v-model="selectedValue" v-bind="args" size="sm" placeholder="Small" />
        <DuSearch v-model="selectedValue" v-bind="args" size="md" placeholder="Medium" />
        <DuSearch v-model="selectedValue" v-bind="args" size="lg" placeholder="Large" />
        <DuSearch v-model="selectedValue" v-bind="args" size="xl" placeholder="Extra Large" />
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
  },
}

// SUBSIZE (MENU SIZE)
export const SubSize: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-6 w-72">
        <div>
          <div class="text-xs text-gray-500 mb-1">Large input, small menu</div>
          <DuSearch v-model="selectedValue" v-bind="args" size="lg" subSize="sm" placeholder="Large input" />
        </div>
        <div>
          <div class="text-xs text-gray-500 mb-1">Small input, large menu</div>
          <DuSearch v-model="selectedValue" v-bind="args" size="sm" subSize="lg" placeholder="Small input" />
        </div>
        <div>
          <div class="text-xs text-gray-500 mb-1">Medium input, xs menu</div>
          <DuSearch v-model="selectedValue" v-bind="args" size="md" subSize="xs" placeholder="Medium input" />
        </div>
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
      { id: 4, name: "Option 4" },
    ],
  },
}

// VARIANTS
export const Variants: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" variant="primary" placeholder="Primary" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="secondary" placeholder="Secondary" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="accent" placeholder="Accent" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="info" placeholder="Info" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="success" placeholder="Success" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="warning" placeholder="Warning" />
        <DuSearch v-model="selectedValue" v-bind="args" variant="error" placeholder="Error" />
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
  },
}

// GHOST
export const Ghost: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" ghost placeholder="Ghost search" />
        <DuSearch v-model="selectedValue" v-bind="args" placeholder="Normal search" />
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
  },
}

// CLEARABLE
export const Clearable: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValue?.name || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    clearable: true,
    options: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
      { id: 4, name: "Date" },
    ],
  },
}

// CLEARABLE MULTIPLE
export const ClearableMultiple: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValues = ref([])
      return { args, selectedValues }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValues" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValues.map(v => v.name).join(', ') || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    multiple: true,
    clearable: true,
    options: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Python" },
      { id: 4, name: "Go" },
    ],
  },
}

// DISABLED
export const Disabled: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" disabled placeholder="Disabled search" />
        <DuSearch v-model="selectedValue" v-bind="args" placeholder="Enabled search" />
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
  },
}
const fruits = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Date" },
]

// READ-ONLY: focusable and readable, but the dropdown never opens.
export const Readonly: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(fruits[1])
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" readonly />
      </div>
    `,
  }),
  args: { options: fruits },
}

// SERVER-SIDE SEARCH: the parent answers `query`, the component stops filtering.
export const ExternalFilter: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      const results = ref(fruits)
      const onQuery = (query: string) => {
        // Stands in for a request: the component renders whatever comes back.
        results.value = query === ""
          ? fruits
          : fruits.filter((fruit) => fruit.name.toLowerCase().includes(query.toLowerCase())).reverse()
      }
      return { args, selectedValue, results, onQuery }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" :options="results" external-filter @query="onQuery" />
        <div class="text-sm">Selected: {{ selectedValue?.name || 'None' }}</div>
      </div>
    `,
  }),
  args: { placeholder: "Search the server..." },
}

// COMMIT ON CLOSE: what happens to text left in the field when it closes.
export const CommitOnClose: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const none = ref(null)
      const match = ref(null)
      const auto = ref(null)
      return { args, none, match, auto }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <div>
          <div class="text-xs mb-1">none — the text is dropped</div>
          <DuSearch v-model="none" v-bind="args" commit-on-close="none" />
        </div>
        <div>
          <div class="text-xs mb-1">match — an exact label is selected</div>
          <DuSearch v-model="match" v-bind="args" commit-on-close="match" />
        </div>
        <div>
          <div class="text-xs mb-1">auto — exact match, else the new option is created</div>
          <DuSearch v-model="auto" v-bind="args" commit-on-close="auto" creatable />
        </div>
      </div>
    `,
  }),
  args: { options: fruits, placeholder: "Type, then click away" },
}

// DISABLED OPTIONS: `option.disabled`, or your own `optionDisabled` predicate.
export const DisabledOptions: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const selectedValue = ref(null)
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSearch v-model="selectedValue" v-bind="args" />
      </div>
    `,
  }),
  args: {
    options: [
      { id: 1, name: "Available" },
      { id: 2, name: "Out of stock", disabled: true },
      { id: 3, name: "Available too" },
    ],
  },
}

// TOP LAYER: the dropdown escapes an `overflow: hidden` ancestor.
export const PopoverInOverflow: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const clipped = ref(null)
      const topLayer = ref(null)
      return { args, clipped, topLayer }
    },
    template: `
      <div class="flex gap-8">
        <div class="w-72 h-24 overflow-hidden border border-base-300 rounded-box p-2">
          <div class="text-xs mb-1">Default: clipped by the parent</div>
          <DuSearch v-model="clipped" v-bind="args" />
        </div>
        <div class="w-72 h-24 overflow-hidden border border-base-300 rounded-box p-2">
          <div class="text-xs mb-1">popover: rendered in the top layer</div>
          <DuSearch v-model="topLayer" v-bind="args" popover />
        </div>
      </div>
    `,
  }),
  args: { options: fruits },
}

// VALIDATION: required and min/max selections feed the `error` slot.
export const Validation: Story = {
  render: (args: any) => ({
    components: { DuSearch },
    setup() {
      const required = ref(null)
      const twoToThree = ref([])
      return { args, required, twoToThree }
    },
    template: `
      <div class="flex flex-col gap-6 w-72">
        <DuSearch v-model="required" v-bind="args" required placeholder="Required — open then leave" />
        <DuSearch v-model="twoToThree" v-bind="args" multiple :min-selected="2" :max-selected="3"
          placeholder="Pick 2 to 3" />
      </div>
    `,
  }),
  args: { options: fruits },
}
