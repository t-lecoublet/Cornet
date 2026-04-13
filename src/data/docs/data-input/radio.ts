import type { DocPageData } from '@/types/docs'

export default {
  title: 'Radio',
  description: 'Radio buttons allow the user to select one option from a set.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/radio/',
  classnames: {
    color: [
      { class: 'radio-primary', desc: 'Primary color' },
      { class: 'radio-secondary', desc: 'Secondary color' },
      { class: 'radio-accent', desc: 'Accent color' },
      { class: 'radio-success', desc: 'Success color' },
      { class: 'radio-warning', desc: 'Warning color' },
      { class: 'radio-error', desc: 'Error color' },
    ],
    size: [
      { class: 'radio-xs', desc: 'Extra small' },
      { class: 'radio-sm', desc: 'Small' },
      { class: 'radio-md', desc: 'Medium', default: true },
      { class: 'radio-lg', desc: 'Large' },
      { class: 'radio-xl', desc: 'Extra large' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="flex flex-col gap-2">
  <label class="flex items-center gap-2 text-sm">
    <input type="radio" name="plan" class="radio radio-primary" checked /> Free
  </label>
  <label class="flex items-center gap-2 text-sm">
    <input type="radio" name="plan" class="radio radio-primary" /> Pro
  </label>
  <label class="flex items-center gap-2 text-sm">
    <input type="radio" name="plan" class="radio radio-primary" /> Enterprise
  </label>
</div>`,
      code: `<label class="flex items-center gap-2">
  <DuRadio v-model="plan" name="plan" value="free" variant="primary" />
  Free
</label>
<label class="flex items-center gap-2">
  <DuRadio v-model="plan" name="plan" value="pro" variant="primary" />
  Pro
</label>
<label class="flex items-center gap-2">
  <DuRadio v-model="plan" name="plan" value="enterprise" variant="primary" />
  Enterprise
</label>`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex items-center gap-3">
  <input type="radio" class="radio radio-xs radio-primary" checked />
  <input type="radio" class="radio radio-sm radio-primary" checked />
  <input type="radio" class="radio radio-primary" checked />
  <input type="radio" class="radio radio-lg radio-primary" checked />
  <input type="radio" class="radio radio-xl radio-primary" checked />
</div>`,
      code: `<DuRadio v-model="val" name="size" value="1" size="xs" />
<DuRadio v-model="val" name="size" value="2" size="sm" />
<DuRadio v-model="val" name="size" value="3" />
<DuRadio v-model="val" name="size" value="4" size="lg" />
<DuRadio v-model="val" name="size" value="5" size="xl" />`,
    },
  ],
} satisfies DocPageData
