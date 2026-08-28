<script setup lang="ts">
// WAI-ARIA disclosure pattern (a button that shows and hides a panel):
// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
// Pair it with `<DuMenu role="menu">` for the APG menu-button pattern.
import { computed, onUnmounted, ref, watch } from 'vue'
import { usePopoverState } from '../../core/popover'
import { useAnchorPosition } from '../../core/positioning'
import { useComponentId, useControllableState } from '../../core/shared'
import {
  PLACEMENT_ALIGNS,
  PLACEMENT_SIDES,
  type DuDropdownEmit,
  type DuDropdownPlacementInput,
  type DuDropdownPlacementValue,
  type DuDropdownProps,
  type DuDropdownTriggerProps,
} from './du-dropdown.types'

const props = withDefaults(
  defineProps<DuDropdownProps>(),
  {
    // No default: an `open` prop that is always defined would mean the
    // dropdown is always in controlled mode and could never open itself.
    open: undefined,
    hover: false,
    openDelay: 100,
    closeDelay: 100,
    placement: 'bottom',
    popover: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    disabled: false,
    contentClass: '',
  },
)

const emit = defineEmits<DuDropdownEmit>()

const instanceId = useComponentId(undefined, 'dropdown')
const contentId = `${instanceId}-content`

const rootEl = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)

// The controllable state IS the popup's open flag, so there is one truth: an
// `open` prop the consumer refuses to move keeps the panel shut, whatever the
// dropdown was asked to do.
const isOpen = useControllableState(() => props.open, (value) => emit('update:open', value), false)

const popup = usePopoverState({
  state: isOpen,
  // The whole dropdown is the boundary: a press on the trigger or anywhere in
  // the panel is inside, even when the panel is in the top layer.
  boundary: () => [rootEl.value, contentEl.value],
  popoverElement: () => (props.popover ? contentEl.value : null),
  returnFocusTo: () => rootEl.value?.querySelector<HTMLElement>('[aria-controls]') ?? null,
  closeOnClickOutside: () => props.closeOnClickOutside,
  closeOnEscape: () => props.closeOnEscape,
  disabled: () => props.disabled,
  onOpened: () => emit('open'),
  onClosed: () => emit('close'),
})

function toggle() {
  popup.toggle()
}

function close() {
  popup.close()
}

// --- hover -----------------------------------------------------------------
// Driven in JS rather than through daisyUI's `dropdown-hover`, so the visual
// state and `aria-expanded` can never disagree. The listeners are attached
// imperatively and only while `hover` is on: a dropdown that does not open on
// hover should not be listening for it.
let hoverTimer: ReturnType<typeof setTimeout> | undefined

function cancelHoverTimer() {
  if (hoverTimer !== undefined) {
    clearTimeout(hoverTimer)
    hoverTimer = undefined
  }
}

function scheduleHover(shouldOpen: boolean) {
  if (props.disabled) {
    return
  }
  cancelHoverTimer()
  hoverTimer = setTimeout(() => {
    hoverTimer = undefined
    if (shouldOpen) {
      void popup.open()
    }
    else {
      popup.close(false)
    }
  }, shouldOpen ? props.openDelay : props.closeDelay)
}

const onPointerEnter = () => scheduleHover(true)
const onPointerLeave = () => scheduleHover(false)

watch([rootEl, () => props.hover], ([el, wanted], _old, onCleanup) => {
  if (el == null || !wanted) {
    return
  }
  el.addEventListener('mouseenter', onPointerEnter)
  el.addEventListener('mouseleave', onPointerLeave)
  onCleanup(() => {
    el.removeEventListener('mouseenter', onPointerEnter)
    el.removeEventListener('mouseleave', onPointerLeave)
  })
}, { immediate: true })

onUnmounted(cancelHoverTimer)

/** `hover` also means "opens on keyboard focus" — a pointer-only affordance is not one. */
function onFocusin() {
  if (props.hover) {
    cancelHoverTimer()
    void popup.open()
  }
}

// Tab out of the dropdown closes it. `relatedTarget` is null when focus leaves
// the document entirely (browser chrome, another window), which is not an exit.
function onFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next != null && !popup.isInside(next)) {
    popup.close(false)
  }
}

// --- trigger ---------------------------------------------------------------
const triggerProps = computed<DuDropdownTriggerProps>(() => ({
  'aria-haspopup': 'true',
  'aria-expanded': isOpen.value,
  'aria-controls': contentId,
  onClick: toggle,
  onKeydown: (event: KeyboardEvent) => {
    // ArrowDown opens without picking anything — the APG entry point into a
    // panel whose first item should take focus.
    if (event.key === 'ArrowDown' && !isOpen.value) {
      event.preventDefault()
      void popup.open()
    }
  },
}))

// --- placement -------------------------------------------------------------
const placementValues = computed<DuDropdownPlacementValue[]>(() => {
  const input: DuDropdownPlacementInput | undefined = props.placement
  if (!input) {
    return []
  }
  if (typeof input === 'string') {
    return input.split(',').map((part) => part.trim()).filter(Boolean) as DuDropdownPlacementValue[]
  }
  if (Array.isArray(input)) {
    return input
  }
  return (Object.entries(input) as [DuDropdownPlacementValue, boolean][])
    .filter(([, enabled]) => enabled)
    .map(([key]) => key)
})

const placementClass = computed(() => placementValues.value.map((value) => `dropdown-${value}`).join(' '))

const { cssAnchorName, popupStyle } = useAnchorPosition(`--anchor-${instanceId}`, () => ({
  side: placementValues.value.map((v) => PLACEMENT_SIDES[v]).find(Boolean) ?? 'bottom',
  align: placementValues.value.map((v) => PLACEMENT_ALIGNS[v]).find(Boolean) ?? 'start',
  // A dropdown panel sizes itself; only a listbox wants the trigger's width.
  matchWidth: false,
}))

defineExpose({ open: () => popup.open(), close, toggle })

defineSlots<{
  trigger: (props: { open: boolean, toggle: () => void, triggerProps: DuDropdownTriggerProps }) => unknown
  content: (props: { open: boolean, close: () => void }) => unknown
  default: (props: { open: boolean, close: () => void }) => unknown
}>()
</script>

<template>
  <div
    ref="rootEl"
    :class="['dropdown', placementClass, isOpen ? 'dropdown-open' : 'dropdown-close']"
    :style="popover ? { anchorName: cssAnchorName } : undefined"
    @focusin="onFocusin"
    @focusout="onFocusout"
  >
    <!-- Spread `triggerProps` on your trigger to get aria-expanded /
         aria-controls / aria-haspopup and the open-close wiring. -->
    <slot name="trigger" :open="isOpen" :toggle="toggle" :trigger-props="triggerProps" />

    <!--
      In popover mode the panel goes to the top layer, where `.dropdown-content`
      and its `position: absolute` would fight the UA's `position: fixed`: it
      gets the anchor style instead, and is mounted only while open.
    -->
    <div
      v-if="!popover || isOpen"
      :id="contentId"
      ref="contentEl"
      :class="[
        !popover && 'dropdown-content',
        'bg-base-100 rounded-box shadow-sm',
        contentClass,
      ]"
      :popover="popover ? 'manual' : null"
      :style="popover ? popupStyle : null"
    >
      <slot name="content" :open="isOpen" :close="close" />
      <slot :open="isOpen" :close="close" />
    </div>
  </div>
</template>
