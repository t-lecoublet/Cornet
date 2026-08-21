import type { DocPageData } from '@/types/docs'

export default {
  title: 'Swap',
  description: 'Swap allows you to toggle the visibility of two elements by clicking.',
  category: 'Actions',
  source: 'https://daisyui.com/components/swap/',
  props: [
    {
      title: 'modelValue',
      description: 'Swap state (use with `v-model`)',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'rotate',
      description: 'Rotate animation between the two faces',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'flip',
      description: 'Flip animation between the two faces',
      type: 'boolean',
      default: 'false',
    },
    {
      title: 'useCheckbox',
      description: 'Drive the swap with a hidden checkbox. Set to `false` to toggle on click instead.',
      type: 'boolean',
      default: 'true',
    },
  ],
  classnames: {
    component: [
      { class: 'swap', desc: 'Base class on the wrapper, always applied.' },
      { class: 'swap-on', desc: 'Wrapper for the on slot.' },
      { class: 'swap-off', desc: 'Wrapper for the off slot.' },
      { class: 'swap-indeterminate', desc: 'Wrapper for the indeterminate slot, when provided.' },
    ],
    modifier: [
      { class: 'swap-rotate', desc: 'Rotate animation — rotate' },
      { class: 'swap-flip', desc: 'Flip animation — flip' },
      { class: 'swap-active', desc: 'Toggled state in click mode (useCheckbox=false)' },
    ],
  },
  sections: [
    {
      title: 'Basic (text)',
      preview: `<DuSwap>
  <template #on><span class="font-bold text-success">ON</span></template>
  <template #off><span class="font-bold text-error">OFF</span></template>
</DuSwap>`,
      code: `<DuSwap>
  <template #on>ON</template>
  <template #off>OFF</template>
</DuSwap>`,
    },
    {
      title: 'With v-model',
      links: [
        { label: 'Vue v-model docs', href: 'https://vuejs.org/guide/components/v-model.html' },
      ],
      script: `
      const active = ref(false)
      return { active }
      `,
      preview: `<div class="flex items-center gap-4">
  <DuSwap v-model="active">
    <template #on><span class="font-bold text-success">ON</span></template>
    <template #off><span class="font-bold text-error">OFF</span></template>
  </DuSwap>
  <span class="text-sm text-base-content/50">← toggle to see v-model update</span>
  <p>State: {{ active ? 'true' : 'false' }}</p>

</div>`,
      code: `<script setup lang="ts">
const active = ref(false)
</script>

<template>
  <DuSwap v-model="active">
    <template #on>ON</template>
    <template #off>OFF</template>
  </DuSwap>
  <p>State: {{ active ? 'true' : 'false' }}</p>
</template>`,
    },
    {
      title: 'Rotate animation',
      preview: `<DuSwap rotate class="text-2xl">
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
      code: `<!-- rotate prop adds rotation animation -->
<DuSwap v-model="isDark" rotate>
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
    },
    {
      title: 'Flip animation',
      preview: `<DuSwap flip class="text-2xl">
  <template #on>😊</template>
  <template #off>😴</template>
</DuSwap>`,
      code: `<!-- flip prop adds flip animation -->
<DuSwap v-model="isHappy" flip>
  <template #on>😊</template>
  <template #off>😴</template>
</DuSwap>`,
    },
    {
      title: 'With indeterminate state',
      preview: `<DuSwap class="text-2xl">
  <template #on>✅</template>
  <template #off>❌</template>
  <template #indeterminate>⏳</template>
</DuSwap>`,
      code: `<DuSwap v-model="active">
  <template #on>✅</template>
  <template #off>❌</template>
  <template #indeterminate>⏳</template>
</DuSwap>`,
    },
    {
      title: 'Without checkbox (useCheckbox)',
      description: 'Use `useCheckbox={false}` to render as a div instead of a label with checkbox.',
      preview: `<DuSwap :useCheckbox="false" class="text-2xl">
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
      code: `<DuSwap :useCheckbox="false">
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
    },
    {
      title: 'With images or icons',
      preview: `<div class="flex flex-wrap gap-4 justify-center">
  <DuSwap rotate class="text-4xl">
    <template #on>🌙</template>
    <template #off>☀️</template>
  </DuSwap>
  <DuSwap flip class="text-4xl">
    <template #on>📖</template>
    <template #off>🎮</template>
  </DuSwap>
</div>`,
      code: `<DuSwap v-model="state" rotate>
  <template #on>🌙</template>
  <template #off>☀️</template>
</DuSwap>`,
    },
  ],
} satisfies DocPageData
