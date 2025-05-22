import type { Meta, StoryObj } from "@storybook/vue3"
import DuTextArea from "./du-text-area.vue"
import { useVariantStoriesControl } from "../../../composables/useVariantProps"
import { useSizeStoriesControl } from "../../../composables/useSizeProps"

const meta: Meta<typeof DuTextArea> = {
  title: "Components/DataInput/TextArea",
  component: DuTextArea,
  tags: ['autodocs'],
  argTypes: {
    ...useVariantStoriesControl,
    ...useSizeStoriesControl,
    modelValue: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    ghost: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof DuTextArea>

export const Default: Story = {
  args: {
    placeholder: "Entrez votre texte ici...",
  },
}

export const WithValue: Story = {
  args: {
    modelValue: "Ceci est un exemple de texte",
    placeholder: "Entrez votre texte ici...",
  },
}

export const Disabled: Story = {
  args: {
    modelValue: "Ce champ est désactivé",
    disabled: true,
  },
}

export const Ghost: Story = {
  args: {
    modelValue: "Style ghost",
    ghost: true,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { DuTextArea },
    template: `
      <div class="flex flex-col gap-4">
        <DuTextArea size="xs" placeholder="Taille xs" />
        <DuTextArea size="sm" placeholder="Taille sm" />
        <DuTextArea size="md" placeholder="Taille md" />
        <DuTextArea size="lg" placeholder="Taille lg" />
        <DuTextArea size="xl" placeholder="Taille xl" />
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { DuTextArea },
    template: `
      <div class="flex flex-col gap-4">
        <DuTextArea variant="neutral" placeholder="Neutral" />
        <DuTextArea variant="primary" placeholder="Primary" />
        <DuTextArea variant="secondary" placeholder="Secondary" />
        <DuTextArea variant="accent" placeholder="Accent" />
        <DuTextArea variant="info" placeholder="Info" />
        <DuTextArea variant="success" placeholder="Success" />
        <DuTextArea variant="warning" placeholder="Warning" />
        <DuTextArea variant="error" placeholder="Error" />
      </div>
    `,
  }),
} 