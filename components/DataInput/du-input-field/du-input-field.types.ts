import { type Size } from "../../../composables/useSizeProps"
import { type Variant } from "../../../composables/useVariantProps"

export type INPUTFIELDType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "datetime-local"
  | "week"
  | "month"
  | "tel"
  | "url"
  | "search"
  | "time"

export type INPUTFIELDValidatorProps = {
  pattern?: string
  minlength?: number
  maxlength?: number
  title?: string
}

export type INPUTFIELDProps = {
  type?: INPUTFIELDType
  placeholder?: string
  size?: Size
  ghost?: boolean
  variant?: Variant
  disabled?: boolean
  suggestionName?: string
  suggestionList?: string[]
  required?: boolean
} & INPUTFIELDValidatorProps 