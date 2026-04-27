import { type Size } from "../../../composables/useSizeProps";

export const DOCK_SIZES = ['dock-xs', 'dock-sm', 'dock-md', 'dock-lg', 'dock-xl'] as const

export type DOCKSize = (typeof DOCK_SIZES)[number]
export interface DockItem {
  label?: string;
  icon?: any;
  class?: string;
  active?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export interface DockProps {
  size?: Size;
  items?: DockItem[];
  reverseTheme?: boolean;
} 