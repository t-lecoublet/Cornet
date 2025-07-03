import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export const SELECT_VARIANTS = ['default', 'select-primary', 'select-secondary', 'select-accent', 'select-info', 'select-success', 'select-warning', 'select-error'] as const
export const SELECT_SIZES = ['default', 'select-xs', 'select-sm', 'select-md', 'select-lg', 'select-xl'] as const

export type SELECTVariant = (typeof SELECT_VARIANTS)[number]
export type SELECTSize = (typeof SELECT_SIZES)[number]

export interface SELECTProps {
  ghost?: boolean
  variant?: Variant
  size?: Size
  disabled?: boolean
  multiple?: boolean
  modelValue?: string | string[]
  placeholder?: string
}