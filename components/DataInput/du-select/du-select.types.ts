import { type Size } from "../../../composables/useSizeProps"
import { type Variant } from "../../../composables/useVariantProps"

export const SELECT_VARIANTS = ['default', 'select-primary', 'select-secondary', 'select-accent', 'select-neutral', 'select-info', 'select-success', 'select-warning', 'select-error'] as const
export const SELECT_SIZES = ['default', 'select-xs', 'select-sm', 'select-md', 'select-lg', 'select-xl'] as const

// du-select.vue also sizes its own <input> (search box) via
// useSizeMapping(props, 'input'), but those literals otherwise only live in
// du-input-field.types.ts / du-search.types.ts, which DuSelect doesn't import.
export const SELECT_INPUT_SIZES = ['default', 'input-xs', 'input-sm', 'input-md', 'input-lg', 'input-xl'] as const
export type DuSelectInputSize = (typeof SELECT_INPUT_SIZES)[number]

// du-select.vue sizes its dropdown list via useSizeMapping(props, 'menu')
// (menu-xs..menu-xl), but those literals otherwise only live in du-menu.types.ts.
// In embedded mode Tailwind's scanner excludes a component's whole directory
// (including its .types.ts) when the app doesn't use it directly, so if DuMenu
// isn't imported anywhere, menu-{size} would never be generated even though
// DuSelect's dropdown needs it. This local copy keeps them scanned regardless.
export const SELECT_MENU_SIZES = ['menu-xs', 'menu-sm', 'menu-md', 'menu-lg', 'menu-xl'] as const

// The controls nested inside du-select.vue — the chips (badge), their remove
// button and the chevron (btn), the per-option checkbox — are sized from the
// component's own size via `nestedSize`. Their literals live in DuBadge,
// DuButton and DuCheckbox, none of which DuSelect imports, so the same
// embedded-mode scan gap applies: these local copies keep them generated.
export const SELECT_CHIP_SIZES = ['badge-xs', 'badge-sm', 'badge-md', 'badge-lg', 'badge-xl'] as const
export const SELECT_NESTED_BUTTON_SIZES = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-xl'] as const
export const SELECT_CHECKBOX_SIZES = ['checkbox-xs', 'checkbox-sm', 'checkbox-md', 'checkbox-lg', 'checkbox-xl'] as const

export type DuSelectVariant = (typeof SELECT_VARIANTS)[number]
export type DuSelectSize = (typeof SELECT_SIZES)[number]
export type DuSelectMenuSize = (typeof SELECT_MENU_SIZES)[number]

/** Validation failures reported by the component. */
export type DuSelectErrorCode = 'required' | 'minlength' | 'maxlength'

export type DuSelectEmit<O = any, V = any> = {
  (e: 'update:modelValue', value: V | V[] | null): void
  (e: 'select', option: O): void
  (e: 'remove', option: O): void
  (e: 'query', query: string): void
  (e: 'open'): void
  (e: 'close'): void
}

export interface DuSelectProps<O = any, V = any> {
  /** v-model. A single value (or option, with `returnObject`), an array in `multiple` mode. */
  modelValue?: V | V[] | null
  options?: O[]
  multiple?: boolean
  disabled?: boolean
  /** Focusable and readable, but cannot open or change. */
  readonly?: boolean
  /** Requires a selection (validation only — no native form constraint). */
  required?: boolean
  /** Multiple: minimum number of selected options (validation). */
  minSelected?: number
  /** Multiple: maximum number of selected options. Blocks selecting more. */
  maxSelected?: number
  /** Override the default validation messages. */
  errorMessages?: Partial<Record<DuSelectErrorCode, string>>
  /** Object key identifying an option. Falls back to `value`, then `id`, then the option itself. */
  trackBy?: string
  /** Object key displayed for an option. Falls back to `label`, then `name`, then `String(option)`. */
  labelBy?: string
  /** Full control over the value stored in the model. Takes precedence over `trackBy` and `returnObject`. */
  optionValue?: (option: O) => V
  /** Full control over the displayed label. Takes precedence over `labelBy`. */
  optionLabel?: (option: O) => string
  /** Custom filter. Defaults to a case-insensitive substring match on the label. */
  optionFilter?: (option: O, query: string) => boolean
  /** Options that cannot be picked. Defaults to `option.disabled === true`. */
  optionDisabled?: (option: O) => boolean
  /** Emit whole options instead of their `trackBy` value. */
  returnObject?: boolean
  /** Close after selecting. `null` (default) means `true` for single, `false` for multiple. */
  closeOnSelect?: boolean | null
  closeOnClickOutside?: boolean
  /** Tab selects the highlighted option before leaving the field. */
  selectOnTab?: boolean
  /** Single: picking the selected option again clears it. Also shows a ✕ on the selected row. */
  clearable?: boolean
  placeholder?: string
  /** Shown when no option matches the query. */
  noResultsText?: string
  /** Base id for the ARIA wiring. Auto-generated when omitted. */
  id?: string
  /** Render the dropdown in the top layer (Popover API), immune to `overflow: hidden` parents. */
  popover?: boolean
  /** Type the query in the field itself. */
  searchable?: boolean
  /** Type the query in a box at the top of the dropdown instead. */
  searchableInside?: boolean
  searchPlaceholder?: string
  /** Show a checkbox on each option. */
  checkboxes?: boolean
  /** Accessible label of a chip's remove button (multiple). */
  removeItemLabel?: string
  size?: Size
  /** Size of the dropdown list. Defaults to `size`. */
  subSize?: Size
  variant?: Variant
  ghost?: boolean
  customClass?: string
}
