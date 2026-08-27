import type { Component } from 'vue'

/**
 * The `icon` (and `figure`) prop of an item, in every form the components
 * accept: a Vue component, an image URL, or a raw SVG/HTML string.
 *
 * This is a display union rather than a discriminated one — a consumer passes
 * whatever they have and the component works out which it is — so keep the
 * narrowing in `resolveIconKind` and never inline a `typeof` chain in a
 * template. The three components that did each recognized a different subset.
 *
 * `null` is included: "explicitly no icon" is a value consumers pass when they
 * build items from data, and it renders nothing.
 */
export type IconSource = Component | string | null

export type IconKind = 'component' | 'image' | 'html'

/**
 * Which of the three `IconSource` shapes this value is, or `null` when there
 * is nothing to render.
 *
 * A URL is recognized by an absolute `http(s)` or root-relative `/` prefix;
 * anything else that is a string is treated as markup and rendered through
 * `v-html`, so it must be trusted content — the same contract as any other
 * `v-html` prop in the library.
 */
export function resolveIconKind(icon: unknown): IconKind | null {
  if (icon == null || icon === '') {
    return null
  }
  if (typeof icon === 'object' || typeof icon === 'function') {
    return 'component'
  }
  if (typeof icon !== 'string') {
    return null
  }
  return icon.startsWith('http') || icon.startsWith('/') ? 'image' : 'html'
}

/**
 * The icon as a plain string, for `:src` and `v-html` bindings.
 *
 * A template cannot narrow `IconSource` through a `resolveIconKind` call in a
 * sibling `v-if`, so pair the two: `resolveIconKind` picks the branch, this
 * hands the branch a `string`. Returns `undefined` for a component, which
 * leaves the attribute off entirely.
 */
export function iconAsText(icon: unknown): string | undefined {
  return typeof icon === 'string' ? icon : undefined
}
