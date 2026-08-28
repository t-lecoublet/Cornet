// CSS anchor positioning: the inline style that pins a popup to its trigger.
//
// happy-dom does not implement anchor positioning, so what is asserted is the
// contract the primitive owns — which edges it pins for a given placement, and
// what it deliberately leaves alone.
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useAnchorPosition } from '../components/core/positioning'
import type { AnchorPlacement } from '../components/core/positioning'

const styleFor = (placement: AnchorPlacement = {}) =>
  useAnchorPosition('--anchor-x', () => placement).popupStyle.value

describe('useAnchorPosition', () => {
  it('names the anchor it expects on the trigger', () => {
    expect(useAnchorPosition('--anchor-x').cssAnchorName).toBe('--anchor-x')
    expect(styleFor().positionAnchor).toBe('--anchor-x')
  })

  it('never sets `position`', () => {
    // A top-layer element gets `position: fixed` from the UA stylesheet, and an
    // inline one keeps whatever the consumer gave it. Setting it here fights both.
    for (const side of ['top', 'bottom', 'left', 'right'] as const) {
      expect(styleFor({ side })).not.toHaveProperty('position')
    }
  })

  it('drops the popup below the anchor by default, matching its width', () => {
    // What a select's listbox wants, and the default the combobox engine relies on.
    expect(styleFor()).toMatchObject({
      top: 'anchor(bottom)',
      left: 'anchor(left)',
      width: 'anchor-size(width)',
    })
  })

  it('flips to the top edge when asked', () => {
    const style = styleFor({ side: 'top' })
    expect(style.bottom).toBe('anchor(top)')
    expect(style).not.toHaveProperty('top')
  })

  it('aligns to either end of a horizontal edge', () => {
    expect(styleFor({ align: 'start' }).left).toBe('anchor(left)')
    expect(styleFor({ align: 'end' }).right).toBe('anchor(right)')
    expect(styleFor({ align: 'center' })).toMatchObject({
      left: 'anchor(center)',
      translate: '-50%',
    })
  })

  it('pins the opposite edge on a side placement', () => {
    expect(styleFor({ side: 'right' }).left).toBe('anchor(right)')
    expect(styleFor({ side: 'left' }).right).toBe('anchor(left)')
  })

  it('aligns along the vertical edge for a side placement', () => {
    expect(styleFor({ side: 'right', align: 'start' }).top).toBe('anchor(top)')
    expect(styleFor({ side: 'right', align: 'end' }).bottom).toBe('anchor(bottom)')
    expect(styleFor({ side: 'right', align: 'center' })).toMatchObject({
      top: 'anchor(center)',
      translate: '0 -50%',
    })
  })

  it('leaves the width alone on a side placement, where matching it is meaningless', () => {
    expect(styleFor({ side: 'right' })).not.toHaveProperty('width')
  })

  it('can let the popup size itself', () => {
    expect(styleFor({ matchWidth: false })).not.toHaveProperty('width')
  })

  it('follows a placement that changes', () => {
    const side = ref<'top' | 'bottom'>('bottom')
    const { popupStyle } = useAnchorPosition('--anchor-x', () => ({ side: side.value }))
    expect(popupStyle.value.top).toBe('anchor(bottom)')

    side.value = 'top'
    expect(popupStyle.value.bottom).toBe('anchor(top)')
  })
})
