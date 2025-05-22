export const ACCORDION_MODIFIERS = [
  'collapse-arrow',
  'collapse-plus',
  'collapse-open',
  'collapse-close',
] as const

export interface ACCORDIONItem {
  title?: string
  content?: string
  checked?: boolean
  customClass?: string
}

export type ACCORDIONModifier = (typeof ACCORDION_MODIFIERS)[number] 