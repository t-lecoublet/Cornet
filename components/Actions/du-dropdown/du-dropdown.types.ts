export const DROPDOWN_PLACEMENTS = [
  'dropdown-start',
  'dropdown-center',
  'dropdown-end',
  'dropdown-top',
  'dropdown-bottom',
  'dropdown-left',
  'dropdown-right',
] as const

export type DROPDOWNPlacement = (typeof DROPDOWN_PLACEMENTS)[number] 


export type PlacementValue = 'start' | 'center' | 'end' | 'top' | 'bottom' | 'left' | 'right'
export type PlacementInput = PlacementValue | string | PlacementValue[] | Partial<Record<PlacementValue, boolean>>