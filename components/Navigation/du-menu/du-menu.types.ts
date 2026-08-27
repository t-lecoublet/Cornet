import type { Component } from "vue";
import { type IconSource } from "../../../composables/useIconSource";
import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type DuMenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

export const MENU_SIZES = ['menu-xs', 'menu-sm', 'menu-md', 'menu-lg', 'menu-xl'] as const
export type DuMenuSize = (typeof MENU_SIZES)[number]

export interface DuMenuItemData {
  label: string;
  href?: string;
  as?: string | Component;
  disabled?: boolean;
  isTitle?: boolean;
  /**
   * `this[]`, not `DuMenuItemData[]`: a sub-item has the same shape as its
   * parent, so a consumer's own fields survive one level down and the
   * recursive `DuMenuItem` stays typed against a single `T`.
   */
  subItems?: this[];
  value?: string | number;
  onClick?: () => void;
  checked?: boolean;
  multiple?: boolean;
  active?: boolean;
  icon?: IconSource;
}

/**
 * Generic over the item type: a consumer's own fields (a route object, a
 * permission flag) stay typed in the `itemClick` payload and the scoped slots.
 */
export interface DuMenuProps<T extends DuMenuItemData = DuMenuItemData> {
  direction?: DuMenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: T[];
  activeItem?: string;
  onItemClick?: (item: T) => void;
  onSubItemClick?: (item: T) => void;
}

export interface DuMenuItemProps<T extends DuMenuItemData = DuMenuItemData> {
  item: T;
  index: number;
  parentIndex?: string;
  onItemClick?: (item: T) => void;
  onSubItemClick?: (item: T) => void;
}