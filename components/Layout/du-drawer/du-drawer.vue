<script setup lang="ts">
// Two layouts in one component, decided by the viewport:
//
//   pinned  — the sidebar sits beside the content, part of the page. No dialog
//             role, no focus trap, nothing inert.
//   overlay — it floats over the content. That is a dialog: it takes the role,
//             traps focus, makes what is behind it inert, and hands focus back
//             on the way out.
//
// The layout itself is CSS (`lg:drawer-open` and friends), but the behaviour
// above is not expressible in CSS, so the same breakpoint is matched in JS.
import { computed, ref, useSlots, watch } from 'vue'
import { usePopoverState } from '../../core/popover'
import { useFocusReturn, useFocusTrap } from '../../core/focus'
import { type DuDrawerProps, type DuDrawerEmit } from './du-drawer.types'
import DuMenu from '../../Navigation/du-menu/du-menu.vue'
import { useDrawerOpenState } from './composables/useDrawerOpenState'
import { useDrawerClasses } from './composables/useDrawerClasses'
import { useDrawerPinned } from './composables/useDrawerPinned'

const slots = useSlots()

const props = withDefaults(
    defineProps<DuDrawerProps>(),
    {
        id: undefined,
        position: 'start',
        // No defaults: an `open` or `modelValue` that is always defined would
        // mean the drawer is permanently in controlled mode and could never
        // open itself.
        open: undefined,
        modelValue: undefined,
        responsive: false,
        alwaysOpenOnLarge: false,
        sidebarClass: '',
        sidebarWrapperClass: '',
        contentClass: '',
        overlayClass: '',
        items: undefined,
        iconOnly: false,
        ariaLabel: 'Sidebar',
        inertTarget: undefined,
        closeOnEscape: true,
        closeOnClickOutside: true,
    },
)

const emit = defineEmits<DuDrawerEmit>()

const {
    drawerId,
    drawerClasses,
    drawerSideClasses,
    sidebarWrapperClasses,
    drawerContentClasses,
    drawerOverlayClasses,
} = useDrawerClasses(props)

const { internalOpen, toggleDrawer } = useDrawerOpenState(props, emit)

const sidebarRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const isPinned = useDrawerPinned(props)
/** A floating sidebar is a dialog; a pinned one is just part of the page. */
const isModal = computed(() => internalOpen.value && !isPinned.value)

const focusReturn = useFocusReturn()

const popup = usePopoverState({
    state: internalOpen,
    boundary: () => [sidebarRef.value],
    // Escape works whatever the layout — it flips the state even where the CSS
    // keeps the sidebar visible, so the events stay truthful.
    closeOnEscape: () => props.closeOnEscape,
    // Clicking the content is only a dismissal while the sidebar floats over it.
    closeOnClickOutside: () => props.closeOnClickOutside && !isPinned.value,
    onOpening: () => focusReturn.capture(),
    onOpened: () => {
        if (isPinned.value) {
            sidebarRef.value?.focus()
        }
        // Otherwise the focus trap below places focus, so it is not moved twice.
    },
    onClosed: () => focusReturn.restore(),
})

useFocusTrap({
    container: () => sidebarRef.value,
    active: () => isModal.value,
})

/**
 * The page behind the overlay is not just invisible, it is unreachable: without
 * `inert`, Tab walks from the sidebar straight into content the user cannot see.
 */
watch([isModal, contentRef], ([modal, content]) => {
    const target = props.inertTarget == null
        ? content
        : document.querySelector<HTMLElement>(props.inertTarget)
    if (target == null) {
        return
    }
    target.toggleAttribute('inert', modal)
}, { flush: 'post' })

const menuSlots = computed(() => {
    const excludedSlots = ['default', 'content', 'sidebar', 'side']
    return Object.keys(slots).filter(name => !excludedSlots.includes(name))
})

defineExpose({
    toggleDrawer,
    open: () => popup.open(),
    close: () => popup.close(),
})
</script>

<template>
    <div :class="drawerClasses">
        <!--
          The checkbox is daisyUI's layout mechanism, not a control: the state
          lives in JS. It is hidden from assistive tech, which also settles the
          "a checkbox needs a label" complaint — there is nothing here to label.
        -->
        <input
            :id="drawerId"
            type="checkbox"
            class="drawer-toggle"
            tabindex="-1"
            aria-hidden="true"
            v-model="internalOpen"
        />

        <!-- Drawer Content -->
        <div ref="contentRef" :class="drawerContentClasses">
            <slot name="content">
                <slot></slot>
            </slot>
        </div>

        <!-- Drawer Side -->
        <div :class="drawerSideClasses">
            <!--
              A click-to-close surface, not an affordance to announce: ARIA
              prohibits naming a `<label>`, and a keyboard user closes with
              Escape. The dismissal itself is `usePopoverState`'s; the label
              stays for the pointer and for daisyUI's own styling.
            -->
            <label :for="drawerId" aria-hidden="true" :class="drawerOverlayClasses"></label>

            <div
                ref="sidebarRef"
                :class="sidebarWrapperClasses"
                tabindex="-1"
                :role="isModal ? 'dialog' : undefined"
                :aria-modal="isModal ? 'true' : undefined"
                :aria-label="isModal ? ariaLabel : undefined"
            >
                <!-- Dynamic items mode -->
                <template v-if="items">
                    <!-- Forward menu customization slots (item, title, submenu, indexed) to DuMenu -->
                    <DuMenu :items="items" class="w-full">
                        <template
                            v-for="name in menuSlots"
                            :key="name"
                            #[name]="slotProps"
                        >
                            <slot :name="name" v-bind="slotProps" />
                        </template>
                    </DuMenu>
                </template>

                <!-- Manual/Slot mode -->
                <template v-else>
                    <slot name="sidebar">
                        <slot name="side"></slot>
                    </slot>
                </template>
            </div>
        </div>
    </div>
</template>
