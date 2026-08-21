/**
 * Internal-complexity audit of every Cornet component, ported from the library's
 * `WHEN_TO_USE_CORNET.md` (snapshot: 2026-07-02).
 *
 * This is the single source of truth for both the sidebar level tags
 * (`DocsLayout.vue`) and the "When to Use Cornet" guide, which renders its
 * tables from this array — keep the audit here, never in either consumer.
 */

export type ComponentLevel = 'Simple' | 'Intermediate' | 'Rich'

export interface ComponentLevelEntry {
  /** Component name as exported from `cornet-ui`. */
  name: string
  level: ComponentLevel
  /** Why it sits at that level — shown in the guide's tables. */
  reason: string
  /** Doc page path. Absent for sub-components documented inside a parent's page. */
  path?: string
}

export interface ComponentLevelCategory {
  category: string
  components: ComponentLevelEntry[]
}

export const LEVEL_ORDER: ComponentLevel[] = ['Rich', 'Intermediate', 'Simple']

/** One-line guidance per level, used for the sidebar tag tooltips and the legend. */
export const LEVEL_GUIDANCE: Record<ComponentLevel, string> = {
  Rich: 'Multiple behavior subsystems (state, keyboard nav, focus, dismiss). Always use the Cornet component.',
  Intermediate: 'Some real state or mode switching. Use it for the logic, inline it if you only want the markup.',
  Simple: 'A class-mapping wrapper with no state. Plain HTML with DaisyUI classes does the same job.',
}

/**
 * Visual encoding of the levels, shared by the sidebar tags and the
 * "When to Use Cornet" guide so the two can never show different badges.
 */
export const LEVEL_STYLE: Record<ComponentLevel, string> = {
  Rich: 'text-success bg-success/10',
  Intermediate: 'text-info bg-info/10',
  Simple: 'text-base-content/40 bg-base-content/5',
}

/** Heroicons 24-outline paths, one per level. */
export const LEVEL_ICON: Record<ComponentLevel, string> = {
  // bolt — a small engine of its own
  Rich: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  // sliders — some real logic to configure
  Intermediate: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6 12h3.75m-3.75 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.75 6h3.75m-3.75 12h9.75',
  // code brackets — just markup you could write yourself
  Simple: 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25',
}

export const componentLevels: ComponentLevelCategory[] = [
  {
    category: 'Actions',
    components: [
      { name: 'DuButton', path: '/docs/actions/button', level: 'Simple', reason: 'Polymorphic wrapper resolving element tag/attrs from injected context.' },
      { name: 'DuDropdown', path: '/docs/actions/dropdown', level: 'Intermediate', reason: 'Placement input normalization plus hover/open class toggles.' },
      { name: 'DuFab', path: '/docs/actions/fab', level: 'Intermediate', reason: 'Class composition and icon-kind resolution; no internal state or keyboard nav.' },
      { name: 'DuModal', path: '/docs/actions/modal', level: 'Intermediate', reason: 'Imperative <dialog> open/close sync via ref + watcher, plus Escape handling.' },
      { name: 'DuSwap', path: '/docs/actions/swap', level: 'Intermediate', reason: 'Model sync combined with a checkbox-vs-click mode switch.' },
    ],
  },
  {
    category: 'Data Display',
    components: [
      { name: 'DuAccordion', path: '/docs/data-display/accordion', level: 'Intermediate', reason: 'Dynamic-items vs manual-slot mode plus a generated exclusive group name.' },
      { name: 'DuAvatar', path: '/docs/data-display/avatar', level: 'Simple', reason: 'Pure presentational class mapping.' },
      { name: 'DuBadge', path: '/docs/data-display/badge', level: 'Simple', reason: 'Thin wrapper choosing a static SVG icon by variant.' },
      { name: 'DuCard', path: '/docs/data-display/card', level: 'Intermediate', reason: 'Slot-presence driven structural branching, no internal state.' },
      { name: 'DuCarousel', path: '/docs/data-display/carousel', level: 'Intermediate', reason: 'Items-vs-slot rendering plus position-class resolution.' },
      { name: 'DuCarouselItem', level: 'Simple', reason: 'Trivial presentational wrapper.' },
      { name: 'DuChat', path: '/docs/data-display/chat', level: 'Intermediate', reason: 'Dynamic vs manual mode with per-item placement/variant resolution.' },
      { name: 'DuCollapse', path: '/docs/data-display/collapse', level: 'Intermediate', reason: 'Same dynamic/manual pattern as DuAccordion, with a generated id.' },
      { name: 'DuCountdown', path: '/docs/data-display/countdown', level: 'Rich', reason: 'Timer lifecycle, multi-format time math, prop watchers, imperative API.' },
      { name: 'DuCountdownGroup', level: 'Simple', reason: 'Composition wrapper rendering up to four DuCountdown instances.' },
      { name: 'DuDiff', path: '/docs/data-display/diff', level: 'Simple', reason: 'Static presentational figure.' },
      { name: 'DuKbd', path: '/docs/data-display/kbd', level: 'Simple', reason: 'Trivial size-class wrapper.' },
      { name: 'DuList', path: '/docs/data-display/list', level: 'Simple', reason: 'Trivial wrapper.' },
      { name: 'DuStat', path: '/docs/data-display/stat', level: 'Simple', reason: 'Slot-presence conditional wrapper.' },
      { name: 'DuStats', path: '/docs/data-display/stats', level: 'Intermediate', reason: 'Item-type resolution (component/image/HTML) for figure and actions.' },
      { name: 'DuStatus', path: '/docs/data-display/status', level: 'Simple', reason: 'Conditional markup plus class mapping.' },
      { name: 'DuTable', path: '/docs/data-display/table', level: 'Intermediate', reason: 'Dynamic columns/rows vs manual-slot mode, purely structural.' },
      { name: 'DuTimeline', path: '/docs/data-display/timeline', level: 'Intermediate', reason: 'Multi-layer connector-line class fallback plus dynamic/manual modes.' },
    ],
  },
  {
    category: 'Data Input',
    components: [
      { name: 'DuCheckbox', path: '/docs/data-input/checkbox', level: 'Simple', reason: 'defineModel() passthrough plus an indeterminate flag kept in sync.' },
      { name: 'DuFieldset', path: '/docs/data-input/fieldset', level: 'Simple', reason: 'Static markup wrapper.' },
      { name: 'DuFileInput', path: '/docs/data-input/file-input', level: 'Simple', reason: 'Pure class-mapping wrapper.' },
      { name: 'DuFilter', path: '/docs/data-input/filter', level: 'Intermediate', reason: 'Dynamic vs manual mode with a generated radio-group name.' },
      { name: 'DuInputField', path: '/docs/data-input/input-field', level: 'Simple', reason: 'defineModel() passthrough with class composition.' },
      { name: 'DuLabel', path: '/docs/data-input/label', level: 'Simple', reason: 'Type-based class mapping plus provide().' },
      { name: 'DuLabelInputValidator', path: '/docs/data-input/label-input-validator', level: 'Intermediate', reason: 'Composes DuLabel + DuInputField; most logic lives in the children.' },
      { name: 'DuRadio', path: '/docs/data-input/radio', level: 'Simple', reason: 'Pure class-mapping wrapper.' },
      { name: 'DuRange', path: '/docs/data-input/range', level: 'Intermediate', reason: 'Manual model sync plus an exposed computed value.' },
      { name: 'DuRating', path: '/docs/data-input/rating', level: 'Intermediate', reason: 'Value sync plus a clear-on-reclick rule and multiple rendering modes.' },
      { name: 'DuSearch', path: '/docs/data-input/search', level: 'Rich', reason: 'Query/filter, selection, input parsing, commit, keyboard nav, dismiss.' },
      { name: 'DuSelect', path: '/docs/data-input/select', level: 'Rich', reason: 'Open state, selection, options normalization, keyboard nav, dismiss.' },
      { name: 'DuTextArea', path: '/docs/data-input/textarea', level: 'Simple', reason: 'Value passthrough, no independent state.' },
    ],
  },
  {
    category: 'Feedback',
    components: [
      { name: 'DuAlert', path: '/docs/feedback/alert', level: 'Intermediate', reason: 'Visibility/dismiss state plus an auto-dismiss timeout and a close event.' },
      { name: 'DuLoading', path: '/docs/feedback/loading', level: 'Simple', reason: 'Pure animation/size/variant class mapping.' },
      { name: 'DuProgress', path: '/docs/feedback/progress', level: 'Simple', reason: 'Pure class-mapping wrapper.' },
      { name: 'DuRadialProgress', path: '/docs/feedback/radial-progress', level: 'Simple', reason: 'Style-variable computation, no state.' },
      { name: 'DuSkeleton', path: '/docs/feedback/skeleton', level: 'Simple', reason: 'Trivial class wrapper.' },
      { name: 'DuToast', path: '/docs/feedback/toast', level: 'Simple', reason: 'Position-class mapping plus a conditional Teleport.' },
      { name: 'DuTooltip', path: '/docs/feedback/tooltip', level: 'Simple', reason: 'Class mapping plus a slot-presence check.' },
    ],
  },
  {
    category: 'Layout',
    components: [
      { name: 'DuDrawer', path: '/docs/layout/drawer', level: 'Rich', reason: 'Dual open/modelValue sync, responsive class coordination, Escape + focus handling.' },
      { name: 'DuJoin', path: '/docs/layout/join', level: 'Simple', reason: 'Direction-class mapping plus provide().' },
    ],
  },
  {
    category: 'Navigation',
    components: [
      { name: 'DuBreadcrumbs', path: '/docs/navigation/breadcrumbs', level: 'Intermediate', reason: 'Router-component detection plus a custom separator mechanism.' },
      { name: 'DuDock', path: '/docs/navigation/dock', level: 'Intermediate', reason: 'Internal active-item state plus icon-kind resolution.' },
      { name: 'DuLink', path: '/docs/navigation/link', level: 'Simple', reason: 'Pure class-mapping wrapper.' },
      { name: 'DuMenu', path: '/docs/navigation/menu', level: 'Intermediate', reason: 'Recursive rendering, router-tag resolution, active state, keyboard nav.' },
      { name: 'DuNavbar', path: '/docs/navigation/navbar', level: 'Simple', reason: 'Pure slot-presence layout wrapper.' },
      { name: 'DuPagination', path: '/docs/navigation/pagination', level: 'Intermediate', reason: 'A page-range/ellipsis algorithm; no internal state or keyboard nav.' },
      { name: 'DuStepItem', level: 'Simple', reason: 'Pure class-composition wrapper.' },
      { name: 'DuSteps', path: '/docs/navigation/steps', level: 'Intermediate', reason: 'Dynamic vs manual mode with per-index class resolution.' },
      { name: 'DuTabs', path: '/docs/navigation/tabs', level: 'Intermediate', reason: 'Item-mode vs slot-mode switch plus icon-kind resolution.' },
    ],
  },
]

/** Flat view of every audited component, sub-components included. */
export const allComponentLevels: ComponentLevelEntry[] = componentLevels.flatMap((c) => c.components)

/** Level per doc page path — what the sidebar looks up. */
export const levelByPath: Record<string, ComponentLevelEntry> = Object.fromEntries(
  allComponentLevels.filter((c) => c.path).map((c) => [c.path as string, c]),
)

/** How many components sit at each level, sub-components included. */
export const levelCounts: Record<ComponentLevel, number> = LEVEL_ORDER.reduce(
  (acc, level) => {
    acc[level] = allComponentLevels.filter((c) => c.level === level).length
    return acc
  },
  {} as Record<ComponentLevel, number>,
)
