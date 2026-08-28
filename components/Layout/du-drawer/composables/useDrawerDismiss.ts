import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { useFocusReturn } from '../../../core/focus'

/**
 * Closes the drawer on Escape while it's open, and moves focus into the
 * sidebar when it opens, restoring focus to whatever was focused before on
 * close. On breakpoints where a `*:drawer-open` class keeps the sidebar
 * visually pinned open regardless of `internalOpen`, Escape still flips the
 * underlying state (and its events) even though nothing changes visually.
 *
 * The focus return is `core/focus/useFocusReturn`: the element that opened the
 * drawer is not part of the drawer, so it cannot be named up front — a hamburger
 * in a navbar, a keyboard shortcut, a link in the content. It has to be
 * remembered at opening time.
 */
export function useDrawerDismiss(internalOpen: Ref<boolean>, sidebarRef: Ref<HTMLElement | null>) {
  const focusReturn = useFocusReturn()

  watch(internalOpen, (isOpen) => {
    if (isOpen) {
      focusReturn.capture()
      sidebarRef.value?.focus()
    }
    else {
      focusReturn.restore()
    }
  })

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && internalOpen.value) {
      internalOpen.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
}
