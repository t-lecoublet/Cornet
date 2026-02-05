import { type MenuItem } from '../../Navigation/du-menu/du-menu.types'

export const DRAWER_POSITIONS = ['start', 'end'] as const

export type DRAWERPosition = (typeof DRAWER_POSITIONS)[number]

export interface DRAWERItem extends MenuItem {
    icon?: any
    customClass?: string
    [key: string]: any
}

export interface DRAWERProps {
    id?: string
    position?: 'start' | 'end'
    open?: boolean
    responsive?: boolean
    alwaysOpenOnLarge?: boolean
    modelValue?: boolean
    sidebarClass?: string
    sidebarWrapperClass?: string
    contentClass?: string
    overlayClass?: string
    items?: DRAWERItem[]
    /** Enable icon-only collapsible mode with is-drawer-open/is-drawer-close variants */
    iconOnly?: boolean
}
