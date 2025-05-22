export const STATUS_SIZES = [
  'status-xs',
  'status-sm',
  'status-md',
  'status-lg',
  'status-xl',
] as const

export const STATUS_VARIANTS = [
  'status-primary',
  'status-secondary',
  'status-accent',
  'status-neutral',
  'status-info',
  'status-success',
  'status-warning',
  'status-error',
] as const

export type STATUSSize = (typeof STATUS_SIZES)[number]
export type STATUSVariant = (typeof STATUS_VARIANTS)[number] 