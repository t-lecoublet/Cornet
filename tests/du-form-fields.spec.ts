// The form fields: what a browser already does well, and what it cannot do.
//
// Constraint checking stays native — it is localized, it matches what the form
// decides on submit, and it covers the cases a hand-rolled version forgets.
// What the library adds is one *surface* over it, so a form mixing
// DuInputField with DuSelect and DuSearch reports errors the same way.
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DuFileInput from '../components/DataInput/du-file-input/du-file-input.vue'
import DuInputField from '../components/DataInput/du-input-field/du-input-field.vue'

function field(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(DuInputField, { attachTo: document.body, props, slots })
  const input = () => wrapper.find('input')
  return {
    wrapper,
    input,
    element: () => input().element as HTMLInputElement,
    hint: () => wrapper.find('.validator-hint'),
    async type(value: string) {
      await input().setValue(value)
    },
    async leave() {
      await input().trigger('blur')
    },
  }
}

describe('when the error shows', () => {
  it('stays quiet on an untouched field', async () => {
    // An unanswered field is not a failing one.
    const f = field({ required: true })
    await nextTick()
    expect(f.hint().exists()).toBe(false)
  })

  it('speaks up once the field has been left', async () => {
    const f = field({ required: true })
    await f.leave()
    expect(f.hint().exists()).toBe(true)
  })

  it('goes quiet again when the problem is fixed', async () => {
    const f = field({ required: true })
    await f.leave()
    expect(f.hint().exists()).toBe(true)

    await f.type('something')
    expect(f.hint().exists()).toBe(false)
  })
})

describe('what the error says', () => {
  it('reports the browser’s own code', async () => {
    const f = field({ required: true })
    await f.leave()
    expect((f.wrapper.vm as unknown as { errors: string[] }).errors).toEqual(['required'])
  })

  it('names the constraint that failed, not just “invalid”', async () => {
    const f = field({ type: 'email' })
    await f.type('not-an-email')
    await f.leave()
    expect((f.wrapper.vm as unknown as { errors: string[] }).errors).toEqual(['type'])
  })

  it('takes the consumer’s wording over the browser’s', async () => {
    const f = field({ required: true, errorMessages: { required: 'We need your email' } })
    await f.leave()
    expect(f.hint().text()).toBe('We need your email')
  })

  it('falls back to the browser’s message rather than inventing one', async () => {
    // The browser's wording is already localized, and already what the form
    // itself will say on submit. The exact string is the environment's; what
    // the component owns is deferring to it.
    const f = field({ required: true })
    await f.leave()

    const vm = f.wrapper.vm as unknown as { validationMessage: string }
    expect(vm.validationMessage).toBe(f.element().validationMessage)
  })

  it('hands the error to a slot for anyone who wants to render it themselves', async () => {
    const f = field(
      { required: true, errorMessages: { required: 'Required' } },
      { error: '<template #error="{ message, errors }"><span class="mine">{{ errors[0] }}: {{ message }}</span></template>' },
    )
    await f.leave()
    expect(f.wrapper.find('.mine').text()).toBe('required: Required')
  })
})

describe('what a form needs', () => {
  it('exposes validity, the way DuSelect and DuSearch do', async () => {
    const f = field({ required: true })
    const vm = f.wrapper.vm as unknown as { valid: boolean, validationMessage: string }
    await f.leave()

    expect(vm.valid).toBe(false)
    await f.type('x')
    expect(vm.valid).toBe(true)
    expect(vm.validationMessage).toBe('')
  })

  it('can be told every field was visited at once, as a submit does', async () => {
    const f = field({ required: true })
    const vm = f.wrapper.vm as unknown as { markTouched: () => void }

    vm.markTouched()
    await nextTick()

    expect(f.hint().exists()).toBe(true)
  })

  it('can be put back to untouched, as a reset does', async () => {
    const f = field({ required: true })
    const vm = f.wrapper.vm as unknown as { reset: () => void }
    await f.leave()

    vm.reset()
    await nextTick()

    expect(f.hint().exists()).toBe(false)
  })
})

describe('DuFileInput', () => {
  it('hands back the chosen files, which it could not do at all before', async () => {
    const wrapper = mount(DuFileInput)
    const input = wrapper.find('input')
    const file = new File(['x'], 'photo.png', { type: 'image/png' })
    Object.defineProperty(input.element, 'files', { value: [file] })

    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[file]])
    expect(wrapper.emitted('change')?.[0]).toEqual([[file]])
  })

  it('reports an empty list when the choice is cleared', async () => {
    const wrapper = mount(DuFileInput)
    const input = wrapper.find('input')
    Object.defineProperty(input.element, 'files', { value: [] })

    await input.trigger('change')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
  })

  it('passes multiple and accept to the browser', () => {
    const wrapper = mount(DuFileInput, { props: { multiple: true, accept: 'image/*' } })
    expect(wrapper.find('input').attributes('multiple')).toBeDefined()
    expect(wrapper.find('input').attributes('accept')).toBe('image/*')
  })

  it('clears the field when the model is emptied', async () => {
    // A file input cannot be *set* from script — the browser forbids it, so
    // nobody can slip a file into a form the user did not choose. Clearing is
    // the one direction that works, and a form reset needs it.
    const wrapper = mount(DuFileInput, { props: { modelValue: [new File(['x'], 'a.png')] } })
    const input = wrapper.find('input').element as HTMLInputElement

    await wrapper.setProps({ modelValue: [] })

    expect(input.value).toBe('')
  })
})
