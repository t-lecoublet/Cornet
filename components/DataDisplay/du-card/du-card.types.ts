export const CARD_SIZES = [
  'card-xs',
  'card-sm',
  'card-md',
  'card-lg',
  'card-xl',
] as const

export const CARD_PROPERTIES = [
  'card-border',
  'card-dash',
  'card-side',
  'lg:card-side',
  'image-full',
] as const

export type CARDSize = (typeof CARD_SIZES)[number]
export type CARDProperty = (typeof CARD_PROPERTIES)[number] 