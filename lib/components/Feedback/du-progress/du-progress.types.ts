import { type Variant } from "../../../composables/useVariantProps";

export interface ProgressProps {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  variant?: Variant;
} 