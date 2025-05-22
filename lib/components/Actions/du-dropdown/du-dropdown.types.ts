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