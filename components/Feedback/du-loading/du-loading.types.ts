import { type Variant } from "../../../composables/useVariantProps";
import { type Size } from "../../../composables/useSizeProps";

export const DU_LOADING_ANIMATIONS = ["spinner", "dots", "ring", "ball", "bars", "infinity"] as const;
export type DuLoadingAnimation = (typeof DU_LOADING_ANIMATIONS)[number];

// Tailwind-scan safelist: useSizeMapping(props, 'loading') / useVariantMapping(props, 'text')
// build these literals at runtime; keep them here so they're always scanned.
export const LOADING_SIZES = ['default', 'loading-xs', 'loading-sm', 'loading-md', 'loading-lg', 'loading-xl'] as const;
export const LOADING_VARIANTS = ['default', 'text-primary', 'text-secondary', 'text-accent', 'text-neutral', 'text-info', 'text-success', 'text-warning', 'text-error'] as const;
export type DuLoadingSize = (typeof LOADING_SIZES)[number];
export type DuLoadingVariant = (typeof LOADING_VARIANTS)[number];

export interface DuLoadingProps {
  animation?: DuLoadingAnimation;
  size?: Size;
  variant?: Variant;
  /**
   * What is loading, announced politely. Without it the spinner is hidden from
   * assistive tech: a decoration nobody can read is better than an unnamed
   * live region that says nothing.
   */
  ariaLabel?: string;
} 