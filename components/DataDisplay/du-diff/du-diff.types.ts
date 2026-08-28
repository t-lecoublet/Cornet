export const DIFF_ASPECT_RATIOS = [
  'aspect-16/9',
  'aspect-4/3',
  'aspect-1/1',
  'aspect-video',
  'aspect-square',
] as const

export type DuDiffAspectRatio = (typeof DIFF_ASPECT_RATIOS)[number]

export interface DuDiffProps {
  item1?: string
  item2?: string
  aspectRatio?: DuDiffAspectRatio | string | null
  /** Accessible name of the comparison as a whole. */
  ariaLabel?: string
  /**
   * daisyUI's comparison is driven by focus: the figure focused shows almost
   * all of the first image, `.diff-item-1` focused shows almost all of the
   * second. Only the second stop needs naming — the first is the figure
   * itself, which `ariaLabel` already names. Without it that tab stop is
   * silent.
   */
  revealLabel?: string
  /** Alternative text for the two images, when rendered from `item1` / `item2`. */
  item1Alt?: string
  item2Alt?: string
}