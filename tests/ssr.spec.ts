// Every component rendered on a server, where there is no `document`.
//
// This is the one failure the browser-shaped tests cannot see: a component that
// touches `document` or `window` during `setup()` throws on the server, and a
// component whose ids come from anything but a counter renders different markup
// there than in the browser — which Vue then reports as a hydration mismatch and
// which quietly breaks every `for`/`id` and `aria-controls` pair.
//
// The library does a lot of both: document-level dismissal listeners, `matchMedia`
// for the drawer's layout, generated ids in nine components. All of it has to be
// deferred to a lifecycle hook that never runs on the server.
import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import type { Component } from 'vue'

import * as cornet from '../index'

/** Props that let a component render something rather than an empty shell. */
const PROPS: Record<string, Record<string, unknown>> = {
  DuAccordion: { items: [{ title: 'One', content: 'a' }] },
  DuCarousel: { ariaLabel: 'Photos', items: [{ src: '/a.png', alt: 'A' }], controls: true },
  DuChat: { items: [{ message: 'Hi' }] },
  DuCollapse: { items: [{ title: 'One', content: 'a' }] },
  DuCountdown: { value: 5 },
  DuDock: { ariaLabel: 'Sections', items: [{ label: 'Home' }] },
  DuDrawer: { items: [{ label: 'Home', href: '/' }] },
  DuFilter: { items: [{ title: 'All' }] },
  DuMenu: { items: [{ label: 'Home', href: '/' }] },
  DuMenuItem: { item: { label: 'Home' }, index: 0 },
  DuModal: { ariaLabel: 'Confirm' },
  DuPagination: { modelValue: 1, total: 50 },
  DuRange: { ticks: [0, 5] },
  DuRating: { count: 5, modelValue: 3 },
  DuSearch: { options: ['a', 'b'] },
  DuSelect: { options: ['a', 'b'] },
  DuSteps: { items: [{ label: 'Cart' }] },
  DuTable: { caption: 'Owners', columns: [{ key: 'name', label: 'Name' }], rows: [{ id: 1, name: 'Ada' }] },
  DuTabs: { ariaLabel: 'Sections', items: [{ label: 'One', content: 'a' }] },
  DuTimeline: { items: [{ start: '2024', end: 'Shipped' }] },
  DuTooltip: { dataTip: 'Tip', open: true },
}

const components = Object.entries(cornet)
  .filter((entry): entry is [string, Component] =>
    entry[0].startsWith('Du') && typeof entry[1] === 'object' && entry[1] !== null)

const render = (name: string, component: Component) =>
  renderToString(createSSRApp(component, PROPS[name] ?? {}))

describe('server rendering', () => {
  it('covers every exported component', () => {
    // A guard on the guard: if the barrel stops matching, this suite would
    // silently test nothing.
    expect(components.length).toBeGreaterThan(50)
  })

  it.each(components)('%s renders without a document', async (name, component) => {
    await expect(render(name, component)).resolves.toEqual(expect.any(String))
  })

  it.each(components)('%s renders identically twice', async (name, component) => {
    // Deterministic markup is the whole hydration contract. A `Math.random()`
    // id, a `Date.now()`, anything that moves between two renders of the same
    // input shows up here as a diff.
    const [first, second] = await Promise.all([render(name, component), render(name, component)])
    expect(first).toBe(second)
  })
})
