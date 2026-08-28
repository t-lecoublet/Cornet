/**
 * The indicator modifiers only. `collapse-open` and `collapse-close` used to be
 * accepted here too; they are now driven by the open state itself, so passing
 * them would be a second, silent source of truth.
 */
export const ACCORDION_MODIFIERS = [
  'collapse-arrow',
  'collapse-plus',
] as const

// Tailwind-scan safelist: the open/closed classes are applied from a ternary,
// so their literals must live here to be scanned.
export const COLLAPSE_STATE_CLASSES = ['collapse-open', 'collapse-close'] as const

/** What identifies a panel in `modelValue`: its own `value`, or its position. */
export type DuAccordionValue = string | number

export interface DuAccordionItemData {
  title?: string
  content?: string
  /** Stable identity for `v-model`. Falls back to the item's index. */
  value?: DuAccordionValue
  /** Open when the component owns its state and nothing else says otherwise. */
  checked?: boolean
  disabled?: boolean
  customClass?: string
}

export type DuAccordionModifier = (typeof ACCORDION_MODIFIERS)[number]

export interface DuAccordionProps {
  items?: DuAccordionItemData[]
  /**
   * Which panels are open. A single value (or `null`) by default; an array when
   * `multiple`. Omit it and the accordion owns its state.
   */
  modelValue?: DuAccordionValue | DuAccordionValue[] | null
  /** Allow several panels open at once. */
  multiple?: boolean
  /** Single mode: allow closing the open panel, leaving none. Defaults to `true`. */
  collapsible?: boolean
  modifier?: DuAccordionModifier
  customClass?: string
}

export type DuAccordionEmit = {
  (e: 'update:modelValue', value: DuAccordionValue | DuAccordionValue[] | null): void
}

/** What a `DuAccordionItem` reads from the accordion around it. */
export interface DuAccordionContext {
  /** Registers a manually written panel and hands back its identity. */
  register: (value?: DuAccordionValue) => DuAccordionValue
  isOpen: (value: DuAccordionValue) => boolean
  toggle: (value: DuAccordionValue) => void
  modifier?: DuAccordionModifier
}

export const DU_ACCORDION_CONTEXT = Symbol('cornet.accordion.context')

export interface DuAccordionItemProps {
  /** Stable identity. Falls back to the order the panel registered in. */
  value?: DuAccordionValue
  /** Open initially, when the accordion owns its state. */
  checked?: boolean
  disabled?: boolean
  customClass?: string
  title?: string
}
