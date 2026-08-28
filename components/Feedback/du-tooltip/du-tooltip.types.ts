import { type Variant } from "../../../composables/useVariantProps";

export const DU_TOOLTIP_POSITIONS = ["top", "right", "bottom", "left"] as const;
export type DuTooltipPosition = (typeof DU_TOOLTIP_POSITIONS)[number];

// Tailwind-scan safelist: useVariantMapping(props, 'tooltip') builds these
// literals at runtime; keep them here so they're always scanned.
export const TOOLTIP_VARIANTS = ['default', 'tooltip-primary', 'tooltip-secondary', 'tooltip-accent', 'tooltip-neutral', 'tooltip-info', 'tooltip-success', 'tooltip-warning', 'tooltip-error'] as const;
export type DuTooltipVariant = (typeof TOOLTIP_VARIANTS)[number];

// Tailwind-scan safelist: the position and state classes are applied from a
// lookup and a ternary, so their literals must live here to be scanned.
export const TOOLTIP_POSITION_CLASSES = ['tooltip-top', 'tooltip-right', 'tooltip-bottom', 'tooltip-left'] as const;
export const TOOLTIP_STATES = ['tooltip-open'] as const;

export interface DuTooltipProps {
  variant?: Variant;
  /** The tip itself, when it is plain text. Use the `content` slot for markup. */
  dataTip?: string;
  /**
   * Force the tip open. Omit it and the tooltip owns its state (hover and
   * focus); pass it (with `@update:open`, or `v-model:open`) and yours decides.
   */
  open?: boolean;
  position?: DuTooltipPosition;
  responsive?: boolean;
  /** How long a pointer must rest before the tip appears, in ms. */
  openDelay?: number;
  /** How long it lingers after the pointer leaves — long enough to reach it. */
  closeDelay?: number;
  /**
   * Render the tip in the top layer (Popover API + CSS anchor positioning),
   * so an `overflow: hidden` ancestor cannot clip it.
   */
  popover?: boolean;
  /** Never open. For a tip whose text is not ready yet. */
  disabled?: boolean;
}

export type DuTooltipEmit = {
  (e: 'update:open', value: boolean): void
} 