import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type MenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

export interface MenuProps {
  direction?: MenuDirection;
  size?: Size;
  rounded?: boolean;
} 