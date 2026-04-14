import type { DocPageData } from '@/types/docs'

export default {
  title: 'Rating',
  description: 'Rating shows a star-based (or custom shape) rating input. Use `count` to set the number of stars, `color` to set the fill color (any Tailwind bg-* class), `halfStar` for half-star increments, and `clearable` to allow deselection.',
  category: 'Data Input',
  source: 'https://daisyui.com/components/rating/',
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
      preview: `<div class="rating">
  <input type="radio" name="r1" class="mask mask-star-2 bg-secondary" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-secondary" checked />
  <input type="radio" name="r1" class="mask mask-star-2 bg-secondary" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-secondary" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-secondary" />
</div>`,
      code: `<DuRating v-model="rating" :count="5" />`,
    },
    {
      title: 'Custom color',
      description: 'The `color` prop accepts any Tailwind background class.',
      preview: `<div class="flex flex-col gap-2">
  <div class="rating">
    <input type="radio" name="r2" class="mask mask-star-2 bg-warning" />
    <input type="radio" name="r2" class="mask mask-star-2 bg-warning" checked />
    <input type="radio" name="r2" class="mask mask-star-2 bg-warning" />
    <input type="radio" name="r2" class="mask mask-star-2 bg-warning" />
    <input type="radio" name="r2" class="mask mask-star-2 bg-warning" />
  </div>
  <div class="rating">
    <input type="radio" name="r3" class="mask mask-heart bg-error" />
    <input type="radio" name="r3" class="mask mask-heart bg-error" checked />
    <input type="radio" name="r3" class="mask mask-heart bg-error" />
    <input type="radio" name="r3" class="mask mask-heart bg-error" />
    <input type="radio" name="r3" class="mask mask-heart bg-error" />
  </div>
</div>`,
      code: `<DuRating v-model="rating" :count="5" color="bg-warning" />
<DuRating v-model="rating" :count="5" color="bg-error" shape="heart" />`,
    },
    {
      title: 'Half stars',
      description: 'Set `halfStar` to enable half-star increments.',
      preview: `<div class="rating rating-half">
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-1 bg-secondary" />
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-2 bg-secondary" checked />
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-1 bg-secondary" />
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-2 bg-secondary" />
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-1 bg-secondary" />
  <input type="radio" name="r4" class="mask mask-star-2 mask-half-2 bg-secondary" />
</div>`,
      code: `<DuRating v-model="rating" :count="5" halfStar />`,
    },
    {
      title: 'Sizes',
      code: `<DuRating v-model="rating" size="xs" />
<DuRating v-model="rating" size="sm" />
<DuRating v-model="rating" />
<DuRating v-model="rating" size="lg" />`,
    },
    {
      title: 'Clearable',
      description: 'Clicking the active star again resets the rating to 0.',
      code: `<DuRating v-model="rating" clearable />`,
    },
    {
      title: 'Read only (disabled)',
      code: `<DuRating :modelValue="4" disabled />`,
    },
  ],
} satisfies DocPageData
