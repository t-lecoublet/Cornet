export const AVATAR_SIZES = ['size-8', 'size-12', 'size-16', 'size-24', 'size-32'] as const
export const AVATAR_ROUNDED = [
  'rounded',
  'rounded-full',
  'rounded-xs',
  'rounded-sm',
  'rounded-md',
  'rounded-lg',
  'rounded-xl',
] as const

export type AVATARSize = (typeof AVATAR_SIZES)[number]
export type AVATARRounded = (typeof AVATAR_ROUNDED)[number] 