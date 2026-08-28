import type { Variant } from "../../../composables/useVariantProps";

export const DU_TOAST_HORIZONTAL_POSITIONS = ["start", "center", "end"] as const;
export type DuToastHorizontalPosition = (typeof DU_TOAST_HORIZONTAL_POSITIONS)[number];

export const DU_TOAST_VERTICAL_POSITIONS = ["top", "middle", "bottom"] as const;
export type DuToastVerticalPosition = (typeof DU_TOAST_VERTICAL_POSITIONS)[number];

// Tailwind-scan safelist: the position classes are picked from a lookup, so
// their literals must live here to be scanned.
export const TOAST_POSITION_CLASSES = [
  "toast-start", "toast-center", "toast-end",
  "toast-top", "toast-middle", "toast-bottom",
] as const;

/**
 * A queued toast is styled per item, not per component, so the variant cannot
 * go through `useVariantMapping` (which reads one prop). The literals live here
 * for the same reason that composable's safelists do: Tailwind only generates a
 * class whose name it has read somewhere.
 */
export const TOAST_ALERT_VARIANTS: Record<Variant, string> = {
  default: "",
  neutral: "alert-neutral",
  primary: "alert-primary",
  secondary: "alert-secondary",
  accent: "alert-accent",
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export interface DuToastProps {
  horizontalPosition?: DuToastHorizontalPosition;
  verticalPosition?: DuToastVerticalPosition;
  /** Teleport target for the container. */
  to?: string;
  /** Accessible name of each toast's close button. */
  dismissLabel?: string;
}
