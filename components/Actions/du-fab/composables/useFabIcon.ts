import { resolveIconKind } from '../../../../composables/useIconSource'
import type { IconKind } from '../../../../composables/useIconSource'

/** @deprecated Use `IconKind` from `composables/useIconSource`. */
export type DuFabIconKind = IconKind

/** Icon narrowing plus the fab's own tooltip-side default. */
export function useFabIcon() {
  function getTooltipPosition(position?: 'left' | 'top' | 'right' | 'bottom') {
    return position || 'left'
  }

  return { resolveIconKind, getTooltipPosition }
}
