import { type IconSource } from "../../../composables/useIconSource";
import { type Size } from "../../../composables/useSizeProps";

export const DU_TABS_TYPES = ["lift", "border", "box"] as const;
export type DuTabsType = (typeof DU_TABS_TYPES)[number];

// Tailwind-scan safelist: useSizeMapping(props, 'tabs') builds these literals
// at runtime; keep them here so they're always scanned.
export const TABS_SIZES = ["default", "tabs-xs", "tabs-sm", "tabs-md", "tabs-lg", "tabs-xl"] as const;
export type DuTabsSize = (typeof TABS_SIZES)[number];

// Tailwind-scan safelist: these are applied from a lookup or a ternary, so
// their literals must live here to be scanned.
export const TABS_TYPE_CLASSES = ['tabs-lift', 'tabs-border', 'tabs-box'] as const;
export const TABS_PLACEMENT_CLASSES = ['tabs-top', 'tabs-bottom'] as const;
export const TAB_STATE_CLASSES = ['tab', 'tab-content', 'tab-disabled'] as const;

/** What identifies a tab in `modelValue`: its own `value`, or its position. */
export type DuTabValue = string | number;

export interface DuTabItem {
  label?: string;
  icon?: IconSource;
  class?: string;
  /**
   * Stable identity for `v-model`. Falls back to the item's index, which is
   * fine for a fixed list and wrong the moment tabs are added or reordered.
   */
  value?: DuTabValue;
  /** Selected when the component owns its state and nothing else says otherwise. */
  active?: boolean;
  /** Skipped by the keyboard, not selectable. */
  disabled?: boolean;
  onClick?: () => void;
  content?: string;
  /** Extra keys ride along untouched, for a consumer's own slot bindings. */
  [key: string]: unknown;
}

/**
 * When focus lands on a tab, does it select it?
 *
 * `automatic` (the default) selects as you arrow through — right when the
 * panels are cheap, and what the radio-group implementation did.
 * `manual` waits for Enter or Space, which is what the APG asks for when
 * showing a panel is expensive.
 */
export const DU_TABS_ACTIVATIONS = ['automatic', 'manual'] as const;
export type DuTabsActivation = (typeof DU_TABS_ACTIVATIONS)[number];

export interface DuTabsProps {
  size?: Size;
  items?: DuTabItem[];
  type?: DuTabsType;
  /** Render the panels above the tabs. */
  bottom?: boolean;
  /** The `value` (or index) of the selected tab. */
  modelValue?: DuTabValue;
  activation?: DuTabsActivation;
  /** Accessible name of the tab group. Required by the APG. */
  ariaLabel?: string;
}

export type DuTabsEmit = {
  (e: 'update:modelValue', value: DuTabValue): void
} 