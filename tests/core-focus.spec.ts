// The two focus primitives an overlay needs, and the line between them.
//
// `useFocusReturn` remembers where focus *was*; `useFocusTrap` keeps it where
// it *is*. A native <dialog> needs neither the trap (the top layer is inert
// for free) nor, usually, the return — an overlay built from ordinary elements
// needs both.
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { useFocusReturn, useFocusTrap } from '../components/core/focus'
import type { FocusTrapOptions } from '../components/core/focus'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

/** A focusable button parked in the document, standing in for "the page". */
function button(label: string) {
  const el = document.createElement('button')
  el.textContent = label
  document.body.appendChild(el)
  return el
}

describe('useFocusReturn', () => {
  it('gives focus back to what had it', () => {
    const opener = button('open')
    const inside = button('inside')
    const focusReturn = useFocusReturn()

    opener.focus()
    focusReturn.capture()
    inside.focus()

    expect(focusReturn.restore()).toBe(true)
    expect(document.activeElement).toBe(opener)
  })

  it('remembers nothing when focus was resting nowhere', () => {
    const inside = button('inside')
    const focusReturn = useFocusReturn()

    // No one had focus: the body is not somewhere to go back to.
    focusReturn.capture()
    inside.focus()

    expect(focusReturn.restore()).toBe(false)
    expect(document.activeElement, 'left where it is').toBe(inside)
  })

  it('leaves focus alone when the element is gone', () => {
    const opener = button('open')
    const inside = button('inside')
    const focusReturn = useFocusReturn()

    opener.focus()
    focusReturn.capture()
    inside.focus()
    // The row that opened the overlay was deleted while it was open.
    opener.remove()

    expect(focusReturn.restore()).toBe(false)
    expect(document.activeElement, 'not thrown at the body').toBe(inside)
  })

  it('only restores once', () => {
    const opener = button('open')
    const inside = button('inside')
    const focusReturn = useFocusReturn()

    opener.focus()
    focusReturn.capture()
    inside.focus()
    focusReturn.restore()

    inside.focus()
    expect(focusReturn.restore(), 'the memory was spent').toBe(false)
    expect(document.activeElement).toBe(inside)
  })

  it('can be told to forget', () => {
    const opener = button('open')
    const inside = button('inside')
    const focusReturn = useFocusReturn()

    opener.focus()
    focusReturn.capture()
    inside.focus()
    focusReturn.forget()

    expect(focusReturn.restore()).toBe(false)
    expect(document.activeElement).toBe(inside)
  })
})

/** A panel with three focusable children, and a page behind it. */
function trap(options: Partial<FocusTrapOptions> = {}, panelChildren = ['first', 'middle', 'last']) {
  const active = ref(false)
  const panel = ref<HTMLElement | null>(null)
  const behind = button('behind')

  const Host = defineComponent({
    setup() {
      useFocusTrap({
        container: () => panel.value,
        active: () => active.value,
        ...options,
      })
      return () => h('div', { ref: panel, tabindex: -1, class: 'panel' },
        panelChildren.map((label) => h('button', { class: label, type: 'button' }, label)))
    },
  })

  const wrapper = mount(Host, { attachTo: document.body })
  mounted.push(wrapper)

  return {
    wrapper,
    behind,
    active,
    panel: () => panel.value!,
    at: (label: string) => wrapper.element.querySelector<HTMLElement>(`.${label}`)!,
    focused: () => (document.activeElement as HTMLElement | null)?.textContent,
    async open() {
      active.value = true
      await nextTick()
    },
    tab(shiftKey = false) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }))
    },
  }
}

describe('useFocusTrap', () => {
  it('holds no listeners until it is turned on', async () => {
    const t = trap()
    t.behind.focus()

    t.tab()

    expect(document.activeElement, 'the page is still the page').toBe(t.behind)
  })

  it('moves focus into the panel when it turns on', async () => {
    const t = trap()
    t.behind.focus()

    await t.open()

    expect(t.focused()).toBe('first')
  })

  it('honours an initialFocus selector', async () => {
    const t = trap({ initialFocus: () => '.last' })
    await t.open()
    expect(t.focused()).toBe('last')
  })

  it('honours an initialFocus element', async () => {
    // Two live traps would pull focus at each other, so one per test.
    const t: ReturnType<typeof trap> = trap({ initialFocus: () => t.at('middle') })
    await t.open()
    expect(t.focused()).toBe('middle')
  })

  it('wraps Tab from the last item back to the first', async () => {
    const t = trap()
    await t.open()
    t.at('last').focus()

    t.tab()

    expect(t.focused()).toBe('first')
  })

  it('wraps Shift+Tab from the first item to the last', async () => {
    const t = trap()
    await t.open()
    t.at('first').focus()

    t.tab(true)

    expect(t.focused()).toBe('last')
  })

  it('leaves Tab alone in the middle of the panel', async () => {
    const t = trap()
    await t.open()
    t.at('middle').focus()

    t.tab()

    // Nothing was prevented: the browser's own Tab does the work from here.
    expect(t.focused()).toBe('middle')
  })

  it('pulls focus back when it escapes by some other route', async () => {
    const t = trap()
    await t.open()

    // A script, a click, the browser returning from the address bar.
    t.behind.focus()
    t.behind.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(t.focused(), 'not stranded behind the overlay').toBe('first')
  })

  it('counts a portalled region as inside', async () => {
    const portal = document.createElement('div')
    const inPortal = document.createElement('button')
    inPortal.textContent = 'portal'
    portal.appendChild(inPortal)
    document.body.appendChild(portal)

    const t = trap({ alsoInside: () => [portal] })
    await t.open()

    inPortal.focus()
    inPortal.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(t.focused(), 'left alone').toBe('portal')
  })

  it('keeps Tab inside even when there is nothing to move to', async () => {
    const t = trap({}, [])
    await t.open()

    expect(document.activeElement, 'the panel itself takes it').toBe(t.panel())
    t.tab()
    expect(document.activeElement).toBe(t.panel())
  })

  it('lets go when it is turned off', async () => {
    const t = trap()
    await t.open()

    t.active.value = false
    await nextTick()
    t.behind.focus()
    t.behind.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(document.activeElement).toBe(t.behind)
  })

  it('lets go the instant the flag flips, not a tick later', async () => {
    // A consumer that hands focus back while closing does it synchronously,
    // before any watcher has run. The trap must already be out of the way.
    const t = trap()
    await t.open()

    t.active.value = false
    t.behind.focus()
    t.behind.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(document.activeElement).toBe(t.behind)
  })

  it('lets go on unmount, even while still open', async () => {
    const t = trap()
    await t.open()

    t.wrapper.unmount()
    t.behind.focus()
    t.behind.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))

    expect(document.activeElement).toBe(t.behind)
  })
})
