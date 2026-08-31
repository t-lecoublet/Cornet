import type { DocPageData } from '@/types/docs'

export default {
  title: 'Range',
  description: 'Range lets someone pick a value within a numeric span. Give it a name and a `valueText`: `"12"` on its own means nothing to a person who cannot see what it is 12 *of*.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/range/',
  props: [
    {
      title: 'modelValue',
      description: 'Current value (use with `v-model`)',
      type: 'number',
      default: '4',
    },
    {
      title: 'min',
      description: 'Minimum value',
      type: 'number',
      default: '0',
    },
    {
      title: 'max',
      description: 'Maximum value',
      type: 'number',
      default: '10',
    },
    {
      title: 'step',
      description: 'Increment between values',
      type: 'number',
      default: '1',
    },
    {
      title: 'disabled',
      description: 'Disable the range',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'variant',
      description: 'Color variant of the component',
      type: 'Variant',
      default: '"default"',
      options: ['default', 'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
    },
    {
      title: 'size',
      description: 'Size of the component',
      type: 'Size',
      default: '"default"',
      options: ['default', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the slider, when no visible label names it.',
      type: 'string',
    },
    {
      title: 'ariaLabelledby',
      description: 'id of the element that names the slider.',
      type: 'string',
    },
    {
      title: 'valueText',
      description: 'Turns the raw number into what a screen reader should say: `(value) => string` — `"12 €"`, `"Medium"`, `"3 of 5"`. Sets `aria-valuetext`.',
      type: 'DuRangeValueText',
    },
    {
      title: 'ticks',
      description: 'Values to mark along the track. Rendered as a `<datalist>` the input points at, which is what makes browser tick marks appear. Accepts plain numbers or `{ value, label }`.',
      type: '(number | { value: number, label?: string })[]',
    },
  ],
  classnames: {
    component: [
      { class: 'range', desc: 'Base class, always applied. size="default" and variant="default" add no extra class.' },
    ],
    color: [
      { class: 'range-primary', desc: 'Primary color' },
      { class: 'range-secondary', desc: 'Secondary color' },
      { class: 'range-accent', desc: 'Accent color' },
      { class: 'range-neutral', desc: 'Neutral color' },
      { class: 'range-info', desc: 'Info color' },
      { class: 'range-success', desc: 'Success color' },
      { class: 'range-warning', desc: 'Warning color' },
      { class: 'range-error', desc: 'Error color' },
    ],
    size: [
      { class: 'range-xs', desc: 'Extra small' },
      { class: 'range-sm', desc: 'Small' },
      { class: 'range-md', desc: 'Medium' },
      { class: 'range-lg', desc: 'Large' },
      { class: 'range-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="w-64">
  <DuRange :modelValue="40" :min="0" :max="100" variant="primary" />
</div>`,
      code: `<DuRange v-model="value" :min="0" :max="100" variant="primary" />`,
    },
    {
      title: 'With steps',
      preview: `<div class="w-64">
  <DuRange :modelValue="50" :min="0" :max="100" :step="25" variant="secondary" />
</div>`,
      code: `<DuRange v-model="value" :min="0" :max="100" :step="25" variant="secondary" />`,
    },
    {
      title: 'Saying what the value is',
      description: 'A slider announces its number and nothing else. `valueText` replaces that with something meaningful, and `ariaLabel` (or `ariaLabelledby`) says what is being set. Both matter more here than on most controls: there is no text in a slider for anyone to read.',
      preview: `<div class="flex flex-col gap-4 w-72">
  <DuRange
    :modelValue="60"
    :min="0"
    :max="100"
    ariaLabel="Budget"
    :valueText="(v) => v + ' euros'"
    variant="primary"
  />
  <div>
    <p id="spice-label" class="text-sm font-medium mb-1">Spice level</p>
    <DuRange
      :modelValue="2"
      :min="1"
      :max="4"
      ariaLabelledby="spice-label"
      :valueText="(v) => ['Mild', 'Medium', 'Hot', 'Very hot'][v - 1]"
      variant="error"
    />
  </div>
</div>`,
      code: `<DuRange
  v-model="budget"
  :min="0"
  :max="100"
  ariaLabel="Budget"
  :valueText="(v) => \`\${v} euros\`"
/>

<p id="spice-label">Spice level</p>
<DuRange
  v-model="spice"
  :min="1"
  :max="4"
  ariaLabelledby="spice-label"
  :valueText="(v) => ['Mild', 'Medium', 'Hot', 'Very hot'][v - 1]"
/>`,
    },
    {
      title: 'Tick marks',
      description: '`ticks` renders a `<datalist>` the input points at — that is what makes the browser draw marks along the track.',
      preview: `<div class="w-72">
  <DuRange
    :modelValue="50"
    :min="0"
    :max="100"
    :step="25"
    :ticks="[0, 25, 50, 75, 100]"
    ariaLabel="Volume"
    variant="primary"
  />
</div>`,
      code: `<DuRange
  v-model="volume"
  :min="0"
  :max="100"
  :step="25"
  :ticks="[0, 25, 50, 75, 100]"
  ariaLabel="Volume"
/>

<!-- or with labels -->
<DuRange
  v-model="size"
  :min="1"
  :max="3"
  :ticks="[{ value: 1, label: 'S' }, { value: 2, label: 'M' }, { value: 3, label: 'L' }]"
  ariaLabel="Size"
/>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-3 w-64">
  <DuRange :modelValue="50" variant="primary" size="xs" />
  <DuRange :modelValue="50" variant="primary" size="sm" />
  <DuRange :modelValue="50" variant="primary" />
  <DuRange :modelValue="50" variant="primary" size="lg" />
</div>`,
      code: `<DuRange v-model="val" variant="primary" size="xs" />
<DuRange v-model="val" variant="primary" size="sm" />
<DuRange v-model="val" variant="primary" />
<DuRange v-model="val" variant="primary" size="lg" />`,
    },
  ],
} satisfies DocPageData
