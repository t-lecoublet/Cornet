import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type MenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

export interface MenuItem {
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  subItems?: MenuItem[];
  isTitle?: boolean; // Si true, l'item est rendu comme un titre (menu-title)
  // Pour slot manuel, on peut utiliser le slot #item ou #item-0, etc.
}

export interface MenuProps {
  direction?: MenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: MenuItem[]; // Si défini, mode automatique. Sinon, mode manuel via slot.
  activeItem?: string;
  onItemClick?: (item: MenuItem) => void;
  onSubItemClick?: (item: MenuItem) => void;
} 