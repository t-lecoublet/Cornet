import type { DocPageData } from '@/types/docs'

export default {
  title: 'Rating',
  description: 'Rating shows a star-based rating input.',
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
      { class: 'rating-half', desc: 'Half-star increments' },
      { class: 'rating-hidden', desc: 'Hides the 0-star input' },
    ],
  },
  sections: [
    {
      title: 'Basic',
      preview: `<div class="rating">
  <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="r1" class="mask mask-star-2 bg-orange-400" />
</div>`,
      code: `<DuRating v-model="rating" :max="5" />`,
    },
    {
      title: 'With variant',
      code: `<DuRating v-model="rating" :max="5" variant="warning" />
<DuRating v-model="rating" :max="5" variant="error" />
<DuRating v-model="rating" :max="5" variant="primary" />`,
    },
    {
      title: 'Half stars',
      code: `<DuRating v-model="rating" :max="5" half />`,
    },
    {
      title: 'Sizes',
      code: `<DuRating v-model="rating" size="xs" />
<DuRating v-model="rating" size="sm" />
<DuRating v-model="rating" />
<DuRating v-model="rating" size="lg" />`,
    },
    {
      title: 'Read only',
      code: `<DuRating :modelValue="4" :max="5" disabled />`,
    },
  ],
} satisfies DocPageData
