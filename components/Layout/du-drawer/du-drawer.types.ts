import { type IconSource } from '../../../composables/useIconSource'
import { type DuMenuItemData } from '../../Navigation/du-menu/du-menu.types'

export const DRAWER_POSITIONS = ['start', 'end'] as const

export type DuDrawerPosition = (typeof DRAWER_POSITIONS)[number]

export interface DuDrawerItem extends DuMenuItemData {
    icon?: IconSource
    customClass?: string
    /** Extra keys ride along untouched, for a consumer's own slot bindings. */
    [key: string]: unknown
}

export type DuDrawerEmit = {
    (e: 'update:modelValue', value: boolean): void
    (e: 'update:open', value: boolean): void
}

export interface DuDrawerProps {
    id?: string
    position?: 'start' | 'end'
    /**
     * Open state. Omit it (and `modelValue`) and the drawer owns its own; pass
     * either one and yours decides, with `update:open` / `update:modelValue`
     * emitted. `open` wins when both are given.
     */
    open?: boolean
    responsive?: boolean | 'xl' | 'lg' | 'md' | 'sm'
    // keep alwaysOpenOnLarge due to breaking changes
    alwaysOpenOnLarge?: boolean
    modelValue?: boolean
    sidebarClass?: string
    sidebarWrapperClass?: string
    contentClass?: string
    overlayClass?: string
    items?: DuDrawerItem[]
    /** Enable icon-only collapsible mode with is-drawer-open/is-drawer-close variants */
    iconOnly?: boolean
    /**
     * Accessible name of the sidebar while it floats over the page as a dialog.
     */
    ariaLabel?: string
    /**
     * What to make `inert` while the sidebar floats over it — a CSS selector.
     * Defaults to the drawer's own content pane, which is what sits behind the
     * overlay. Point it elsewhere when the page has chrome outside the drawer.
     */
    inertTarget?: string
    /** Close on Escape. Defaults to `true`. */
    closeOnEscape?: boolean
    /** Close when a press lands outside the sidebar, while it floats. Defaults to `true`. */
    closeOnClickOutside?: boolean
}
