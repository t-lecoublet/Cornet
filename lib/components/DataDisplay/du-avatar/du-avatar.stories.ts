import type { Meta, StoryObj } from '@storybook/vue3'
import DuAvatar from './du-avatar.vue'

const meta: Meta<typeof DuAvatar> = {
  title: 'Components/DataDisplay/Avatar',
  component: DuAvatar,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof DuAvatar>

const defaultTplStr = `
  <DuAvatar v-bind="args">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
`
const AvatarInCustomSizesTplStr = `
<div class="flex items-center gap-4">
  <DuAvatar v-bind="args" size="xs">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
  <DuAvatar v-bind="args" size="sm">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
  <DuAvatar v-bind="args" size="md">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
  <DuAvatar v-bind="args" size="lg">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
  <DuAvatar v-bind="args" size="xl">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="" />
  </DuAvatar>
</div>`

// AVATAR

const TemplateAvatar: Story = {
  render: (args: any) => ({
    components: { DuAvatar },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  // on indique ici les valeurs
  args: {},
}
export const DefaultAvatar = { ...TemplateAvatar }
DefaultAvatar.args = {
  size: 'lg',
  rounded: 'rounded',
}

// CUSTOM SIZES AVATAR

const AvatarInCustomSizesTemplate: Story = {
  render: (args: any) => ({
    components: { DuAvatar },
    setup() {
      return { args }
    },
    template: AvatarInCustomSizesTplStr,
  }),
}
export const AvatarInCustomSizes = { ...AvatarInCustomSizesTemplate }
AvatarInCustomSizes.args = {
  rounded: 'rounded',
} 