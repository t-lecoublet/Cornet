import type { DocPageData } from '@/types/docs'

export default {
  title: 'Search',
  description: 'Search input with optional autocomplete suggestions. Supports single/multiple selection and adding new options.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/input/',
  props: [
    {
      title: 'modelValue',
      description: 'Selected value(s)',
      type: 'SearchOption | SearchOption[]',
    },
    {
      title: 'listValues',
      description: 'Array of options for autocomplete',
      type: 'SearchOption[]',
      required: true,
    },
    {
      title: 'placeholder',
      description: 'Placeholder text',
      type: 'string',
    },
    {
      title: 'limit',
      description: 'Maximum number of suggestions to show',
      type: 'number',
    },
    {
      title: 'addOption',
      description: 'Allow adding new options not in listValues',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'multiple',
      description: 'Allow selecting multiple values',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'size',
      description: 'Size of the search input',
      type: 'string',
      default: '"default"',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'variant',
      description: 'Color variant',
      type: 'string',
      options: ['default', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'ghost',
      description: 'Use ghost/transparent style',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the search input',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'id',
      description: 'ID for the input element',
      type: 'string',
    },
    {
      title: 'name',
      description: 'Name attribute for the input',
      type: 'string',
    },
    {
      title: 'type',
      description: 'Input type',
      type: 'string',
      default: '"text"',
    },
    {
      title: 'required',
      description: 'Mark as required field',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'pattern',
      description: 'Validation pattern',
      type: 'string',
    },
  ],
  slots: [
    {
      title: 'Slot #option',
      description: 'Custom display for dropdown options with slot props: option, index',
      preview: `<DuSearch
  name="search"
  id="search-option"
  :listValues="[
    { id: 1, name: 'Alice Martin' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]"
  placeholder="Search..."
  class="w-72"
>
  <template #option="{ option }">
    <span class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-base-300"></span>
      {{ option.name }}
    </span>
  </template>
</DuSearch>`,
      code: `<DuSearch v-model="selected" :listValues="listValues">
  <template #option="{ option, index }">
    <span class="text-primary">{{ option.name }}</span>
  </template>
</DuSearch>`,
    },
    {
      title: 'Slot #add-option',
      description: 'Custom display for the "add new option" item with slot props: query',
      preview: `<DuSearch
  name="search"
  id="search-add"
  :listValues="[
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]"
  :addOption="true"
  placeholder="Search or add..."
  class="w-72"
>
  <template #add-option="{ query }">
    <span class="flex items-center gap-2 text-success">
      <span>+</span>
      Add "{{ query }}"
    </span>
  </template>
</DuSearch>`,
      code: `<DuSearch v-model="selected" :listValues="listValues" :addOption="true">
  <template #add-option="{ query }">
    <span class="text-success">Add "{{ query }}"</span>
  </template>
</DuSearch>`,
    },
    {
      title: 'Slot #no-results',
      description: 'Content shown when no results match query',
      preview: `<DuSearch
  name="search"
  id="search-no-results"
  :listValues="[
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]"
  placeholder="Type something that doesn't match..."
  class="w-72"
>
  <template #no-results>
    <span class="text-error">No results found</span>
  </template>
</DuSearch>`,
      code: `<DuSearch v-model="selected" :listValues="listValues">
  <template #no-results>
    <span class="text-error">No results found</span>
  </template>
</DuSearch>`,
    },
  ],
  sections: [
    {
      title: 'Basic',
      preview: `<DuSearch name="search" id="search-input" placeholder="Search..." class="w-72" :listValues="[]" />`,
      code: `<DuSearch v-model="query" placeholder="Search..." />`,
    },
    {
      title: 'With autocomplete list',
      preview: `<DuSearch
  name="author"
  id="author-search"
  placeholder="Search author..."
  :listValues="[
    { id: 1, name: 'Alice Martin' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]"
  :limit="5"
  class="w-72"
/>`,
      code: `<DuSearch
  v-model="author"
  name="author"
  id="author-search"
  placeholder="Search author..."
  :listValues="[
    { id: 1, name: 'Alice Martin' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
  ]"
  :limit="5"
/>`,
    },
    {
      title: 'Variant and size',
      preview: `<DuSearch name="search" id="search-lg" variant="primary" size="lg" placeholder="Search..." class="w-72" :listValues="[]" />`,
      code: `<DuSearch v-model="query" variant="primary" size="lg" placeholder="Search..." />`,
    },
  ],
} satisfies DocPageData
