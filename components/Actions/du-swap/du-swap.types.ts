export const SWAP_PROPERTIES = ['swap-rotate', 'swap-flip', 'swap-active'] as const

export type DuSwapProperty = (typeof SWAP_PROPERTIES)[number]

export interface DuSwapProps {
  modelValue?: boolean
  rotate?: boolean
  flip?: boolean
  useCheckbox?: boolean
  /** Accessible name of the toggle. Required in practice when both faces are icons. */
  ariaLabel?: string
}