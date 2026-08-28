import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export const RANGE_VARIANTS = ['default', 'range-primary', 'range-secondary', 'range-accent', 'range-neutral', 'range-info', 'range-success', 'range-warning', 'range-error'] as const
export const RANGE_SIZES = ['default', 'range-xs', 'range-sm', 'range-md', 'range-lg', 'range-xl'] as const

export type DuRangeVariant = (typeof RANGE_VARIANTS)[number]
export type DuRangeSize = (typeof RANGE_SIZES)[number]

/**
 * Turns the raw number into what a screen reader should say — `"12 €"`,
 * `"Medium"`, `"3 of 5"`. Without it the slider announces a bare number, which
 * is only meaningful to someone who can see what it is a number *of*.
 */
export type DuRangeValueText = (value: number) => string

export interface DuRangeProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  variant?: Variant
  size?: Size
  /** Accessible name of the slider, when no visible label names it. */
  ariaLabel?: string
  /** id of the element that names the slider. */
  ariaLabelledby?: string
  valueText?: DuRangeValueText
  /**
   * Values to mark along the track. Rendered as a `<datalist>` the input
   * points at, which is what makes browser tick marks appear.
   */
  ticks?: (number | { value: number, label?: string })[]
} 