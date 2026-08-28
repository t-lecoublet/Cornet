// DuAccordion and DuCollapse on the WAI-ARIA disclosure/accordion patterns.
//
// Both used to hide an `<input>` — a radio group for the accordion, a checkbox
// per panel for the collapse — and let daisyUI's CSS do the showing. A radio
// group announces a set of mutually exclusive *choices*; what is actually here
// is a set of headers that reveal content. The two are not the same thing to
// anyone listening.
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DuAccordion from '../components/DataDisplay/du-accordion/du-accordion.vue'
import DuAccordionItem from '../components/DataDisplay/du-accordion/du-accordion-item.vue'
import DuCollapse from '../components/DataDisplay/du-collapse/du-collapse.vue'
import type { DuAccordionItemData } from '../components/DataDisplay/du-accordion/du-accordion.types'
import type { DuCollapseItem } from '../components/DataDisplay/du-collapse/du-collapse.types'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

const panels: DuAccordionItemData[] = [
  { title: 'Shipping', content: 'Ships in two days', value: 'shipping' },
  { title: 'Returns', content: 'Thirty days', value: 'returns' },
  { title: 'Warranty', content: 'Two years', value: 'warranty' },
]

function accordion(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuAccordion, { props: { items: panels, ...props }, slots })
  mounted.push(wrapper)
  return {
    wrapper,
    headers: () => wrapper.findAll('button.collapse-title'),
    regions: () => wrapper.findAll('[role="region"]'),
    expanded: () => wrapper.findAll('button.collapse-title')
      .filter((w) => w.attributes('aria-expanded') === 'true')
      .map((w) => w.text()),
    boxes: () => wrapper.findAll('.collapse'),
  }
}

describe('accordion semantics', () => {
  it('has no hidden inputs left', () => {
    expect(accordion().wrapper.findAll('input')).toHaveLength(0)
  })

  it('is a button per header, naming the region it reveals', () => {
    const a = accordion()
    const header = a.headers()[0]!
    const region = a.regions()[0]!

    expect(header.attributes('aria-controls')).toBe(region.attributes('id'))
    expect(region.attributes('aria-labelledby')).toBe(header.attributes('id'))
    expect(header.attributes('aria-expanded')).toBe('false')
  })

  it('states the closed state in the markup too', () => {
    // daisyUI opens a collapse on `:focus-within`. Without an explicit
    // `collapse-close`, tabbing to the header would reveal the panel while
    // `aria-expanded` still said false.
    const a = accordion()
    expect(a.boxes()[0]!.classes()).toContain('collapse-close')

    return a.headers()[0]!.trigger('click').then(() => {
      expect(a.boxes()[0]!.classes()).toContain('collapse-open')
      expect(a.boxes()[0]!.classes()).not.toContain('collapse-close')
    })
  })
})

describe('accordion selection', () => {
  it('starts on the panel marked checked', () => {
    const a = accordion({ items: [{ title: 'A', checked: true }, { title: 'B' }] })
    expect(a.expanded()).toEqual(['A'])
  })

  it('opens one at a time, closing the last', async () => {
    const a = accordion()

    await a.headers()[0]!.trigger('click')
    expect(a.expanded()).toEqual(['Shipping'])

    await a.headers()[1]!.trigger('click')
    expect(a.expanded()).toEqual(['Returns'])
  })

  it('emits the value, not the index', async () => {
    const a = accordion()
    await a.headers()[2]!.trigger('click')
    expect(a.wrapper.emitted('update:modelValue')).toEqual([['warranty']])
  })

  it('falls back to the index when a panel has no value', async () => {
    const a = accordion({ items: [{ title: 'A' }, { title: 'B' }] })
    await a.headers()[1]!.trigger('click')
    expect(a.wrapper.emitted('update:modelValue')).toEqual([[1]])
  })

  it('closes the open panel again, by default', async () => {
    const a = accordion()
    await a.headers()[0]!.trigger('click')

    await a.headers()[0]!.trigger('click')

    expect(a.expanded()).toEqual([])
  })

  it('refuses to leave nothing showing when collapsible is off', async () => {
    const a = accordion({ collapsible: false })
    await a.headers()[0]!.trigger('click')

    await a.headers()[0]!.trigger('click')

    expect(a.expanded()).toEqual(['Shipping'])
  })

  it('keeps several open when multiple', async () => {
    const a = accordion({ multiple: true })

    await a.headers()[0]!.trigger('click')
    await a.headers()[1]!.trigger('click')

    expect(a.expanded()).toEqual(['Shipping', 'Returns'])
    expect(a.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['shipping', 'returns']])
  })

  it('follows a modelValue it is given, and does not move on its own', async () => {
    const a = accordion({ modelValue: 'shipping' })

    await a.headers()[1]!.trigger('click')
    expect(a.wrapper.emitted('update:modelValue'), 'it asks').toEqual([['returns']])
    expect(a.expanded(), 'the parent decides').toEqual(['Shipping'])

    await a.wrapper.setProps({ modelValue: 'returns' })
    expect(a.expanded()).toEqual(['Returns'])
  })

  it('ignores a disabled panel', async () => {
    const a = accordion({ items: [{ title: 'A' }, { title: 'B', disabled: true }] })

    expect(a.headers()[1]!.attributes('disabled')).toBeDefined()
    await a.headers()[1]!.trigger('click')
    expect(a.wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('accordion slots', () => {
  it('lets an indexed slot beat the global one', () => {
    const a = accordion({}, {
      title: '<span class="global">Global</span>',
      'title-0': '<span class="indexed">Indexed</span>',
    })
    expect(a.headers()[0]!.find('.indexed').exists()).toBe(true)
    expect(a.headers()[1]!.find('.global').exists()).toBe(true)
  })

  it('works with hand-written panels', async () => {
    const wrapper = mount(DuAccordion, {
      slots: {
        default: `
          <DuAccordionItem title="First">One</DuAccordionItem>
          <DuAccordionItem title="Second">Two</DuAccordionItem>
        `,
      },
      global: { components: { DuAccordionItem } },
    })
    mounted.push(wrapper)

    const headers = wrapper.findAll('button.collapse-title')
    expect(headers).toHaveLength(2)

    await headers[1]!.trigger('click')
    expect(headers[1]!.attributes('aria-expanded')).toBe('true')
    expect(headers[0]!.attributes('aria-expanded'), 'still one at a time').toBe('false')
  })
})

// --- collapse ---------------------------------------------------------------

const notes: DuCollapseItem[] = [
  { title: 'First', content: 'One', value: 'first' },
  { title: 'Second', content: 'Two', value: 'second' },
]

function collapse(props: Record<string, unknown> = {}) {
  const wrapper = mount(DuCollapse, { props: { items: notes, ...props } })
  mounted.push(wrapper)
  return {
    wrapper,
    headers: () => wrapper.findAll('button.collapse-title'),
    expanded: () => wrapper.findAll('button.collapse-title')
      .filter((w) => w.attributes('aria-expanded') === 'true')
      .map((w) => w.text()),
  }
}

describe('collapse', () => {
  it('has no hidden inputs left either', () => {
    expect(collapse().wrapper.findAll('input')).toHaveLength(0)
  })

  it('keeps its panels independent — that is the whole difference', async () => {
    const c = collapse()

    await c.headers()[0]!.trigger('click')
    await c.headers()[1]!.trigger('click')

    expect(c.expanded()).toEqual(['First', 'Second'])
  })

  it('starts on whatever the items say', () => {
    const c = collapse({ items: [{ title: 'A', open: true }, { title: 'B' }] })
    expect(c.expanded()).toEqual(['A'])
  })

  it('emits the whole open set', async () => {
    const c = collapse()
    await c.headers()[0]!.trigger('click')
    await c.headers()[1]!.trigger('click')

    expect(c.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['first', 'second']])
  })

  it('closes again on a second press', async () => {
    const c = collapse()
    await c.headers()[0]!.trigger('click')
    await c.headers()[0]!.trigger('click')
    expect(c.expanded()).toEqual([])
  })

  it('follows a modelValue it is given', async () => {
    const c = collapse({ modelValue: ['second'] })
    expect(c.expanded()).toEqual(['Second'])

    await c.headers()[0]!.trigger('click')
    expect(c.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['second', 'first']])
    expect(c.expanded(), 'the parent decides').toEqual(['Second'])
  })

  it('renders the default slot in manual mode', () => {
    const wrapper = mount(DuCollapse, { slots: { default: '<div class="manual">Manual</div>' } })
    mounted.push(wrapper)
    expect(wrapper.find('.manual').exists()).toBe(true)
  })
})
