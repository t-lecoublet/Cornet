// DuFilter: a radio group of mutually exclusive filters.
//
// daisyUI's radio pattern is right here — one choice at a time, and the current
// one is part of the state, not a transient event. What it lacked was the thing
// that makes a radio group mean anything: a name for the group as a whole, and
// a way for the parent to hold the selection rather than merely hear about it.
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DuFilter from '../components/DataInput/du-filter/du-filter.vue'
import type { DuFilterItem } from '../components/DataInput/du-filter/du-filter.types'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

const items: DuFilterItem[] = [
  { title: 'All', value: 'all' },
  { title: 'Active', value: 'active' },
  { title: 'Done', value: 'done' },
]

function filter(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuFilter, { props: { items, ...props }, slots })
  mounted.push(wrapper)
  return {
    wrapper,
    radios: () => wrapper.findAll('input[type="radio"]'),
    reset: () => wrapper.find('.filter-reset'),
    /** The item radios, without the reset button in front of them. */
    options: () => wrapper.findAll('input[type="radio"]:not(.filter-reset)'),
    checked: () => wrapper.findAll('input[type="radio"]')
      .filter((w) => (w.element as HTMLInputElement).checked)
      .map((w) => w.attributes('aria-label')),
  }
}

describe('the group', () => {
  it('is a fieldset with a name for the whole set', () => {
    const f = filter({ legend: 'Status' })
    expect(f.wrapper.element.tagName).toBe('FIELDSET')
    expect(f.wrapper.find('legend').text()).toBe('Status')
  })

  it('hides that name visually unless asked', () => {
    expect(filter().wrapper.find('legend').classes()).toContain('sr-only')
    expect(filter({ showLegend: true }).wrapper.find('legend').classes()).not.toContain('sr-only')
  })

  it('groups every radio under one name', () => {
    const f = filter({ name: 'my-filter' })
    const names = f.radios().map((i) => i.attributes('name'))
    expect(names.length).toBeGreaterThan(1)
    expect(names.every((n) => n === 'my-filter')).toBe(true)
  })

  it('names each option after its title', () => {
    expect(filter().options().map((i) => i.attributes('aria-label'))).toEqual(['All', 'Active', 'Done'])
  })
})

describe('selection', () => {
  it('starts on the item marked checked', () => {
    const f = filter({ items: [{ title: 'A', checked: true }, { title: 'B' }] })
    expect(f.checked()).toEqual(['A'])
  })

  it('emits the value and the item', async () => {
    const f = filter()
    await f.options()[1]!.trigger('change')

    expect(f.wrapper.emitted('update:modelValue')).toEqual([['active']])
    expect(f.wrapper.emitted('change')?.[0]).toEqual([items[1]])
  })

  it('falls back to the title, then the index, when an item has no value', async () => {
    const byTitle = filter({ items: [{ title: 'A' }, { title: 'B' }] })
    await byTitle.options()[1]!.trigger('change')
    expect(byTitle.wrapper.emitted('update:modelValue')).toEqual([['B']])

    const byIndex = filter({ items: [{}, {}] })
    await byIndex.options()[1]!.trigger('change')
    expect(byIndex.wrapper.emitted('update:modelValue')).toEqual([[1]])
  })

  it('follows a modelValue it is given, and does not move on its own', async () => {
    const f = filter({ modelValue: 'all' })

    await f.options()[2]!.trigger('change')
    expect(f.wrapper.emitted('update:modelValue'), 'it asks').toEqual([['done']])
    expect(f.checked(), 'the parent decides').toEqual(['All'])

    await f.wrapper.setProps({ modelValue: 'done' })
    expect(f.checked()).toEqual(['Done'])
  })
})

describe('the reset button', () => {
  it('is not offered when there is nothing to reset', () => {
    expect(filter().reset().exists()).toBe(false)
  })

  it('appears once something is selected', async () => {
    const f = filter()
    await f.options()[0]!.trigger('change')
    expect(f.reset().exists()).toBe(true)
  })

  it('has a name, since its only content is a ×', async () => {
    const f = filter({ resetLabel: 'Clear the status filter' })
    await f.options()[0]!.trigger('change')
    expect(f.reset().attributes('aria-label')).toBe('Clear the status filter')
  })

  it('clears the selection and says so twice over', async () => {
    const f = filter({ modelValue: 'all' })

    await f.reset().trigger('change')

    expect(f.wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null])
    expect(f.wrapper.emitted('change')?.at(-1)).toEqual([undefined])
  })
})

describe('button arguments', () => {
  it('prefers the per-item args over the shared ones', () => {
    const f = filter({
      items: [{ title: 'A', buttonsArgs: { variant: 'secondary' } }],
      buttonsArgs: { variant: 'primary' },
    })
    expect(f.options()[0]!.classes()).toContain('btn-secondary')
    expect(f.options()[0]!.classes()).not.toContain('btn-primary')
  })

  it('falls back to the shared ones', () => {
    const f = filter({ items: [{ title: 'A' }], buttonsArgs: { variant: 'primary' } })
    expect(f.options()[0]!.classes()).toContain('btn-primary')
  })
})

describe('manual mode', () => {
  it('renders the default slot', () => {
    const wrapper = mount(DuFilter, { slots: { default: '<button class="manual">Manual</button>' } })
    mounted.push(wrapper)
    expect(wrapper.find('.manual').exists()).toBe(true)
  })
})
