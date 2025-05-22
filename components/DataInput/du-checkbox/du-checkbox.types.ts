import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export interface CHECKBOXProps {
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  variant?: Variant
  size?: Size
} 