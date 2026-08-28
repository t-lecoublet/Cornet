import { onUnmounted, watch } from 'vue'
import { focusableWithin } from '../shared/dom'

type Get<T> = () => T

export interface FocusTrapOptions {
  /** The region focus must stay inside. */
  container: Get<HTMLElement | null | undefined>
  /** While false the trap is inert and holds no listeners. */
  active: Get<boolean>
  /**
   * Where focus goes when the trap turns on: an element, a CSS selector
   * resolved inside the container, or nothing for the first focusable.
   */
  initialFocus?: Get<HTMLElement | string | null | undefined>
  /**
   * Regions that count as inside even though they are not descendants — a
   * portalled sub-panel belonging to the same widget.
   */
  alsoInside?: Get<(HTMLElement | null | undefined)[]>
}

export interface FocusTrap {
  /** Put focus where the trap wants it. Called for you when it turns on. */
  focusInitial: () => void
}

/**
 * Keeps Tab and Shift+Tab inside a container while it is open.
 *
 * **A native `<dialog>` opened with `showModal()` does not need this.** The top
 * layer makes the rest of the document inert for free, and a hand-rolled trap
 * on top of it can only get in the way. What needs it is an overlay built out
 * of ordinary elements — a mobile drawer, say — where nothing stops Tab from
 * walking out of the panel and into the page behind it, which the user cannot
 * see and did not ask to reach.
 *
 * Two escape routes are covered, because a trap that only handles Tab is not
 * one: the key itself, and focus arriving from anywhere else (a click, a
 * script, the address bar coming back).
 */
export function useFocusTrap(options: FocusTrapOptions): FocusTrap {
  const insideRegions = () => [options.container(), ...(options.alsoInside?.() ?? [])]

  function isInside(node: Node | null): boolean {
    return node != null && insideRegions().some((el) => el != null && el.contains(node))
  }

  function focusables(): HTMLElement[] {
    const container = options.container()
    return container == null ? [] : focusableWithin(container)
  }

  function focusInitial() {
    const container = options.container()
    if (container == null) {
      return
    }
    const wanted = options.initialFocus?.()
    const target = typeof wanted === 'string'
      ? container.querySelector<HTMLElement>(wanted)
      : wanted

    // Falling back to the container itself needs it to accept focus; a panel
    // with nothing focusable in it still has to hold the trap.
    const fallback = focusables()[0] ?? container
    ;(target ?? fallback).focus()
  }

  function onKeydown(event: KeyboardEvent) {
    // The flag is read at event time, not only when the watcher fires. A trap
    // must let go the instant it is told to, and a consumer that restores focus
    // while closing does so before any watcher has had a chance to run.
    if (!options.active() || event.key !== 'Tab') {
      return
    }
    const reachable = focusables()
    if (reachable.length === 0) {
      // Nothing to move to: Tab must not leave either.
      event.preventDefault()
      return
    }

    const first = reachable[0]!
    const last = reachable[reachable.length - 1]!
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && (active === first || !isInside(active))) {
      event.preventDefault()
      last.focus()
    }
    else if (!event.shiftKey && (active === last || !isInside(active))) {
      event.preventDefault()
      first.focus()
    }
  }

  // Focusing an element fires `focusin`, which lands back here. Without this
  // guard two active traps would pull focus at each other until the stack ran
  // out — a fight the consumer has to settle (only one trap at a time), but not
  // one that should crash.
  let restoring = false

  function onFocusin(event: FocusEvent) {
    if (restoring || !options.active() || isInside(event.target as Node)) {
      return
    }
    // Focus got out by some route other than Tab. Pull it back rather than
    // leaving the user stranded behind an overlay.
    restoring = true
    try {
      focusInitial()
    }
    finally {
      restoring = false
    }
  }

  function start() {
    document.addEventListener('keydown', onKeydown, true)
    document.addEventListener('focusin', onFocusin)
  }

  function stop() {
    document.removeEventListener('keydown', onKeydown, true)
    document.removeEventListener('focusin', onFocusin)
  }

  watch(() => options.active(), (isActive) => {
    if (isActive) {
      start()
      focusInitial()
    }
    else {
      stop()
    }
  }, { immediate: true, flush: 'post' })

  onUnmounted(stop)

  return { focusInitial }
}
