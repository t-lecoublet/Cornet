import { nextTick, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

/** A getter, so the primitive always reads the caller's current element/prop. */
type Get<T> = () => T

export interface PopoverStateOptions {
  /**
   * The open flag to drive, when the consumer already owns one — typically a
   * `useControllableState` ref. Passing it makes the consumer's state the
   * single source of truth: in controlled mode a request to open only emits,
   * the flag does not move, and the primitive shows nothing. Omit it and the
   * primitive keeps its own.
   */
  state?: Ref<boolean>
  /**
   * Everything that counts as "inside". A pointer press landing in any of them
   * is not an outside click. Read fresh on every event: refs move.
   */
  boundary: Get<(HTMLElement | null | undefined)[]>
  /**
   * The element carrying a `popover` attribute, if the consumer opted into
   * top-layer rendering. Driven through the Popover API on top of its `v-if`.
   */
  popoverElement?: Get<HTMLElement | null | undefined>
  /** Focused when closing with `returnFocus` — normally the trigger. */
  returnFocusTo?: Get<HTMLElement | null | undefined>
  /** Default true. */
  closeOnClickOutside?: Get<boolean>
  /** Default true. */
  closeOnEscape?: Get<boolean>
  /**
   * Veto one outside dismissal. Return `false` to keep the popup open — for a
   * click in something that is visually elsewhere but logically part of the
   * widget (a portalled sub-panel, a date picker's own overlay).
   */
  clickOutsideFilter?: (event: MouseEvent) => boolean
  /** While true, `open()` and `toggle()` do nothing. */
  disabled?: Get<boolean>

  /** Runs right after `isOpen` flips true, before the DOM has updated. */
  onOpening?: () => void
  /** Runs after the popup is shown and laid out — scroll, focus, measure. */
  onOpened?: () => void
  /**
   * Runs before anything else closes. Whatever must resolve against the still-
   * open state goes here; re-entrant calls to `close()` from inside it are
   * swallowed.
   */
  onClosing?: () => void
  /** Runs after `isOpen` flips false, before focus is returned. */
  onClosed?: () => void
}

export interface PopoverState {
  isOpen: Ref<boolean>
  open: () => Promise<void>
  close: (returnFocus?: boolean) => void
  toggle: () => void
  /** Whether a node sits inside the boundary. */
  isInside: (target: Node | null) => boolean
}

/**
 * The lifecycle every popup in the library shares: an open flag, top-layer
 * rendering through the Popover API, dismissal on outside press and on
 * `Escape`, and focus handed back on the way out.
 *
 * Two things it does that are easy to get wrong alone:
 *
 * - **The document listeners exist only while open.** A page holding fifty
 *   closed popups holds no idle listeners. Attaching happens on the default
 *   pre-flush tick, so the very event that opened the popup has finished
 *   propagating before the dismissal listeners are watching — otherwise
 *   opening from a click outside the boundary would close it again at once.
 * - **`Escape` is caught on the document**, not on the widget, so it works
 *   from anything inside it, wired or not.
 *
 * Everything specific to a given popup — what to highlight, what to commit,
 * where to put focus — goes in the four hooks, in that order:
 * `onOpening` → (paint) → `onOpened`, and `onClosing` → (hide) → `onClosed`.
 */
export function usePopoverState(options: PopoverStateOptions): PopoverState {
  const isOpen = options.state ?? ref(false)
  // Whether the shown-side effects have run. `isOpen` alone cannot say: a
  // controlled flag can move without anyone calling `open()`.
  let shown = false

  const enabled = (get: Get<boolean> | undefined) => get?.() !== false

  /** The element to drive through the Popover API, or null if that is not in play. */
  function popoverApi(): HTMLElement | null {
    const el = options.popoverElement?.()
    return el != null && el.hasAttribute('popover') && typeof el.showPopover === 'function' ? el : null
  }

  function isInside(target: Node | null): boolean {
    if (target == null) {
      return false
    }
    return options.boundary().some((el) => el != null && el.contains(target))
  }

  /** The shown-side effects, whoever flipped the flag. */
  async function reveal() {
    if (shown || !isOpen.value) {
      return
    }
    shown = true
    options.onOpening?.()

    await nextTick()
    const popover = popoverApi()
    if (popover != null && !popover.matches(':popover-open')) {
      popover.showPopover()
    }
    options.onOpened?.()
  }

  /** The hidden-side effects. */
  function conceal() {
    if (!shown) {
      return
    }
    shown = false
    const popover = popoverApi()
    if (popover != null && popover.matches(':popover-open')) {
      popover.hidePopover()
    }
    options.onClosed?.()
  }

  async function open() {
    if (isOpen.value || options.disabled?.() === true) {
      return
    }
    isOpen.value = true
    // Controlled and not (yet) granted: the flag did not move, so nothing shows.
    await reveal()
  }

  // `onClosing` may itself trigger a close (resolving a pending value can
  // select, and selecting closes). Guard the re-entry so the close runs once.
  let closing = false

  function close(returnFocus = true) {
    if (!isOpen.value || closing) {
      return
    }
    closing = true
    try {
      options.onClosing?.()
    }
    finally {
      closing = false
    }

    isOpen.value = false
    if (isOpen.value) {
      // Controlled and refused. `onClosing` has already run — it exists to
      // resolve state *while still open*, so it cannot wait for the answer.
      return
    }
    conceal()

    if (returnFocus) {
      options.returnFocusTo?.()?.focus()
    }
  }

  function toggle() {
    if (options.disabled?.() === true) {
      return
    }
    if (isOpen.value) {
      close()
    }
    else {
      void open()
    }
  }

  function onDocumentPointerdown(event: MouseEvent) {
    if (!isOpen.value || !enabled(options.closeOnClickOutside)) {
      return
    }
    if (isInside(event.target as Node)) {
      return
    }
    if (options.clickOutsideFilter?.(event) === false) {
      return
    }
    close(false)
  }

  function onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen.value && enabled(options.closeOnEscape)) {
      event.preventDefault()
      close(true)
    }
  }

  let listening = false

  function stopListening() {
    if (!listening) {
      return
    }
    listening = false
    document.removeEventListener('mousedown', onDocumentPointerdown)
    document.removeEventListener('keydown', onDocumentKeydown)
  }

  watch(isOpen, (nowOpen) => {
    // A controlled flag can move without `open()`/`close()` being called at
    // all — the consumer's parent flipped its own state. Catch up on both the
    // side effects and the subscription.
    if (nowOpen) {
      void reveal()
      if (!listening) {
        listening = true
        document.addEventListener('mousedown', onDocumentPointerdown)
        document.addEventListener('keydown', onDocumentKeydown)
      }
      return
    }
    conceal()
    stopListening()
  }, { immediate: true })

  // Unmounting while open would otherwise leak both listeners.
  onUnmounted(stopListening)

  return { isOpen, open, close, toggle, isInside }
}
