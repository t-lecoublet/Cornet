import type { Meta, StoryObj } from "@storybook/vue3";
import DuMenu from "./du-menu.vue";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { DU_MENU_DIRECTIONS } from "./du-menu.types";

const meta: Meta<typeof DuMenu> = {
  title: "Components/Navigation/Menu",
  component: DuMenu,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: DU_MENU_DIRECTIONS,
    },
    ...useSizeStoriesControl,
    rounded: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DuMenu>;

const DefaultTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</DuMenu>`;

const MenuSizesTplStr = `
<div class="flex flex-col gap-4">
  <DuMenu v-bind="args" class="w-56" size="xs">
    <li><a>Xsmall 1</a></li>
    <li><a>Xsmall 2</a></li>
  </DuMenu>
  <DuMenu v-bind="args" class="w-56" size="sm">
    <li><a>Small 1</a></li>
    <li><a>Small 2</a></li>
  </DuMenu>
  <DuMenu v-bind="args" class="w-56" size="md">
    <li><a>Medium 1</a></li>
    <li><a>Medium 2</a></li>
  </DuMenu>
  <DuMenu v-bind="args" class="w-56" size="lg">
    <li><a>Large 1</a></li>
    <li><a>Large 2</a></li>
  </DuMenu>
  <DuMenu v-bind="args" class="w-56" size="xl">
    <li><a>Xlarge 1</a></li>
    <li><a>Xlarge 2</a></li>
  </DuMenu>
</div>`;

const MenuWithDisabledItemsTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a>Enabled item</a></li>
  <li class="menu-disabled"><a>disabled item</a></li>
  <li class="menu-disabled"><a>disabled item</a></li>
</DuMenu>`;

const MenuWithTitleTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li class="menu-title">Title</li>
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</DuMenu>`;

const MenuWithTitleAsParentTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li>
    <h2 class="menu-title">Title</h2>
    <ul>
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </li>
</DuMenu>
`;

const SubMenuTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a>Item 1</a></li>
  <li>
    <a>Parent</a>
    <ul>
      <li><a>Submenu 1</a></li>
      <li><a>Submenu 2</a></li>
      <li>
        <a>Parent</a>
        <ul>
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a>Item 3</a></li>
</DuMenu>
`;

const CollapsibleSubMenuTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a>Item 1</a></li>
  <li>
    <details open>
      <summary>Parent</summary>
      <ul>
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><a>Item 3</a></li>
</DuMenu>
`;

const CollapsibleSubMenuWithClassNamesTplStr = `
<div class="flex items-center justify-center gap-4 mt-8">
  <DuMenu v-bind="args" class="w-56">
    <li><a>Item 1</a></li>
    <li>
      <span class="menu-dropdown-toggle">Parent</span>
      <ul class="menu-dropdown">
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
      </ul>
    </li>
  </DuMenu>
  <DuMenu v-bind="args" class="w-56">
    <li><a>Item 1</a></li>
    <li>
      <span class="menu-dropdown-toggle menu-dropdown-show">Parent</span>
      <ul class="menu-dropdown menu-dropdown-show">
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
      </ul>
    </li>
  </DuMenu>
</div>
`;

// DEFAULT MENU
const TemplateMenu: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: DefaultTplStr,
  }),
};
export const Default = { ...TemplateMenu };

// MENU SIZES
const MenuSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuSizesTplStr,
  }),
};
export const MenuSizes = { ...MenuSizesTemplate };

// MENU WITH DISABLED ITEMS
const MenuWithDisabledItemsTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuWithDisabledItemsTplStr,
  }),
};
export const MenuWithDisabledItems = { ...MenuWithDisabledItemsTemplate };

// MENU WITH TITLE
const MenuWithTitleTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuWithTitleTplStr,
  }),
};
export const MenuWithTitle = { ...MenuWithTitleTemplate };

// MENU WITH TITLE AS PARENT
const MenuWithTitleAsParentTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuWithTitleAsParentTplStr,
  }),
};
export const MenuWithTitleAsParent = { ...MenuWithTitleAsParentTemplate };

// SUBMENU
const SubMenuTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: SubMenuTplStr,
  }),
};
export const SubMenu = { ...SubMenuTemplate };

// COLLAPSIBLE SUBMENU
const CollapsibleSubMenuTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: CollapsibleSubMenuTplStr,
  }),
};
export const CollapsibleSubMenu = { ...CollapsibleSubMenuTemplate };

// COLLAPSIBLE SUBMENU WITH CLASSNAMES
const CollapsibleSubMenuWithClassNamesTemplate: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: CollapsibleSubMenuWithClassNamesTplStr,
  }),
};
export const CollapsibleSubMenuWithClassNames = { ...CollapsibleSubMenuWithClassNamesTemplate };

// HORIZONTAL MENU
export const HorizontalMenu = { ...TemplateMenu };
HorizontalMenu.args = { direction: "horizontal" };

// VERTICAL MENU
export const VerticalMenu = { ...TemplateMenu };
VerticalMenu.args = { direction: "vertical" };

// RESPONSIVE MENU
export const ResponsiveMenu = { ...TemplateMenu };
ResponsiveMenu.args = { direction: "responsive" }; 