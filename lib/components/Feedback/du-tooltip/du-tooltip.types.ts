import { type Variant } from "../../../composables/useVariantProps";

export const DU_TOOLTIP_POSITIONS = ["top", "right", "bottom", "left"] as const;
export type TooltipPosition = (typeof DU_TOOLTIP_POSITIONS)[number];

export interface TooltipProps {
  variant?: Variant;
  dataTip?: string;
  open?: boolean;
  position?: TooltipPosition;
  responsive?: boolean;
} 