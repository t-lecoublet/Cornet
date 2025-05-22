import { type Size } from "../../../composables/useSizeProps";

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