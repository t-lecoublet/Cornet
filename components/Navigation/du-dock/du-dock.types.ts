import { type IconSource } from "../../../composables/useIconSource";
import { type Size } from "../../../composables/useSizeProps";

export const DOCK_SIZES = ['dock-xs', 'dock-sm', 'dock-md', 'dock-lg', 'dock-xl'] as const

export type DuDockSize = (typeof DOCK_SIZES)[number]
export interface DuDockItem {
  label?: string;
  icon?: IconSource;
  class?: string;
  active?: boolean;
  onClick?: () => void;
  /** Extra keys ride along untouched, for a consumer's own slot bindings. */
  [key: string]: unknown;
}

export interface DuDockProps {
  size?: Size;
  items?: DuDockItem[];
  reverseTheme?: boolean;
  /** Accessible name of the navigation landmark. */
  ariaLabel?: string;
} 