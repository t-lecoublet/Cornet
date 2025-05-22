export const CAROUSEL_POSITIONS = [
  'carousel-start',
  'carousel-center',
  'carousel-end',
] as const

export const CAROUSEL_DIRECTIONS = [
  'carousel-horizontal',
  'carousel-vertical',
] as const

export type CAROUSELPosition = (typeof CAROUSEL_POSITIONS)[number]
export type CAROUSELDirection = (typeof CAROUSEL_DIRECTIONS)[number] 