import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DuDrawer from '../components/Layout/du-drawer/du-drawer.vue'
import { mockMatchMedia } from './helpers/environment'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

function mountDrawer(props: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
  const wrapper = mount(DuDrawer, { props, ...options })
  mounted.push(wrapper)
  return wrapper
}

/** What the drawer hands back through `defineExpose`. */
const exposed = (wrapper: { vm: unknown }) => wrapper.vm as { toggleDrawer: () => void }

const escape = () => document.dispatchEvent(
  new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
)

describe('DuDrawer', () => {
  it('starts closed by default', () => {
    const wrapper = mountDrawer()
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
  })

  it('respects the open prop', () => {
    const wrapper = mountDrawer({ open: true })
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('toggleDrawer() exposed method flips state and emits both update events', async () => {
    const wrapper = mountDrawer()
    await exposed(wrapper).toggleDrawer()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true])
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('reacts to external open prop changes', async () => {
    const wrapper = mountDrawer({ open: false })
    await wrapper.setProps({ open: true })
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('reacts to external modelValue prop changes', async () => {
    const wrapper = mountDrawer({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('adds drawer-end class when position is end', () => {
    const wrapper = mountDrawer({ position: 'end' })
    expect(wrapper.find('.drawer').classes()).toContain('drawer-end')
  })

  it('applies responsive breakpoint classes for each responsive value', () => {
    const xl = mountDrawer({ responsive: 'xl' })
    expect(xl.find('.drawer').classes()).toContain('xl:drawer-open')

    const boolTrue = mountDrawer({ responsive: true })
    expect(boolTrue.find('.drawer').classes()).toContain('lg:drawer-open')

    const md = mountDrawer({ responsive: 'md' })
    expect(md.find('.drawer').classes()).toContain('md:drawer-open')

    const sm = mountDrawer({ responsive: 'sm' })
    expect(sm.find('.drawer').classes()).toContain('sm:drawer-open')
  })

  it('applies alwaysOpenOnLarge class only when responsive is falsy', () => {
    const wrapper = mountDrawer({ alwaysOpenOnLarge: true })
    expect(wrapper.find('.drawer').classes()).toContain('lg:drawer-open')
  })

  it('applies iconOnly sidebar wrapper classes', () => {
    const wrapper = mountDrawer({ iconOnly: true })
    const wrapperDiv = wrapper.findAll('.drawer-side > div')[0]
    expect(wrapperDiv.classes()).toContain('is-drawer-close:w-14')
    expect(wrapperDiv.classes()).toContain('is-drawer-open:w-64')
  })

  it('forwards sidebarClass/contentClass/overlayClass', () => {
    const wrapper = mountDrawer({
      sidebarClass: 'my-sidebar',
      contentClass: 'my-content',
      overlayClass: 'my-overlay',
    })
    expect(wrapper.find('.drawer-side').classes()).toContain('my-sidebar')
    expect(wrapper.find('.drawer-content').classes()).toContain('my-content')
    expect(wrapper.find('.drawer-overlay').classes()).toContain('my-overlay')
  })

  it('renders DuMenu in dynamic items mode', () => {
    const wrapper = mountDrawer({ items: [{ label: 'A' }, { label: 'B' }] })
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
  })

  it('renders the sidebar slot in manual mode', () => {
    const wrapper = mount(DuDrawer, {
      slots: { sidebar: '<div class="my-sidebar-content">Manual sidebar</div>' },
    })
    expect(wrapper.text()).toContain('Manual sidebar')
  })

  it('closes on Escape when it owns its state', async () => {
    const wrapper = mountDrawer()
    await exposed(wrapper).toggleDrawer()

    escape()
    await nextTick()

    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })

  it('asks to close on Escape when the parent owns it, and waits', async () => {
    const wrapper = mountDrawer({ open: true })

    escape()
    await nextTick()

    expect(wrapper.emitted('update:open')?.at(-1), 'it asks').toEqual([false])
    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked, 'the parent decides').toBe(true)
  })

  it('honours closeOnEscape: false', async () => {
    const wrapper = mountDrawer({ closeOnEscape: false })
    await exposed(wrapper).toggleDrawer()

    escape()
    await nextTick()

    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('does nothing on Escape when already closed', async () => {
    const wrapper = mountDrawer()
    escape()
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  })

  it('ignores non-Escape keys', async () => {
    const wrapper = mountDrawer()
    await exposed(wrapper).toggleDrawer()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await nextTick()

    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('holds no document listener once unmounted', async () => {
    const wrapper = mountDrawer()
    await exposed(wrapper).toggleDrawer()
    wrapper.unmount()

    expect(() => escape()).not.toThrow()
  })
})

describe('DuDrawer as a dialog', () => {
  // With no `matchMedia` to say otherwise, the sidebar floats — which is the
  // safe default and the mode that carries all the behaviour.
  it('takes the dialog role only while it floats open', async () => {
    const wrapper = mountDrawer({}, { attachTo: document.body })
    const panel = () => wrapper.find('.drawer-side > div')

    expect(panel().attributes('role'), 'closed').toBeUndefined()

    await exposed(wrapper).toggleDrawer()
    expect(panel().attributes('role')).toBe('dialog')
    expect(panel().attributes('aria-modal')).toBe('true')
    expect(panel().attributes('aria-label')).toBe('Sidebar')
  })

  it('takes its accessible name from ariaLabel', async () => {
    const wrapper = mountDrawer({ ariaLabel: 'Main navigation' }, { attachTo: document.body })
    await exposed(wrapper).toggleDrawer()
    expect(wrapper.find('.drawer-side > div').attributes('aria-label')).toBe('Main navigation')
  })

  it('makes the content behind it inert, and reachable again on close', async () => {
    const wrapper = mountDrawer({}, { attachTo: document.body })
    const content = () => wrapper.find('.drawer-content')

    await exposed(wrapper).toggleDrawer()
    await nextTick()
    expect(content().attributes('inert')).toBeDefined()

    await exposed(wrapper).toggleDrawer()
    await nextTick()
    expect(content().attributes('inert')).toBeUndefined()
  })

  it('can be told to inert something else', async () => {
    const outside = document.createElement('div')
    outside.id = 'page-chrome'
    document.body.appendChild(outside)

    const wrapper = mountDrawer({ inertTarget: '#page-chrome' }, { attachTo: document.body })
    await exposed(wrapper).toggleDrawer()
    await nextTick()

    expect(outside.hasAttribute('inert')).toBe(true)
    expect(wrapper.find('.drawer-content').attributes('inert'), 'left alone').toBeUndefined()
  })

  it('keeps Tab inside the sidebar', async () => {
    const wrapper = mountDrawer(
      { items: [{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }] },
      { attachTo: document.body },
    )
    const behind = document.createElement('button')
    document.body.appendChild(behind)

    await exposed(wrapper).toggleDrawer()
    await nextTick()

    const links = wrapper.findAll('.drawer-side a').map((w) => w.element as HTMLElement)
    links[links.length - 1]!.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))

    expect(document.activeElement, 'wrapped to the first link, not out to the page').toBe(links[0])
  })

  it('hands focus back to whatever opened it', async () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    opener.focus()

    const wrapper = mountDrawer({}, { attachTo: document.body })
    await exposed(wrapper).toggleDrawer()
    expect(document.activeElement).not.toBe(opener)

    await exposed(wrapper).toggleDrawer()
    expect(document.activeElement).toBe(opener)
  })

  it('hides the layout checkbox from assistive tech — it is a mechanism, not a control', () => {
    const wrapper = mountDrawer()
    const checkbox = wrapper.find('input.drawer-toggle')
    expect(checkbox.attributes('aria-hidden')).toBe('true')
    expect(checkbox.attributes('tabindex')).toBe('-1')
  })
})

describe('DuDrawer pinned beside the content', () => {
  // Above its breakpoint the sidebar is part of the page, not a dialog. Nothing
  // else exercises this: without `matchMedia` the component answers "floating",
  // which is the safe default and what every test above runs in.
  let media: ReturnType<typeof mockMatchMedia>

  afterEach(() => media?.restore())

  function pinned(props: Record<string, unknown> = {}) {
    media = mockMatchMedia(true)
    return mountDrawer({ responsive: 'lg', ...props }, { attachTo: document.body })
  }

  it('is not a dialog', async () => {
    const wrapper = pinned()
    await exposed(wrapper).toggleDrawer()

    const panel = wrapper.find('.drawer-side > div')
    expect(panel.attributes('role')).toBeUndefined()
    expect(panel.attributes('aria-modal')).toBeUndefined()
  })

  it('leaves the content reachable', async () => {
    const wrapper = pinned()
    await exposed(wrapper).toggleDrawer()
    await nextTick()

    expect(wrapper.find('.drawer-content').attributes('inert')).toBeUndefined()
  })

  it('does not trap Tab, because there is nothing to trap it against', async () => {
    const wrapper = pinned({ items: [{ label: 'Home', href: '/' }] })
    const behind = document.createElement('button')
    document.body.appendChild(behind)

    await exposed(wrapper).toggleDrawer()
    await nextTick()

    behind.focus()
    behind.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    expect(document.activeElement, 'focus stays where the user put it').toBe(behind)
  })

  it('ignores a press on the content, which is not "outside" anything', async () => {
    const wrapper = pinned()
    await exposed(wrapper).toggleDrawer()

    wrapper.find('.drawer-content').element
      .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    await nextTick()

    const checkbox = wrapper.find('input.drawer-toggle')
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('becomes a dialog again when the viewport drops below the breakpoint', async () => {
    const wrapper = pinned()
    await exposed(wrapper).toggleDrawer()
    expect(wrapper.find('.drawer-side > div').attributes('role')).toBeUndefined()

    media.set(false)
    await nextTick()

    expect(wrapper.find('.drawer-side > div').attributes('role')).toBe('dialog')
  })
})
