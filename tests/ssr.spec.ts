// Every exported component rendered on a server, and then hydrated.
//
// This is the one class of failure the browser-shaped tests cannot see: a
// component that touches `document` during `setup()` throws on the server, and
// markup that differs between the server and the client is a hydration
// mismatch — which Vue patches over at a cost and which quietly breaks every
// `for`/`id` and `aria-controls` pair that spans the boundary.
//
// The library does a lot of both: document-level dismissal listeners,
// `matchMedia` for the drawer's layout, generated ids in nine components.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp, createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { EXPORTED, FIXTURES, RENDERED_BY_PARENT, STANDALONE } from './helpers/component-fixtures'

const render = (component: unknown, props?: Record<string, unknown>) =>
  renderToString(createSSRApp(component as never, props))

describe('the suite itself', () => {
  it('covers every exported component', () => {
    const swept = new Set(STANDALONE.map(([name]) => name))
    const uncovered = EXPORTED
      .map(([name]) => name)
      .filter((name) => !swept.has(name) && RENDERED_BY_PARENT[name] == null)

    expect(uncovered).toEqual([])
  })
})

describe('server rendering', () => {
  it.each(STANDALONE)('%s renders without a document', async (name, component) => {
    await expect(render(component, FIXTURES[name]?.props)).resolves.toEqual(expect.any(String))
  })

  it.each(STANDALONE)('%s renders identically twice', async (name, component) => {
    // Deterministic markup is the whole hydration contract. A `Math.random()`
    // id, a `Date.now()`, anything that moves between two renders of the same
    // input shows up here as a diff.
    const [first, second] = await Promise.all([
      render(component, FIXTURES[name]?.props),
      render(component, FIXTURES[name]?.props),
    ])
    expect(first).toBe(second)
  })
})

describe('hydration', () => {
  const warnings: string[] = []
  const original = console.warn
  const originalError = console.error

  afterEach(() => {
    console.warn = original
    console.error = originalError
    warnings.length = 0
    document.body.innerHTML = ''
  })

  it.each(STANDALONE)('%s hydrates without a mismatch', async (name, component) => {
    // Rendering the same markup twice proves determinism between two *servers*.
    // This proves it between the server and the browser, where the difference
    // actually bites: a component reading `window` in setup, a date formatted
    // in a different timezone, an id from anything but a counter.
    const html = await render(component, FIXTURES[name]?.props)

    const host = document.createElement('div')
    host.innerHTML = html
    document.body.appendChild(host)

    console.warn = (...args: unknown[]) => { warnings.push(String(args[0])) }
    console.error = (...args: unknown[]) => { warnings.push(String(args[0])) }

    const app = createSSRApp(component as never, FIXTURES[name]?.props)
    app.mount(host, true)

    expect(warnings.filter((line) => /[Hh]ydration/.test(line))).toEqual([])
    app.unmount()
  })
})

describe('client-only APIs', () => {
  it('are never reached during server render', async () => {
    // A guard on the guard: if `document` leaked into a module's top level
    // rather than a component's setup, every case above would still pass
    // because happy-dom provides one. This asserts the suite would notice.
    const spy = vi.spyOn(globalThis, 'addEventListener')
    try {
      await Promise.all(STANDALONE.map(([name, component]) => render(component, FIXTURES[name]?.props)))
      expect(spy).not.toHaveBeenCalled()
    }
    finally {
      spy.mockRestore()
    }
  })
})

describe('createApp parity', () => {
  it('mounts every component on the client too', () => {
    // The mirror of the SSR pass: a component that only works after hydration
    // would slip through everything above.
    for (const [name, component] of STANDALONE) {
      const host = document.createElement('div')
      document.body.appendChild(host)
      const app = createApp(component as never, FIXTURES[name]?.props)
      expect(() => app.mount(host), name).not.toThrow()
      app.unmount()
      host.remove()
    }
  })
})
