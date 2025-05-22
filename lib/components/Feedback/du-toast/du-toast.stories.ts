import type { Meta, StoryObj } from "@storybook/vue3";
import DuToast from "./du-toast.vue";
import DuAlert from "../du-alert/du-alert.vue";
import DuButton from "../../Actions/du-button/du-button.vue";
import { ref } from "vue";
import { DU_TOAST_HORIZONTAL_POSITIONS, DU_TOAST_VERTICAL_POSITIONS } from "./du-toast.types";

const meta: Meta<typeof DuToast> = {
  title: "Components/Feedback/Toast",
  component: DuToast,
  tags: ['autodocs'],
  argTypes: {
    horizontalPosition: {
      control: { type: "select" },
      options: [...DU_TOAST_HORIZONTAL_POSITIONS, undefined],
      description: "Horizontal position of the toast",
    },
    verticalPosition: {
      control: { type: "select" },
      options: [...DU_TOAST_VERTICAL_POSITIONS, undefined],
      description: "Vertical position of the toast",
    },
    to: {
      control: { type: "text" },
      description: "Element where the toast will be teleported to.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DuToast>;

const defaultTplStr = `
<div class="h-96 w-full relative">
  <DuToast v-bind="args">
    <DuAlert variant="info">
      <span>New message arrived.</span>
    </DuAlert>
  </DuToast>
</div>
`;

const positionsTplStr = `
<div class="grid grid-cols-3 h-96 w-full relative">
  <div>
    <DuToast horizontalPosition="start" verticalPosition="top">
      <DuAlert variant="info">
        <span>Top-Start</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="center" verticalPosition="top">
      <DuAlert variant="info">
        <span>Top-Center</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="end" verticalPosition="top">
      <DuAlert variant="info">
        <span>Top-End</span>
      </DuAlert>
    </DuToast>
  </div>
  
  <div>
    <DuToast horizontalPosition="start" verticalPosition="middle">
      <DuAlert variant="success">
        <span>Middle-Start</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="center" verticalPosition="middle">
      <DuAlert variant="success">
        <span>Middle-Center</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="end" verticalPosition="middle">
      <DuAlert variant="success">
        <span>Middle-End</span>
      </DuAlert>
    </DuToast>
  </div>
  
  <div>
    <DuToast horizontalPosition="start" verticalPosition="bottom">
      <DuAlert variant="warning">
        <span>Bottom-Start</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="center" verticalPosition="bottom">
      <DuAlert variant="warning">
        <span>Bottom-Center</span>
      </DuAlert>
    </DuToast>
  </div>
  <div>
    <DuToast horizontalPosition="end" verticalPosition="bottom">
      <DuAlert variant="warning">
        <span>Bottom-End</span>
      </DuAlert>
    </DuToast>
  </div>
</div>
`;

const multipleToastsTplStr = `
<div class="h-96 w-full relative">
  <DuToast horizontalPosition="end" verticalPosition="bottom">
    <DuAlert variant="info">
      <span>New message arrived.</span>
    </DuAlert>
    <DuAlert variant="success">
      <span>Your purchase has been confirmed.</span>
    </DuAlert>
    <DuAlert variant="warning">
      <span>Warning: Invalid email address!</span>
    </DuAlert>
  </DuToast>
</div>
`;

const interactiveToastTplStr = `
<div class="h-96 w-full relative">
  <DuToast horizontalPosition="end" verticalPosition="bottom" v-if="showToast">
    <DuAlert variant="success">
      <span>Your purchase has been confirmed.</span>
      <template #actions>
        <DuButton size="sm" variant="ghost" @click="showToast = false">Dismiss</DuButton>
      </template>
    </DuAlert>
  </DuToast>
  
  <div class="fixed bottom-4 left-4">
    <DuButton @click="showToast = true">Show Toast</DuButton>
  </div>
</div>
`;

const toastStylesTplStr = `
<div class="h-96 w-full relative">
  <DuToast horizontalPosition="end" verticalPosition="bottom">
    <DuAlert variant="info">
      <span>Default alert in toast</span>
    </DuAlert>
    <DuAlert variant="success" outline>
      <span>Outline success alert</span>
    </DuAlert>
    <DuAlert variant="warning" soft>
      <span>Soft warning alert</span>
    </DuAlert>
    <DuAlert variant="error" dash>
      <span>Dash error alert</span>
    </DuAlert>
  </DuToast>
</div>
`;

const TemplateToast: Story = {
  render: (args: any) => ({
    components: { DuToast, DuAlert },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
};
export const Default = { ...TemplateToast };

const ToastPositionsTemplate: Story = {
  render: () => ({
    components: { DuToast, DuAlert },
    template: positionsTplStr,
  }),
};
export const ToastPositions = { ...ToastPositionsTemplate };

const MultipleToastsTemplate: Story = {
  render: () => ({
    components: { DuToast, DuAlert },
    template: multipleToastsTplStr,
  }),
};
export const MultipleToasts = { ...MultipleToastsTemplate };

const ToastStylesTemplate: Story = {
  render: () => ({
    components: { DuToast, DuAlert },
    template: toastStylesTplStr,
  }),
};
export const ToastStyles = { ...ToastStylesTemplate };

const InteractiveToastTemplate: Story = {
  render: () => ({
    components: { DuToast, DuAlert, DuButton },
    setup() {
      const showToast = ref(true);
      return { showToast };
    },
    template: interactiveToastTplStr,
  }),
};
export const InteractiveToast = { ...InteractiveToastTemplate }; 