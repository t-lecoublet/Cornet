import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tooltip',
  description: 'Tooltip displays a small text label when hovering over an element.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/tooltip/',
  classnames: {
    placement: [
      { class: 'tooltip-top', desc: 'Shows above', default: true },
      { class: 'tooltip-bottom', desc: 'Shows below' },
      { class: 'tooltip-left', desc: 'Shows to the left' },
      { class: 'tooltip-right', desc: 'Shows to the right' },
    ],
    color: [
      { class: 'tooltip-primary', desc: 'Primary background' },
      { class: 'tooltip-secondary', desc: 'Secondary background' },
      { class: 'tooltip-accent', desc: 'Accent background' },
      { class: 'tooltip-info', desc: 'Info background' },
      { class: 'tooltip-success', desc: 'Success background' },
      { class: 'tooltip-warning', desc: 'Warning background' },
      { class: 'tooltip-error', desc: 'Error background' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="tooltip" data-tip="Hello there!">
  <button class="btn">Hover me</button>
</div>`,
      code: `<DuTooltip text="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Positions',
      code: `<DuTooltip text="Top" position="top">
  <DuButton size="sm">Top</DuButton>
</DuTooltip>

<DuTooltip text="Bottom" position="bottom">
  <DuButton size="sm">Bottom</DuButton>
</DuTooltip>

<DuTooltip text="Left" position="left">
  <DuButton size="sm">Left</DuButton>
</DuTooltip>

<DuTooltip text="Right" position="right">
  <DuButton size="sm">Right</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Variants',
      code: `<DuTooltip text="Primary" variant="primary">
  <DuButton size="sm" variant="primary">Primary</DuButton>
</DuTooltip>
<DuTooltip text="Error" variant="error">
  <DuButton size="sm" variant="error">Error</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Always visible',
      code: `<DuTooltip text="Always visible" :open="true">
  <DuButton>Pinned tooltip</DuButton>
</DuTooltip>`,
    },
  ],
} satisfies DocPageData
