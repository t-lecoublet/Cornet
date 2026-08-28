import { type Variant } from "../../../composables/useVariantProps"
import { type Size } from "../../../composables/useSizeProps"

export interface DuFileInputProps {
  /** The chosen files. A file input cannot be *set* from script, so this is read-only in practice: it reports, it does not restore. */
  modelValue?: File[]
  disabled?: boolean
  variant?: Variant
  size?: Size
  ghost?: boolean
  /** Accept more than one file. */
  multiple?: boolean
  /** Native `accept` filter, e.g. `"image/*,.pdf"`. */
  accept?: string
  /** Accessible name, when no visible label provides one. */
  ariaLabel?: string
}

export type DuFileInputEmit = {
  (e: 'update:modelValue', files: File[]): void
  (e: 'change', files: File[]): void
} 

export const FILEINPUT_SIZES = [
  'file-input-xs',
  'file-input-sm',
  'file-input-md',
  'file-input-lg',
  'file-input-xl',
] as const

export const FILEINPUT_VARIANTS = [
  'file-input-primary',
  'file-input-secondary',
  'file-input-accent',
  'file-input-neutral',
  'file-input-info',
  'file-input-success',
  'file-input-warning',
  'file-input-error',
] as const

