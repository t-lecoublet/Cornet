// Internal barrel for the combobox engine. It is NOT re-exported from the
// library entry point: DuSelect and DuSearch are the public surface, the
// engine is an implementation detail and its API can change without notice.
export { useCombobox } from './useCombobox'

export type {
  ComboboxProps,
  ComboboxPropsSource,
  ComboboxScope,
  ComboboxSlotProps,
} from './types'
