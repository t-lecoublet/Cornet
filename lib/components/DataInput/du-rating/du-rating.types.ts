import { Size } from "../../../composables/useSizeProps";

export interface RatingItem {
  value: number;
  checked?: boolean;
}

export const DU_RATING_SHAPES = ["star", "star-2", "heart", "circle"] as const;
export type RatingShape = (typeof DU_RATING_SHAPES)[number];

export interface RatingProps {
  modelValue?: number;
  items?: RatingItem[];
  count?: number;
  name?: string;
  halfStar?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  size?: Size;
  shape?: RatingShape;
  color?: string;
  customClass?: string;
}

export interface RatingItemProps {
  value?: number;
  checked?: boolean;
  disabled?: boolean;
  shape?: RatingShape;
  color?: string;
  halfMask?: "1" | "2";
  customClass?: string;
}

export interface RatingEmits {
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}

export interface RatingItemEmits {
  (e: "change", value: number): void;
} 