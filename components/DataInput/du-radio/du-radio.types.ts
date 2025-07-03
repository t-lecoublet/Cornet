import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export const RADIO_VARIANTS = ['default', 'radio-primary', 'radio-secondary', 'radio-accent', 'radio-info', 'radio-success', 'radio-warning', 'radio-error'] as const
export const RADIO_SIZES = ['default', 'radio-xs', 'radio-sm', 'radio-md', 'radio-lg', 'radio-xl'] as const

export type RADIOVariant = (typeof RADIO_VARIANTS)[number]
export type RADIOSize = (typeof RADIO_SIZES)[number]

export interface RADIOProps {
  checked?: boolean
  disabled?: boolean
  variant?: Variant
  size?: Size
} 