// The popup lifecycle every overlay in the library shares: an open flag, the
// Popover API for top-layer rendering, dismissal on outside press and Escape,
// and focus handed back on the way out.
//
// Driven through a real mounted component, because two of the guarantees are
// about lifecycle: the document listeners exist only while the popup is open,
// and unmounting while open still removes them.
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { usePopoverState } from '../components/core/popover'
import type { PopoverStateOptions, PopoverState } from '../components/core/popover'

/** A trigger, a panel and something outside — the smallest realistic widget. */
function widget(options: Partial<PopoverStateOptions> = {}, panelAttrs: Record<string, string> = {}) {
  let state!: PopoverState
  const trigger = ref<HTMLElement | null>(null)
  const panel = ref<HTMLElement | null>(null)

  const Host = defineComponent({
    setup() {
      state = usePopoverState({
        boundary: () => [trigger.value, panel.value],
        popoverElement: () => panel.value,
        returnFocusTo: () => trigger.value,
        ...options,
      })
      return () => h('div', [
        h('button', { ref: trigger, type: 'button', class: 'trigger' }, 'open'),
        h('div', { ref: panel, class: 'panel', ...panelAttrs }, [
          h('button', { type: 'button', class: 'inner' }, 'inside'),
        ]),
      ])
    },
  })

  const wrapper = mount(Host, { attachTo: document.body })
  const outside = document.createElement('button')
  document.body.appendChild(outside)

  return {
    wrapper,
    outside,
    state: () => state,
    trigger: () => wrapper.find('.trigger').element as HTMLElement,
    panel: () => wrapper.find('.panel').element as HTMLElement,
    inner: () => wrapper.find('.inner').element as HTMLElement,
  }
}

const press = (key: string) => document.dispatchEvent(
  new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }),
)
const pressDown = (el: Element) => el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

describe('open and close', () => {
  it('starts closed', () => {
    expect(widget().state().isOpen.value).toBe(false)
  })

  it('opens, closes and toggles', async () => {
    const w = widget()
    await w.state().open()
    expect(w.state().isOpen.value).toBe(true)

    w.state().close()
    expect(w.state().isOpen.value).toBe(false)

    w.state().toggle()
    await nextTick()
    expect(w.state().isOpen.value).toBe(true)
    w.state().toggle()
    expect(w.state().isOpen.value).toBe(false)
  })

  it('stays shut while disabled', async () => {
    const w = widget({ disabled: () => true })
    await w.state().open()
    w.state().toggle()
    await nextTick()
    expect(w.state().isOpen.value).toBe(false)
  })

  it('opening twice is one open', async () => {
    const onOpening = vi.fn()
    const w = widget({ onOpening })
    await w.state().open()
    await w.state().open()
    expect(onOpening).toHaveBeenCalledTimes(1)
  })

  it('gives focus back to the trigger, unless asked not to', async () => {
    const w = widget()
    await w.state().open()
    w.inner().focus()

    w.state().close()
    expect(document.activeElement).toBe(w.trigger())

    await w.state().open()
    w.inner().focus()
    const before = document.activeElement
    w.state().close(false)
    expect(document.activeElement).toBe(before)
  })
})

describe('hooks', () => {
  it('runs them in lifecycle order around the paint', async () => {
    const calls: string[] = []
    const w = widget({
      onOpening: () => calls.push('opening'),
      onOpened: () => calls.push('opened'),
      onClosing: () => calls.push('closing'),
      onClosed: () => calls.push('closed'),
    })

    await w.state().open()
    expect(calls).toEqual(['opening', 'opened'])

    w.state().close()
    expect(calls).toEqual(['opening', 'opened', 'closing', 'closed'])
  })

  it('sees the popup still open in onClosing, already closed in onClosed', async () => {
    const seen: boolean[] = []
    // The hooks run before `widget()` has returned, so they read the state back
    // through the same accessor the tests use.
    const w = widget({
      onClosing: () => seen.push(w.state().isOpen.value),
      onClosed: () => seen.push(w.state().isOpen.value),
    })

    await w.state().open()
    w.state().close()

    expect(seen).toEqual([true, false])
  })

  it('swallows a re-entrant close from inside onClosing', async () => {
    // Resolving a pending value can select, and selecting closes. The second
    // close must not run the hooks again.
    const onClosed = vi.fn()
    const w = widget({ onClosing: () => w.state().close(), onClosed })

    await w.state().open()
    w.state().close()

    expect(onClosed).toHaveBeenCalledTimes(1)
    expect(w.state().isOpen.value).toBe(false)
  })
})

describe('dismissal', () => {
  it('closes on a press outside, without stealing focus', async () => {
    const w = widget()
    await w.state().open()
    w.outside.focus()
    const before = document.activeElement

    pressDown(w.outside)

    expect(w.state().isOpen.value).toBe(false)
    expect(document.activeElement).toBe(before)
  })

  it('ignores a press anywhere inside the boundary', async () => {
    const w = widget()
    await w.state().open()

    pressDown(w.inner())
    expect(w.state().isOpen.value).toBe(true)

    pressDown(w.trigger())
    expect(w.state().isOpen.value).toBe(true)
  })

  it('honours closeOnClickOutside: false', async () => {
    const w = widget({ closeOnClickOutside: () => false })
    await w.state().open()
    pressDown(w.outside)
    expect(w.state().isOpen.value).toBe(true)
  })

  it('lets clickOutsideFilter veto one dismissal', async () => {
    // The consumer keeps a portalled sub-panel alive: visually elsewhere,
    // logically part of the widget.
    const keep = document.createElement('div')
    document.body.appendChild(keep)
    const w = widget({ clickOutsideFilter: (event) => event.target !== keep })

    await w.state().open()
    pressDown(keep)
    expect(w.state().isOpen.value).toBe(true)

    pressDown(w.outside)
    expect(w.state().isOpen.value).toBe(false)
    keep.remove()
  })

  it('closes on Escape from anywhere, and hands focus back', async () => {
    const w = widget()
    await w.state().open()
    w.inner().focus()

    press('Escape')

    expect(w.state().isOpen.value).toBe(false)
    expect(document.activeElement).toBe(w.trigger())
  })

  it('honours closeOnEscape: false', async () => {
    const w = widget({ closeOnEscape: () => false })
    await w.state().open()
    press('Escape')
    expect(w.state().isOpen.value).toBe(true)
  })
})

describe('document subscription', () => {
  it('only listens while open, and cleans up on unmount', async () => {
    const dismissal = ['mousedown', 'keydown']
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const count = (spy: typeof add) => spy.mock.calls.filter(([type]) => dismissal.includes(type)).length

    try {
      const w = widget()
      await nextTick()
      expect(count(add), 'closed').toBe(0)

      await w.state().open()
      expect(count(add), 'open').toBe(2)

      w.state().close()
      await nextTick()
      expect(count(remove), 'closed again').toBe(2)

      await w.state().open()
      w.wrapper.unmount()
      expect(count(remove), 'unmounted while open').toBe(4)
    }
    finally {
      add.mockRestore()
      remove.mockRestore()
    }
  })

  it('is not fooled by the very press that opened it', async () => {
    // The listener is attached on the pre-flush tick, so the click that opened
    // the popup has finished propagating before anything is watching for it.
    const w = widget()
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    opener.addEventListener('mousedown', () => void w.state().open())

    pressDown(opener)
    await nextTick()

    expect(w.state().isOpen.value).toBe(true)
    opener.remove()
  })
})

describe('Popover API', () => {
  it('shows and hides the top-layer element', async () => {
    const w = widget({}, { popover: 'manual' })
    const panel = w.panel()
    const show = vi.fn()
    const hide = vi.fn()
    let shown = false
    Object.assign(panel, {
      showPopover: () => { show(); shown = true },
      hidePopover: () => { hide(); shown = false },
      matches: (selector: string) => (selector === ':popover-open' ? shown : false),
    })

    await w.state().open()
    expect(show).toHaveBeenCalledTimes(1)

    w.state().close()
    expect(hide).toHaveBeenCalledTimes(1)
  })

  it('leaves an ordinary element alone', async () => {
    const w = widget()
    const show = vi.fn()
    Object.assign(w.panel(), { showPopover: show })

    await w.state().open()

    // No `popover` attribute: the panel is rendered inline, not in the top layer.
    expect(show).not.toHaveBeenCalled()
  })
})
