// DuRange is a native `<input type="range">`, and that is the right call: the
// browser already provides the keyboard, the drag, the step arithmetic and the
// `slider` role. What it cannot provide is what the number *means*.
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import DuRange from '../components/DataInput/du-range/du-range.vue'

function range(props: Record<string, unknown> = {}) {
  const wrapper = mount(DuRange, { props })
  return {
    wrapper,
    input: () => wrapper.find('input[type="range"]'),
    element: () => wrapper.find('input[type="range"]').element as HTMLInputElement,
  }
}

describe('the value', () => {
  it('starts at modelValue and follows it', async () => {
    const r = range({ modelValue: 3 })
    expect(r.element().value).toBe('3')

    await r.wrapper.setProps({ modelValue: 7 })
    expect(r.element().value).toBe('7')
  })

  it('emits both events on input', async () => {
    const r = range({ modelValue: 3 })
    r.element().value = '8'
    await r.input().trigger('input')

    expect(r.wrapper.emitted('update:modelValue')).toEqual([[8]])
    expect(r.wrapper.emitted('change')).toEqual([[8]])
  })

  it('passes min, max and step to the browser rather than reimplementing them', () => {
    const r = range({ min: 1, max: 100, step: 5 })
    expect(r.input().attributes('min')).toBe('1')
    expect(r.input().attributes('max')).toBe('100')
    expect(r.input().attributes('step')).toBe('5')
  })
})

describe('what the number means', () => {
  it('says nothing extra by default', () => {
    expect(range().input().attributes('aria-valuetext')).toBeUndefined()
  })

  it('announces words instead of a bare number when told how', () => {
    // "12" is only meaningful to someone who can see what it is 12 of.
    const r = range({ modelValue: 12, valueText: (value: number) => `${value} €` })
    expect(r.input().attributes('aria-valuetext')).toBe('12 €')
  })

  it('keeps that in step with the value', async () => {
    const r = range({ modelValue: 1, valueText: (value: number) => ['Low', 'Medium', 'High'][value - 1] })
    expect(r.input().attributes('aria-valuetext')).toBe('Low')

    r.element().value = '3'
    await r.input().trigger('input')
    expect(r.input().attributes('aria-valuetext')).toBe('High')
  })

  it('takes a name when nothing visible provides one', () => {
    expect(range({ ariaLabel: 'Budget' }).input().attributes('aria-label')).toBe('Budget')
    expect(range({ ariaLabelledby: 'budget-label' }).input().attributes('aria-labelledby')).toBe('budget-label')
  })
})

describe('ticks', () => {
  it('has no datalist unless asked', () => {
    const r = range()
    expect(r.wrapper.find('datalist').exists()).toBe(false)
    expect(r.input().attributes('list')).toBeUndefined()
  })

  it('points the input at a datalist of the marks', () => {
    const r = range({ ticks: [0, 5, 10] })
    const list = r.wrapper.find('datalist')

    expect(list.exists()).toBe(true)
    expect(r.input().attributes('list')).toBe(list.attributes('id'))
    expect(list.findAll('option').map((o) => o.attributes('value'))).toEqual(['0', '5', '10'])
  })

  it('labels a mark when one is given', () => {
    const r = range({ ticks: [{ value: 0, label: 'Free' }, { value: 10, label: 'Max' }] })
    expect(r.wrapper.findAll('option').map((o) => o.attributes('label'))).toEqual(['Free', 'Max'])
  })

  it('gives two sliders on a page different lists', () => {
    // One app, two instances — the case that actually collides. Two separate
    // mounts each restart Vue's id counter (see generated-ids.spec.ts).
    const page = mount(defineComponent({
      render: () => [h(DuRange, { ticks: [1] }), h(DuRange, { ticks: [1] })],
    }))

    const ids = page.findAll('datalist').map((w) => w.attributes('id'))
    expect(ids[0]).toBeTruthy()
    expect(ids[0]).not.toBe(ids[1])
  })
})

describe('disabled', () => {
  it('is the native attribute, so the browser does the work', () => {
    expect(range({ disabled: true }).input().attributes('disabled')).toBeDefined()
  })
})

describe('presentation', () => {
  it('keeps the daisyUI variant and size classes', () => {
    const r = range({ variant: 'primary', size: 'lg' })
    expect(r.input().classes()).toEqual(expect.arrayContaining(['range', 'range-primary', 'range-lg']))
  })
})
