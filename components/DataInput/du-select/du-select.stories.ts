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
    search: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    searchPlaceholder: { control: { type: "text" } },
    options: { control: { type: "object" } },
  },
  args: {
    ghost: false,
    disabled: false,
    multiple: false,
    search: false,
    placeholder: "Sélectionnez...",
    searchPlaceholder: "Rechercher...",
  },
}

export default meta

type Story = StoryObj<typeof DuSelect>

// DEFAULT SELECT WITH OPTIONS
export const Default: Story = {
  args: {
    placeholder: "Pick a color",
    options: [
      { label: "Crimson", value: "crimson" },
      { label: "Amber", value: "amber" },
      { label: "Velvet", value: "velvet" },
    ],
  },
}

// SELECT WITH SEARCH
export const WithSearch: Story = {
  args: {
    placeholder: "Pick a framework",
    search: true,
    searchPlaceholder: "Search frameworks...",
    options: [
      { label: "React", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs" },
      { label: "Nuxt.js", value: "nuxtjs" },
      { label: "Solid.js", value: "solidjs" },
      { label: "Qwik", value: "qwik" },
    ],
  },
}

// MULTIPLE SELECT
export const Multiple: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      const selectedValues = ref<string[]>([])
      return { args, selectedValues }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSelect v-model="selectedValues" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValues.join(', ') || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    multiple: true,
    placeholder: "Select multiple fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Orange", value: "orange" },
      { label: "Banana", value: "banana" },
      { label: "Grape", value: "grape" },
      { label: "Pear", value: "pear" },
      { label: "Kiwi", value: "kiwi" },
    ],
  },
}

// MULTIPLE SELECT WITH SEARCH
export const MultipleWithSearch: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      const selectedValues = ref<string[]>(['react', 'vue'])
      return { args, selectedValues }
    },
    template: `
      <div class="flex flex-col gap-4 w-72">
        <DuSelect v-model="selectedValues" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValues.join(', ') || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    multiple: true,
    search: true,
    placeholder: "Select technologies",
    searchPlaceholder: "Search technologies...",
    options: [
      { label: "React", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
      { label: "TypeScript", value: "typescript" },
      { label: "JavaScript", value: "javascript" },
      { label: "Node.js", value: "nodejs" },
      { label: "Deno", value: "deno" },
      { label: "Bun", value: "bun" },
    ],
  },
}

// SELECT WITH GROUPS
export const WithGroups: Story = {
  args: {
    placeholder: "Pick a technology",
    search: true,
    searchPlaceholder: "Search technologies...",
    options: [
      {
        label: "Frontend Frameworks",
        options: [
          { label: "React", value: "react" },
          { label: "Vue.js", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ],
      },
      {
        label: "Backend Technologies",
        options: [
          { label: "Node.js", value: "nodejs" },
          { label: "Python", value: "python" },
          { label: "PHP", value: "php" },
          { label: "Ruby", value: "ruby" },
        ],
      },
      {
        label: "Databases",
        options: [
          { label: "PostgreSQL", value: "postgresql" },
          { label: "MongoDB", value: "mongodb" },
          { label: "Redis", value: "redis" },
          { label: "MySQL", value: "mysql" },
        ],
      },
    ],
  },
}

// SELECT WITH DISABLED OPTIONS
export const WithDisabledOptions: Story = {
  args: {
    placeholder: "Pick a browser",
    options: [
      { label: "Chrome", value: "chrome" },
      { label: "Firefox", value: "firefox" },
      { label: "Safari", value: "safari" },
      { label: "Edge", value: "edge", disabled: true },
      { label: "Internet Explorer", value: "ie", disabled: true },
    ],
  },
}

// GHOST SELECT
export const Ghost: Story = {
  args: {
    ghost: true,
    placeholder: "Pick a font",
    options: [
      { label: "Inter", value: "inter" },
      { label: "Poppins", value: "poppins" },
      { label: "Raleway", value: "raleway" },
    ],
  },
}

// DISABLED SELECT
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled select",
    options: [
      { label: "You can't touch this", value: "option1" },
    ],
  },
}

// SELECT VARIANTS
export const Variants: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-4">
        <DuSelect variant="primary" placeholder="Primary" :options="args.options" />
        <DuSelect variant="secondary" placeholder="Secondary" :options="args.options" />
        <DuSelect variant="accent" placeholder="Accent" :options="args.options" />
        <DuSelect variant="info" placeholder="Info" :options="args.options" />
        <DuSelect variant="success" placeholder="Success" :options="args.options" />
        <DuSelect variant="warning" placeholder="Warning" :options="args.options" />
        <DuSelect variant="error" placeholder="Error" :options="args.options" />
      </div>
    `,
  }),
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
}

// SELECT SIZES
export const Sizes: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-col gap-4">
        <DuSelect size="xs" placeholder="Extra Small" :options="args.options" />
        <DuSelect size="sm" placeholder="Small" :options="args.options" />
        <DuSelect size="md" placeholder="Medium" :options="args.options" />
        <DuSelect size="lg" placeholder="Large" :options="args.options" />
        <DuSelect size="xl" placeholder="Extra Large" :options="args.options" />
      </div>
    `,
  }),
  args: {
    options: [
      { label: "Apple", value: "apple" },
      { label: "Orange", value: "orange" },
      { label: "Banana", value: "banana" },
    ],
  },
}

// COMPLEX EXAMPLE WITH NESTED GROUPS AND SEARCH
export const ComplexExample: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      const selectedValue = ref('')
      return { args, selectedValue }
    },
    template: `
      <div class="flex flex-col gap-4 w-80">
        <DuSelect v-model="selectedValue" v-bind="args" />
        <div class="text-sm">Selected: {{ selectedValue || 'None' }}</div>
      </div>
    `,
  }),
  args: {
    search: true,
    placeholder: "Choose your development stack",
    searchPlaceholder: "Search technologies...",
    options: [
      {
        label: "Frontend",
        options: [
          { label: "React", value: "react" },
          { label: "Vue.js", value: "vue" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ],
      },
      {
        label: "Backend",
        options: [
          { label: "Node.js", value: "nodejs" },
          { label: "Python (Django)", value: "django" },
          { label: "Python (FastAPI)", value: "fastapi" },
          { label: "PHP (Laravel)", value: "laravel" },
          { label: "Ruby on Rails", value: "rails" },
          { label: "Java (Spring)", value: "spring" },
        ],
      },
      {
        label: "Databases",
        options: [
          { label: "PostgreSQL", value: "postgresql" },
          { label: "MongoDB", value: "mongodb" },
          { label: "Redis", value: "redis" },
          { label: "MySQL", value: "mysql" },
          { label: "SQLite", value: "sqlite", disabled: true },
        ],
      },
      {
        label: "Cloud Services",
        options: [
          { label: "AWS", value: "aws" },
          { label: "Google Cloud", value: "gcp" },
          { label: "Azure", value: "azure" },
          { label: "Vercel", value: "vercel" },
          { label: "Netlify", value: "netlify" },
        ],
      },
    ],
  },
}

// SELECT WITH FIELDSET (Legacy example adapted)
export const WithFieldset: Story = {
  render: (args: any) => ({
    components: { DuSelect },
    setup() {
      return { args }
    },
    template: `
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Browsers</legend>
        <DuSelect v-bind="args" />
        <span class="fieldset-label">Optional</span>
      </fieldset>
    `,
  }),
  args: {
    placeholder: "Pick a browser",
    options: [
      { label: "Chrome", value: "chrome" },
      { label: "Firefox", value: "firefox" },
      { label: "Safari", value: "safari" },
    ],
  },
}