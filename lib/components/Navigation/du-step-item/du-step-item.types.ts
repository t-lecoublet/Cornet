import { type Variant } from "../../../composables/useVariantProps";

export interface StepItemProps {
  label?: string;
  active?: boolean;
  customClass?: string;
  dataContent?: string;
  variant?: Variant;
} 