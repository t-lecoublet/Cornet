import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/** Which edge of the anchor the popup hangs off. */
export type AnchorSide = 'top' | 'bottom' | 'left' | 'right'

/** How the popup lines up along that edge. */
export type AnchorAlign = 'start' | 'center' | 'end'

export interface AnchorPlacement {
  side?: AnchorSide
  align?: AnchorAlign
  /** Force the popup to the anchor's width — what a select's listbox wants. */
  matchWidth?: boolean
}

/**
 * The inline style that pins a popup to its anchor, through CSS anchor
 * positioning.
 *
 * No `position` is set: an element in the top layer gets `position: fixed` from
 * the UA stylesheet, and a regular one keeps whatever the consumer gave it.
 * Setting it here would fight both.
 *
 * The anchor itself needs the matching `anchor-name`, which is why the name is
 * handed back — put it on the trigger, spread `popupStyle` on the popup.
 */
export type AnchorPopupStyle = Record<string, string>

export function useAnchorPosition(
  cssAnchorName: string,
  placement: () => AnchorPlacement = () => ({}),
): { cssAnchorName: string, popupStyle: ComputedRef<AnchorPopupStyle> } {
  const popupStyle = computed<AnchorPopupStyle>(() => {
    const { side = 'bottom', align = 'start', matchWidth = true } = placement()
    const style: AnchorPopupStyle = { positionAnchor: cssAnchorName }

    // The cross axis: which anchor edge the popup's own edge meets.
    if (side === 'bottom' || side === 'top') {
      style[side === 'bottom' ? 'top' : 'bottom'] = `anchor(${side})`
      if (matchWidth) {
        style.width = 'anchor-size(width)'
      }
      if (align === 'start') {
        style.left = 'anchor(left)'
      }
      else if (align === 'end') {
        style.right = 'anchor(right)'
      }
      else {
        style.justifySelf = 'anchor-center'
        style.left = 'anchor(center)'
        style.translate = '-50%'
      }
    }
    else {
      style[side === 'right' ? 'left' : 'right'] = `anchor(${side})`
      if (align === 'start') {
        style.top = 'anchor(top)'
      }
      else if (align === 'end') {
        style.bottom = 'anchor(bottom)'
      }
      else {
        style.top = 'anchor(center)'
        style.translate = '0 -50%'
      }
    }

    return style
  })

  return { cssAnchorName, popupStyle }
}
