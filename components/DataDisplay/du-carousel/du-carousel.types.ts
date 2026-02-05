export const CAROUSEL_POSITIONS = [
  'carousel-start',
  'carousel-center',
  'carousel-end',
] as const

export type CAROUSELPosition = (typeof CAROUSEL_POSITIONS)[number]

export interface CarouselItem {
  id?: string
  src?: string
  alt?: string
  content?: string
  customClass?: string
} 