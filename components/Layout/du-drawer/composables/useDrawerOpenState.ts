import { useControllableState } from '../../../core/shared'
import type { Ref } from 'vue'
import type { DuDrawerEmit, DuDrawerProps } from '../du-drawer.types'

/**
 * The drawer's open state, following the library-wide controlled/uncontrolled
 * contract (`core/shared/useControllableState`).
 *
 * Two props drive one state, for history: `modelValue` (what `v-model` binds)
 * and `open`. Whichever is present wins, `open` first; neither means the drawer
 * owns its state. Changes go out through both events, so a consumer on either
 * prop keeps working.
 */
export function useDrawerOpenState(
  props: Pick<DuDrawerProps, 'open' | 'modelValue'>,
  emit: DuDrawerEmit,
): { internalOpen: Ref<boolean>, toggleDrawer: () => void } {
  const internalOpen = useControllableState(
    () => props.open ?? props.modelValue,
    (value) => {
      emit('update:modelValue', value)
      emit('update:open', value)
    },
    false,
  )

  const toggleDrawer = () => {
    internalOpen.value = !internalOpen.value
  }

  return { internalOpen, toggleDrawer }
}
