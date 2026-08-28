import { type Size } from "../../../composables/useSizeProps";


export const RATING_SIZES = ["rating-xs", "rating-sm", "rating-md", "rating-lg", "rating-xl"] as const;
export type DuRatingSize = (typeof RATING_SIZES)[number];
export interface DuRatingItemData {
  value: number;
  checked?: boolean;
}

export const DU_RATING_SHAPES = ["star", "star-2", "heart", "circle"] as const;
export type DuRatingShape = (typeof DU_RATING_SHAPES)[number];

/**
 * The accessible name of one star: `(value, max) => string`.
 *
 * The default is English, like every other default text in the library, and it
 * exists to be replaced — "3 out of 5" is the whole content of that control for
 * anyone not looking at it.
 */
export type DuRatingItemLabel = (value: number, max: number) => string;

export const defaultRatingItemLabel: DuRatingItemLabel = (value, max) => `${value} out of ${max}`;

export interface DuRatingProps {
  modelValue?: number;
  items?: DuRatingItemData[];
  count?: number;
  name?: string;
  halfStar?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  /**
   * Show the rating without letting anyone change it. Renders plain elements
   * rather than disabled radios: a read-only value is not a broken control.
   */
  readonly?: boolean;
  /** Accessible name of the whole group. */
  ariaLabel?: string;
  itemLabel?: DuRatingItemLabel;
  size?: Size;
  shape?: DuRatingShape;
  color?: string;
  customClass?: string;
}

export interface DuRatingItemProps {
  value?: number;
  checked?: boolean;
  disabled?: boolean;
  /** Render a non-interactive element instead of a radio. */
  readonly?: boolean;
  /** Accessible name. Falls back to `"<value> out of <max>"`. */
  ariaLabel?: string;
  shape?: DuRatingShape;
  color?: string;
  halfMask?: 1 | 2;
  customClass?: string;
}

export interface DuRatingEmits {
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}

export interface DuRatingItemEmits {
  (e: "change", value: number): void;
} 