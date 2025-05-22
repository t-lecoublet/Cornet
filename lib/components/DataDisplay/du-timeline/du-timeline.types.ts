export const TIMELINE_DIRECTIONS = [
  'timeline-vertical',
  'timeline-horizontal',
] as const

export const TIMELINE_MODIFIERS = [
  'timeline-snap-icon',
  'timeline-box',
  'timeline-compact',
] as const

export type TIMELINEDirection = (typeof TIMELINE_DIRECTIONS)[number]
export type TIMELINEModifier = (typeof TIMELINE_MODIFIERS)[number]

export interface TIMELINEItem {
  start?: string
  middle?: string
  end?: string
  customClass?: string
  valid?: boolean | undefined
  hrClass?: string
} 