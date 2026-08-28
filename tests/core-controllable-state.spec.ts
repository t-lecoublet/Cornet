// The one contract every `open` / `modelValue` in the library follows.
//
// The half that gets reinvented wrongly is controlled mode: a component that
// also writes an internal copy will show a change its consumer rejected, and
// the two drift from there. Both halves are pinned here.
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useControllableState } from '../components/core/shared/useControllableState'

/** A component's view of the state, with the prop and the emits a parent sees. */
function wire(initialProp?: boolean) {
  const prop = ref<boolean | undefined>(initialProp)
  const emitted: boolean[] = []
  const state = useControllableState(() => prop.value, (value) => emitted.push(value), false)
  return { prop, emitted, state }
}

describe('uncontrolled', () => {
  it('starts at the fallback and keeps what it is given', () => {
    const { state } = wire()
    expect(state.value).toBe(false)

    state.value = true
    expect(state.value).toBe(true)
  })

  it('emits every change, so a parent can still follow along', () => {
    const { state, emitted } = wire()

    state.value = true
    state.value = false

    expect(emitted).toEqual([true, false])
  })
})

describe('controlled', () => {
  it('reads the prop, not its own memory', () => {
    const { prop, state } = wire(true)
    expect(state.value).toBe(true)

    prop.value = false
    expect(state.value).toBe(false)
  })

  it('emits without moving: the prop decides', () => {
    const { state, emitted } = wire(false)

    state.value = true

    expect(emitted).toEqual([true])
    expect(state.value, 'the parent has not answered yet').toBe(false)
  })

  it('follows once the parent answers', async () => {
    const { prop, state } = wire(false)

    state.value = true
    prop.value = true
    await nextTick()

    expect(state.value).toBe(true)
  })

  it('stays put when the parent refuses the change', () => {
    const { state, emitted } = wire(false)

    state.value = true
    // The parent looked at the request and left the prop alone.

    expect(emitted).toEqual([true])
    expect(state.value).toBe(false)
  })
})

describe('either mode', () => {
  it('says which one it is in, and notices the prop appearing', async () => {
    const { prop, state, emitted } = wire()

    state.value = true
    expect(state.value).toBe(true)

    // The parent starts driving it.
    prop.value = false
    await nextTick()
    expect(state.value).toBe(false)

    state.value = true
    expect(emitted).toEqual([true, true])
    expect(state.value, 'internal memory no longer counts').toBe(false)
  })

  it('does not emit when assigned the value it already holds', () => {
    const { state, emitted } = wire()

    state.value = false
    state.value = true
    state.value = true

    expect(emitted).toEqual([true])
  })
})
