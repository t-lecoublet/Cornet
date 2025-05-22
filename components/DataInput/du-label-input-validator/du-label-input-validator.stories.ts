import type { Meta, StoryObj } from "@storybook/vue3";
import DuLabelInputValidator from "./du-label-input-validator.vue";
import { h } from 'vue';

const UserIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
`
const UserIcon = {
  render() {
    return h('div', { innerHTML: UserIconSvg });
  }
};
const meta: Meta<typeof DuLabelInputValidator> = {
  title: "Components/DataInput/LabelInputValidator",
  component: DuLabelInputValidator,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

// Username text input with icon and validator
const UserNameTextInputWithIconAndValidatorTplStr = `
<DuLabelInputValidator 
  v-bind="args" 
  type="input" 
  pattern="[A-Za-z][A-Za-z0-9\\-]*"
  minlength="3"
  maxlength="30"
  placeholder="Username"
  required
  title="Only letters, numbers or dash"
>
  <template #before>
    <UserIcon class="h-[1em] opacity-50" />
  </template>
  <template #hint>
// USERNAME TEXT INPUT WITH ICON AND VALIDATOR
const UserNameTextInputWithIconAndValidatorTemplate: StoryObj = {
  render: (args: any) => ({
</DuLabelInputValidator>
`;

// USERNAME TEXT INPUT WITH ICON AND VALIDATOR
const UserNameTextInputWithIconAndValidatorTemplate: StoryObj = {
  render: (args) => ({
    components: { DuLabelInputValidator, UserIcon },
    setup() {
      return { args };
    },
    template: UserNameTextInputWithIconAndValidatorTplStr,
  }),
  // on indique ici les valeurs
  args: {},
};
export const UserNameTextInputWithIconAndValidator = {
  ...UserNameTextInputWithIconAndValidatorTemplate,
}; 