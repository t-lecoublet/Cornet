import type { Meta, StoryObj } from '@storybook/vue3'
import DuCard from './du-card.vue'
import DuButton from '../../../components/Actions/du-button/du-button.vue'
import DuBadge from '../../../components/DataDisplay/du-badge/du-badge.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'

const meta: Meta<typeof DuCard> = {
  title: 'Components/DataDisplay/Card',
  component: DuCard,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl,
    bordered: { control: 'boolean' },
    dash: { control: 'boolean' },
    side: { control: 'boolean' },
    imageFull: { control: 'boolean' },
    responsive: { control: 'boolean' },
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DuCard>

const defaultTplStr = `
  <DuCard v-bind="args" class="w-96 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Titre de la carte</h2>
      <p>Si un poisson vivait sur terre, irait-il à la mer en vacances ?</p>
      <div class="card-actions justify-end">
        <DuButton variant="primary">Accepter</DuButton>
      </div>
    </div>
  </DuCard>
`

const cardWithSlotsTplStr = `
  <DuCard v-bind="args" class="w-96 bg-base-100 shadow-sm">
    <template #figure>
      <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    </template>
    <template #title>Titre avec slot</template>
    <p>Contenu de la carte utilisant des slots nommés.</p>
    <template #actions>
      <DuButton variant="primary" class="ml-auto">Action</DuButton>
    </template>
  </DuCard>
`

const cardWithPropTitleTplStr = `
  <DuCard v-bind="args" title="Titre via prop" class="w-96 bg-base-100 shadow-sm">
    <template #figure>
      <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    </template>
    <p>Cette carte utilise la prop title pour définir son titre.</p>
    <template #actions>
      <div class="justify-end flex w-full">
        <DuButton variant="primary">Action</DuButton>
      </div>
    </template>
  </DuCard>
`

const cardWithBodySlotTplStr = `
  <DuCard v-bind="args" class="w-96 bg-base-100 shadow-sm">
    <template #figure>
      <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    </template>
    <template #body>
      <div class="card-body">
        <h2 class="card-title">Titre personnalisé</h2>
        <p>Cette carte utilise le slot body pour un contrôle total du contenu.</p>
        <div class="card-actions justify-end">
          <DuButton variant="primary">Action personnalisée</DuButton>
        </div>
      </div>
    </template>
  </DuCard>
`

// CARD

const TemplateCard: Story = {
  render: (args: any) => ({
    components: { DuCard, DuButton, DuBadge },
    setup() {
      return { args }
    },
    template: defaultTplStr,
  }),
  args: {},
}
export const DefaultCard = { ...TemplateCard }
DefaultCard.args = {}

// CARD WITH SLOTS

const CardWithSlotsTemplate: Story = {
  render: (args: any) => ({
    components: { DuCard, DuButton },
    setup() {
      return { args }
    },
    template: cardWithSlotsTplStr,
  }),
  args: {},
}
export const CardWithSlots = { ...CardWithSlotsTemplate }
CardWithSlots.args = {}

// CARD WITH TITLE PROP

const CardWithPropTitleTemplate: Story = {
  render: (args: any) => ({
    components: { DuCard, DuButton },
    setup() {
      return { args }
    },
    template: cardWithPropTitleTplStr,
  }),
  args: {},
}
export const CardWithPropTitle = { ...CardWithPropTitleTemplate }
CardWithPropTitle.args = {} 