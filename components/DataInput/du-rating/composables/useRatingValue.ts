import { ref, watch } from 'vue'
import type { DuRatingEmits } from '../du-rating.types'

interface RatingValueProps {
  modelValue: number | null
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
}

/** Owns the selected rating value, kept in sync with `modelValue`, and the click-to-select/clear business rule. */
export function useRatingValue(props: RatingValueProps, emit: DuRatingEmits) {
  const internalValue = ref<number | null>(props.modelValue)

  watch(
    () => props.modelValue,
    (newValue) => {
      internalValue.value = newValue
    },
  )

  const handleChange = (value: number) => {
    if (props.disabled || props.readonly) {
      return
    }
    if (value === internalValue.value && props.clearable) {
      // `null`, not `0`: the scale starts at 1, so `0` was never a rating —
      // only an absence dressed as one, which left "nobody rated this" and
      // "somebody rated it zero" impossible to tell apart downstream.
      internalValue.value = null
      emit('update:modelValue', null)
      emit('change', null)
    } else {
      internalValue.value = value
      emit('update:modelValue', value)
      emit('change', value)
    }
  }

  return { internalValue, handleChange }
}
