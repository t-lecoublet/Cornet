import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import DuCard from './du-card.vue'
import DuButton from '../../../components/Actions/du-button/du-button.vue'
import DuBadge from '../../../components/DataDisplay/du-badge/du-badge.vue'
import { useSizeStoriesControl } from '../../../composables/useSizeProps'

const meta: Meta<typeof DuCard> = {
  title: 'Components/DataDisplay/Card',
  component: DuCard,
  tags: ['autodocs'],
  argTypes: {
    ...useSizeStoriesControl as ArgTypes,
    bordered: { 
      control: 'boolean',
      description: 'Adds a border to the card'
    },
    dash: { 
      control: 'boolean',
      description: 'Adds a dashed border style to the card'
    },
    side: { 
      control: 'boolean',
      description: 'Places card image to the side'
    },
    imageFull: { 
      control: 'boolean',
      description: 'Makes image cover the full card with content overlay'
    },
    responsive: { 
      control: 'boolean',
      description: 'Makes the card side layout only on large screens'
    },
    title: { 
      control: 'text',
      description: 'Sets the card title'
    },
  },
}

export default meta
type Story = StoryObj<typeof DuCard>

const defaultTplStr = `
<DuCard class="w-96 bg-base-100 shadow-sm">
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
<DuCard class="w-96 bg-base-100 shadow-sm">
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
<DuCard title="Titre via prop" class="w-96 bg-base-100 shadow-sm">
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
<DuCard class="w-96 bg-base-100 shadow-sm">
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

const cardSizesTplStr = `
<div class="flex flex-col gap-4 items-center">
  <DuCard size="xs" class="w-72 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte XS</h2>
      <p>Une carte avec la taille extra-small.</p>
    </div>
  </DuCard>
  
  <DuCard size="sm" class="w-80 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte SM</h2>
      <p>Une carte avec la taille small.</p>
    </div>
  </DuCard>
  
  <DuCard size="md" class="w-96 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte MD</h2>
      <p>Une carte avec la taille medium.</p>
    </div>
  </DuCard>
  
  <DuCard size="lg" class="w-full max-w-md bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte LG</h2>
      <p>Une carte avec la taille large.</p>
    </div>
  </DuCard>
</div>
`

const cardBorderedTplStr = `
<div class="flex gap-4 flex-wrap">
  <DuCard bordered class="w-80 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte avec bordure</h2>
      <p>Une carte avec une bordure pleine.</p>
    </div>
  </DuCard>
  
  <DuCard dash class="w-80 bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte avec bordure pointillée</h2>
      <p>Une carte avec une bordure en pointillés.</p>
    </div>
  </DuCard>
</div>
`

const cardSideTplStr = `
<div class="flex flex-col gap-4">
  <DuCard side class="w-full bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" class="w-48" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte avec image latérale</h2>
      <p>Cette carte place l'image sur le côté plutôt qu'en haut.</p>
      <div class="card-actions justify-end">
        <DuButton variant="primary">Action</DuButton>
      </div>
    </div>
  </DuCard>
  
  <DuCard responsive class="w-full bg-base-100 shadow-sm">
    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" class="w-48" /></figure>
    <div class="card-body">
      <h2 class="card-title">Carte responsive</h2>
      <p>Cette carte est verticale sur mobile et latérale sur desktop.</p>
      <div class="card-actions justify-end">
        <DuButton variant="primary">Action</DuButton>
      </div>
    </div>
  </DuCard>
</div>
`

const cardImageFullTplStr = `
<DuCard imageFull class="w-96 h-80 bg-base-100 shadow-sm">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Card Image" /></figure>
  <div class="card-body">
    <h2 class="card-title text-white">Carte avec image pleine</h2>
    <p class="text-white">Le contenu est affiché sur l'image qui couvre toute la carte.</p>
    <div class="card-actions justify-end">
      <DuButton>Voir plus</DuButton>
    </div>
  </div>
</DuCard>
`

// CARD DEFAULT
export const DefaultCard: Story = {
  render: (args) => ({
    components: { DuCard, DuButton, DuBadge },
    setup() {
      return { args }
    },
    template: `
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
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: defaultTplStr,
        language: 'html',
      },
    },
  },
}

// CARD WITH SLOTS
export const CardWithSlots: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardWithSlotsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardWithSlotsTplStr,
        language: 'html',
      },
    },
  },
}

// CARD WITH TITLE PROP
export const CardWithPropTitle: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardWithPropTitleTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardWithPropTitleTplStr,
        language: 'html',
      },
    },
  },
}

// CARD WITH BODY SLOT
export const CardWithBodySlot: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardWithBodySlotTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardWithBodySlotTplStr,
        language: 'html',
      },
    },
  },
}

// CARD SIZES
export const CardSizes: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardSizesTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardSizesTplStr,
        language: 'html',
      },
    },
  },
}

// CARD BORDERED
export const CardBordered: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardBorderedTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardBorderedTplStr,
        language: 'html',
      },
    },
  },
}

// CARD SIDE
export const CardSide: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardSideTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardSideTplStr,
        language: 'html',
      },
    },
  },
}

// CARD IMAGE FULL
export const CardImageFull: Story = {
  render: () => ({
    components: { DuCard, DuButton },
    setup() {
      return {}
    },
    template: cardImageFullTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: cardImageFullTplStr,
        language: 'html',
      },
    },
  },
}