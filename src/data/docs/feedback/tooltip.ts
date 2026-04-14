import type { DocPageData } from '@/types/docs'

export default {
  title: 'Tooltip',
  description: 'Tooltip displays a small label when hovering over an element. The tooltip text is set via the `dataTip` prop. Use `position` to control placement and `open` to force it always visible.',
  category: 'Feedback',
  source: 'https://daisyui.com/components/tooltip/',
  classnames: {
    placement: [
      { class: 'tooltip-top', desc: 'Shows above (default)', default: true },
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
      code: `<DuTooltip dataTip="Hello there!">
  <DuButton>Hover me</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Positions',
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <div class="tooltip tooltip-top" data-tip="Top"><button class="btn btn-sm">Top</button></div>
  <div class="tooltip tooltip-bottom" data-tip="Bottom"><button class="btn btn-sm">Bottom</button></div>
  <div class="tooltip tooltip-left" data-tip="Left"><button class="btn btn-sm">Left</button></div>
  <div class="tooltip tooltip-right" data-tip="Right"><button class="btn btn-sm">Right</button></div>
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
      preview: `<div class="flex gap-4 flex-wrap justify-center">
  <div class="tooltip tooltip-primary" data-tip="Primary"><button class="btn btn-sm btn-primary">Primary</button></div>
  <div class="tooltip tooltip-error" data-tip="Error"><button class="btn btn-sm btn-error">Error</button></div>
</div>`,
      code: `<DuTooltip dataTip="Primary" variant="primary">
  <DuButton size="sm" variant="primary">Primary</DuButton>
</DuTooltip>
<DuTooltip dataTip="Error" variant="error">
  <DuButton size="sm" variant="error">Error</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Always visible',
      code: `<DuTooltip dataTip="Always visible" :open="true">
  <DuButton>Pinned tooltip</DuButton>
</DuTooltip>`,
    },
    {
      title: 'Custom content slot',
      description: 'Use the `#content` slot for rich tooltip content instead of a plain string.',
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
} satisfies DocPageData
