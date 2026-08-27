import { useId } from 'vue'

/**
 * SSR-safe component ids.
 *
 * `Math.random()` produces a different id on the server and on the client,
 * which Vue reports as a hydration mismatch and which breaks any `for`/`id` or
 * `aria-controls` pair that spans the boundary. `useId()` is deterministic for
 * a given render order, so both sides agree.
 */

/**
 * Vue's `useId()` can yield ids containing `:` depending on the app's
 * `idPrefix`. That is legal in an `id` attribute but not in a CSS custom
 * property name or an unescaped selector, so it is normalized away.
 */
function sanitize(id: string): string {
  return id.replace(/:/g, '-')
}

/**
 * A stable id for the current component instance, honouring a caller-supplied
 * one. Must be called during `setup()`, like `useId()` itself.
 *
 * A consumer-supplied id is sanitized too: it lands in the same CSS custom
 * properties and selectors as a generated one.
 *
 * @param explicit - an id given by the consumer; used when present.
 * @param prefix - prepended to the generated id, to keep the DOM readable.
 */
export function useComponentId(explicit?: string, prefix?: string): string {
  if (explicit) {
    return sanitize(explicit)
  }
  const generated = sanitize(useId() ?? '')
  return prefix ? `${prefix}-${generated}` : generated
}

/**
 * Derives sibling ids from a base — `useScopedIds('x')('listbox')` is
 * `'x-listbox'`. Keeps related ids spelled in one place.
 */
export function useScopedIds(base: string) {
  return (suffix: string) => `${base}-${suffix}`
}
