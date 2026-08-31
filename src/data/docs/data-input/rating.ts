import type { DocPageData } from '@/types/docs'

export default {
  title: 'Rating',
  description: 'Rating is a star-based (or custom shape) rating input. Every star is named — `"3 out of 5"` by default — because that name is the whole content of the control for anyone not looking at it. Use `readonly` to *display* a rating rather than `disabled`, which announces something quite different.',
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
      type: 'DuRatingItemData[]',
    },
    {
      title: 'customClass',
      description: 'Additional CSS classes on the rating group.',
      type: 'string',
    },
    {
      title: 'readonly',
      description: 'Show the rating without letting anyone change it. Renders plain elements exposing the group as a `role="img"` named by the value — a read-only value is not a broken control.',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the whole group — what is being rated.',
      type: 'string',
    },
    {
      title: 'itemLabel',
      description: 'Names each star: `(value, max) => string`. Replace it for another language or scale.',
      type: 'DuRatingItemLabel',
      default: '(value, max) => `${value} out of ${max}`',
    },
  ],
  classnames: {
    component: [
      { class: 'rating', desc: 'Base class, always applied. size="default" adds no size class.' },
      { class: 'mask', desc: 'On every item, alongside its shape class.' },
    ],
    style: [
      { class: 'mask-star', desc: 'shape="star"' },
      { class: 'mask-star-2', desc: 'shape="star-2"' },
      { class: 'mask-heart', desc: 'shape="heart"' },
      { class: 'mask-circle', desc: 'shape="circle"' },
    ],
    size: [
      { class: 'rating-xs', desc: 'size="xs"' },
      { class: 'rating-sm', desc: 'size="sm"' },
      { class: 'rating-md', desc: 'size="md"' },
      { class: 'rating-lg', desc: 'size="lg"' },
      { class: 'rating-xl', desc: 'size="xl"' },
    ],
    modifier: [
      { class: 'rating-half', desc: 'Half-step increments on the container — halfStar' },
      { class: 'mask-half-1', desc: 'Left half of an item, in halfStar mode.' },
      { class: 'mask-half-2', desc: 'Right half of an item, in halfStar mode.' },
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
      title: 'Displaying a rating (readonly)',
      description: 'Use `readonly` to show a rating you are not asking anyone to change — a product\'s average score, a review. It renders plain elements and exposes the group as a `role="img"` named by the value. `disabled` is a different statement: it renders radios that announce "you may not touch this", which is not what a displayed rating means.',
      preview: `<div class="flex flex-col gap-3 items-center">
  <DuRating :modelValue="4" readonly ariaLabel="Average customer rating" />
  <p class="text-xs text-base-content/60">readonly — announced as "4 out of 5"</p>
  <DuRating :modelValue="4" disabled ariaLabel="Rating (locked)" />
  <p class="text-xs text-base-content/60">disabled — a control you are not allowed to use</p>
</div>`,
      code: `<!-- showing a value -->
<DuRating :modelValue="4" readonly ariaLabel="Average customer rating" />

<!-- a control the user may not change right now -->
<DuRating v-model="rating" disabled />`,
    },
    {
      title: 'Naming the stars',
      description: '`ariaLabel` names the group, `itemLabel` names each star. The default is English, like every other default text in the library, and it exists to be replaced.',
      preview: `<div class="flex flex-col gap-2 items-center">
  <DuRating
    :modelValue="3"
    ariaLabel="Votre note"
    :itemLabel="(value, max) => value + ' sur ' + max"
  />
  <p class="text-xs text-base-content/60">Each star announces "3 sur 5"</p>
</div>`,
      code: `<DuRating
  v-model="note"
  ariaLabel="Votre note"
  :itemLabel="(value, max) => \`\${value} sur \${max}\`"
/>`,
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
