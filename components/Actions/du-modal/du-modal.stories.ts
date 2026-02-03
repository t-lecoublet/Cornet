import type { Meta, StoryObj } from '@storybook/vue3'
import DuModal from './du-modal.vue'
import DuButton from '../du-button/du-button.vue'
import { ref } from 'vue'

const meta: Meta<typeof DuModal> = {
  title: 'Components/Actions/Modal',
  component: DuModal,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    open: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    closeBackdrop: { control: 'boolean' },
    placement: {
      control: { type: 'select' },
      options: ['top', 'middle', 'bottom', 'start', 'end'],
    },
    classBox: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DuModal>

const defaultTplStr = `
<div>
  <DuButton @click="showModal">Open modal</DuButton>
  <DuModal ref="modalRef" v-bind="args">
    <h3 class="font-bold text-lg">Hi o/ !</h3>
    <p class="py-4">Press ESC key or backdrop to close</p>
  </DuModal>
</div>
`

const defaultSetupStr = `
<script setup>
const modalRef = ref(null)

const showModal = () => {
  if (modalRef.value) {
    modalRef.value.showModal()
  }
}
</script>
`

const withActionsTplStr = `
<div>
  <DuButton @click="modalRef.showModal()">Open modal with actions</DuButton>
  <DuModal ref="modalRef">
    <h3 class="font-bold text-lg">Confirmation</h3>
    <p class="py-4">Are you sure about that?</p>
    <template #actions>
        <DuButton @click="modalRef.closeModal()" variant="error">No.</DuButton>
        <DuButton @click="modalRef.closeModal()" variant="success">YES !</DuButton>
    </template>
  </DuModal>
</div>
`

const withActionsSetupStr = `
<script setup>

const modalRef = ref(null)

</script>
`

const placementsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-4">
  <div>
    <DuButton @click="topModalRef.showModal()">Top</DuButton>
    <DuModal ref="topModalRef" placement="top">
      <h3 class="font-bold text-lg">Modal Top</h3>
      <p class="py-4">Moves the modal to top </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="middleModalRef.showModal()">Middle</DuButton>
    <DuModal ref="middleModalRef" placement="middle">
      <h3 class="font-bold text-lg">Modal Middle</h3>
      <p class="py-4">Moves the modal to middle </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="bottomModalRef.showModal()">Bottom</DuButton>
    <DuModal ref="bottomModalRef" placement="bottom">
      <h3 class="font-bold text-lg">Modal Bottom</h3>
      <p class="py-4">Moves the modal to bottom </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="startModalRef.showModal()">Start</DuButton>
    <DuModal ref="startModalRef" placement="start">
      <h3 class="font-bold text-lg">Modal Start</h3>
      <p class="py-4">Moves the modal to start horizontally </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="endModalRef.showModal()">End</DuButton>
    <DuModal ref="endModalRef" placement="end">
      <h3 class="font-bold text-lg">Modal End</h3>
      <p class="py-4">Moves the modal to end horizontally </p>
    </DuModal>
  </div>
</div>
`

const placementsSetupStr = `
<script setup>

const topModalRef = ref(null)
const middleModalRef = ref(null)
const bottomModalRef = ref(null)
const startModalRef = ref(null)
const endModalRef = ref(null)

</script>
`

// DEFAULT MODAL
export const DefaultModal: Story = {
  render: (args) => ({
    components: { DuModal, DuButton },
    setup() {
      const modalRef = ref<InstanceType<typeof DuModal> | null>(null)

      const showModal = () => {
        if (modalRef.value) {
          modalRef.value.showModal()
        }
      }

      return { args, modalRef, showModal }
    },
    template: defaultTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${defaultSetupStr}\n${defaultTplStr}`,
        language: 'html',
      },
    },
  },
}

// MODAL WITH ACTIONS
export const ModalWithActions: Story = {
  render: (args) => ({
    components: { DuModal, DuButton },
    setup() {
      const modalRef = ref<InstanceType<typeof DuModal> | null>(null)

      const showModal = () => {
        modalRef.value?.showModal()
      }

      const closeModal = () => {
        if (modalRef.value) {
          modalRef.value.closeModal()
        }
      }

      return { modalRef, showModal, closeModal }
    },
    template: withActionsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${withActionsSetupStr}\n${withActionsTplStr}`,
        language: 'html',
      },
    },
  },
}

// MODAL PLACEMENTS
export const ModalPlacements: Story = {
  render: (args) => ({
    components: { DuModal, DuButton },
    setup() {
      const topModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const middleModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const bottomModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const startModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const endModalRef = ref<InstanceType<typeof DuModal> | null>(null)

      return {
        topModalRef,
        middleModalRef,
        bottomModalRef,
        startModalRef,
        endModalRef
      }
    },
    template: placementsTplStr,
  }),
  parameters: {
    docs: {
      source: {
        code: `${placementsSetupStr}\n${placementsTplStr}`,
        language: 'html',
      },
    },
  },
}