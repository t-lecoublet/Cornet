import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export interface SELECTProps {
  ghost?: boolean
  variant?: Variant
  size?: Size
  disabled?: boolean
} 