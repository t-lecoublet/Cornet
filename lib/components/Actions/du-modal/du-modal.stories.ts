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

const withActionsTplStr = `
<div>
  <DuButton @click="showModal">Open modal with actions</DuButton>
  <DuModal ref="modalRef" v-bind="args">
    <h3 class="font-bold text-lg">Confirmation</h3>
    <p class="py-4">Are you sure about that?</p>
    <template #actions>
      <div class="modal-action">
        <DuButton @click="closeModal" variant="error">No.</DuButton>
        <DuButton @click="closeModal" variant="success">YES !</DuButton>
      </div>
    </template>
  </DuModal>
</div>
`

const placementsTplStr = `
<div class="flex flex-wrap gap-4 justify-center p-4">
  <div>
    <DuButton @click="showTopModal">Top</DuButton>
    <DuModal ref="topModalRef" v-bind="args" placement="top">
      <h3 class="font-bold text-lg">Modal Top</h3>
      <p class="py-4">Moves the modal to top </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="showMiddleModal">Middle</DuButton>
    <DuModal ref="middleModalRef" v-bind="args" placement="middle">
      <h3 class="font-bold text-lg">Modal Middle</h3>
      <p class="py-4">Moves the modal to middle </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="showBottomModal">Bottom</DuButton>
    <DuModal ref="bottomModalRef" v-bind="args" placement="bottom">
      <h3 class="font-bold text-lg">Modal Bottom</h3>
      <p class="py-4">Moves the modal to bottom </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="showStartModal">Start</DuButton>
    <DuModal ref="startModalRef" v-bind="args" placement="start">
      <h3 class="font-bold text-lg">Modal Start</h3>
      <p class="py-4">Moves the modal to start horizontally </p>
    </DuModal>
  </div>
  
  <div>
    <DuButton @click="showEndModal">End</DuButton>
    <DuModal ref="endModalRef" v-bind="args" placement="end">
      <h3 class="font-bold text-lg">Modal End</h3>
      <p class="py-4">Moves the modal to end horizontally </p>
    </DuModal>
  </div>
</div>
`

// DEFAULT MODAL

const TemplateModal: Story = {
  render: (args: any) => ({
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
  args: {},
}
export const DefaultModal = { ...TemplateModal }

// MODAL WITH ACTIONS

const ModalWithActionsTemplate: Story = {
  render: (args: any) => ({
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

      return { args, modalRef, showModal, closeModal }
    },
    template: withActionsTplStr,
  }),
  args: {},
}
export const ModalWithActions = { ...ModalWithActionsTemplate }

// MODAL PLACEMENTS

const ModalPlacementsTemplate: Story = {
  render: (args: any) => ({
    components: { DuModal, DuButton },
    setup() {
      const topModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const middleModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const bottomModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const startModalRef = ref<InstanceType<typeof DuModal> | null>(null)
      const endModalRef = ref<InstanceType<typeof DuModal> | null>(null)

      const showTopModal = () => {
        topModalRef.value?.showModal()
      }

      const showMiddleModal = () => {
        middleModalRef.value?.showModal()
      }

      const showBottomModal = () => {
        bottomModalRef.value?.showModal()
      }

      const showStartModal = () => {
        startModalRef.value?.showModal()
      }

      const showEndModal = () => {
        endModalRef.value?.showModal()
      }

      return {
        args,
        topModalRef,
        middleModalRef,
        bottomModalRef,
        startModalRef,
        endModalRef,
        showTopModal,
        showMiddleModal,
        showBottomModal,
        showStartModal,
        showEndModal,
      }
    },
    template: placementsTplStr,
  }),
  args: {},
}
export const ModalPlacements = { ...ModalPlacementsTemplate } 