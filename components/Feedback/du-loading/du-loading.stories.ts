import type { Meta, StoryObj } from "@storybook/vue3";
import DuLoading from "./du-loading.vue";
import { useVariantStoriesControl } from "../../../composables/useVariantProps";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { DU_LOADING_ANIMATIONS } from "./du-loading.types";

const meta: Meta<typeof DuLoading> = {
  title: "Components/Feedback/Loading",
  component: DuLoading,
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: { type: "select" },
      options: DU_LOADING_ANIMATIONS,
    },
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
  },
};

export default meta;

type Story = StoryObj<typeof DuLoading>;

const defaultTplStr = `
<div class="flex gap-2 items-center">
  <DuLoading v-bind="args" size="xs" />
  <DuLoading v-bind="args" size="sm" />
  <DuLoading v-bind="args" size="md" />
  <DuLoading v-bind="args" size="lg" />
  <DuLoading v-bind="args" size="xl" />
</div>
`;
const defaultColorsTplStr = `
<div class="flex gap-2 items-center">
    <DuLoading v-bind="args" variant="primary" />
    <DuLoading v-bind="args" variant="secondary" />
    <DuLoading v-bind="args" variant="accent" />
    <DuLoading v-bind="args" variant="neutral" />
    <DuLoading v-bind="args" variant="info" />
    <DuLoading v-bind="args" variant="success" />
    <DuLoading v-bind="args" variant="warning" />
    <DuLoading v-bind="args" variant="error" />
</div>
`;

// LOADING SPINNER

const TemplateLoading: Story = {
  render: (args: any) => ({
    components: { DuLoading },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
  args: {},
};
export const SpinnerLoading = { ...TemplateLoading };
SpinnerLoading.args = {
  animation: "spinner",
};

// LOADING DOTS

export const DotsLoading = { ...TemplateLoading };
DotsLoading.args = {
  animation: "dots",
};

// LOADING RING

export const RingLoading = { ...TemplateLoading };
RingLoading.args = {
  animation: "ring",
};

// LOADING BALL

export const BallLoading = { ...TemplateLoading };
BallLoading.args = {
  animation: "ball",
};

// LOADING BARS

export const BarsLoading = { ...TemplateLoading };
BarsLoading.args = {
  animation: "bars",
};

// LOADING INFINITY

export const InfinityLoading = { ...TemplateLoading };
InfinityLoading.args = {
  animation: "infinity",
};

// LOADING WITH COLORS

const LoadingWithColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuLoading },
    setup() {
      return { args };
    },
    template: defaultColorsTplStr,
  }),
};
export const LoadingWithColors = { ...LoadingWithColorsTemplate };
LoadingWithColors.args = {}; 