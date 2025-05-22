import type { Meta, StoryObj } from "@storybook/vue3";
import { useVariantStoriesControl } from "../../../composables/useVariantProps";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import DuButtonLink from "./du-button-link.vue";

const meta: Meta<typeof DuButtonLink> = {
  title: "Components/Navigation/ButtonLink",
  component: DuButtonLink,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    outline: { control: "boolean" },
    soft: { control: "boolean" },
    dash: { control: "boolean" },
    active: { control: "boolean" },
    ghost: { control: "boolean" },
    link: { control: "boolean" },
    wide: { control: "boolean" },
    square: { control: "boolean" },
    circle: { control: "boolean" },
    block: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof DuButtonLink>;

const defaultTplStr = `
  <DuButtonLink v-bind="args">Default</DuButtonLink>
`;

const ButtonSizesTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink size="xs">Xsmall</DuButtonLink>
    <DuButtonLink size="sm">Small</DuButtonLink>
    <DuButtonLink>Medium</DuButtonLink>
    <DuButtonLink size="lg">Large</DuButtonLink>
    <DuButtonLink size="xl">Xlarge</DuButtonLink>
</div>`;

const ButtonColorsTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink variant="neutral" v-bind="args">Neutral</DuButtonLink>
    <DuButtonLink variant="primary" v-bind="args">Primary</DuButtonLink>
    <DuButtonLink variant="secondary" v-bind="args">Secondary</DuButtonLink>
    <DuButtonLink variant="accent" v-bind="args">Accent</DuButtonLink>
    <DuButtonLink variant="info" v-bind="args">Info</DuButtonLink>
    <DuButtonLink variant="success" v-bind="args">Success</DuButtonLink>
    <DuButtonLink variant="warning" v-bind="args">Warning</DuButtonLink>
    <DuButtonLink variant="error" v-bind="args">Error</DuButtonLink>
</div>
`;

const ButtonWithControlsTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink v-bind="args">Default</DuButtonLink>
    <DuButtonLink variant="primary" v-bind="args">Primary</DuButtonLink>
    <DuButtonLink variant="secondary" v-bind="args">Secondary</DuButtonLink>
    <DuButtonLink variant="accent" v-bind="args">Accent</DuButtonLink>
    <DuButtonLink variant="info" v-bind="args">Info</DuButtonLink>
    <DuButtonLink variant="success" v-bind="args">Success</DuButtonLink>
    <DuButtonLink variant="warning" v-bind="args">Warning</DuButtonLink>
    <DuButtonLink variant="error" v-bind="args">Error</DuButtonLink>
</div>
`;

const ButtonGhostAndButtonLinkTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink :ghost="true" v-bind="args">Ghost</DuButtonLink>
    <DuButtonLink :link="true" v-bind="args">Link</DuButtonLink>
</div>`;

const CircleButtonAndSquareButtonTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink :circle="true" v-bind="args">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    </DuButtonLink>
    <DuButtonLink :square="true" v-bind="args">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    </DuButtonLink>
</div>
`;

const ButtonWithIconTplStr = `
<div class="flex gap-2 items-center">
    <DuButtonLink>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
      Like
    </DuButtonLink>
    <DuButtonLink>
      Like
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    </DuButtonLink>
</div>`;

const ButtonBlockTplStr = `
  <DuButtonLink block v-bind="args">Block</DuButtonLink>
`;

const ButtonWithLoadingSpinnerTplStr = `
<div class="flex gap-2 items-center">
  <DuButtonLink :square="true" v-bind="args">
    <span class="loading loading-spinner"></span>
  </DuButtonLink>
  <DuButtonLink v-bind="args">
    <span class="loading loading-spinner"></span>
    loading
  </DuButtonLink>
</div>
`;

// BUTTON
const TemplateButton: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
  args: {},
};
export const DefaultButton = { ...TemplateButton };

// BUTTON SIZES
const ButtonSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonSizesTplStr,
  }),
};
export const ButtonSizes = { ...ButtonSizesTemplate };

// BUTTON COLORS
const ButtonColorsTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonColorsTplStr,
  }),
};
export const ButtonColors = { ...ButtonColorsTemplate };

// SOFT BUTTONS
const ButtonWithControlsTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonWithControlsTplStr,
  }),
};
export const SoftButtons = { ...ButtonWithControlsTemplate };
SoftButtons.args = { soft: true };

// OUTLINE BUTTONS
export const OutlineButtons = { ...ButtonWithControlsTemplate };
OutlineButtons.args = { outline: true };

// GHOST AND LINK BUTTONS
const ButtonGhostAndButtonLinkTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonGhostAndButtonLinkTplStr,
  }),
};
export const GhostAndLinkButtons = { ...ButtonGhostAndButtonLinkTemplate };

// CIRCLE AND SQUARE BUTTONS
const CircleButtonAndSquareButtonTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: CircleButtonAndSquareButtonTplStr,
  }),
};
export const CircleAndSquareButtons = { ...CircleButtonAndSquareButtonTemplate };

// BUTTON WITH ICON
const ButtonWithIconTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonWithIconTplStr,
  }),
};
export const ButtonWithIcon = { ...ButtonWithIconTemplate };

// BUTTON BLOCK
const ButtonBlockTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonBlockTplStr,
  }),
};
export const BlockButton = { ...ButtonBlockTemplate };

// LOADING BUTTON
const ButtonWithLoadingSpinnerTemplate: Story = {
  render: (args: any) => ({
    components: { DuButtonLink },
    setup() {
      return { args };
    },
    template: ButtonWithLoadingSpinnerTplStr,
  }),
};
export const LoadingButton = { ...ButtonWithLoadingSpinnerTemplate }; 