import type { Meta, StoryObj } from "@storybook/vue3";
import { useVariantStoriesControl } from "../../../composables/useVariantProps";
import DuLink from "./du-link.vue";

const meta: Meta<typeof DuLink> = {
  title: "Components/Navigation/Link",
  component: DuLink,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    onlyUnderlineOnHover: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DuLink>;

const defaultTplStr = `
<div class="flex gap-2 items-center">
  <DuLink v-bind="args" href="https://www.google.com">Click me</DuLink>
</div>
`;
const linkInParagraphTplStr = `
<div class="flex gap-2 items-center">
  <p>
    Tailwind CSS resets the style of links by default.
    <br />
    Add "link" class to make it look like a
    <DuLink v-bind="args" href="https://www.google.com">normal link</DuLink>
    again.
  </p>
</div>
`;
const colorsLinkTplStr = `
<div class="flex gap-2 items-center">
  <DuLink variant="primary" v-bind="args">Primary</DuLink>
  <DuLink variant="secondary" v-bind="args">Secondary</DuLink>
  <DuLink variant="accent" v-bind="args">Accent</DuLink>
  <DuLink variant="neutral" v-bind="args">Neutral</DuLink>
  <DuLink variant="info" v-bind="args">Info</DuLink>
  <DuLink variant="success" v-bind="args">Success</DuLink>
  <DuLink variant="warning" v-bind="args">Warning</DuLink>
  <DuLink variant="error" v-bind="args">Error</DuLink>
</div>`;

// DEFAULT LINK
const TemplateLink: Story = {
  render: (args: any) => ({
    components: { DuLink },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
};
export const DefaultLink = { ...TemplateLink };
DefaultLink.args = {};

// LINK IN PARAGRAPH
const LinkInParagraphTemplate: Story = {
  render: (args: any) => ({
    components: { DuLink },
    setup() {
      return { args };
    },
    template: linkInParagraphTplStr,
  }),
};
export const LinkInParagraph = { ...LinkInParagraphTemplate };
LinkInParagraph.args = {};

// COLOR LINKS
const ColorsLinkTemplate: Story = {
  render: (args: any) => ({
    components: { DuLink },
    setup() {
      return { args };
    },
    template: colorsLinkTplStr,
  }),
};
export const ColorsLink = { ...ColorsLinkTemplate };
ColorsLink.args = {};

// SHOW UNDERLINE ONLY ON HOVER
export const ShowUnderlineOnlyOnHover = { ...TemplateLink };
ShowUnderlineOnlyOnHover.args = {
  onlyUnderlineOnHover: true,
}; 