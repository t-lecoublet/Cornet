export const COUNTDOWN_FORMATS = [
  'days',
  'hours',
  'minutes',
  'seconds',
] as const

export type COUNTDOWNFormat = (typeof COUNTDOWN_FORMATS)[number]

export interface COUNTDOWNLabels {
  days?: string
  hours?: string
  minutes?: string
  seconds?: string
} 