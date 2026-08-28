export const CAROUSEL_POSITIONS = [
  'carousel-start',
  'carousel-center',
  'carousel-end',
] as const

export type DuCarouselPosition = (typeof CAROUSEL_POSITIONS)[number]

export interface DuCarouselItemData {
  id?: string
  src?: string
  alt?: string
  content?: string
  customClass?: string
  /** Accessible name of the slide. Defaults to `"1 of 4"`. */
  ariaLabel?: string
}

/** Names each slide when the component has no better name to give it. */
export type DuCarouselSlideLabel = (index: number, total: number) => string

export const defaultSlideLabel: DuCarouselSlideLabel = (index, total) => `${index} of ${total}`

export interface DuCarouselProps {
  items?: DuCarouselItemData[]
  start?: boolean
  center?: boolean
  end?: boolean
  vertical?: boolean
  /**
   * Accessible name of the carousel as a whole. Required in practice: a
   * `region` landmark with no name is a landmark nobody can navigate to.
   */
  ariaLabel?: string
  slideLabel?: DuCarouselSlideLabel
  /** Render previous/next buttons that scroll the strip one slide at a time. */
  controls?: boolean
  previousLabel?: string
  nextLabel?: string
}

export interface DuCarouselItemProps {
  id?: string
  /** Accessible name of this slide, e.g. `"2 of 5"`. */
  ariaLabel?: string
}
