import type { AnchorAlign, AnchorSide } from '../../core/positioning'

export const DROPDOWN_PLACEMENTS = [
  'dropdown-start',
  'dropdown-center',
  'dropdown-end',
  'dropdown-top',
  'dropdown-bottom',
  'dropdown-left',
  'dropdown-right',
] as const

// Tailwind-scan safelist: the open/closed state classes are applied from a
// ternary, so their literals must live here to be scanned.
export const DROPDOWN_STATES = ['dropdown-open', 'dropdown-close'] as const

export type DuDropdownPlacement = (typeof DROPDOWN_PLACEMENTS)[number]
export type DuDropdownState = (typeof DROPDOWN_STATES)[number]

export type DuDropdownPlacementValue = 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right'
export type DuDropdownPlacementInput = DuDropdownPlacementValue | string | DuDropdownPlacementValue[] | Partial<Record<DuDropdownPlacementValue, boolean>>

/** Spread on the element that opens the dropdown: `<button v-bind="triggerProps">`. */
export interface DuDropdownTriggerProps {
  'aria-haspopup': 'true'
  'aria-expanded': boolean
  'aria-controls': string
  onClick: () => void
  onKeydown: (event: KeyboardEvent) => void
}

export interface DuDropdownProps {
  /**
   * Open state. Omit it and the dropdown owns its own; pass it (with
   * `@update:open`, or `v-model:open`) and yours decides.
   */
  open?: boolean
  /** Open on pointer hover and on keyboard focus, as well as on click. */
  hover?: boolean
  /** Delays around hover, in ms, so a pointer crossing the trigger does not flash it. */
  openDelay?: number
  closeDelay?: number
  placement?: DuDropdownPlacementInput
  /**
   * Render the panel in the top layer (Popover API + CSS anchor positioning),
   * so an `overflow: hidden` ancestor cannot clip it.
   */
  popover?: boolean
  /** Close when a press lands outside the dropdown. Defaults to `true`. */
  closeOnClickOutside?: boolean
  /** Close on Escape, handing focus back to the trigger. Defaults to `true`. */
  closeOnEscape?: boolean
  /** Cannot be opened. */
  disabled?: boolean
  /** Extra classes on the panel. */
  contentClass?: string
}

export type DuDropdownEmit = {
  (e: 'update:open', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}

/** How a daisyUI placement keyword maps onto CSS anchor positioning in `popover` mode. */
export const PLACEMENT_SIDES: Partial<Record<DuDropdownPlacementValue, AnchorSide>> = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
}

export const PLACEMENT_ALIGNS: Partial<Record<DuDropdownPlacementValue, AnchorAlign>> = {
  start: 'start',
  center: 'center',
  end: 'end',
}
