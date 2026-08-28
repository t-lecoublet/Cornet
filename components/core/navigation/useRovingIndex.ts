import { onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

type Get<T> = () => T

export type RovingOrientation = 'horizontal' | 'vertical' | 'both'

export interface RovingIndexOptions {
  /** The navigable elements, in DOM order. Read fresh on every key: lists change. */
  items: Get<HTMLElement[]>
  /** Which arrows move the active item. Defaults to `vertical`. */
  orientation?: Get<RovingOrientation>
  /** Wrap around at both ends. Defaults to `true`. */
  wrap?: Get<boolean>
  /** Items to step over — a disabled row is not a destination. */
  isDisabled?: (el: HTMLElement, index: number) => boolean
  /** Off by default: a menu wants type-to-jump, a tab list does not. */
  typeahead?: Get<boolean>
  /** The text typeahead matches on. Defaults to the element's trimmed text. */
  textOf?: (el: HTMLElement) => string
  /** How long typed letters keep accumulating, in ms. */
  typeaheadTimeout?: number
}

export interface RovingIndex {
  /** Which item currently owns the tab stop. `-1` before anything is focused. */
  activeIndex: Ref<number>
  /**
   * Handle a key. Returns `true` when it consumed it — the caller decides
   * whether to `preventDefault`, since only it knows what else the key means.
   */
  onKeydown: (event: KeyboardEvent) => boolean
  /** Focus an item and make it the tab stop. Out-of-range indices are ignored. */
  focusAt: (index: number) => void
  /** `0` for the item that owns the tab stop, `-1` for the rest. */
  tabIndexFor: (index: number) => 0 | -1
  /** Sync `activeIndex` when focus arrives from somewhere else (a click, Tab). */
  syncTo: (el: EventTarget | null) => void
}

const ARROWS = {
  horizontal: { next: 'ArrowRight', previous: 'ArrowLeft' },
  vertical: { next: 'ArrowDown', previous: 'ArrowUp' },
}

/**
 * A roving tabindex over a list of elements: arrows move the active item,
 * `Home`/`End` jump to the ends, and typing letters jumps to a match.
 *
 * Roving means the list is **one tab stop**, not one per item. Tab moves past
 * the whole widget; the arrows move within it. That is what the APG asks of a
 * menu, a tab list or a toolbar, and it is why `tabIndexFor` exists: exactly
 * one item is `0`, every other is `-1`.
 *
 * Disabled items are stepped over rather than skipped once — three disabled
 * rows in a row cost three steps, not one, and a list that is entirely
 * disabled does not loop forever.
 */
export function useRovingIndex(options: RovingIndexOptions): RovingIndex {
  const activeIndex = ref(-1)

  const orientation = () => options.orientation?.() ?? 'vertical'
  const wraps = () => options.wrap?.() !== false
  const disabled = (el: HTMLElement, index: number) => options.isDisabled?.(el, index) === true

  function step(from: number, direction: 1 | -1): number {
    const items = options.items()
    if (items.length === 0) {
      return -1
    }
    let index = from
    // At most one full pass: a wholly disabled list has no destination.
    for (let taken = 0; taken < items.length; taken += 1) {
      index += direction
      if (index >= items.length) {
        if (!wraps()) {
          return -1
        }
        index = 0
      }
      else if (index < 0) {
        if (!wraps()) {
          return -1
        }
        index = items.length - 1
      }
      if (!disabled(items[index]!, index)) {
        return index
      }
    }
    return -1
  }

  function edge(direction: 1 | -1): number {
    const items = options.items()
    const from = direction === 1 ? -1 : items.length
    // Reuse `step` so the "skip disabled" rule holds at the ends too, without
    // wrapping past the edge we were asked for.
    let index = from
    for (let taken = 0; taken < items.length; taken += 1) {
      index += direction
      if (index < 0 || index >= items.length) {
        return -1
      }
      if (!disabled(items[index]!, index)) {
        return index
      }
    }
    return -1
  }

  function focusAt(index: number) {
    const items = options.items()
    const el = items[index]
    if (el == null) {
      return
    }
    activeIndex.value = index
    el.focus()
  }

  function tabIndexFor(index: number): 0 | -1 {
    // Before anything is focused the first item owns the tab stop, so the
    // widget is reachable at all.
    const owner = activeIndex.value < 0 ? edge(1) : activeIndex.value
    return index === owner ? 0 : -1
  }

  function syncTo(el: EventTarget | null) {
    const index = options.items().indexOf(el as HTMLElement)
    if (index >= 0) {
      activeIndex.value = index
    }
  }

  // --- typeahead -------------------------------------------------------------
  let buffer = ''
  let bufferTimer: ReturnType<typeof setTimeout> | undefined

  onUnmounted(() => clearTimeout(bufferTimer))

  function textOf(el: HTMLElement): string {
    return (options.textOf?.(el) ?? el.textContent ?? '').trim().toLowerCase()
  }

  function typeaheadTo(letter: string): number {
    clearTimeout(bufferTimer)
    bufferTimer = setTimeout(() => { buffer = '' }, options.typeaheadTimeout ?? 500)
    // Repeating one letter cycles through the items starting with it, rather
    // than searching for "aa" — the behaviour every native menu has.
    buffer = buffer === letter ? letter : buffer + letter

    const items = options.items()
    const from = activeIndex.value < 0 ? 0 : activeIndex.value
    for (let offset = 1; offset <= items.length; offset += 1) {
      const index = (from + offset) % items.length
      const el = items[index]!
      if (!disabled(el, index) && textOf(el).startsWith(buffer)) {
        return index
      }
    }
    return -1
  }

  function onKeydown(event: KeyboardEvent): boolean {
    const axis = orientation()
    const keys = axis === 'both'
      ? [ARROWS.horizontal, ARROWS.vertical]
      : [ARROWS[axis]]

    const current = options.items().indexOf(event.target as HTMLElement)
    const from = current >= 0 ? current : activeIndex.value

    for (const { next, previous } of keys) {
      if (event.key === next || event.key === previous) {
        const to = step(from, event.key === next ? 1 : -1)
        if (to >= 0) {
          focusAt(to)
        }
        return true
      }
    }

    if (event.key === 'Home' || event.key === 'End') {
      const to = edge(event.key === 'Home' ? 1 : -1)
      if (to >= 0) {
        focusAt(to)
      }
      return true
    }

    // A single printable character, with no modifier that would make it a
    // shortcut. Space is excluded: in a menu it activates the item.
    if (
      options.typeahead?.() === true
      && event.key.length === 1
      && event.key !== ' '
      && !event.ctrlKey
      && !event.metaKey
      && !event.altKey
    ) {
      const to = typeaheadTo(event.key.toLowerCase())
      if (to >= 0) {
        focusAt(to)
        return true
      }
    }

    return false
  }

  return { activeIndex, onKeydown, focusAt, tabIndexFor, syncTo }
}
