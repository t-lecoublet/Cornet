import { onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { DuDrawerProps } from '../du-drawer.types'

/**
 * Tailwind's default breakpoints, in the same unit Tailwind uses. Matching in
 * `rem` rather than `px` keeps the JS and the CSS agreeing when the user has
 * changed their browser's base font size.
 */
const BREAKPOINTS = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
} as const

type Breakpoint = keyof typeof BREAKPOINTS

/** Which breakpoint, if any, pins the sidebar open through a `*:drawer-open` class. */
function pinnedAt(props: Pick<DuDrawerProps, 'responsive' | 'alwaysOpenOnLarge'>): Breakpoint | null {
  if (props.responsive === true) {
    return 'lg'
  }
  if (typeof props.responsive === 'string') {
    return props.responsive
  }
  return props.alwaysOpenOnLarge === true ? 'lg' : null
}

/**
 * Whether the sidebar is currently *pinned* — laid out beside the content
 * rather than floating over it.
 *
 * The distinction is a CSS one (`lg:drawer-open` and friends), but it decides
 * behaviour the CSS cannot express: a floating sidebar is a dialog and must
 * trap focus, an inert background behind it; a pinned one is part of the page
 * and must do neither. So the media query has to be evaluated in JS too.
 *
 * Returns `false` wherever `matchMedia` is unavailable — on the server, and in
 * test environments — which is the safe answer: overlay behaviour on a pinned
 * sidebar is redundant, the reverse leaves a keyboard user trapped behind it.
 */
export function useDrawerPinned(props: Pick<DuDrawerProps, 'responsive' | 'alwaysOpenOnLarge'>): Ref<boolean> {
  const pinned = ref(false)

  watch(
    () => pinnedAt(props),
    (breakpoint, _old, onCleanup) => {
      pinned.value = false
      if (breakpoint == null || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return
      }
      const query = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]})`)
      pinned.value = query.matches

      const onChange = (event: MediaQueryListEvent) => {
        pinned.value = event.matches
      }
      query.addEventListener('change', onChange)
      onCleanup(() => query.removeEventListener('change', onChange))
    },
    { immediate: true },
  )

  onUnmounted(() => {
    pinned.value = false
  })

  return pinned
}
