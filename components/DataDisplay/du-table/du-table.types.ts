export const TABLE_SIZES = ['default', 'xs', 'sm', 'md', 'lg', 'xl'] as const
export type TABLESize = (typeof TABLE_SIZES)[number]

export interface TABLEColumn {
  key: string
  label: string
  customClass?: string
}

export interface TABLERow {
  id: string | number
  [key: string]: any
  customClass?: string
}

export interface TABLEProps {
  columns?: TABLEColumn[]
  rows?: TABLERow[]
  zebra?: boolean
  pinRows?: boolean
  pinCols?: boolean
  size?: TABLESize
  customClass?: string
  header?: boolean
  footer?: boolean
} 