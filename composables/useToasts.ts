import { readonly, ref } from 'vue'
import type { DeepReadonly, Ref } from 'vue'
import type { Variant } from './useVariantProps'

/**
 * How urgently a screen reader should interrupt for this toast.
 *
 * `polite` waits for a pause — right for anything a user can ignore.
 * `assertive` cuts in, and is for errors only: an interruption a user did not
 * ask for is a cost, and spending it on "Saved" is what makes people turn
 * announcements off.
 */
export type ToastPoliteness = 'polite' | 'assertive'

export interface ToastOptions {
  title?: string
  message?: string
  variant?: Variant
  /** How long it stays, in ms. `0` means until it is dismissed. */
  duration?: number
  politeness?: ToastPoliteness
}

export interface Toast extends ToastOptions {
  id: string
  duration: number
  politeness: ToastPoliteness
}

const DEFAULT_DURATION = 5000

// Module scope on purpose: anything in the app can raise a toast, and one
// `<DuToast>` somewhere in the layout renders them all. A per-instance queue
// would mean every caller had to reach the right component first.
const toasts = ref<Toast[]>([])

let sequence = 0

interface Countdown {
  handle: ReturnType<typeof setTimeout>
  /** What is left to run, updated whenever the countdown is paused. */
  remaining: number
  startedAt: number
}

const countdowns = new Map<string, Countdown>()

function stopCountdown(id: string) {
  const countdown = countdowns.get(id)
  if (countdown != null) {
    clearTimeout(countdown.handle)
    countdowns.delete(id)
  }
}

function startCountdown(id: string, remaining: number) {
  if (remaining <= 0) {
    return
  }
  countdowns.set(id, {
    remaining,
    startedAt: Date.now(),
    handle: setTimeout(() => dismiss(id), remaining),
  })
}

function push(options: ToastOptions = {}): string {
  sequence += 1
  const toast: Toast = {
    duration: DEFAULT_DURATION,
    politeness: options.variant === 'error' ? 'assertive' : 'polite',
    ...options,
    id: `toast-${sequence}`,
  }
  toasts.value = [...toasts.value, toast]
  startCountdown(toast.id, toast.duration)
  return toast.id
}

function dismiss(id: string) {
  stopCountdown(id)
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

function clear() {
  toasts.value.forEach((toast) => stopCountdown(toast.id))
  toasts.value = []
}

/**
 * Hold every countdown. WCAG 2.2.1 asks that a time limit be pausable, and a
 * toast that vanishes while it is being read or reached for is the everyday
 * version of that failure — hovering it or tabbing into it stops the clock.
 */
function pause() {
  for (const [id, countdown] of countdowns) {
    clearTimeout(countdown.handle)
    countdowns.set(id, {
      ...countdown,
      remaining: countdown.remaining - (Date.now() - countdown.startedAt),
    })
  }
}

/** Let them run again, each from where it stopped rather than from the top. */
function resume() {
  for (const [id, countdown] of [...countdowns]) {
    countdowns.delete(id)
    startCountdown(id, countdown.remaining)
  }
}

export interface Toasts {
  toasts: DeepReadonly<Ref<Toast[]>>
  push: (options?: ToastOptions) => string
  dismiss: (id: string) => void
  clear: () => void
  pause: () => void
  resume: () => void
}

/**
 * The toast queue.
 *
 * ```ts
 * const { push } = useToasts()
 * push({ message: 'Saved', variant: 'success' })
 * push({ message: 'Could not save', variant: 'error', duration: 0 })
 * ```
 *
 * Render it with a single `<DuToast />` in the layout. An `error` toast is
 * announced assertively unless `politeness` says otherwise.
 */
export function useToasts(): Toasts {
  return { toasts: readonly(toasts), push, dismiss, clear, pause, resume }
}
