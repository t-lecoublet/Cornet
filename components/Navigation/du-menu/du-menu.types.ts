import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type MenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

export interface MenuProps {
  direction?: MenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: Array<{
    label: string;
    icon?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    subItems?: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
      disabled?: boolean;
    }>;
  }>;
  activeItem?: string;
  onItemClick?: (item: { label: string; href?: string; onClick?: () => void }) => void;
  onSubItemClick?: (item: { label: string; href?: string; onClick?: () => void }) => void;
} 