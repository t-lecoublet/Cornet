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
      links: [
        { label: 'Vue v-model docs', href: 'https://vuejs.org/guide/components/v-model.html' },
      ],
      preview: `<DuRating :modelValue="3" :count="5" />`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const rating = ref(3)
</script>

<template>
  <DuRating v-model="rating" :count="5" />
  <p>Selected: {{ rating }}/5</p>
</template>`,
    },
    {
      title: 'Shapes',
      description: 'Use the `shape` prop to change the icon: `star`, `star-2`, `heart`, or `circle`.',
      preview: `<div class="flex flex-col gap-3">
  <DuRating :modelValue="3" shape="star" />
  <DuRating :modelValue="3" shape="star-2" />
  <DuRating :modelValue="3" shape="heart" color="bg-error" />
  <DuRating :modelValue="3" shape="circle" />
</div>`,
      code: `<DuRating v-model="rating" shape="star" />
<DuRating v-model="rating" shape="star-2" />
<DuRating v-model="rating" shape="heart" color="bg-error" />
<DuRating v-model="rating" shape="circle" />`,
    },
    {
      title: 'Custom color',
      description: 'The `color` prop accepts any Tailwind background class.',
      preview: `<div class="flex flex-col gap-2">
  <DuRating :modelValue="3" :count="5" color="bg-warning" />
  <DuRating :modelValue="3" :count="5" color="bg-error" />
  <DuRating :modelValue="3" :count="5" color="bg-primary" />
</div>`,
      code: `<DuRating v-model="rating" :count="5" color="bg-warning" />
<DuRating v-model="rating" :count="5" color="bg-error" shape="heart" />
<DuRating v-model="rating" :count="5" color="bg-primary" />`,
    },
    {
      title: 'Half stars',
      description: 'Set `halfStar` to enable half-star increments.',
      preview: `<DuRating :modelValue="3.5" :count="5" halfStar />`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const rating = ref(3.5)
</script>

<template>
  <DuRating v-model="rating" :count="5" halfStar />
</template>`,
    },
    {
      title: 'Clearable',
      description: 'Clicking the active star again resets the rating to 0.',
      preview: `<DuRating :modelValue="3" clearable />`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const rating = ref(3)
</script>

<template>
  <DuRating v-model="rating" clearable />
</template>`,
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
      title: 'Read only (disabled)',
      preview: `<DuRating :modelValue="4" disabled />`,
      code: `<DuRating :modelValue="4" disabled />`,
    },
    {
      title: 'Manual mode (DuRatingItem)',
      description: 'Use DuRatingItem for full control over each item — useful for per-item colors.',
      preview: `<DuRating :modelValue="3">
  <DuRatingItem :value="1" color="bg-red-500" />
  <DuRatingItem :value="2" color="bg-orange-500" />
  <DuRatingItem :value="3" color="bg-yellow-500" />
  <DuRatingItem :value="4" color="bg-lime-500" />
  <DuRatingItem :value="5" color="bg-green-500" />
</DuRating>`,
      code: `<script setup lang="ts">
import { ref } from 'vue'
const rating = ref(3)
</script>

<template>
  <DuRating v-model="rating">
    <DuRatingItem :value="1" color="bg-red-500" />
    <DuRatingItem :value="2" color="bg-orange-500" />
    <DuRatingItem :value="3" color="bg-yellow-500" />
    <DuRatingItem :value="4" color="bg-lime-500" />
    <DuRatingItem :value="5" color="bg-green-500" />
  </DuRating>
</template>`,
    },
  ],
} satisfies DocPageData
