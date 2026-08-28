import { computed, ref } from 'vue'
import type { Ref } from 'vue'

/**
 * One state a component may either own or follow.
 *
 * Two modes, decided by whether the consumer passes the prop:
 *
 * - **uncontrolled** (prop `undefined`): the component keeps the value and
 *   emits every change, so `v-model`-less usage still works;
 * - **controlled** (prop present): the value follows the prop and mutations
 *   only emit. The component never writes its own copy, so the consumer's
 *   state stays the single source of truth — including when it refuses a
 *   change and the prop does not move.
 *
 * The second half is the part that gets reinvented wrongly: a component that
 * also writes an internal copy in controlled mode will show a change the
 * consumer rejected, and the two states drift from there.
 *
 * ```ts
 * const open = useControllableState(
 *   () => props.open,
 *   (value) => emit('update:open', value),
 *   false,
 * )
 * open.value = true   // emits; in controlled mode nothing moves until the prop does
 * ```
 */
export function useControllableState<T>(
  prop: () => T | undefined,
  emit: (value: T) => void,
  fallback: T,
): Ref<T> {
  const internal = ref(fallback) as Ref<T>
  const controlled = computed(() => prop() !== undefined)

  return computed({
    get: () => (controlled.value ? (prop() as T) : internal.value),
    set: (value: T) => {
      // Assigning the value it already holds is not a change: emitting anyway
      // would wake every watcher on the consumer's side for nothing.
      const current = controlled.value ? (prop() as T) : internal.value
      if (Object.is(current, value)) {
        return
      }
      if (!controlled.value) {
        internal.value = value
      }
      emit(value)
    },
  })
}
