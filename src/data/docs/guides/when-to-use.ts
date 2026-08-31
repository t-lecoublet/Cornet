import type { DocPageData } from '@/types/docs'
import {
  levelCounts,
  LEVEL_GUIDANCE,
  LEVEL_ICON,
  LEVEL_ORDER,
  LEVEL_STYLE,
  type ComponentLevel,
} from '@/data/component-levels'

/**
 * Renders one legend row using the exact same badge markup as the sidebar tags
 * (same icon, same colors, from `component-levels.ts`) so the guide always
 * matches what the reader is looking at in the nav.
 */
function legendRow(level: ComponentLevel) {
  return `<div class="flex items-start gap-3">
  <span class="shrink-0 mt-0.5 flex items-center justify-center p-1 rounded-full ${LEVEL_STYLE[level]}">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="${LEVEL_ICON[level]}" />
    </svg>
  </span>
  <div class="min-w-0">
    <div class="flex items-baseline gap-2">
      <span class="text-sm font-bold text-base-content">${level}</span>
      <span class="text-xs text-base-content/40">${levelCounts[level]} components</span>
    </div>
    <p class="text-sm text-base-content/55 mt-0.5">${LEVEL_GUIDANCE[level]}</p>
  </div>
</div>`
}

const legend = `<div class="flex flex-col gap-5 w-full max-w-xl text-left">
${LEVEL_ORDER.map(legendRow).join('\n')}
</div>`

/** One of the two costs raised in the DaisyUI discussion, plus Cornet's answer to it. */
function costRow(label: string, cost: string, answer: string) {
  return `<div class="flex items-start gap-3">
  <span class="shrink-0 mt-0.5 w-9 text-center px-1.5 py-0.5 rounded-md text-[10px] font-bold tracking-tight bg-base-200 text-base-content/50">${label}</span>
  <div class="min-w-0">
    <p class="text-sm text-base-content/70">${cost}</p>
    <p class="text-xs text-base-content/40 mt-1">→ ${answer}</p>
  </div>
</div>`
}

const origin = `<div class="flex flex-col gap-5 w-full max-w-xl text-left">
  <blockquote class="border-l-2 border-primary/40 pl-4">
    <p class="text-sm text-base-content/80 italic">“What would you want (or not want) from a Vue library for daisyUI?”</p>
    <p class="text-xs text-base-content/40 mt-1.5">Opened on the DaisyUI repository, before Cornet grew.</p>
  </blockquote>

  <div class="flex flex-col gap-4">
${costRow(
  'CSS',
  'Tailwind scans raw source files, so every class variant written inside a wrapped component lands in your bundle — used or not.',
  'Cornet ships an optional Vite plugin that drops unused components from Tailwind scanning.',
)}
${costRow(
  'JS',
  'DaisyUI is deliberately zero-JS wherever a native element already does the job. A button or a checkbox should not need a component instance.',
  'Hence the levels on this page, and the tag on every component in the sidebar.',
)}
  </div>

  <p class="text-sm text-base-content/55 border-t border-base-300 pt-4">
    The consensus: a wrapper earns its overhead for what has no native equivalent — comboboxes, datatables — and not for primitives.
  </p>
</div>`

export default {
  title: 'When to Use Cornet',
  description:
    'Cornet is a thin Vue layer over DaisyUI classes. Every component in the sidebar carries a tag telling you whether importing it buys you real behavior — or whether plain markup would do the same job for less.',
  category: 'Guides',
  sections: [
    {
      title: 'The trade-off',
      description:
        'Every Cornet component you import costs a component instantiation — props, reactivity, a render function. For components whose whole job is composing a class string, you pay that cost for something a `<div class="…">` already does. For components with real behavior (state, keyboard navigation, dismiss handling, model sync), the JS is exactly the point.',
      lang: 'vue',
      code: `<!-- DuKbd is Simple: this is all it does -->
<DuKbd size="sm">⌘</DuKbd>
<kbd class="kbd kbd-sm">⌘</kbd>          <!-- identical output, no component -->

<!-- DuSelect is Rich: open state, selection, options
     normalization, keyboard nav, click-outside dismiss -->
<DuSelect v-model="picked" :options="options" />
<!-- reimplementing this by hand is a real project -->`,
    },
    {
      title: 'Reading the tags in the sidebar',
      description:
        'Each component in the navigation carries one of these three icons, to the right of its name. Hover a tag to get that specific component’s audit line — why it sits at its level.',
      preview: legend,
    },
    {
      title: 'This is not a hard rule',
      description:
        'For consistency and DX across a large app it can still be worth standardizing on Cornet components everywhere — one import path, one prop vocabulary, one place to change a convention. The tags matter when bundle size or render overhead actually does.',
      lang: 'vue',
      code: `<!-- Perfectly reasonable: consistency over micro-optimization -->
<DuCard bordered>
  <DuBadge variant="primary">New</DuBadge>
  <DuButton variant="primary">Buy</DuButton>
</DuCard>`,
    },
    {
      title: 'Where this comes from',
      description:
        'An audit kept alongside the library source as WHEN_TO_USE_CORNET.md, rewritten after the accessibility refactor. Treat it as a snapshot, not a guarantee — a component that grows real behavior moves up a level without this page noticing. A Rich component\'s logic lives in components/core/ when another component could want it (popup lifecycle, focus, keyboard navigation, controllable state), and in a local composables/ folder next to the .vue only when it is genuinely that component\'s own.',
      links: [
        { label: 'WHEN_TO_USE_CORNET.md', href: 'https://gitlab.limos.fr/hub-isima/daisyui-vue-kit/-/tree/lib/WHEN_TO_USE_CORNET.md' },
      ],
    },
    {
      title: 'Nine components moved up',
      description:
        'The refactor that gave Cornet its WAI-ARIA behaviour changed this audit. DuDropdown, DuTooltip, DuTabs, DuAccordion, DuCollapse, DuMenu, DuToast, DuInputField and DuDrawer are no longer thin class wrappers: they gained the state they had been faking with CSS — a dropdown that only toggled a class, tabs driven by hidden radio inputs, a tooltip that answered to the mouse alone. If you inlined one of them as plain markup on the strength of an earlier reading of this page, that markup is now missing keyboard support, focus handling and ARIA the component does for you.',
      lang: 'vue',
      code: `<!-- Was: a class toggle you could reasonably inline -->
<div class="dropdown dropdown-open">…</div>

<!-- Now: aria-expanded, Escape, outside-press dismissal,
     focus return, hover delays, optional top layer -->
<DuDropdown>
  <template #trigger="{ triggerProps }">
    <DuButton v-bind="triggerProps">Menu</DuButton>
  </template>
  <DuMenu role="menu" ariaLabel="Actions" :items="actions" />
</DuDropdown>`,
    },
    {
      title: 'Why this page exists',
      description:
        'Cornet was discussed openly on the DaisyUI repository before it grew. DaisyUI’s author and other contributors raised two costs any wrapper library has to answer for.',
      preview: origin,
      links: [
        { label: 'DaisyUI discussion #4596', href: 'https://github.com/saadeghi/daisyui/discussions/4596' },
        { label: 'The Vite plugin', href: '/docs/guides/installation' },
      ],
    },
  ],
} satisfies DocPageData
