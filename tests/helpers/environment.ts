// Environment gaps the test DOM leaves, in one place.
//
// Opt-in rather than a global setup file, deliberately: several suites depend
// on a capability being *absent*. `useDrawerPinned` answers "floating" when
// `matchMedia` is missing, and the drawer's dialog tests rely on that; a global
// mock would quietly retire them. So each suite asks for what it needs.

/**
 * The Popover API, which happy-dom does not implement.
 *
 * Installed on the prototype rather than on one element: a panel rendered
 * behind a `v-if` is a different element every time it opens, so a per-element
 * mock only ever sees the first one.
 *
 * Restore it afterwards.
 */
export function mockPopoverApi() {
  const proto = HTMLElement.prototype as unknown as Record<string, unknown>
  const original = {
    showPopover: proto.showPopover,
    hidePopover: proto.hidePopover,
    matches: proto.matches,
  }
  const open = new Set<HTMLElement>()
  const nativeMatches = HTMLElement.prototype.matches

  proto.showPopover = function showPopover(this: HTMLElement) {
    open.add(this)
  }
  proto.hidePopover = function hidePopover(this: HTMLElement) {
    open.delete(this)
  }
  proto.matches = function matches(this: HTMLElement, selector: string) {
    return selector === ':popover-open' ? open.has(this) : nativeMatches.call(this, selector)
  }

  return {
    /** Whether anything is currently in the top layer. */
    get openCount() {
      return open.size
    },
    isOpen: (el: Element | null | undefined) => el != null && open.has(el as HTMLElement),
    restore() {
      Object.assign(proto, original)
      open.clear()
    },
  }
}

/**
 * `matchMedia`, fixed at one answer.
 *
 * Restore it afterwards: leaving it defined changes what every later suite in
 * the file sees, and at least one component behaves differently when it is
 * missing.
 */
export function mockMatchMedia(matches: boolean) {
  const original = window.matchMedia
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  let current = matches

  window.matchMedia = ((query: string) => ({
    media: query,
    get matches() {
      return current
    },
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  })) as typeof window.matchMedia

  return {
    /** Move the breakpoint, as a resize would. */
    set(value: boolean) {
      current = value
      listeners.forEach((listener) => listener({ matches: value } as MediaQueryListEvent))
    },
    restore() {
      window.matchMedia = original
      listeners.clear()
    },
  }
}
