import type { Component } from "vue";
import { type IconSource } from "../../../composables/useIconSource";
import { type Size } from "../../../composables/useSizeProps";

export const DU_MENU_DIRECTIONS = ["default", "vertical", "horizontal", "responsive"] as const;
export type DuMenuDirection = (typeof DU_MENU_DIRECTIONS)[number];

/**
 * What the menu *is*, semantically. The two are not interchangeable, and
 * picking the wrong one is the classic ARIA mistake:
 *
 * - `nav` (default) — a list of links. Plain `<ul>`, no ARIA role, native Tab
 *   between the links. This is what a sidebar is.
 * - `menu` — the APG menu pattern: a set of actions, `role="menu"` /
 *   `menuitem`, one tab stop with arrow-key navigation, typeahead, and
 *   collapsible submenus. Pair it with `DuDropdown` for a menu button.
 *
 * `role="menu"` on navigation tells a screen-reader user to expect
 * application-menu behaviour that a list of links does not have.
 */
export const DU_MENU_ROLES = ["nav", "menu"] as const;
export type DuMenuRole = (typeof DU_MENU_ROLES)[number];

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
  /** See `DuMenuRole`. Defaults to `nav`: a list of links, not an action menu. */
  role?: DuMenuRole;
  direction?: DuMenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: T[];
  /** The `value` (or `label`) of the item to mark as current. */
  activeItem?: string;
  /** Accessible name of the menu. Required by the APG in `menu` mode. */
  ariaLabel?: string;
}

/** What a `DuMenuItem` reads from the menu around it. */
export interface DuMenuContext {
  role: DuMenuRole;
  activeItem?: string;
  /** `menu` mode: whether this submenu is open. Always true in `nav` mode. */
  isExpanded: (path: string) => boolean;
  toggleSubmenu: (path: string, force?: boolean) => void;
  /** `menu` mode: the roving tab stop. Exactly one item answers `0`. */
  isTabStop: (path: string) => boolean;
  select: (item: DuMenuItemData, isSubItem: boolean) => void;
}

export const DU_MENU_CONTEXT = Symbol("cornet.menu.context");

export interface DuMenuItemProps<T extends DuMenuItemData = DuMenuItemData> {
  item: T;
  index: number;
  parentIndex?: string;
}