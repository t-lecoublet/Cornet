import { computed, onUnmounted, ref, shallowRef } from 'vue'
import type { ComputedRef, Ref } from 'vue'

/**
 * The constraint failures a native field can report, named the way the
 * combobox engine names its own — so a form mixing `DuInputField`,
 * `DuSelect` and `DuSearch` speaks one vocabulary.
 */
export type NativeErrorCode
  = | 'required'
    | 'pattern'
    | 'minlength'
    | 'maxlength'
    | 'min'
    | 'max'
    | 'step'
    | 'type'

/** `ValidityState` flag → the code a consumer writes a message for. */
const CODE_BY_FLAG: [keyof ValidityState, NativeErrorCode][] = [
  ['valueMissing', 'required'],
  ['patternMismatch', 'pattern'],
  ['tooShort', 'minlength'],
  ['tooLong', 'maxlength'],
  ['rangeUnderflow', 'min'],
  ['rangeOverflow', 'max'],
  ['stepMismatch', 'step'],
  ['typeMismatch', 'type'],
]

export interface NativeValidationOptions {
  /** Per-code overrides for the browser's own wording. */
  errorMessages?: () => Partial<Record<NativeErrorCode, string>> | undefined
}

export interface NativeValidation {
  /** Which constraints are failing, right now. */
  errors: ComputedRef<NativeErrorCode[]>
  valid: ComputedRef<boolean>
  /** The first failure's message: the consumer's wording, else the browser's. */
  validationMessage: ComputedRef<string>
  /** Whether the user has left the field at least once. */
  touched: Ref<boolean>
  /** True only once there is something to show *and* the user has been given a chance. */
  showError: ComputedRef<boolean>
  /** Wire this onto the element to keep the state in step. */
  bind: (el: HTMLInputElement | HTMLTextAreaElement | null) => void
  /** Mark the field visited, as a form submit does to every field at once. */
  markTouched: () => void
  reset: () => void
}

/**
 * A field's validity, read from the browser rather than reimplemented.
 *
 * The constraint checking here is native (`required`, `pattern`, `minlength`,
 * a `type="email"` that is not one), and deliberately so: it is already
 * localized, already matches what the form does on submit, and already handles
 * the cases a hand-rolled version forgets. What this adds is the *surface* —
 * the same error codes, the same `errorMessages` override and the same
 * "nothing is wrong until you have had a chance to get it right" timing that
 * `useCombobox` exposes, so a form of mixed fields behaves as one thing.
 *
 * That timing is what `:user-invalid` means in CSS, mirrored into JS: a field
 * you have not visited yet is not shouting at you for being empty.
 */
export function useNativeValidation(options: NativeValidationOptions = {}): NativeValidation {
  // `shallowRef`, not `ref`: a deep ref would wrap the element in a reactive
  // proxy, and a DOM node is not something to make reactive.
  const element = shallowRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const touched = ref(false)
  // Bumped on every event that could change validity, to re-read the live
  // `ValidityState` — it is a DOM object, not something Vue can track.
  const revision = ref(0)

  const errors = computed<NativeErrorCode[]>(() => {
    // The counter is the dependency: `ValidityState` is a live DOM object that
    // tells Vue nothing when it changes.
    //
    // It is read here rather than in a `validity` computed of its own, and that
    // is not a style choice — the element hands back the *same* ValidityState
    // object every time, so such a computed would keep producing an
    // `Object.is`-equal value and Vue would stop propagating past it. The field
    // would then report the error it had when it was first bound, forever.
    void revision.value
    const state = element.value?.validity
    if (state == null || state.valid) {
      return []
    }
    return CODE_BY_FLAG
      .filter(([flag]) => state[flag] === true)
      .map(([, code]) => code)
  })

  const valid = computed(() => errors.value.length === 0)

  const validationMessage = computed(() => {
    const first = errors.value[0]
    if (first == null) {
      return ''
    }
    return options.errorMessages?.()?.[first] ?? element.value?.validationMessage ?? ''
  })

  const showError = computed(() => touched.value && !valid.value)

  const bump = () => { revision.value += 1 }
  const onBlur = () => {
    touched.value = true
    bump()
  }

  function detach(el: HTMLInputElement | HTMLTextAreaElement) {
    el.removeEventListener('input', bump)
    el.removeEventListener('change', bump)
    el.removeEventListener('blur', onBlur)
  }

  /**
   * Attaches synchronously rather than through a watcher: the element arrives
   * during mount, and a listener that is one tick late misses the first blur.
   */
  function bind(el: HTMLInputElement | HTMLTextAreaElement | null) {
    const previous = element.value
    if (previous === el) {
      return
    }
    if (previous != null) {
      detach(previous)
    }
    element.value = el
    if (el == null) {
      return
    }
    el.addEventListener('input', bump)
    el.addEventListener('change', bump)
    el.addEventListener('blur', onBlur)
    bump()
  }

  onUnmounted(() => {
    if (element.value != null) {
      detach(element.value)
    }
  })

  return {
    errors,
    valid,
    validationMessage,
    touched,
    showError,
    bind,
    markTouched: () => { touched.value = true; bump() },
    reset: () => { touched.value = false; bump() },
  }
}
