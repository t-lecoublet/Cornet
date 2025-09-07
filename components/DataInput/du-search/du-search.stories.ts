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
    addOption: { control: { type: "boolean" } },
    required: { control: { type: "boolean" } },
    multiple: { control: { type: "boolean" } },
    limit: { control: { type: "number" } },
    placeholder: { control: { type: "text" } },
    pattern: { control: { type: "text" } },
    type: { control: { type: "text" } },
    listValues: { control: { type: "object" } },
  },
  args: {
    addOption: false,
    required: false,
    multiple: false,
    limit: undefined,
    placeholder: "Rechercher...",
    type: "text",
    name: "search",
    id: "search",
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
    listValues: [
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

// SEARCH WITH ADD OPTION
export const WithAddOption: Story = {
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
    addOption: true,
    listValues: [
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
    listValues: [
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
export const MultipleWithAddOption: Story = {
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
    addOption: true,
    listValues: [
      { id: 1, name: "Red" },
      { id: 2, name: "Blue" },
      { id: 3, name: "Green" },
      { id: 4, name: "Yellow" },
    ],
  },
}

// SEARCH WITH LIMIT
export const WithLimit: Story = {
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
    limit: 3,
    listValues: [
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
    listValues: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
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
    listValues: [
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
    listValues: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
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
    listValues: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
      { id: 3, name: "Option 3" },
    ],
  },
}