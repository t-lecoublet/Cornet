import type { Component } from "vue";
import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type MenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

export interface MenuItem {
  label: string;
  href?: string;
  disabled?: boolean;
  isTitle?: boolean;
  subItems?: MenuItem[];
  value?: string | number;
  onClick?: () => void;
  checked?: boolean;
  multiple?: boolean;
  active?: boolean;
  icon?: Component | string | object | unknown;
}

export interface MenuProps {
  direction?: MenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: MenuItem[];
  activeItem?: string;
  onItemClick?: (item: MenuItem) => void;
  onSubItemClick?: (item: MenuItem) => void;
}