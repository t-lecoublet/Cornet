import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export interface RANGEProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  variant?: Variant
  size?: Size
} 