import type { Meta, StoryObj } from "@storybook/vue3";
import DuMenu from "./du-menu.vue";
import DuButton from "../../Actions/du-button/du-button.vue";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { DU_MENU_DIRECTIONS } from "./du-menu.types";

const meta: Meta<typeof DuMenu> = {
  title: "Components/Navigation/Menu",
  component: DuMenu,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of menu items with label, href, disabled, isTitle, and subItems properties',
    },
    direction: {
      control: { type: "select" },
      options: DU_MENU_DIRECTIONS,
    },
    ...useSizeStoriesControl,
    rounded: {
      control: { type: "boolean" },
    },
  },
  args: {
    direction: "default",
    size: "default",
    rounded: true,
  },
};

export default meta;

type Story = StoryObj<typeof DuMenu>;

// DEFAULT MENU (Manual mode)
const DefaultTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</DuMenu>`;

export const Default: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: DefaultTplStr,
  }),
};

// AUTOMATIC MODE WITH ITEMS
export const WithItems: Story = {
  args: {
    items: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact", disabled: true },
    ],
  },
};

// MENU WITH TITLES
export const WithTitles: Story = {
  args: {
    items: [
      { label: "Navigation", isTitle: true },
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Actions", isTitle: true },
      { label: "Contact", href: "#contact" },
      { label: "Login", href: "#login" },
    ],
  },
};

// MENU WITH SUBMENUS
export const WithSubMenus: Story = {
  args: {
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Products",
        href: "#products",
        subItems: [
          { label: "Web Design", href: "#web-design" },
          { label: "Mobile Apps", href: "#mobile-apps" },
          { label: "SEO", href: "#seo" },
        ],
      },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// RECURSIVE MENUS (Deep nesting)
export const RecursiveMenus: Story = {
  args: {
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Products",
        href: "#products",
        subItems: [
          { label: "Web Design", href: "#web-design" },
          {
            label: "Development",
            href: "#development",
            subItems: [
              { label: "Frontend", href: "#frontend" },
              {
                label: "Backend",
                href: "#backend",
                subItems: [
                  { label: "Node.js", href: "#nodejs" },
                  { label: "Python", href: "#python" },
                  { label: "PHP", href: "#php" },
                ],
              },
              { label: "Full Stack", href: "#fullstack" },
            ],
          },
          { label: "Mobile Apps", href: "#mobile-apps" },
        ],
      },
      { label: "About", href: "#about" },
    ],
  },
};

// MENU WITH TITLE AS PARENT
export const WithTitleAsParent: Story = {
  args: {
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Categories",
        isTitle: true,
        subItems: [
          { label: "Technology", href: "#technology" },
          { label: "Design", href: "#design" },
          { label: "Business", href: "#business" },
        ],
      },
      {
        label: "Services",
        isTitle: true,
        subItems: [
          { label: "Consulting", href: "#consulting" },
          { label: "Development", href: "#development" },
          { label: "Support", href: "#support" },
        ],
      },
    ],
  },
};

// COMPLEX MENU WITH MIXED CONTENT
export const ComplexMenu: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "Main Navigation", isTitle: true },
      {
        label: "Projects",
        href: "#projects",
        subItems: [
          { label: "Active Projects", href: "#active" },
          { label: "Archived", href: "#archived" },
          {
            label: "Categories",
            href: "#categories",
            subItems: [
              { label: "Web Development", href: "#web-dev" },
              { label: "Mobile Apps", href: "#mobile" },
              { label: "UI/UX Design", href: "#design" },
            ],
          },
        ],
      },
      {
        label: "Team",
        href: "#team",
        subItems: [
          { label: "Members", href: "#members" },
          { label: "Roles", href: "#roles" },
          { label: "Permissions", href: "#permissions", disabled: true },
        ],
      },
      { label: "Settings", isTitle: true },
      { label: "Profile", href: "#profile" },
      { label: "Preferences", href: "#preferences" },
      { label: "Logout", href: "#logout", disabled: true },
    ],
  },
};

// MENU SIZES
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

export const MenuSizes: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuSizesTplStr,
  }),
};

// MENU WITH CUSTOM SLOTS
const WithCustomSlotsTemplate = `
<div class="flex flex-col gap-2">
  <DuMenu :items="items" class="w-64">
    <template #title-0="{ item, index }">
      <li class="menu-title text-primary">
        <span class="badge badge-primary badge-sm">{{ index + 1 }}</span>
        {{ item.label }}
      </li>
    </template>
    <template #item-1="{ item, index }">
      <li>
        <a :href="item.href" class="flex items-center gap-2">
          <span class="badge badge-secondary badge-xs"></span>
          {{ item.label }}
        </a>
      </li>
    </template>
    <template #submenu-2="{ item, index }">
      <li>
        <details open>
          <summary class="font-semibold text-accent">{{ item.label }} (Custom)</summary>
          <ul>
            <li v-for="sub in item.subItems" :key="sub.label">
              <a :href="sub.href">{{ sub.label }}</a>
            </li>
          </ul>
        </details>
      </li>
    </template>
  </DuMenu>
</div>
`;

export const WithCustomSlots: Story = {
  render: (args: any) => ({
    components: { DuMenu, DuButton },
    setup() {
      const items = [
        { label: "Custom Title", isTitle: true },
        { label: "Custom Item", href: "#custom" },
        {
          label: "Custom Submenu",
          href: "#custom-sub",
          subItems: [
            { label: "Sub Item 1", href: "#sub1" },
            { label: "Sub Item 2", href: "#sub2" },
          ],
        },
        { label: "Normal Item", href: "#normal" },
      ];

      return { items };
    },
    template: WithCustomSlotsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: WithCustomSlotsTemplate,
        language: 'html',
      },
    },
  },
};

// MENU WITH GLOBAL SLOTS
const WithGlobalSlotsTemplate = `
<div class="flex flex-col gap-2">
  <DuMenu :items="items" class="w-64">
    <template #title="{ item, index }">
      <li class="menu-title flex items-center gap-2">
        <span class="badge badge-info badge-sm">{{ index + 1 }}</span>
        <span class="text-info">{{ item.label }}</span>
      </li>
    </template>
    <template #item="{ item, index }">
      <li :class="{ 'menu-disabled': item.disabled }">
        <a :href="item.href" class="flex items-center gap-2">
          <span class="w-2 h-2 bg-success rounded-full"></span>
          {{ item.label }}
          <span v-if="item.disabled" class="badge badge-error badge-xs">Disabled</span>
        </a>
      </li>
    </template>
    <template #submenu="{ item, index }">
      <li>
        <a :href="item.href" class="font-semibold text-warning">
          📁 {{ item.label }}
        </a>
        <ul>
          <li v-for="sub in item.subItems" :key="sub.label" :class="{ 'menu-disabled': sub.disabled }">
            <a :href="sub.href">{{ sub.label }}</a>
          </li>
        </ul>
      </li>
    </template>
  </DuMenu>
</div>
`;

export const WithGlobalSlots: Story = {
  render: (args: any) => ({
    components: { DuMenu, DuButton },
    setup() {
      const items = [
        { label: "Navigation", isTitle: true },
        { label: "Dashboard", href: "#dashboard" },
        { label: "Disabled Item", href: "#disabled", disabled: true },
        {
          label: "Projects",
          href: "#projects",
          subItems: [
            { label: "Active", href: "#active" },
            { label: "Archived", href: "#archived" },
            { label: "Drafts", href: "#drafts", disabled: true },
          ],
        },
        { label: "Settings", isTitle: true },
        { label: "Profile", href: "#profile" },
      ];

      return { items };
    },
    template: WithGlobalSlotsTemplate,
  }),
  parameters: {
    docs: {
      source: {
        code: WithGlobalSlotsTemplate,
        language: 'html',
      },
    },
  },
};

// HORIZONTAL MENU
export const HorizontalMenu: Story = {
  args: {
    direction: "horizontal",
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Products",
        href: "#products",
        subItems: [
          { label: "Web Design", href: "#web-design" },
          { label: "Mobile Apps", href: "#mobile-apps" },
        ],
      },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// VERTICAL MENU
export const VerticalMenu: Story = {
  args: {
    direction: "vertical",
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Products",
        href: "#products",
        subItems: [
          { label: "Web Design", href: "#web-design" },
          { label: "Mobile Apps", href: "#mobile-apps" },
        ],
      },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// RESPONSIVE MENU
export const ResponsiveMenu: Story = {
  args: {
    direction: "responsive",
    items: [
      { label: "Home", href: "#home" },
      {
        label: "Products",
        href: "#products",
        subItems: [
          { label: "Web Design", href: "#web-design" },
          { label: "Mobile Apps", href: "#mobile-apps" },
        ],
      },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// MENU WITH DISABLED ITEMS (Manual mode)
const MenuWithDisabledItemsTplStr = `
<DuMenu v-bind="args" class="w-56">
  <li><a>Enabled item</a></li>
  <li class="menu-disabled"><a>disabled item</a></li>
  <li class="menu-disabled"><a>disabled item</a></li>
</DuMenu>`;

export const MenuWithDisabledItems: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: MenuWithDisabledItemsTplStr,
  }),
};

// COLLAPSIBLE SUBMENU (Manual mode)
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
            <summary>Nested Parent</summary>
            <ul>
              <li><a>Deep Submenu 1</a></li>
              <li><a>Deep Submenu 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><a>Item 3</a></li>
</DuMenu>
`;

export const CollapsibleSubMenu: Story = {
  render: (args: any) => ({
    components: { DuMenu },
    setup() {
      return { args };
    },
    template: CollapsibleSubMenuTplStr,
  }),
};