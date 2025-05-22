import type { Meta, StoryObj } from "@storybook/vue3";
import DuBreadcrumbs from "./du-breadcrumbs.vue";

const meta: Meta<typeof DuBreadcrumbs> = {
  title: "Components/Navigation/Breadcrumbs",
  component: DuBreadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: "object",
      description: "List of breadcrumb items",
    },
    separator: {
      control: "text",
      description: "Separator between breadcrumb items",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DuBreadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/Products" },
      { label: "Details" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: "🏠" },
      { label: "Products", href: "/Products", icon: "📦" },
      { label: "Details", icon: "🔍" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/Products" },
      { label: "Details" },
    ],
    separator: "/",
  },
}; 