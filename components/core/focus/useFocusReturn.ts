/**
 * Hands focus back to whatever had it before an overlay opened.
 *
 * This is not the same thing as `usePopoverState`'s `returnFocusTo`, which
 * names one element up front. That works for a dropdown, whose trigger is part
 * of the widget and always there. It does not work when the overlay is opened
 * from somewhere the component cannot name: a `v-model:open` flipped by a
 * keyboard shortcut, a row action in a table, an "Undo" in a toast, another
 * dialog. The only correct target then is "whatever was focused at the time",
 * which has to be remembered rather than declared.
 *
 * ```ts
 * const focusReturn = useFocusReturn()
 * watch(isOpen, (open) => (open ? focusReturn.capture() : focusReturn.restore()))
 * ```
 */
export interface FocusReturn {
  /** Remember the currently focused element. Call it *before* moving focus. */
  capture: () => void
  /**
   * Focus the remembered element again and forget it. Returns whether it
   * actually took: the element may be gone, or no longer focusable.
   */
  restore: () => boolean
  /** Drop the memory without restoring — the consumer moved focus on purpose. */
  forget: () => void
}

/** Focus resting on the document itself is focus resting nowhere. */
function isParked(el: Element | null): boolean {
  return el == null || el === document.body || el === document.documentElement
}

export function useFocusReturn(): FocusReturn {
  let previous: HTMLElement | null = null

  return {
    capture() {
      const active = document.activeElement
      previous = isParked(active) ? null : (active as HTMLElement)
    },

    restore() {
      const target = previous
      previous = null
      // Between opening and closing, the element may have been unmounted — a
      // row deleted, a list re-rendered. Focusing it would throw focus to the
      // body, which is worse than leaving it where it is.
      if (target == null || !target.isConnected || typeof target.focus !== 'function') {
        return false
      }
      target.focus()
      return document.activeElement === target
    },

    forget() {
      previous = null
    },
  }
}
