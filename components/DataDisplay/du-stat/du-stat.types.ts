import { type IconSource } from '../../../composables/useIconSource'

export interface DuStatItem {
  title?: string
  value?: string | number
  description?: string
  figure?: IconSource
  figureClass?: string
  valueClass?: string
  descClass?: string
  titleClass?: string
  /** Rendered in the stat's action slot: a component, an image URL, or markup. */
  actions?: IconSource
  /** Extra keys ride along untouched, for a consumer's own slot bindings. */
  [key: string]: unknown
}

export interface DuStatProps {
  figureClass?: string
  valueClass?: string
  descClass?: string
  titleClass?: string
}