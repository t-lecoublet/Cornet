export const COLLAPSE_MODIFIERS = [
  'collapse-arrow',
  'collapse-plus',
  'collapse-open',
  'collapse-close',
] as const

export interface COLLAPSEItem {
  title?: string
  content?: string
  open?: boolean
  customClass?: string
}

export type COLLAPSEModifier = (typeof COLLAPSE_MODIFIERS)[number] 