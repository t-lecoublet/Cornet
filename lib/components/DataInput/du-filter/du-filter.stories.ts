import type { Meta, StoryObj } from "@storybook/vue3";
import DuFilter from "./du-filter.vue";
import DuButton from "../../Actions/du-button/du-button.vue";

const meta: Meta<typeof DuFilter> = {
  title: "Components/DataInput/Filter",
  component: DuFilter,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: "object",
      description: "Array of filter items with title and checked properties",
    },
    name: {
      control: "text",
      description:
        "Name attribute for radio buttons (must be unique for each filter group)",
    },
    buttonsArgs: {
      control: "object",
      description: "Props to pass to the button components",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DuFilter>;

const defaultTplStr = `
<DuFilter v-bind="args" />
`;

const TemplateFilter: Story = {
  render: (args: any) => ({
    components: { DuFilter },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
  args: {
    items: [
      { title: "Web", checked: false },
      { title: "Mobile", checked: false },
      { title: "Desktop", checked: false },
    ],
  },
};
export const Default = { ...TemplateFilter };

const dynamicItemsTplStr = `
<DuFilter v-bind="args" />
`;

const DynamicItemsTemplate: Story = {
  render: (args: any) => ({
    components: { DuFilter },
    setup() {
      return { args };
    },
    template: dynamicItemsTplStr,
  }),
  args: {
    items: [
      { title: "New", checked: false, customClass: "btn-primary" },
      { title: "Popular", checked: false, customClass: "btn-secondary" },
      { title: "Trending", checked: false, customClass: "btn-accent" },
    ],
  },
};
export const DynamicItems = { ...DynamicItemsTemplate };

const manualModeTplStr = `
<DuFilter v-bind="args" name="category-filter">
  <DuButton ariaLabel="Products" />
  <DuButton ariaLabel="Services" />
  <DuButton ariaLabel="Articles" />
</DuFilter>
`;

const ManualModeTemplate: Story = {
  render: (args: any) => ({
    components: { DuFilter, DuButton },
    setup() {
      return { args };
    },
    template: manualModeTplStr,
  }),
  args: {},
};
export const ManualMode = { ...ManualModeTemplate };

const customStylesTplStr = `
<div>
  <h3 class="mb-2">Default style</h3>
  <DuFilter v-bind="args" name="style-filter-1" />

  <h3 class="mt-6 mb-2">Primary buttons</h3>
  <DuFilter v-bind="args" name="style-filter-2" :buttonsArgs="{ variant: 'primary' }" />

  <h3 class="mt-6 mb-2">Outlined buttons</h3>
  <DuFilter v-bind="args" name="style-filter-3" :buttonsArgs="{ outline: true }" />

  <h3 class="mt-6 mb-2">Size variants</h3>
  <DuFilter v-bind="args" name="style-filter-4" :buttonsArgs="{ size: 'xs' }" />
  <div class="mt-2">
    <DuFilter v-bind="args" name="style-filter-5" :buttonsArgs.size="{ size: 'lg' }" />
  </div>

  <h3 class="mt-6 mb-2">Custom styles</h3>
  <DuFilter name="style-filter-6" :buttonsArgs="{ variant: 'primary' }" >   
    <DuButton ariaLabel="Button 1" />
    <DuButton ariaLabel="Button custom" variant="error" dash size="xs" class="mt-2" />
    <DuButton ariaLabel="Button 3" />
  </DuFilter>

</div>
`;

const CustomStylesTemplate: Story = {
  render: (args: any) => ({
    components: { DuFilter, DuButton },
    setup() {
      return { args };
    },
    template: customStylesTplStr,
  }),
  args: {
    items: [
      { title: "Web", checked: false },
      { title: "Mobile", checked: false },
      { title: "Desktop", checked: false },
    ],
  },
};
export const CustomStyles = { ...CustomStylesTemplate }; 