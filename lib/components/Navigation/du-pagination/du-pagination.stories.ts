import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import DuPagination from "./du-pagination.vue";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { useVariantStoriesControl } from "../../../composables/useVariantProps";

const meta: Meta<typeof DuPagination> = {
  title: "Components/Navigation/Pagination",
  component: DuPagination,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: "number" },
      description: "Current page",
    },
    total: {
      control: { type: "number" },
      description: "Total number of items",
    },
    perPage: {
      control: { type: "number" },
      description: "Number of items per page",
    },
    showNext: {
      control: { type: "boolean" },
      description: "Show next button",
    },
    showPrevious: {
      control: { type: "boolean" },
      description: "Show previous button",
    },
    showFirst: {
      control: { type: "boolean" },
      description: "Show first page button",
    },
    showLast: {
      control: { type: "boolean" },
      description: "Show last page button",
    },
    ...useSizeStoriesControl,
    nextLabel: {
      control: { type: "text" },
      description: "Next button label",
    },
    previousLabel: {
      control: { type: "text" },
      description: "Previous button label",
    },
    firstLabel: {
      control: { type: "text" },
      description: "First page button label",
    },
    lastLabel: {
      control: { type: "text" },
      description: "Last page button label",
    },
    ...useVariantStoriesControl,
    outline: {
      control: { type: "boolean" },
      description: "Outline style for buttons",
    },
    manual: {
      control: { type: "boolean" },
      description: "Manual mode (use custom slots)",
    },
    showEllipsis: {
      control: { type: "boolean" },
      description: "Show ellipsis between pages",
    },
    maxPages: {
      control: { type: "number" },
      description: "Maximum number of pages to display (0 for dynamic)",
    },
  },
  args: {
    total: 100,
    perPage: 10,
    showNext: true,
    showPrevious: true,
    showFirst: false,
    showLast: false,
    size: "default",
    nextLabel: ">",
    previousLabel: "<",
    firstLabel: "«",
    lastLabel: "»",
    variant: "default",
    outline: false,
    manual: false,
    showEllipsis: true,
    maxPages: 0,
  },
};

export default meta;
type Story = StoryObj<typeof DuPagination>;

export const Default: Story = {
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const WithoutNavigationButtons: Story = {
  args: {
    showNext: false,
    showPrevious: false,
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const WithFirstLastButtons: Story = {
  args: {
    showFirst: true,
    showLast: true,
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(5);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const ActivePage: Story = {
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(3);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const CustomLabels: Story = {
  args: {
    previousLabel: "Previous",
    nextLabel: "Next",
    showFirst: true,
    showLast: true,
    firstLabel: "First",
    lastLabel: "Last",
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(5);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const Primary: Story = {
  args: {
    variant: "accent",
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const Outline: Story = {
  args: {
    outline: true,
    variant: "primary",
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const FixedSize: Story = {
  args: {
    showEllipsis: false,
    maxPages: 5,
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(3);
      return { args, page };
    },
    template: '<DuPagination v-model="page" v-bind="args" />',
  }),
};

export const Manual: Story = {
  args: {
    manual: true,
  },
  render: (args) => ({
    components: { DuPagination },
    setup() {
      const page = ref(1);

      function changePage(newPage: number) {
        page.value = newPage;
      }

      return { args, page, changePage };
    },
    template: `
      <DuPagination v-model="page" v-bind="args">
        <button class="join-item btn btn-primary" @click="changePage(1)" :disabled="page <= 1">««</button>
        <button class="join-item btn btn-primary" @click="changePage(page - 1)" :disabled="page <= 1">«</button>
        <button class="join-item btn" :class="{ 'btn-active': page === 1 }" @click="changePage(1)">1</button>
        <button class="join-item btn" :class="{ 'btn-active': page === 2 }" @click="changePage(2)">2</button>
        <button class="join-item btn" :class="{ 'btn-active': page === 3 }" @click="changePage(3)">3</button>
        <button class="join-item btn btn-primary" @click="changePage(page + 1)" :disabled="page >= 3">»</button>
        <button class="join-item btn btn-primary" @click="changePage(3)" :disabled="page >= 3">»»</button>
      </DuPagination>
    `,
  }),
}; 