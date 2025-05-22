import type { Meta, StoryObj } from "@storybook/vue3";
import DuJoin from "./du-join.vue";
import DuButton from "../../Actions/du-button/du-button.vue";
import { DU_JOIN_DIRECTIONS } from "./du-join.types";

const meta: Meta<typeof DuJoin> = {
  title: "Components/Layout/Join",
  component: DuJoin,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: [...DU_JOIN_DIRECTIONS, undefined],
      description: "The direction of the join component",
    },
    as: {
      control: { type: "text" },
      description: "The HTML element to render the join component as",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DuJoin>;

const defaultTplStr = `
<DuJoin v-bind="args">
  <DuButton>Button 1</DuButton>
  <DuButton>Button 2</DuButton>
  <DuButton>Button 3</DuButton>
</DuJoin>
`;

const horizontalTplStr = `
<DuJoin direction="horizontal">
  <DuButton>Button 1</DuButton>
  <DuButton>Button 2</DuButton>
  <DuButton>Button 3</DuButton>
</DuJoin>
`;

const verticalTplStr = `
<DuJoin direction="vertical">
  <DuButton>Button 1</DuButton>
  <DuButton>Button 2</DuButton>
  <DuButton>Button 3</DuButton>
</DuJoin>
`;

const TemplateJoin: Story = {
  render: (args: any) => ({
    components: { DuJoin, DuButton },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
  args: {},
};
export const DefaultJoin = { ...TemplateJoin };

export const HorizontalJoin: Story = {
  render: () => ({
    components: { DuJoin, DuButton },
    template: horizontalTplStr,
  }),
};

export const VerticalJoin: Story = {
  render: () => ({
    components: { DuJoin, DuButton },
    template: verticalTplStr,
  }),
};

export const CustomElementJoin: Story = {
  ...TemplateJoin,
  args: {
    as: "section",
  },
}; 