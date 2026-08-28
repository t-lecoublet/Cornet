// DuMenu is two components chosen by `role`.
//
// `nav` (the default) is a list of links: no ARIA role, native Tab, and that
// is the honest description of a sidebar. `menu` is the APG menu pattern: one
// tab stop, arrow keys, typeahead, collapsible submenus. The old component was
// neither — it wore `role="listbox"` / `role="option"`, which announces a
// single-choice control, over a set of navigation links.
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DuMenu from '../components/Navigation/du-menu/du-menu.vue'
import type { DuMenuItemData } from '../components/Navigation/du-menu/du-menu.types'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

const items: DuMenuItemData[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Archived', href: '/archived', disabled: true },
  { label: 'Contact', href: '/contact' },
]

const nested: DuMenuItemData[] = [
  { label: 'Files', subItems: [{ label: 'Open', value: 'open' }, { label: 'Save', value: 'save' }] },
  { label: 'Quit', value: 'quit' },
]

function menu(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuMenu, { props, slots, attachTo: document.body })
  mounted.push(wrapper)
  return {
    wrapper,
    list: () => wrapper.find('ul'),
    entries: () => wrapper.findAll('[role="menuitem"], [role="menuitemcheckbox"]'),
    elements: () => wrapper.findAll('[role="menuitem"], [role="menuitemcheckbox"]')
      .map((w) => w.element as HTMLElement),
    links: () => wrapper.findAll('a'),
    byLabel: (label: string) => wrapper.findAll('a, [role="menuitem"]')
      .find((w) => w.text().trim().startsWith(label))!,
    focused: () => (document.activeElement as HTMLElement | null)?.textContent?.trim(),
  }
}

/** A bubbled keydown, whose target is the focused element — as a real one is. */
async function press(element: HTMLElement, key: string) {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
  await nextTick()
}

describe('nav mode (the default)', () => {
  it('is a plain list, with no ARIA role at all', () => {
    const m = menu({ items })
    expect(m.list().attributes('role')).toBeUndefined()
    expect(m.list().attributes('aria-orientation')).toBeUndefined()
    expect(m.entries()).toHaveLength(0)
  })

  it('leaves the links in the natural tab order', () => {
    const m = menu({ items })
    // No roving: every link is its own tab stop, which is what Tab through a
    // sidebar should do.
    expect(m.links().every((link) => link.attributes('tabindex') === undefined)).toBe(true)
  })

  it('marks the current page', () => {
    const m = menu({ items, activeItem: 'Products' })
    expect(m.byLabel('Products').attributes('aria-current')).toBe('page')
    expect(m.byLabel('Home').attributes('aria-current')).toBeUndefined()
  })

  it('takes a disabled item out of the tab order and off the map', () => {
    const m = menu({ items })
    const archived = m.byLabel('Archived')
    expect(archived.attributes('aria-disabled')).toBe('true')
    expect(archived.attributes('href'), 'not a destination').toBeUndefined()
  })

  it('shows every level at once — a sidebar does not collapse', () => {
    const m = menu({ items: nested })
    expect(m.links().map((l) => l.text().trim())).toEqual(
      expect.arrayContaining(['Open', 'Save']),
    )
  })

  it('ignores the arrow keys', async () => {
    const m = menu({ items })
    const home = m.byLabel('Home').element as HTMLElement
    home.focus()

    await press(home, 'ArrowDown')

    expect(document.activeElement).toBe(home)
  })
})

describe('menu mode', () => {
  it('wears the menu roles', () => {
    const m = menu({ role: 'menu', items, ariaLabel: 'Actions' })
    expect(m.list().attributes('role')).toBe('menu')
    expect(m.list().attributes('aria-label')).toBe('Actions')
    expect(m.entries()).toHaveLength(4)
  })

  it('reports its orientation', () => {
    expect(menu({ role: 'menu', items }).list().attributes('aria-orientation')).toBe('vertical')
    expect(menu({ role: 'menu', items, direction: 'horizontal' }).list().attributes('aria-orientation'))
      .toBe('horizontal')
  })

  it('is one tab stop, on the first item that can hold it', () => {
    const m = menu({ role: 'menu', items })
    expect(m.elements().map((el) => el.getAttribute('tabindex'))).toEqual(['0', '-1', '-1', '-1'])
  })

  it('moves the tab stop with the focus, so Tab always leaves the menu', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()
    els[1]!.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    await nextTick()

    expect(m.elements().map((el) => el.getAttribute('tabindex'))).toEqual(['-1', '0', '-1', '-1'])
  })

  it('moves with the arrows and wraps', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()
    els[0]!.focus()

    await press(els[0]!, 'ArrowDown')
    expect(m.focused()).toBe('Products')

    await press(els[1]!, 'ArrowUp')
    expect(m.focused()).toBe('Home')

    await press(els[0]!, 'ArrowUp')
    expect(m.focused(), 'wraps past the disabled one').toBe('Contact')
  })

  it('steps over a disabled item', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()
    els[1]!.focus()

    await press(els[1]!, 'ArrowDown')

    expect(m.focused()).toBe('Contact')
  })

  it('uses the horizontal arrows when laid out horizontally', async () => {
    const m = menu({ role: 'menu', items, direction: 'horizontal' })
    const els = m.elements()
    els[0]!.focus()

    await press(els[0]!, 'ArrowDown')
    expect(m.focused(), 'wrong axis').toBe('Home')

    await press(els[0]!, 'ArrowRight')
    expect(m.focused()).toBe('Products')
  })

  it('jumps to the ends on Home and End', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()
    els[1]!.focus()

    await press(els[1]!, 'End')
    expect(m.focused()).toBe('Contact')

    await press(document.activeElement as HTMLElement, 'Home')
    expect(m.focused()).toBe('Home')
  })

  it('jumps to an item by its first letters', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()
    els[0]!.focus()

    await press(els[0]!, 'c')

    expect(m.focused()).toBe('Contact')
  })

  it('activates on Enter and on Space, like a button', async () => {
    const m = menu({ role: 'menu', items })
    const els = m.elements()

    await press(els[0]!, 'Enter')
    expect(m.wrapper.emitted('itemClick')?.[0]).toEqual([items[0]])

    await press(els[1]!, ' ')
    expect(m.wrapper.emitted('itemClick')?.[1]).toEqual([items[1]])
  })

  it('says nothing happened on a disabled item', async () => {
    const m = menu({ role: 'menu', items })
    await m.entries()[2]!.trigger('click')
    expect(m.wrapper.emitted('itemClick')).toBeUndefined()
  })

  it('marks a checkable item with aria-checked instead of a hidden input', () => {
    const checkable: DuMenuItemData[] = [{ label: 'Wrap', value: 'wrap', multiple: true, checked: true }]
    const m = menu({ role: 'menu', items: checkable })

    expect(m.entries()[0]!.attributes('role')).toBe('menuitemcheckbox')
    expect(m.entries()[0]!.attributes('aria-checked')).toBe('true')
    expect(m.wrapper.find('input').exists()).toBe(false)
  })
})

describe('menu submenus', () => {
  it('starts collapsed and says so', () => {
    const m = menu({ role: 'menu', items: nested })
    const parent = m.entries()[0]!

    expect(parent.attributes('aria-haspopup')).toBe('menu')
    expect(parent.attributes('aria-expanded')).toBe('false')
  })

  it('opens on ArrowRight and focuses the first child', async () => {
    const m = menu({ role: 'menu', items: nested })
    const parent = m.elements()[0]!
    parent.focus()

    await press(parent, 'ArrowRight')
    await nextTick()

    expect(m.entries()[0]!.attributes('aria-expanded')).toBe('true')
    expect(m.focused()).toBe('Open')
  })

  it('closes on ArrowLeft and steps back to the parent', async () => {
    const m = menu({ role: 'menu', items: nested })
    const parent = m.elements()[0]!
    parent.focus()
    await press(parent, 'ArrowRight')
    await nextTick()

    await press(document.activeElement as HTMLElement, 'ArrowLeft')

    expect(m.entries()[0]!.attributes('aria-expanded')).toBe('false')
    expect(m.focused()).toBe('Files')
  })

  it('toggles on click without emitting a selection', async () => {
    const m = menu({ role: 'menu', items: nested })

    await m.entries()[0]!.trigger('click')
    expect(m.entries()[0]!.attributes('aria-expanded')).toBe('true')
    expect(m.wrapper.emitted('itemClick')).toBeUndefined()
  })

  it('emits subItemClick for a nested item', async () => {
    const m = menu({ role: 'menu', items: nested })
    await m.entries()[0]!.trigger('click')

    await m.wrapper.findAll('[role="menuitem"]')
      .find((w) => w.text().trim() === 'Open')!
      .trigger('click')

    expect(m.wrapper.emitted('subItemClick')?.[0]).toEqual([nested[0]!.subItems![0]])
  })
})

describe('rendering', () => {
  it('always applies its own background', () => {
    expect(menu({ items }).list().classes()).toContain('bg-base-200')
  })

  it('renders the default slot in manual mode', () => {
    const m = menu({}, { default: '<li class="manual">Manual</li>' })
    expect(m.wrapper.find('.manual').exists()).toBe(true)
  })

  it('emits itemClick with the item that was clicked', async () => {
    const m = menu({ items })
    await m.byLabel('Home').trigger('click')
    expect(m.wrapper.emitted('itemClick')?.[0]).toEqual([items[0]])
  })

  it('renders each icon shape', () => {
    const url = menu({ items: [{ label: 'Pic', href: '#', icon: 'https://example.com/icon.png' }] })
    expect(url.wrapper.find('img').attributes('src')).toBe('https://example.com/icon.png')

    const local = menu({ items: [{ label: 'Pic', href: '#', icon: '/logo.svg' }] })
    expect(local.wrapper.find('img').attributes('src')).toBe('/logo.svg')

    const inline = menu({ items: [{ label: 'Pic', href: '#', icon: '<svg data-testid="inline"></svg>' }] })
    expect(inline.wrapper.find('[data-testid="inline"]').exists()).toBe(true)
  })
})
