// DuTooltip: a description attached to the thing it points at.
//
// The old component was classes only — `data-tip`, `tooltip-open`, position
// modifiers — with no ARIA, no keyboard trigger and no way to dismiss it. A
// tooltip that only answers to the mouse fails WCAG 1.4.13 twice over: it is
// unreachable by keyboard and cannot be dismissed.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import DuTooltip from '../components/Feedback/du-tooltip/du-tooltip.vue'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
  vi.useRealTimers()
})

const TRIGGER = '<button class="trigger">Save</button>'

function tooltip(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuTooltip, {
    attachTo: document.body,
    props: { dataTip: 'Saves the document', ...props },
    slots: { default: TRIGGER, ...slots },
  })
  mounted.push(wrapper)

  return {
    wrapper,
    trigger: () => wrapper.find('.trigger'),
    tip: () => wrapper.find('[role="tooltip"]'),
    isOpen: () => wrapper.find('[role="tooltip"]').exists(),
    /** The listeners live on the root element, not on template bindings. */
    pointer: (type: 'mouseenter' | 'mouseleave') =>
      wrapper.element.dispatchEvent(new MouseEvent(type)),
  }
}

const escape = () => document.dispatchEvent(
  new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
)

describe('the tip itself', () => {
  it('is absent until it is shown', () => {
    const t = tooltip()
    expect(t.isOpen()).toBe(false)
  })

  it('carries the tooltip role and the text', async () => {
    const t = tooltip({ open: true })
    await nextTick()

    expect(t.tip().attributes('role')).toBe('tooltip')
    expect(t.tip().text()).toBe('Saves the document')
  })

  it('takes markup from the content slot instead', async () => {
    const t = tooltip({ open: true }, { content: '<b class="rich">Rich</b>' })
    await nextTick()

    expect(t.tip().find('.rich').exists()).toBe(true)
  })

  it('never opens with nothing to say', async () => {
    const t = tooltip({ dataTip: '' })
    t.pointer('mouseenter')
    await nextTick()
    expect(t.isOpen()).toBe(false)
  })

  it('is not rendered through data-tip, so daisyUI cannot reveal it on its own', () => {
    // `.tooltip[data-tip]:hover` shows the tip in CSS, with no delay and no way
    // to dismiss it. The tip has to be a real element the component owns.
    const t = tooltip()
    expect(t.wrapper.attributes('data-tip')).toBeUndefined()
  })
})

describe('describing the trigger', () => {
  it('points aria-describedby at the tip while it is shown', async () => {
    const t = tooltip()
    expect(t.trigger().attributes('aria-describedby')).toBeUndefined()

    await t.wrapper.setProps({ open: true })
    await nextTick()

    expect(t.trigger().attributes('aria-describedby')).toBe(t.tip().attributes('id'))
  })

  it('lets go again when the tip goes away', async () => {
    const t = tooltip({ open: true })
    await nextTick()

    await t.wrapper.setProps({ open: false })
    await nextTick()

    expect(t.trigger().attributes('aria-describedby')).toBeUndefined()
  })

  it('gives two tooltips on a page different ids', async () => {
    // One app, two instances — the case that actually collides. Two separate
    // mounts each restart Vue's id counter, which is what makes ids
    // deterministic across renders (see generated-ids.spec.ts).
    const page = mount(defineComponent({
      render: () => [
        h(DuTooltip, { open: true, dataTip: 'a' }),
        h(DuTooltip, { open: true, dataTip: 'b' }),
      ],
    }))
    mounted.push(page)
    await nextTick()

    const ids = page.findAll('[role="tooltip"]').map((w) => w.attributes('id'))
    expect(ids[0]).toBeTruthy()
    expect(ids[0]).not.toBe(ids[1])
  })
})

describe('hover', () => {
  it('waits out openDelay before appearing', async () => {
    vi.useFakeTimers()
    const t = tooltip({ openDelay: 300 })

    t.pointer('mouseenter')
    expect(t.isOpen(), 'a pointer crossing the trigger must not flash it').toBe(false)

    vi.advanceTimersByTime(300)
    await nextTick()
    expect(t.isOpen()).toBe(true)
  })

  it('lingers for closeDelay, long enough to reach the tip', async () => {
    vi.useFakeTimers()
    const t = tooltip({ openDelay: 0, closeDelay: 100 })
    t.pointer('mouseenter')
    vi.advanceTimersByTime(0)
    await nextTick()

    t.pointer('mouseleave')
    expect(t.isOpen(), 'still there').toBe(true)

    vi.advanceTimersByTime(100)
    await nextTick()
    expect(t.isOpen()).toBe(false)
  })

  it('cancels a pending close when the pointer comes back', async () => {
    vi.useFakeTimers()
    const t = tooltip({ openDelay: 0, closeDelay: 100 })
    t.pointer('mouseenter')
    vi.advanceTimersByTime(0)
    await nextTick()

    t.pointer('mouseleave')
    vi.advanceTimersByTime(50)
    t.pointer('mouseenter')
    vi.advanceTimersByTime(100)
    await nextTick()

    expect(t.isOpen()).toBe(true)
  })
})

describe('keyboard', () => {
  it('appears on focus, with no delay to stutter through', async () => {
    const t = tooltip({ openDelay: 300 })

    await t.trigger().trigger('focusin')

    expect(t.isOpen()).toBe(true)
  })

  it('goes away when focus leaves', async () => {
    const t = tooltip()
    await t.trigger().trigger('focusin')

    await t.trigger().trigger('focusout', { relatedTarget: document.body })

    expect(t.isOpen()).toBe(false)
  })

  it('stays while focus moves within it', async () => {
    const t = tooltip()
    await t.trigger().trigger('focusin')

    await t.trigger().trigger('focusout', { relatedTarget: t.wrapper.element })

    expect(t.isOpen()).toBe(true)
  })

  it('is dismissible with Escape — WCAG 1.4.13', async () => {
    const t = tooltip()
    await t.trigger().trigger('focusin')
    expect(t.isOpen()).toBe(true)

    escape()
    await nextTick()

    expect(t.isOpen()).toBe(false)
  })
})

describe('control', () => {
  it('follows an `open` prop it is given, and does not move on its own', async () => {
    vi.useFakeTimers()
    const t = tooltip({ open: false, openDelay: 0 })

    t.pointer('mouseenter')
    vi.advanceTimersByTime(0)
    await nextTick()

    expect(t.wrapper.emitted('update:open')?.at(-1), 'it asks').toEqual([true])
    expect(t.isOpen(), 'but the parent decides').toBe(false)
  })

  it('refuses to open while disabled', async () => {
    const t = tooltip({ disabled: true })
    await t.trigger().trigger('focusin')
    expect(t.isOpen()).toBe(false)
  })
})

describe('presentation', () => {
  it('keeps the daisyUI position and variant classes', () => {
    const t = tooltip({ position: 'right', variant: 'primary' })
    expect(t.wrapper.classes()).toEqual(
      expect.arrayContaining(['tooltip', 'tooltip-right', 'tooltip-primary']),
    )
  })

  it('marks itself open for daisyUI too', async () => {
    const t = tooltip({ open: true })
    await nextTick()
    expect(t.wrapper.classes()).toContain('tooltip-open')
  })

  it('only applies the tooltip above the breakpoint when responsive', () => {
    expect(tooltip({ responsive: true }).wrapper.classes()).toContain('lg:tooltip')
  })

  it('renders the tip in the top layer when asked', async () => {
    const t = tooltip({ open: true, popover: true })
    await nextTick()
    expect(t.tip().attributes('popover')).toBe('manual')
  })
})
