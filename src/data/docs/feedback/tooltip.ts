import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tooltip',
  description: 'Tooltip shows a short description of the element it wraps. It opens on hover **and on keyboard focus**, dismisses on Escape, and wires `aria-describedby` onto the trigger while it is up — so the description reaches everyone, not just people using a mouse.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/tooltip/',
  props: [
    {
      title: 'dataTip',
      description: 'The tip itself, when it is plain text. Use the `#content` slot for markup.',
      type: 'string',
    },
    {
      title: 'position',
      description: 'Position of the tooltip relative to the trigger',
      type: 'string',
      default: '"top"',
      options: ['top', 'bottom', 'left', 'right'],
    },
    {
      title: 'variant',
      description: 'Color variant for the tooltip',
      type: 'string',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'open',
      description: 'Force the tip open. Omit it and the tooltip owns its state (hover and focus); pass it — with `@update:open`, or `v-model:open` — and yours decides.',
      type: 'boolean | undefined',
      default: 'undefined',
    },
    {
      title: 'openDelay',
      description: 'How long a pointer must rest on the trigger before the tip appears, in ms.',
      type: 'number',
      default: '300',
    },
    {
      title: 'closeDelay',
      description: 'How long the tip lingers after the pointer leaves, in ms — long enough to move onto it.',
      type: 'number',
      default: '100',
    },
    {
      title: 'popover',
      description: 'Render the tip in the top layer (Popover API + CSS anchor positioning), so an `overflow: hidden` ancestor cannot clip it.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Never opens. For a tip whose text is not ready yet.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'responsive',
      description: 'Enable responsive behavior (tooltip only from `lg` up)',
      type: 'boolean',
      default: 'false',
    },
  ],
  slots: [
    {
      title: 'Slot #content',
      description: 'Rich content for the tip instead of plain text. Keep it to *description* — a tooltip is not reachable by keyboard, so a link or a button inside one is unusable. If you need interactive content, that is a DuDropdown.',
      links: [
        { label: 'DuDropdown docs', href: '/docs/actions/dropdown' },
      ],
      preview: `<DuTooltip :open="true">
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
      code: `<DuTooltip>
  <template #content>
    <div class="p-2">
      <p class="font-bold">Rich tooltip</p>
      <p class="text-xs">With multiple lines</p>
    </div>
  </template>
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
  ],
  classnames: {
    component: [
      { class: 'tooltip', desc: 'Base class on the wrapper, always applied.' },
      { class: 'tooltip-content', desc: 'The tip element. It carries role="tooltip" and exists in the DOM only while the tip is up — style this, not [data-tip].' },
      { class: 'lg:tooltip', desc: 'Only show the tooltip from lg up — responsive' },
    ],
    color: [
      { class: 'tooltip-primary', desc: 'variant="primary"' },
      { class: 'tooltip-secondary', desc: 'variant="secondary"' },
      { class: 'tooltip-accent', desc: 'variant="accent"' },
      { class: 'tooltip-neutral', desc: 'variant="neutral" — defined by Cornet, not daisyUI' },
      { class: 'tooltip-info', desc: 'variant="info"' },
      { class: 'tooltip-success', desc: 'variant="success"' },
      { class: 'tooltip-warning', desc: 'variant="warning"' },
      { class: 'tooltip-error', desc: 'variant="error"' },
    ],
    modifier: [
      { class: 'tooltip-open', desc: 'Applied to the wrapper while the tip is up' },
    ],
    placement: [
      { class: 'tooltip-top', desc: 'position="top" (default)' },
      { class: 'tooltip-bottom', desc: 'position="bottom"' },
      { class: 'tooltip-left', desc: 'position="left"' },
      { class: 'tooltip-right', desc: 'position="right"' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      description: 'Hover the button — or Tab to it. Both open the tip, and Escape closes it.',
      preview: `<DuTooltip dataTip="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
      code: `<DuTooltip dataTip="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
    {
      title: 'It answers to the keyboard too',
      description: 'A tip that only appears on hover is invisible to anyone navigating with a keyboard — WCAG 1.4.13 asks for three things and a CSS-only tooltip fails all of them. Cornet\'s tooltip opens on focus, stays up while the pointer is on the tip itself (so you can read a long one without it fleeing), and closes on Escape. `aria-describedby` is wired onto the first focusable element in the default slot for exactly as long as the tip is up.',
      links: [
        { label: 'WCAG 1.4.13 Content on Hover or Focus', href: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html' },
        { label: 'APG tooltip pattern', href: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/' },
      ],
      preview: `<div class="flex gap-4 items-center">
  <DuTooltip dataTip="Tab to me, then press Escape">
    <DuButton size="sm">First</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Then Tab again">
    <DuButton size="sm">Second</DuButton>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Tab to me, then press Escape">
  <DuButton>First</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Positions',
      preview: `<div class="flex gap-4 flex-wrap justify-center py-4">
  <DuTooltip dataTip="Top" position="top"><DuButton size="sm">Top</DuButton></DuTooltip>
  <DuTooltip dataTip="Bottom" position="bottom"><DuButton size="sm">Bottom</DuButton></DuTooltip>
  <DuTooltip dataTip="Left" position="left"><DuButton size="sm">Left</DuButton></DuTooltip>
  <DuTooltip dataTip="Right" position="right"><DuButton size="sm">Right</DuButton></DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Top" position="top">
  <DuButton size="sm">Top</DuButton>
</DuTooltip>

<DuTooltip dataTip="Bottom" position="bottom">
  <DuButton size="sm">Bottom</DuButton>
</DuTooltip>

<DuTooltip dataTip="Left" position="left">
  <DuButton size="sm">Left</DuButton>
</DuTooltip>

<DuTooltip dataTip="Right" position="right">
  <DuButton size="sm">Right</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex gap-4 flex-wrap justify-center py-4">
  <DuTooltip dataTip="Primary" variant="primary">
    <DuButton size="sm" variant="primary">Primary</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Error" variant="error">
    <DuButton size="sm" variant="error">Error</DuButton>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Primary" variant="primary">
  <DuButton size="sm" variant="primary">Primary</DuButton>
</DuTooltip>
<DuTooltip dataTip="Error" variant="error">
  <DuButton size="sm" variant="error">Error</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Delays',
      description: '`openDelay` (300 ms) keeps a pointer crossing the trigger from flashing a tip; `closeDelay` (100 ms) gives you time to move onto the tip. Set `openDelay` to 0 for a tip that should feel instant.',
      preview: `<div class="flex gap-4 flex-wrap justify-center py-4">
  <DuTooltip dataTip="Instant" :openDelay="0">
    <DuButton size="sm">No delay</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Patient" :openDelay="800">
    <DuButton size="sm">800 ms</DuButton>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="Instant" :openDelay="0">
  <DuButton>No delay</DuButton>
</DuTooltip>

<DuTooltip dataTip="Patient" :openDelay="800">
  <DuButton>800 ms</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Pinned open, and controlled',
      description: 'Omit `open` and the tooltip owns its state. Pass it and yours decides — `:open="true"` pins the tip, and `v-model:open` lets you read and drive it. That is the same controlled/uncontrolled contract every stateful Cornet component follows.',
      preview: `<div class="flex gap-6 items-center py-4">
  <DuTooltip dataTip="Always visible" :open="true">
    <DuButton size="sm">Pinned</DuButton>
  </DuTooltip>
  <DuTooltip dataTip="Driven from outside" v-model:open="shown">
    <DuButton size="sm">v-model</DuButton>
  </DuTooltip>
  <DuButton size="sm" variant="primary" @click="shown = !shown">Toggle</DuButton>
</div>`,
      script: `
      const shown = ref(false)
      return { shown }
      `,
      code: `<!-- pinned -->
<DuTooltip dataTip="Always visible" :open="true">
  <DuButton>Pinned</DuButton>
</DuTooltip>

<!-- controlled -->
<DuTooltip dataTip="Driven from outside" v-model:open="shown">
  <DuButton>v-model</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Escaping an overflow: hidden parent',
      description: '`popover` renders the tip in the browser\'s top layer and anchors it with CSS anchor positioning — use it inside a scrolling container, a table cell, or anything with `overflow: hidden`.',
      preview: `<div class="w-64 h-20 overflow-hidden border border-base-300 rounded-box p-4 flex items-center justify-center">
  <DuTooltip dataTip="Not clipped by the box" popover position="top">
    <DuButton size="sm" soft>Inside overflow-hidden</DuButton>
  </DuTooltip>
</div>`,
      code: `<div class="overflow-hidden">
  <DuTooltip dataTip="Not clipped by the box" popover>
    <DuButton>Inside overflow-hidden</DuButton>
  </DuTooltip>
</div>`,
    },
    {
      title: 'On any element',
      description: 'Wrap any element — an icon, a badge, a key. The tip describes whatever is focusable inside it.',
      preview: `<div class="flex items-center gap-4">
  <DuTooltip dataTip="User profile">
    <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
  </DuTooltip>
  <DuTooltip dataTip="3 unread" variant="info">
    <DuBadge variant="info">3</DuBadge>
  </DuTooltip>
  <DuTooltip dataTip="Keyboard shortcut: ⌘K" position="right">
    <DuKbd>⌘K</DuKbd>
  </DuTooltip>
</div>`,
      code: `<DuTooltip dataTip="User profile">
  <DuAvatar size="sm" rounded="full" placeholder variant="primary">JD</DuAvatar>
</DuTooltip>

<DuTooltip dataTip="Keyboard shortcut: ⌘K" position="right">
  <DuKbd>⌘K</DuKbd>
</DuTooltip>`,
    },
    {
      title: 'Styling the tip',
      description: 'The tip is a real element with `class="tooltip-content"`, rendered only while it is shown. The **`data-tip` attribute is no longer set on the root** — daisyUI reveals a tip from that attribute on `:hover` alone, instantly and undismissably, which would defeat the delays and Escape above. Custom CSS that targeted `[data-tip]` should target `.tooltip-content` instead.',
      lang: 'css',
      code: `/* before */
.my-widget [data-tip]::before { … }

/* now */
.my-widget .tooltip-content { … }`,
    },
  ],
} satisfies DocPageData
