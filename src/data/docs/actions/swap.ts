import type { DocPageData } from '@/types/docs'

export default {
  title: 'Swap',
  description: 'Swap allows you to toggle the visibility of two elements by clicking.',
  category: 'Actions',
  source: 'https://daisyui.com/components/swap/',
  classnames: {
    modifier: [
      { class: 'rotate', desc: 'Rotate animation when toggling (prop: rotate)' },
      { class: 'flip', desc: 'Flip animation when toggling (prop: flip)' },
    ],
  },
  sections: [
    {
      title: 'Basic (text)',
      preview: `<label class="swap">
  <input type="checkbox" />
  <div class="swap-on font-bold text-success">ON</div>
  <div class="swap-off font-bold text-error">OFF</div>
</label>`,
      code: `<DuSwap>
  <template #on>ON</template>
  <template #off>OFF</template>
</DuSwap>`,
    },
    {
      title: 'With v-model',
      code: `<script setup lang="ts">
const active = ref(false)
</script>

<template>
  <DuSwap v-model="active">
    <template #on>ON</template>
    <template #off>OFF</template>
  </DuSwap>
  <p>State: {{ active ? 'ON' : 'OFF' }}</p>
</template>`,
    },
    {
      title: 'Rotate animation',
      preview: `<label class="swap swap-rotate text-2xl">
  <input type="checkbox" />
  <div class="swap-on">☀️</div>
  <div class="swap-off">🌙</div>
</label>`,
      code: `<!-- rotate prop adds rotation animation -->
<DuSwap v-model="isDark" rotate>
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
    },
    {
      title: 'Flip animation',
      preview: `<label class="swap swap-flip text-2xl">
  <input type="checkbox" />
  <div class="swap-on">😊</div>
  <div class="swap-off">😴</div>
</label>`,
      code: `<!-- flip prop adds flip animation -->
<DuSwap v-model="isHappy" flip>
  <template #on>😊</template>
  <template #off>😴</template>
</DuSwap>`,
    },
    {
      title: 'With indeterminate state',
      code: `<DuSwap v-model="active">
  <template #on>✅</template>
  <template #off>❌</template>
  <template #indeterminate>⏳</template>
</DuSwap>`,
    },
  ],
} satisfies DocPageData
