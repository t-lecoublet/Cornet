import type { Meta, StoryObj } from "@storybook/vue3";
import DuTooltip from "./du-tooltip.vue";
import DuAlert from "../du-alert/du-alert.vue";
import DuButton from "../../Actions/du-button/du-button.vue";
import { DU_TOOLTIP_POSITIONS } from "./du-tooltip.types";

const meta: Meta<typeof DuTooltip> = {
  title: "Components/Feedback/Tooltip",
  component: DuTooltip,
  tags: ['autodocs'],
  argTypes: {
    dataTip: {
      control: "text",
    },
    open: {
      control: "boolean",
    },
    position: {
      control: { type: "select" },
      options: DU_TOOLTIP_POSITIONS,
    },
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
    popover: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof DuTooltip>;

const DefaultTplStr = `
<div class="m-12">
  <DuTooltip v-bind="args" dataTip="Hello world">
    <DuButton>Hover me</DuButton>
  </DuTooltip>
</div>`;
const WithTooltipContentTplStr = `
<div class="m-12">
  <DuTooltip v-bind="args">
    <template #content>
      <div class="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">Wow!</div>
    </template>
    <DuButton>Hover me</DuButton>
  </DuTooltip>
</div>
`;
const ForceOpenTooltipTplStr = `
<div class="m-12">
  <DuTooltip :open="true" v-bind="args" dataTip="Hello world">
    <DuButton>Force open</DuButton>
  </DuTooltip>
</div>
`;
const TopTooltipTplStr = `
<div class="m-12">
  <DuTooltip v-bind="args" dataTip="Hello world" position="top" :open="true">
    <DuButton>Top</DuButton>
  </DuTooltip>
</div>
`;
const BottomTooltipTplStr = `
<div class="m-12">
  <DuTooltip v-bind="args" dataTip="Hello world" position="bottom" :open="true">
    <DuButton>Bottom</DuButton>
  </DuTooltip>
</div>`;
const LeftTooltipTplStr = `
<div class="m-12 ml-48">
  <DuTooltip v-bind="args" dataTip="Hello world" position="left" :open="true">
    <DuButton>Left</DuButton>
  </DuTooltip>
</div>`;
const RightTooltipTplStr = `
<div class="m-12">
  <DuTooltip v-bind="args" dataTip="Hello world" position="right" :open="true">
    <DuButton>Right</DuButton>
  </DuTooltip>
</div>
`;
const ColorsTooltipTplStr = `
<div class="m-16 flex gap-4">
  <DuTooltip v-bind="args" dataTip="neutral" variant="neutral" :open="true">
    <DuButton variant="neutral">neutral</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="primary" variant="primary" :open="true">
    <DuButton variant="primary">primary</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="secondary" variant="secondary" :open="true">
    <DuButton variant="secondary">secondary</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="accent" variant="accent" :open="true">
    <DuButton variant="accent">accent</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="info" variant="info" :open="true">
    <DuButton variant="info">info</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="success" variant="success" :open="true">
    <DuButton variant="success">success</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="warning" variant="warning" :open="true">
    <DuButton variant="warning">warning</DuButton>
  </DuTooltip>
  <DuTooltip v-bind="args" dataTip="error" variant="error" :open="true">
    <DuButton variant="error">error</DuButton>
  </DuTooltip>
</div>
`;

// DEFAULT TOOLTIP

const DefaultTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: DefaultTplStr,
  }),
  args: {},
};
export const DefaultTooltip = { ...DefaultTooltipTemplate };

// WITH TOOLTIP CONTENT

const WithTooltipContentTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton, DuAlert },
    setup() {
      return { args };
    },
    template: WithTooltipContentTplStr,
  }),
};
export const WithTooltipContent = { ...WithTooltipContentTemplate };

// FORCE OPEN

const ForceOpenTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: ForceOpenTooltipTplStr,
  }),
};
export const ForceOpenTooltip = { ...ForceOpenTooltipTemplate };

// TOP TOOLTIP

const TopTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: TopTooltipTplStr,
  }),
};
export const TopTooltip = { ...TopTooltipTemplate };

// BOTTOM TOOLTIP

const BottomTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: BottomTooltipTplStr,
  }),
};
export const BottomTooltip = { ...BottomTooltipTemplate };

// LEFT TOOLTIP

const LeftTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: LeftTooltipTplStr,
  }),
};
export const LeftTooltip = { ...LeftTooltipTemplate };

// RIGHT TOOLTIP

const RightTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: RightTooltipTplStr,
  }),
};
export const RightTooltip = { ...RightTooltipTemplate };

// COLORS TOOLTIP

const ColorsTooltipTemplate: Story = {
  render: (args: any) => ({
    components: { DuTooltip, DuButton },
    setup() {
      return { args };
    },
    template: ColorsTooltipTplStr,
  }),
};
export const ColorsTooltip = { ...ColorsTooltipTemplate };

/**
 * A tooltip has to be reachable and dismissable from the keyboard, not only
 * from the pointer (WCAG 1.4.13). Tab to the button: the tip appears at once,
 * with no delay to stutter through, and Escape dismisses it while focus stays
 * put. Moving the pointer onto the tip keeps it open, so its text can be
 * selected.
 */
const KeyboardTplStr = `
<div class="m-12 flex gap-4">
  <DuTooltip dataTip="Tab here, then press Escape">
    <DuButton>First</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="And here">
    <DuButton>Second</DuButton>
  </DuTooltip>
</div>`;

export const KeyboardAndEscape: Story = {
  render: () => ({
    components: { DuTooltip, DuButton },
    template: KeyboardTplStr,
  }),
  parameters: { docs: { source: { code: KeyboardTplStr.trim(), language: "html" } } },
};

/**
 * `openDelay` keeps a pointer merely crossing the trigger from flashing the
 * tip; `closeDelay` leaves it up long enough to move onto it.
 */
const DelaysTplStr = `
<div class="m-12 flex gap-4">
  <DuTooltip dataTip="Slow: 800ms" :openDelay="800">
    <DuButton>Patient</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Instant" :openDelay="0">
    <DuButton>Eager</DuButton>
  </DuTooltip>
</div>`;

export const Delays: Story = {
  render: () => ({
    components: { DuTooltip, DuButton },
    template: DelaysTplStr,
  }),
  parameters: { docs: { source: { code: DelaysTplStr.trim(), language: "html" } } },
};

/**
 * A tooltip inside `overflow: hidden` — a table cell, a card — is clipped by
 * its ancestor. `popover` renders the tip in the top layer instead, pinned to
 * the trigger with CSS anchor positioning.
 */
const ClippedTplStr = `
<div class="m-12 flex gap-8">
  <div class="overflow-hidden h-20 w-40 rounded-box border border-base-300 p-4">
    <DuTooltip dataTip="Clipped by the card" :open="true">
      <DuButton size="sm">Default</DuButton>
    </DuTooltip>
  </div>
  <div class="overflow-hidden h-20 w-40 rounded-box border border-base-300 p-4">
    <DuTooltip dataTip="Escapes the card" :open="true" popover>
      <DuButton size="sm">popover</DuButton>
    </DuTooltip>
  </div>
</div>`;

export const TooltipInOverflowHidden: Story = {
  render: () => ({
    components: { DuTooltip, DuButton },
    template: ClippedTplStr,
  }),
  parameters: { docs: { source: { code: ClippedTplStr.trim(), language: "html" } } },
};
