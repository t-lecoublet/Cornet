import { type Variant } from "../../../composables/useVariantProps";
import { type Size } from "../../../composables/useSizeProps";

export interface DuFilterButtonArgs {
  variant?: Variant;
  size?: Size;
  outline?: boolean;
  soft?: boolean;
  dash?: boolean;
  active?: boolean;
  ghost?: boolean;
  link?: boolean;
  wide?: boolean;
  disabled?: boolean;
  square?: boolean;
  circle?: boolean;
}

/** What identifies a filter in `modelValue`: its own `value`, or its title. */
export type DuFilterValue = string | number;

export interface DuFilterItem {
  title?: string;
  /** Stable identity for `v-model`. Falls back to `title`, then to the index. */
  value?: DuFilterValue;
  /** Selected when the component owns its state and nothing else says otherwise. */
  checked?: boolean;
  customClass?: string;
  buttonsArgs?: DuFilterButtonArgs;
  /** Extra keys ride along untouched, for a consumer's own slot bindings. */
  [key: string]: unknown;
}

export interface DuFilterProps<T extends DuFilterItem = DuFilterItem> {
  items?: T[];
  /**
   * The selected filter's value, or `null` for none. Omit it and the filter
   * owns its state.
   */
  modelValue?: DuFilterValue | null;
  name?: string;
  /**
   * Names the group of filters. Rendered as a `<legend>`, visually hidden
   * unless `showLegend` — a radio group without one is a set of buttons whose
   * common purpose a screen reader never states.
   */
  legend?: string;
  showLegend?: boolean;
  /** Accessible name of the reset button, whose only content is a `×`. */
  resetLabel?: string;
  buttonsArgs?: DuFilterButtonArgs;
}

export type DuFilterEmit<T extends DuFilterItem = DuFilterItem> = {
  (e: 'update:modelValue', value: DuFilterValue | null): void
  (e: 'change', item: T | undefined): void
} 