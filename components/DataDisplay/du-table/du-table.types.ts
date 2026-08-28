export const TABLE_SIZES = ['default', 'xs', 'sm', 'md', 'lg', 'xl'] as const
export type DuTableSize = (typeof TABLE_SIZES)[number]

// Tailwind-scan safelist: useSizeMapping(props, 'table') builds these prefixed
// literals at runtime (TABLE_SIZES above holds the bare prop values instead).
export const TABLE_SIZE_CLASSES = ['table-xs', 'table-sm', 'table-md', 'table-lg', 'table-xl'] as const
export type DuTableSizeClass = (typeof TABLE_SIZE_CLASSES)[number]

/**
 * What the table itself needs from a row — a stable key for `v-for` and an
 * optional class. Constrain on this rather than on `DuTableRow`: a consumer's
 * own `interface Invoice { id: number; total: number }` has no index
 * signature, so it would not satisfy `DuTableRow`.
 */
export interface DuTableRowBase {
  id: string | number
  customClass?: string
}

/** The default row shape when the consumer does not name their own. */
export interface DuTableRow extends DuTableRowBase {
  /** Cell values, addressed by `DuTableColumn.key`. */
  [key: string]: unknown
}

/** `key` is checked against the row type — a typo in a column no longer renders blank. */
export interface DuTableColumn<R extends DuTableRowBase = DuTableRow> {
  key: Extract<keyof R, string>
  label: string
  customClass?: string
}

export interface DuTableProps<R extends DuTableRowBase = DuTableRow> {
  columns?: DuTableColumn<R>[]
  rows?: R[]
  /**
   * What the table is about, rendered as a `<caption>`. A data table with no
   * caption leaves someone arriving at it by keyboard with a grid of numbers
   * and no idea what they count.
   */
  caption?: string
  /** Expose the caption without showing it. */
  hideCaption?: boolean
  zebra?: boolean
  pinRows?: boolean
  pinCols?: boolean
  size?: DuTableSize
  customClass?: string
  header?: boolean
  footer?: boolean
} 