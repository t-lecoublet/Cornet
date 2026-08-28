import { type Size } from '../../../composables/useSizeProps'
import { type Variant } from '../../../composables/useVariantProps'

export const BUTTON_SIZES = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-xl'] as const
export const BUTTON_COLORS = [
  'btn-primary',
  'btn-secondary',
  'btn-accent',
  'btn-neutral',
  'btn-info',
  'btn-success',
  'btn-warning',
  'btn-error',
] as const

export type DuButtonSize = (typeof BUTTON_SIZES)[number]
export type DuButtonColor = (typeof BUTTON_COLORS)[number]

export type DuButtonElementTag = 'button' | 'a' | 'input' | 'div' | 'RouterLink' | 'NuxtLink' | string

export interface DuButtonProps {
  customClass?: string
  size?: Size
  variant?: Variant
  outline?: boolean
  soft?: boolean
  dash?: boolean
  active?: boolean
  ghost?: boolean
  link?: boolean
  wide?: boolean
  disabled?: boolean
  square?: boolean
  circle?: boolean
  block?: boolean
  as?: DuButtonElementTag
  type?: string
  href?: string
  value?: string
  inputType?: 'button' | 'submit' | 'reset' | 'radio' | 'checkbox'
  /**
   * Names the button when nothing else does — the `<input>` form, which has no
   * slot, or a button used without content. It is **ignored** when the default
   * slot is filled: replacing visible text with a different accessible name is
   * the "label in name" failure (WCAG 2.5.3). Use `ariaLabel` to name a button
   * whose content is an icon.
   */
  label?: string
  /** Accessible name, when the visible content is not one (an icon-only button). */
  ariaLabel?: string
}
