// Every component that needs an id or a radio-group name derives it from
// `useComponentId`, never from `Math.random()`. Two properties matter and are
// checked here for all of them at once:
//
//   - uniqueness — two instances on the same page must not share a name, or
//     picking a row in one silently clears the other;
//   - determinism — the server and the client render independently, so a value
//     that differs between two identical renders is a hydration mismatch.
//
// Determinism is exercised by mounting into a fresh app each time, which is
// what resets Vue's id counter — the closest stand-in for a second render pass.
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import type { Component } from 'vue'
import DuAccordion from '../components/DataDisplay/du-accordion/du-accordion.vue'
import DuDrawer from '../components/Layout/du-drawer/du-drawer.vue'
import DuFilter from '../components/DataInput/du-filter/du-filter.vue'
import DuRating from '../components/DataInput/du-rating/du-rating.vue'
import DuSelect from '../components/DataInput/du-select/du-select.vue'

/** Reads the generated value out of one freshly mounted instance. */
type Probe = (wrapper: ReturnType<typeof mount>) => string | undefined

interface Case {
  name: string
  component: Component
  props: Record<string, unknown>
  read: Probe
}

const cases: Case[] = [
  {
    name: 'DuAccordion',
    component: DuAccordion,
    props: { items: [{ title: 'One' }, { title: 'Two' }] },
    read: (w) => w.find('input[type="radio"]').attributes('name'),
  },
  {
    name: 'DuFilter',
    component: DuFilter,
    props: { items: [{ title: 'All' }, { title: 'Active' }] },
    read: (w) => w.find('input[type="radio"]').attributes('name'),
  },
  {
    name: 'DuRating',
    component: DuRating,
    props: { items: [{ value: 1 }, { value: 2 }] },
    read: (w) => w.find('input').attributes('name'),
  },
  {
    name: 'DuDrawer',
    component: DuDrawer,
    props: {},
    read: (w) => w.find('input.drawer-toggle').attributes('id'),
  },
  {
    name: 'DuSelect',
    component: DuSelect,
    props: { options: ['a', 'b'] },
    read: (w) => w.find('[role="listbox"], [aria-controls]').attributes('aria-controls'),
  },
]

describe.each(cases)('$name generated ids', ({ component, props, read }) => {
  it('gives each instance on the page its own', () => {
    const page = mount({
      render: () => [h(component, props), h(component, props)],
    })
    const values = page.findAllComponents(component).map((instance) => read(instance as never))

    expect(values[0]).toBeTruthy()
    expect(values[0]).not.toBe(values[1])
  })

  it('produces the same value on a second identical render', () => {
    const first = read(mount(component, { props }))
    const second = read(mount(component, { props }))

    expect(first).toBeTruthy()
    expect(first).toBe(second)
  })
})
