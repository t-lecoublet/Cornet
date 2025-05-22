import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import DuDock from "./du-dock.vue";
import { useSizeStoriesControl } from "../../../composables/useSizeProps";

const homeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>`;

const detailIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>`;

const chartIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>`;

const meta: Meta<typeof DuDock> = {
  title: "Components/Navigation/Dock",
  component: DuDock,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl,
    items: {
      control: "object",
      description: "Array of dock items with icon and label properties",
    },
  },
  args: {
    items: [
      {
        icon: homeIcon,
        label: "Home",
      },
      {
        icon: detailIcon,
        label: "Info",
      },
      {
        icon: chartIcon,
        label: "Stats",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcons: Story = {
  args: {
    items: [
      {
        label: "Home",
      },
      {
        label: "Info",
      },
      {
        label: "Stats",
      },
    ],
  },
};

export const WithoutLabels: Story = {
  args: {
    items: [
      {
        icon: homeIcon,
      },
      {
        icon: detailIcon,
      },
      {
        icon: chartIcon,
      },
    ],
  },
};
export const WithEmitExposedAndCustomProps: Story = {
  render: (args: any) => ({
    components: { DuDock },
    setup() {
      const myDock = ref(null);
      const items = [
        {
          icon: homeIcon,
          href: "/home",
          label: "Home",
        },
        {
          icon: detailIcon,
          href: "/info",
          label: "Info",
        },
        {
          icon: chartIcon,
          href: "/stats",
          label: "Stats",
        },
      ];
      args.items = items;
      return { args, myDock };
    },
    template: `
            <DuDock v-bind="args" ref="myDock" @change="onClick" />
            <div class="mt-4">
                <p class="text-sm text-gray-500">Dock exposed props:</p>
                <pre class="bg-gray-100 p-2 ring-1 ring-gray-200 rounded">{{ myDock }}</pre>
            </div>
            <div class="mt-4">
                <p class="text-sm text-gray-500">Clicked item (item.label from $emit):</p>
                <pre class="bg-gray-100 p-2 ring-1 ring-gray-200 rounded">{{ clickedItem }}</pre>
            </div>
        `,
    data() {
      return {
        clickedItem: null,
      };
    },
    methods: {
      onClick(item: any) {
        this.clickedItem = item.label;
      },
    },
  }),
};

export const WithClickEventAgrs: Story = {
  args: {
    items: [
      {
        icon: homeIcon,
        label: "Home",
        onClick: () => alert("Home clicked"),
      },
      {
        icon: detailIcon,
        label: "Info",
        onClick: () => alert("Info clicked"),
      },
      {
        icon: chartIcon,
        label: "Stats",
        onClick: () => alert("Stats clicked"),
      },
    ],
  },
};

export const WithCustomClass: Story = {
  args: {
    items: [
      {
        icon: homeIcon,
        label: "Home",
        class: "text-red-500",
      },
      {
        icon: detailIcon,
        label: "Info",
        class: "text-blue-500",
      },
      {
        icon: chartIcon,
        label: "Stats",
        class: "text-green-500",
      },
    ],
  },
};

export const ManualMode: Story = {
  render: (args: any) => ({
    components: { DuDock },
    setup() {
      return { args, homeIcon, detailIcon, chartIcon };
    },
    template: `
            <DuDock>
                <button class="dock-active">
                    <div v-html="homeIcon"></div>
                    <span class="dock-label">Home</span>
                </button>
                <button>
                    <div v-html="detailIcon"></div>
                    <span class="dock-label">Info</span>
                </button>
                <button>
                    <div v-html="chartIcon"></div>
                    <span class="dock-label">Stats</span>
                </button>
            </DuDock>
        `,
  }),
}; 