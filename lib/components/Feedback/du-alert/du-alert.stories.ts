import type { Meta, StoryObj } from "@storybook/vue3";
import DuAlert from "./du-alert.vue";
import { DU_ALERT_VARIANTS, DU_ALERT_DIRECTIONS } from "./du-alert.types";

const meta: Meta<typeof DuAlert> = {
  title: "Components/Feedback/Alert",
  component: DuAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: DU_ALERT_VARIANTS,
    },
    direction: {
      control: { type: "select" },
      options: DU_ALERT_DIRECTIONS,
    },
    soft: { control: "boolean" },
    outline: { control: "boolean" },
    dash: { control: "boolean" },
    dismissible: { control: "boolean" },
    autoDismissible: { control: "boolean" },
    icon: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof DuAlert>;

const defaultTplStr = `
  <DuAlert v-bind="args">
    <span>
      <slot>
        <span>12 unread messages. Tap to see.</span>
      </slot>
    </span>
  </DuAlert>
`;
const combinedTplStr = `
  <div class="flex flex-col gap-4">
    <DuAlert v-bind="args" variant="info">
      <template v-slot:default>
        New software update available.
      </template>
    </DuAlert>
    <DuAlert v-bind="args" variant="success">
      <template v-slot:default>
        Your purchase has been confirmed!
      </template>
    </DuAlert>
    <DuAlert v-bind="args" variant="warning">
      <template v-slot:default>
        Warning: Invalid email address!
      </template>
    </DuAlert>
    <DuAlert v-bind="args" variant="error">
      <template v-slot:default>
        Error! Task failed successfully.
      </template>
    </DuAlert>
  </div>
`;
const withActionsTplStr = `
  <DuAlert v-bind="args" direction="responsive">
    <slot>
      Ceci est une alerte de type info.
    </slot>
    <template v-slot:actions>
      <div>
        <button class="btn btn-ghost btn-sm mr-2">Annuler</button>
        <button class="btn btn-neutral btn-sm">Confirmer</button>
      </div>
    </template>
  </DuAlert>
`;
const withTitleAndDescription = `
  <DuAlert v-bind="args" direction="responsive">
    <slot>
      <div>
        <h3 class="font-bold">New message!</h3>
        <div class="text-xs">You have 1 unread message</div>
      </div>
    </slot>
    <template v-slot:actions>
      <div>
        <button class="btn btn-sm">See</button>
      </div>
    </template>
  </DuAlert>
`;

// DEFAULT TEMPLATE

const TemplateAlert: Story = {
  render: (args: any) => ({
    components: { DuAlert },
    setup() {
      return { args };
    },
    template: defaultTplStr,
  }),
  // on indique ici les valeurs
  args: {},
};

export const DefaultAlert = { ...TemplateAlert };
DefaultAlert.args = {};

export const DismissibleAlert = { ...DefaultAlert };
DismissibleAlert.args = {
  dismissible: true,
};
export const AutoDismissibleAlert = { ...DefaultAlert };
AutoDismissibleAlert.args = {
  autoDismissible: true,
};

// MULTIPLE BUTTONS

const CombinedTemplateAlert: Story = {
  render: (args: any) => ({
    components: { DuAlert },
    setup() {
      return { args };
    },
    template: combinedTplStr,
  }),
  // on indique ici les valeurs
  args: {},
};
export const CombinedAlerts = { ...CombinedTemplateAlert };
export const SoftCombinedAlerts = { ...CombinedTemplateAlert };
SoftCombinedAlerts.args = { soft: true, icon: false };
export const OutlineCombinedAlerts = { ...CombinedTemplateAlert };
OutlineCombinedAlerts.args = { outline: true, icon: false };
export const DashCombinedAlerts = { ...CombinedTemplateAlert };
DashCombinedAlerts.args = { dash: true, icon: false };

// WITH ACTIONS BUTTONS

const WithActionsTemplateAlert: Story = {
  render: (args: any) => ({
    components: { DuAlert },
    setup() {
      return { args };
    },
    template: withActionsTplStr,
  }),
  // on indique ici les valeurs
  args: {},
};
export const DefaultResponsiveWithActions = { ...WithActionsTemplateAlert };

// WITH TITLE AND DESCRIPTION

const WithTitleAndDescTemplateAlert: Story = {
  render: (args: any) => ({
    components: { DuAlert },
    setup() {
      return { args };
    },
    template: withTitleAndDescription,
  }),
  // on indique ici les valeurs
  args: {},
};
export const DefaultWithTitleAndDescription = {
  ...WithTitleAndDescTemplateAlert,
}; 