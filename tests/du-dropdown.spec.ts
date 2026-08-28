// DuDropdown: a disclosure button and the panel it shows.
//
// The old component was CSS-only — an `open` prop that added a class, no state,
// no dismissal, and a `triggerProps` scope its own comment promised but never
// filled. What is asserted here is behaviour a user or a screen reader can
// observe, not the class list.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import DuDropdown from '../components/Actions/du-dropdown/du-dropdown.vue'
import { mockPopoverApi } from './helpers/environment'

const TRIGGER = '<template #trigger="{ triggerProps }"><button v-bind="triggerProps" class="trigger">Open</button></template>'
const PANEL = '<template #default="{ close }"><button class="item" @click="close">Item</button></template>'

// Every dropdown attaches to the document and keeps listening while open, so a
// leftover from a previous test would answer the next test's Escape.
const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

function dropdown(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuDropdown, {
    attachTo: document.body,
    props,
    slots: { trigger: TRIGGER, default: PANEL, ...slots },
  })
  mounted.push(wrapper)
  const outside = document.createElement('button')
  document.body.appendChild(outside)

  return {
    wrapper,
    outside,
    trigger: () => wrapper.find('.trigger'),
    /** The hover listeners are attached to the root element, not bound in the template. */
    pointer: (type: 'mouseenter' | 'mouseleave') =>
      wrapper.element.dispatchEvent(new MouseEvent(type)),
    item: () => wrapper.find('.item'),
    panel: () => wrapper.find('.dropdown-content'),
    isOpen: () => wrapper.find('.trigger').attributes('aria-expanded') === 'true',
    lastOpenEmit: () => wrapper.emitted('update:open')?.at(-1)?.[0],
  }
}

const pressDown = (el: Element) => el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
const escape = () => document.dispatchEvent(
  new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
)

describe('state', () => {
  it('starts closed and toggles on the trigger', async () => {
    const d = dropdown()
    expect(d.isOpen()).toBe(false)

    await d.trigger().trigger('click')
    expect(d.isOpen()).toBe(true)

    await d.trigger().trigger('click')
    expect(d.isOpen()).toBe(false)
  })

  it('emits update:open, plus open and close', async () => {
    const d = dropdown()

    await d.trigger().trigger('click')
    expect(d.lastOpenEmit()).toBe(true)
    expect(d.wrapper.emitted('open')).toHaveLength(1)

    await d.trigger().trigger('click')
    expect(d.lastOpenEmit()).toBe(false)
    expect(d.wrapper.emitted('close')).toHaveLength(1)
  })

  it('follows an `open` prop it is given, and does not move on its own', async () => {
    const d = dropdown({ open: false })

    await d.trigger().trigger('click')
    expect(d.lastOpenEmit(), 'it asks').toBe(true)
    expect(d.isOpen(), 'but the parent decides').toBe(false)

    await d.wrapper.setProps({ open: true })
    expect(d.isOpen()).toBe(true)
  })

  it('refuses to open while disabled', async () => {
    const d = dropdown({ disabled: true })
    await d.trigger().trigger('click')
    expect(d.isOpen()).toBe(false)
  })

  it('closes itself from the panel through the slot scope', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')

    await d.item().trigger('click')

    expect(d.isOpen()).toBe(false)
  })
})

describe('trigger props', () => {
  it('wires the disclosure attributes to the panel', async () => {
    const d = dropdown()
    const controls = d.trigger().attributes('aria-controls')

    expect(d.trigger().attributes('aria-haspopup')).toBe('true')
    expect(d.trigger().attributes('aria-expanded')).toBe('false')
    expect(controls).toBeTruthy()
    expect(d.panel().attributes('id')).toBe(controls)

    await d.trigger().trigger('click')
    expect(d.trigger().attributes('aria-expanded')).toBe('true')
  })

  it('gives two dropdowns on a page different ids', () => {
    // One app, two instances — the case that actually collides. Two separate
    // mounts each restart Vue's id counter, which is what makes ids
    // deterministic across renders (see generated-ids.spec.ts).
    const page = mount(defineComponent({
      render: () => [h(DuDropdown, null, { trigger: () => h('button') }), h(DuDropdown, null, { trigger: () => h('button') })],
    }))
    mounted.push(page)

    const ids = page.findAllComponents(DuDropdown)
      .map((instance) => instance.find('.dropdown-content').attributes('id'))

    expect(ids[0]).toBeTruthy()
    expect(ids[0]).not.toBe(ids[1])
  })

  it('opens on ArrowDown without toggling shut again', async () => {
    const d = dropdown()

    await d.trigger().trigger('keydown', { key: 'ArrowDown' })
    expect(d.isOpen()).toBe(true)

    await d.trigger().trigger('keydown', { key: 'ArrowDown' })
    expect(d.isOpen(), 'ArrowDown opens; it never closes').toBe(true)
  })
})

describe('dismissal', () => {
  it('closes on a press outside', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')

    pressDown(d.outside)
    await nextTick()

    expect(d.isOpen()).toBe(false)
  })

  it('stays open on a press inside the panel', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')

    pressDown(d.panel().element)
    await nextTick()

    expect(d.isOpen()).toBe(true)
  })

  it('honours closeOnClickOutside: false', async () => {
    const d = dropdown({ closeOnClickOutside: false })
    await d.trigger().trigger('click')

    pressDown(d.outside)
    await nextTick()

    expect(d.isOpen()).toBe(true)
  })

  it('closes on Escape and hands focus back to the trigger', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')
    ;(d.item().element as HTMLElement).focus()

    escape()
    await nextTick()

    expect(d.isOpen()).toBe(false)
    expect(document.activeElement).toBe(d.trigger().element)
  })

  it('honours closeOnEscape: false', async () => {
    const d = dropdown({ closeOnEscape: false })
    await d.trigger().trigger('click')

    escape()
    await nextTick()

    expect(d.isOpen()).toBe(true)
  })

  it('closes when focus tabs out of it', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')

    await d.item().trigger('focusout', { relatedTarget: d.outside })

    expect(d.isOpen()).toBe(false)
  })

  it('stays open when focus moves within it', async () => {
    const d = dropdown()
    await d.trigger().trigger('click')

    await d.item().trigger('focusout', { relatedTarget: d.trigger().element })

    expect(d.isOpen()).toBe(true)
  })

  it('stays open when focus leaves the document entirely', async () => {
    // Switching windows reports a null relatedTarget; that is not an exit.
    const d = dropdown()
    await d.trigger().trigger('click')

    await d.item().trigger('focusout', { relatedTarget: null })

    expect(d.isOpen()).toBe(true)
  })
})

describe('hover', () => {
  it('opens and closes after the delays, not instantly', async () => {
    vi.useFakeTimers()
    try {
      const d = dropdown({ hover: true, openDelay: 100, closeDelay: 100 })

      d.pointer('mouseenter')
      expect(d.isOpen(), 'a pointer crossing the trigger must not flash it').toBe(false)

      vi.advanceTimersByTime(100)
      await nextTick()
      expect(d.isOpen()).toBe(true)

      d.pointer('mouseleave')
      expect(d.isOpen()).toBe(true)
      vi.advanceTimersByTime(100)
      await nextTick()
      expect(d.isOpen()).toBe(false)
    }
    finally {
      vi.useRealTimers()
    }
  })

  it('cancels a pending close when the pointer comes back', async () => {
    vi.useFakeTimers()
    try {
      const d = dropdown({ hover: true, openDelay: 0, closeDelay: 100 })
      d.pointer('mouseenter')
      vi.advanceTimersByTime(0)
      await nextTick()

      d.pointer('mouseleave')
      vi.advanceTimersByTime(50)
      d.pointer('mouseenter')
      vi.advanceTimersByTime(100)
      await nextTick()

      expect(d.isOpen()).toBe(true)
    }
    finally {
      vi.useRealTimers()
    }
  })

  it('opens on keyboard focus too — a pointer-only affordance is not one', async () => {
    const d = dropdown({ hover: true })

    await d.trigger().trigger('focusin')

    expect(d.isOpen()).toBe(true)
  })

  it('does not even listen for hover when the prop is off', async () => {
    vi.useFakeTimers()
    try {
      const d = dropdown()
      d.pointer('mouseenter')
      vi.advanceTimersByTime(1000)
      await nextTick()
      expect(d.isOpen()).toBe(false)
    }
    finally {
      vi.useRealTimers()
    }
  })
})

describe('placement', () => {
  it('accepts a keyword, a comma-separated string, an array and an object', () => {
    expect(dropdown({ placement: 'top' }).wrapper.classes()).toContain('dropdown-top')

    const commas = dropdown({ placement: 'top,end' }).wrapper.classes()
    expect(commas).toEqual(expect.arrayContaining(['dropdown-top', 'dropdown-end']))

    const array = dropdown({ placement: ['top', 'end'] }).wrapper.classes()
    expect(array).toEqual(expect.arrayContaining(['dropdown-top', 'dropdown-end']))

    const object = dropdown({ placement: { top: true, end: false, start: true } }).wrapper.classes()
    expect(object).toEqual(expect.arrayContaining(['dropdown-top', 'dropdown-start']))
    expect(object).not.toContain('dropdown-end')
  })

  it('defaults to bottom', () => {
    expect(dropdown().wrapper.classes()).toContain('dropdown-bottom')
  })

  it('states the closed state in the markup, so :focus-within cannot reopen it', async () => {
    // daisyUI shows `.dropdown-content` on `:focus-within`. Without an explicit
    // `dropdown-close`, focusing the trigger would show the panel while
    // `aria-expanded` still said false.
    const d = dropdown()
    expect(d.wrapper.classes()).toContain('dropdown-close')

    await d.trigger().trigger('click')
    expect(d.wrapper.classes()).toContain('dropdown-open')
    expect(d.wrapper.classes()).not.toContain('dropdown-close')
  })
})

describe('popover mode', () => {
  it('actually drives the top layer, not just the attribute', async () => {
    // happy-dom has no Popover API, so one is installed: rendering
    // `popover="manual"` and never calling `showPopover` would leave the panel
    // invisible in a real browser, and no attribute assertion would notice.
    const popover = mockPopoverApi()
    try {
      const d = dropdown({ popover: true })

      await d.trigger().trigger('click')
      expect(popover.isOpen(d.wrapper.find('[popover]').element)).toBe(true)

      await d.trigger().trigger('click')
      expect(popover.openCount).toBe(0)
    }
    finally {
      popover.restore()
    }
  })

  it('mounts the panel in the top layer only while open, with an anchor style', async () => {
    const d = dropdown({ popover: true })
    expect(d.wrapper.find('[popover]').exists()).toBe(false)

    await d.trigger().trigger('click')
    const panel = d.wrapper.find('[popover]')

    expect(panel.exists()).toBe(true)
    // `.dropdown-content` is absolutely positioned, which fights the top layer's
    // `position: fixed`; the anchor style takes over instead.
    expect(panel.classes()).not.toContain('dropdown-content')
    expect(panel.classes()).toContain('bg-base-100')
  })

  it('keeps the panel inline otherwise', () => {
    const d = dropdown()
    expect(d.panel().exists()).toBe(true)
    expect(d.panel().attributes('popover')).toBeUndefined()
  })
})

describe('slots', () => {
  it('renders both the content slot and the default slot in the panel', () => {
    const d = dropdown({}, {
      content: '<p class="named">Named</p>',
      default: '<p class="unnamed">Unnamed</p>',
    })
    expect(d.panel().find('.named').exists()).toBe(true)
    expect(d.panel().find('.unnamed').exists()).toBe(true)
  })

  it('hands the trigger slot the state and a toggle', async () => {
    const wrapper = mount(DuDropdown, {
      slots: {
        trigger: `<template #trigger="{ open, toggle }"><button class="trigger" @click="toggle">{{ open ? 'shut me' : 'open me' }}</button></template>`,
      },
    })

    expect(wrapper.find('.trigger').text()).toBe('open me')
    await wrapper.find('.trigger').trigger('click')
    expect(wrapper.find('.trigger').text()).toBe('shut me')
  })
})
