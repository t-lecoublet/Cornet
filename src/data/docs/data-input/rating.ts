import type { DocPageData } from '@/types/docs'

export default {
  title: 'Rating',
  description: 'Rating shows a star-based (or custom shape) rating input. Use `count` to set the number of stars, `color` to set the fill color (any Tailwind bg-* class), `halfStar` for half-star increments, and `clearable` to allow deselection.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/rating/',
  props: [
    {
      title: 'modelValue',
      description: 'Current rating value',
      type: 'number',
    },
    {
      title: 'count',
      description: 'Number of rating items to display',
      type: 'number',
      default: '5',
    },
    {
      title: 'shape',
      description: 'Shape of rating items',
      type: 'string',
      default: '"star-2"',
      options: ['star-2', 'heart', 'star'],
    },
    {
      title: 'color',
      description: 'Color of filled items (any Tailwind bg-* class)',
      type: 'string',
      default: '"bg-secondary"',
    },
    {
      title: 'halfStar',
      description: 'Enable half-star increments',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'clearable',
      description: 'Allow clicking active star to clear rating',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'disabled',
      description: 'Disable the rating component',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'size',
      description: 'Size of rating items',
      type: 'string',
      default: '"md"',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'name',
      description: 'Name attribute for form submission',
      type: 'string',
    },
    {
      title: 'items',
      description: 'Custom items array for dynamic rendering',
      type: 'RatingItem[]',
    },
  ],
  classnames: {
    size: [
      { class: 'rating-xs', desc: 'Extra small' },
      { class: 'rating-sm', desc: 'Small' },
      { class: 'rating-md', desc: 'Medium', default: true },
      { class: 'rating-lg', desc: 'Large' },
    ],
    modifier: [
      { class: 'rating-half', desc: 'Half-star increments (prop: halfStar)' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<DuRating :modelValue="3" :count="5" />`,
      code: `<DuRating v-model="rating" :count="5" />`,
    },
    {
      title: 'Custom color',
      description: 'The `color` prop accepts any Tailwind background class.',
      preview: `<div class="flex flex-col gap-2">
  <DuRating :modelValue="3" :count="5" color="bg-warning" />
  <DuRating :modelValue="3" :count="5" color="bg-error" />
</div>`,
      code: `<DuRating v-model="rating" :count="5" color="bg-warning" />
<DuRating v-model="rating" :count="5" color="bg-error" shape="heart" />`,
    },
    {
      title: 'Half stars',
      description: 'Set `halfStar` to enable half-star increments.',
      preview: `<DuRating :modelValue="3" :count="5" halfStar />`,
      code: `<DuRating v-model="rating" :count="5" halfStar />`,
    },
    {
      title: 'Sizes',
      preview: `<div class="flex flex-col gap-2">
  <DuRating :modelValue="3" size="xs" />
  <DuRating :modelValue="3" size="sm" />
  <DuRating :modelValue="3" />
  <DuRating :modelValue="3" size="lg" />
</div>`,
      code: `<DuRating v-model="rating" size="xs" />
<DuRating v-model="rating" size="sm" />
<DuRating v-model="rating" />
<DuRating v-model="rating" size="lg" />`,
    },
    {
      title: 'Clearable',
      description: 'Clicking the active star again resets the rating to 0.',
      preview: `<DuRating :modelValue="3" clearable />`,
      code: `<DuRating v-model="rating" clearable />`,
    },
    {
      title: 'Read only (disabled)',
      preview: `<DuRating :modelValue="4" disabled />`,
      code: `<DuRating :modelValue="4" disabled />`,
    },
  ],
} satisfies DocPageData
