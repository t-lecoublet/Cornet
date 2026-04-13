import type { DocPageData } from '@/types/docs'

export default {
  title: 'Checkbox',
  description: 'Checkboxes allow the user to select one or more items from a set.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/checkbox/',
  classnames: {
    color: [
      { class: 'checkbox-primary', desc: 'Primary color' },
      { class: 'checkbox-secondary', desc: 'Secondary color' },
      { class: 'checkbox-accent', desc: 'Accent color' },
      { class: 'checkbox-success', desc: 'Success color' },
      { class: 'checkbox-warning', desc: 'Warning color' },
      { class: 'checkbox-error', desc: 'Error color' },
    ],
    size: [
      { class: 'checkbox-xs', desc: 'Extra small' },
      { class: 'checkbox-sm', desc: 'Small' },
      { class: 'checkbox-md', desc: 'Medium', default: true },
      { class: 'checkbox-lg', desc: 'Large' },
      { class: 'checkbox-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex items-center gap-2">
  <input type="checkbox" class="checkbox" />
  <span class="text-sm">Accept terms</span>
</div>`,
      code: `<label class="flex items-center gap-2">
  <DuCheckbox v-model="accepted" />
  Accept terms
</label>`,
    },
    {
      title: 'Variants',
      preview: `<div class="flex flex-wrap gap-3">
  <input type="checkbox" class="checkbox checkbox-primary" checked />
  <input type="checkbox" class="checkbox checkbox-secondary" checked />
  <input type="checkbox" class="checkbox checkbox-accent" checked />
  <input type="checkbox" class="checkbox checkbox-success" checked />
  <input type="checkbox" class="checkbox checkbox-error" checked />
</div>`,
      code: `<DuCheckbox v-model="val" variant="primary" />
<DuCheckbox v-model="val" variant="secondary" />
<DuCheckbox v-model="val" variant="accent" />
<DuCheckbox v-model="val" variant="success" />
<DuCheckbox v-model="val" variant="error" />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <input type="checkbox" class="checkbox checkbox-xs" checked />
  <input type="checkbox" class="checkbox checkbox-sm" checked />
  <input type="checkbox" class="checkbox" checked />
  <input type="checkbox" class="checkbox checkbox-lg" checked />
  <input type="checkbox" class="checkbox checkbox-xl" checked />
</div>`,
      code: `<DuCheckbox v-model="val" size="xs" />
<DuCheckbox v-model="val" size="sm" />
<DuCheckbox v-model="val" />
<DuCheckbox v-model="val" size="lg" />
<DuCheckbox v-model="val" size="xl" />`,
    },
    {
      title: 'Disabled',
      preview: `<input type="checkbox" class="checkbox" disabled />`,
      code: `<DuCheckbox v-model="val" disabled />`,
    },
  ],
} satisfies DocPageData
