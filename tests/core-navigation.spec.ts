// Roving tabindex: the list is one tab stop, the arrows move inside it.
//
// Driven on plain buttons rather than through a component, because that is the
// whole contract — a list of elements, a key, and which one ends up focused.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { useRovingIndex } from '../components/core/navigation'
import type { RovingIndex, RovingIndexOptions } from '../components/core/navigation'

const mounted: { unmount: () => void }[] = []

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount())
  document.body.innerHTML = ''
})

/** A row of buttons, some of them marked disabled with a leading `!`. */
function list(labels: string[], options: Partial<RovingIndexOptions> = {}) {
  let roving!: RovingIndex
  const root = ref<HTMLElement | null>(null)

  const Host = defineComponent({
    setup() {
      roving = useRovingIndex({
        // Scoped to this host: a leftover list from another test is not ours.
        items: () => [...(root.value?.querySelectorAll<HTMLElement>('.item') ?? [])],
        isDisabled: (el) => el.hasAttribute('data-off'),
        ...options,
      })
      return () => h('div', { ref: root }, labels.map((label) => h('button', {
        class: 'item',
        type: 'button',
        ...(label.startsWith('!') ? { 'data-off': '' } : {}),
      }, label.replace(/^!/, ''))))
    },
  })

  const wrapper = mount(Host, { attachTo: document.body })
  mounted.push(wrapper)
  const items = () => [...(wrapper.element as HTMLElement).querySelectorAll<HTMLElement>('.item')]

  return {
    wrapper,
    roving: () => roving,
    items,
    /** Press with an explicit target, the way a real bubbled event arrives. */
    pressOn(el: HTMLElement, key: string) {
      const event = new KeyboardEvent('keydown', { key, bubbles: true })
      Object.defineProperty(event, 'target', { value: el })
      return roving.onKeydown(event)
    },
    focused: () => (document.activeElement as HTMLElement | null)?.textContent,
  }
}

describe('arrows', () => {
  it('moves down and up by default, and wraps at both ends', () => {
    const l = list(['A', 'B', 'C'])
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'ArrowDown')
    expect(l.focused()).toBe('B')

    l.pressOn(l.items()[1]!, 'ArrowUp')
    expect(l.focused()).toBe('A')

    l.pressOn(l.items()[0]!, 'ArrowUp')
    expect(l.focused(), 'wraps to the end').toBe('C')
  })

  it('uses left and right when horizontal, and ignores the other axis', () => {
    const l = list(['A', 'B'], { orientation: () => 'horizontal' })
    l.roving().focusAt(0)

    expect(l.pressOn(l.items()[0]!, 'ArrowDown'), 'not this axis').toBe(false)
    expect(l.focused()).toBe('A')

    l.pressOn(l.items()[0]!, 'ArrowRight')
    expect(l.focused()).toBe('B')
  })

  it('answers to both axes when asked', () => {
    const l = list(['A', 'B'], { orientation: () => 'both' })
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'ArrowRight')
    expect(l.focused()).toBe('B')

    l.pressOn(l.items()[1]!, 'ArrowUp')
    expect(l.focused()).toBe('A')
  })

  it('stops at the ends when wrapping is off', () => {
    const l = list(['A', 'B'], { wrap: () => false })
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'ArrowUp')
    expect(l.focused(), 'nowhere to go').toBe('A')

    l.pressOn(l.items()[0]!, 'ArrowDown')
    expect(l.focused()).toBe('B')
    l.pressOn(l.items()[1]!, 'ArrowDown')
    expect(l.focused()).toBe('B')
  })

  it('says whether it consumed the key, so the caller can decide about preventDefault', () => {
    const l = list(['A', 'B'])
    expect(l.pressOn(l.items()[0]!, 'ArrowDown')).toBe(true)
    expect(l.pressOn(l.items()[0]!, 'Enter')).toBe(false)
  })
})

describe('disabled items', () => {
  it('steps over them one at a time, not one step per run', () => {
    const l = list(['A', '!B', '!C', 'D'])
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'ArrowDown')
    expect(l.focused()).toBe('D')
  })

  it('never lands on one at either end', () => {
    const l = list(['!A', 'B', '!C'])

    l.pressOn(l.items()[1]!, 'Home')
    expect(l.focused()).toBe('B')

    l.pressOn(l.items()[1]!, 'End')
    expect(l.focused()).toBe('B')
  })

  it('gives up on a list with nothing to land on, rather than looping', () => {
    const l = list(['!A', '!B'])
    l.items()[0]!.focus()

    expect(l.pressOn(l.items()[0]!, 'ArrowDown'), 'still consumed').toBe(true)
    expect(l.focused(), 'but nothing moved').toBe('A')
  })
})

describe('Home and End', () => {
  it('jump to the ends', () => {
    const l = list(['A', 'B', 'C'])
    l.roving().focusAt(1)

    l.pressOn(l.items()[1]!, 'End')
    expect(l.focused()).toBe('C')

    l.pressOn(l.items()[2]!, 'Home')
    expect(l.focused()).toBe('A')
  })
})

describe('typeahead', () => {
  it('is off unless asked for', () => {
    const l = list(['Apple', 'Banana'])
    expect(l.pressOn(l.items()[0]!, 'b')).toBe(false)
  })

  it('jumps to the next item starting with the letter', () => {
    const l = list(['Apple', 'Banana', 'Cherry'], { typeahead: () => true })
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'c')
    expect(l.focused()).toBe('Cherry')
  })

  it('accumulates letters within the timeout, and starts over after it', () => {
    vi.useFakeTimers()
    try {
      const l = list(['Ba', 'Bo', 'Bu'], { typeahead: () => true, typeaheadTimeout: 500 })
      l.roving().focusAt(0)

      l.pressOn(l.items()[0]!, 'b')
      l.pressOn(l.items()[1]!, 'u')
      expect(l.focused(), '"bu"').toBe('Bu')

      vi.advanceTimersByTime(500)
      l.pressOn(l.items()[2]!, 'b')
      expect(l.focused(), 'a fresh "b" from Bu').toBe('Ba')
    }
    finally {
      vi.useRealTimers()
    }
  })

  it('cycles through the items sharing a letter when it is repeated', () => {
    const l = list(['Bat', 'Bar', 'Cat'], { typeahead: () => true })
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'b')
    expect(l.focused()).toBe('Bar')
    l.pressOn(l.items()[1]!, 'b')
    expect(l.focused()).toBe('Bat')
  })

  it('leaves Space and modified keys alone — they mean something else in a menu', () => {
    const l = list(['Apple'], { typeahead: () => true })
    expect(l.pressOn(l.items()[0]!, ' ')).toBe(false)

    const event = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true })
    expect(l.roving().onKeydown(event)).toBe(false)
  })

  it('matches on custom text when the label is not the element text', () => {
    const l = list(['A', 'B'], {
      typeahead: () => true,
      textOf: (el) => (el.textContent === 'A' ? 'Zebra' : 'Yak'),
    })
    l.roving().focusAt(0)

    l.pressOn(l.items()[0]!, 'y')
    expect(l.focused()).toBe('B')
  })
})

describe('the tab stop', () => {
  it('is on the first landable item before anything is focused', () => {
    const l = list(['!A', 'B', 'C'])
    expect([0, 1, 2].map(l.roving().tabIndexFor)).toEqual([-1, 0, -1])
  })

  it('follows the active item, so the list stays one tab stop', () => {
    const l = list(['A', 'B', 'C'])
    l.roving().focusAt(2)
    expect([0, 1, 2].map(l.roving().tabIndexFor)).toEqual([-1, -1, 0])
  })

  it('catches up when focus arrives from a click or a Tab', () => {
    const l = list(['A', 'B', 'C'])
    l.roving().syncTo(l.items()[1]!)
    expect(l.roving().activeIndex.value).toBe(1)

    l.roving().syncTo(document.body)
    expect(l.roving().activeIndex.value, 'something outside the list changes nothing').toBe(1)
  })
})
