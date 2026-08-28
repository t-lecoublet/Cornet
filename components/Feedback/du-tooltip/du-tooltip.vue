<script setup lang="ts">
// WAI-ARIA tooltip pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
//
// A tooltip is a *description* of the thing it is attached to, never a place to
// put interactive content — a keyboard user cannot reach inside one. If you
// need buttons or links in a popup, that is a DuDropdown.
import { computed, onUnmounted, ref, watch } from 'vue'
import { usePopoverState } from '../../core/popover'
import { useAnchorPosition } from '../../core/positioning'
import { focusableWithin, useComponentId, useControllableState } from '../../core/shared'
import { useVariantMapping } from '../../../composables/useVariantProps'
import { type DuTooltipEmit, type DuTooltipProps } from './du-tooltip.types'

const props = withDefaults(
  defineProps<DuTooltipProps>(),
  {
    variant: 'default',
    dataTip: undefined,
    // No default: an `open` prop that is always defined would put the tooltip
    // permanently in controlled mode, and it could never open on hover.
    open: undefined,
    position: 'top',
    responsive: false,
    openDelay: 300,
    closeDelay: 100,
    popover: false,
    disabled: false,
  },
)

const emit = defineEmits<DuTooltipEmit>()

const slots = defineSlots<{
  default?: () => unknown
  content?: () => unknown
}>()

const instanceId = useComponentId(undefined, 'tooltip')
const contentId = `${instanceId}-content`

const root = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)

const hasTip = computed(() => slots.content != null || (props.dataTip ?? '') !== '')

const isOpen = useControllableState(() => props.open, (value) => emit('update:open', value), false)

const popup = usePopoverState({
  state: isOpen,
  boundary: () => [root.value, contentEl.value],
  popoverElement: () => (props.popover ? contentEl.value : null),
  // A tooltip is dismissed by leaving it, not by clicking elsewhere — but
  // Escape must always work, whatever the pointer is doing (WCAG 1.4.13).
  closeOnClickOutside: () => false,
  disabled: () => props.disabled || !hasTip.value,
})

// --- timers -----------------------------------------------------------------
let timer: ReturnType<typeof setTimeout> | undefined

function cancel() {
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

function schedule(shouldOpen: boolean, delay: number) {
  cancel()
  timer = setTimeout(() => {
    timer = undefined
    if (shouldOpen) {
      void popup.open()
    }
    else {
      popup.close(false)
    }
  }, delay)
}

onUnmounted(cancel)

// The tip is a child of the root, so moving the pointer from the trigger onto
// the tip does not fire `mouseleave` — which is exactly WCAG 1.4.13's
// "hoverable" requirement, for free.
const onPointerEnter = () => schedule(true, props.openDelay)
const onPointerLeave = () => schedule(false, props.closeDelay)

/** Keyboard focus shows the tip at once: a delay there is just a stutter. */
function onFocusin() {
  cancel()
  void popup.open()
}

function onFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next == null || !popup.isInside(next)) {
    cancel()
    popup.close(false)
  }
}

watch([root, () => props.disabled], ([el, off], _old, onCleanup) => {
  if (el == null || off) {
    return
  }
  el.addEventListener('mouseenter', onPointerEnter)
  el.addEventListener('mouseleave', onPointerLeave)
  el.addEventListener('focusin', onFocusin)
  el.addEventListener('focusout', onFocusout)
  onCleanup(() => {
    el.removeEventListener('mouseenter', onPointerEnter)
    el.removeEventListener('mouseleave', onPointerLeave)
    el.removeEventListener('focusin', onFocusin)
    el.removeEventListener('focusout', onFocusout)
  })
  // Sync flush: the ref is filled during mount, and the listeners have to be in
  // place by the time the component is usable, not a tick later.
}, { immediate: true, flush: 'sync' })

// --- describing the trigger --------------------------------------------------
// The trigger arrives through the default slot, so the component cannot put an
// attribute on it declaratively. It wires `aria-describedby` onto the first
// thing in there a keyboard can reach — which is also the only thing that can
// open the tip from the keyboard.
watch([() => popup.isOpen.value, root], ([open, el]) => {
  const trigger = el == null ? null : focusableWithin(el)[0]
  if (trigger == null) {
    return
  }
  if (open) {
    trigger.setAttribute('aria-describedby', contentId)
  }
  else {
    trigger.removeAttribute('aria-describedby')
  }
}, { flush: 'post' })

// --- presentation ------------------------------------------------------------
const positionClass = computed(() => `tooltip-${props.position}`)
const baseClass = computed(() => (props.responsive ? 'lg:tooltip' : 'tooltip'))

const { colorClass } = useVariantMapping(props, 'tooltip')

const { cssAnchorName, popupStyle } = useAnchorPosition(`--anchor-${instanceId}`, () => ({
  side: props.position,
  align: 'center',
  matchWidth: false,
}))

defineExpose({ open: () => popup.open(), close: () => popup.close(false) })
</script>

<template>
  <div
    ref="root"
    :class="[baseClass, positionClass, colorClass, popup.isOpen.value && 'tooltip-open']"
    :style="popover ? { anchorName: cssAnchorName } : undefined"
  >
    <!--
      Rendered only while open, and never through daisyUI's `data-tip`
      attribute. daisyUI reveals a tip on `:hover` and `:has(:focus-visible)`
      on its own; with no tip in the DOM there is nothing for it to reveal, so
      the delays and Escape below actually decide when it appears.
    -->
    <div
      v-if="popup.isOpen.value && hasTip"
      :id="contentId"
      ref="contentEl"
      role="tooltip"
      class="tooltip-content"
      :popover="popover ? 'manual' : null"
      :style="popover ? popupStyle : null"
    >
      <slot name="content">{{ dataTip }}</slot>
    </div>

    <slot />
  </div>
</template>
