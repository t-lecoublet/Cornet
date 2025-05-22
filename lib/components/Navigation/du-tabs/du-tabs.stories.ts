import type { Meta, StoryObj } from "@storybook/vue3";
import DuTabs from "./du-tabs.vue";
import DuButton from "../../Actions/du-button/du-button.vue";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";
import { DU_TABS_TYPES } from "./du-tabs.types";

const meta: Meta<typeof DuTabs> = {
  title: "Components/Navigation/Tabs",
  component: DuTabs,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl,
    type: {
      control: { type: "select" },
      options: DU_TABS_TYPES,
      description: "Type of the tabs",
    },
    bottom: {
      control: { type: "boolean" },
      description: "Place tabs at bottom",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for radio inputs",
    },
    items: {
      control: "object",
      description: "Tab items configuration",
    },
  },
  args: {
    size: "default",
    type: undefined,
    bottom: false,
    name: "my_tabs",
  },
};

export default meta;
type Story = StoryObj<typeof DuTabs>;

export const Default: Story = {
  args: {
    items: [
      { label: "Tab 1", active: true },
      { label: "Tab 2" },
      { label: "Tab 3" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { 
        label: "Home", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>`, 
        class: "gap-2", 
        active: true 
      },
      { 
        label: "Light Mode", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>`, 
        class: "gap-2" 
      },
      { 
        label: "Dark Mode", 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>`, 
        class: "gap-2" 
      },
    ],
  },
};

export const Sizes: Story = {
  render: (args) => ({
    components: { DuTabs },
    setup() {
      const tabItems = [
        { label: "Tab 1", active: true },
        { label: "Tab 2" },
        { label: "Tab 3" },
      ];
      return { args, tabItems };
    },
    template: `
      <div class="flex flex-col gap-4">
        <div>
          <h3 class="text-sm font-medium mb-2">Extra Small (xs)</h3>
          <DuTabs :items="tabItems" size="xs" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Small (sm)</h3>
          <DuTabs :items="tabItems" size="sm" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Medium (md)</h3>
          <DuTabs :items="tabItems" size="md" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Large (lg)</h3>
          <DuTabs :items="tabItems" size="lg" />
        </div>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: (args) => ({
    components: { DuTabs },
    setup() {
      const tabItems = [
        { label: "Tab 1", active: true },
        { label: "Tab 2" },
        { label: "Tab 3" },
      ];
      return { args, tabItems };
    },
    template: `
      <div class="flex flex-col gap-8">
        <div>
          <h3 class="text-sm font-medium mb-2">Default</h3>
          <DuTabs :items="tabItems" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Lifted</h3>
          <DuTabs :items="tabItems" type="lift" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Bordered</h3>
          <DuTabs :items="tabItems" type="border" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Box</h3>
          <DuTabs :items="tabItems" type="box" />
        </div>
      </div>
    `,
  }),
};

export const BottomTabs: Story = {
  args: {
    items: [
      { label: "Tab 1", active: true },
      { label: "Tab 2" },
      { label: "Tab 3" },
    ],
    bottom: true,
  },
};

export const WithContent: Story = {
  args: {
    items: [
      {
        label: "Tab 1",
        active: true,
        content: "This is the content for Tab 1",
      },
      {
        label: "Tab 2",
        content: "This is the content for Tab 2",
      },
      {
        label: "Tab 3",
        content: "This is the content for Tab 3",
      },
    ],
    type: "border",
  },
};

export const WithCustomContent: Story = {
  render: (args) => ({
    components: { DuTabs, DuButton },
    setup() {
      const tabItems = [
        { label: "Tab 1", active: true, content: "Custom content for Tab 1" },
        { label: "Tab 2", content: "Custom content for Tab 2" },
        { label: "Tab 3", content: "Custom content for Tab 3" },
      ];
      return { args, tabItems };
    },
    template: `
      <DuTabs :items="tabItems" type="border">
        <template #content-0="{ item }">
          <div class="p-4 bg-blue-100 rounded">
            {{ item.content }}
            <DuButton variant="primary" size="xs">Button only in tab 1</DuButton>
          </div>
        </template>
        <template #content-1="{ item }">
          <div class="p-4 bg-green-100 rounded">
            {{ item.content }}
             No button here
          </div>
        </template>
        <template #content-2="{ item }">
          <div class="p-4 bg-red-100 rounded">
            Nothing here
          </div>
        </template>
      </DuTabs>
    `,
  }),
};

export const WithCustomMarkup: Story = {
  render: (args) => ({
    components: { DuTabs },
    template: `
      <DuTabs role="tablist">
        <a role="tab" class="tab">Tab 1</a>
        <a role="tab" class="tab tab-active">Tab 2</a>
        <a role="tab" class="tab">Tab 3</a>
      </DuTabs>
    `,
  }),
};

export const WithEvents: Story = {
  args: {
    items: [
      {
        label: "Tab 1",
        onClick: () => alert("Tab 1 clicked!"),
      },
      {
        label: "Tab 2",
        onClick: () => alert("Tab 2 clicked!"),
      },
      {
        label: "Tab 3",
        onClick: () => alert("Tab 3 clicked!"),
      },
    ],
  },
}; 