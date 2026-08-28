/**
 * The indicator modifiers only. `collapse-open` and `collapse-close` used to be
 * accepted here too; they are now driven by the open state itself, so passing
 * them would be a second, silent source of truth.
 */
export const COLLAPSE_MODIFIERS = [
  'collapse-arrow',
  'collapse-plus',
] as const

/** What identifies a panel in `modelValue`: its own `value`, or its position. */
export type DuCollapseValue = string | number

export interface DuCollapseItem {
  title?: string
  content?: string
  /** Stable identity for `v-model`. Falls back to the item's index. */
  value?: DuCollapseValue
  /** Open when the component owns its state and nothing else says otherwise. */
  open?: boolean
  disabled?: boolean
  customClass?: string
}

export type DuCollapseModifier = (typeof COLLAPSE_MODIFIERS)[number]

export interface DuCollapseProps {
  items?: DuCollapseItem[]
  /**
   * Which panels are open. Every panel here is independent of the others —
   * that is the difference from `DuAccordion`. Omit it and the component owns
   * its state.
   */
  modelValue?: DuCollapseValue[]
  modifier?: DuCollapseModifier
  customClass?: string
}

export type DuCollapseEmit = {
  (e: 'update:modelValue', value: DuCollapseValue[]): void
}
