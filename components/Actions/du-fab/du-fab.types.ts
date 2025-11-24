export const FAB_MODIFIERS = ['fab-flower'] as const

export type FABModifier = (typeof FAB_MODIFIERS)[number]

export interface FABItem {
  label?: string
  icon?: any
  customClass?: string
  onClick?: () => void
  tooltip?: string
  tooltipPosition?: 'left' | 'top' | 'right' | 'bottom'
  [key: string]: any
}

export interface FABMainAction {
  label?: string
  icon?: any
  customClass?: string
  variant?: string
  onClick?: () => void
}

export interface FABCloseButton {
  label?: string
  icon?: string
  customClass?: string
  variant?: string
}
