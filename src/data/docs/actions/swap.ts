import type { DocPageData } from '@/types/docs'

export default {
  title: 'Swap',
  description: 'Swap toggles between two elements. Give it an `ariaLabel` whenever the two faces are icons: what a screen reader announces is that name, not the picture.',
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
      description: 'Drive the swap with a hidden checkbox. Set to `false` and it renders a real `<button type="button" aria-pressed>` instead — it used to be a `<div @click>`, unreachable by keyboard and announcing nothing. CSS targeting `div.swap` should target `button.swap`.',
      type: 'boolean',
      default: 'true',
    },
    {
      title: 'ariaLabel',
      description: 'Accessible name of the toggle. Required in practice when both faces are icons — "🌙 / ☀️" is not a name.',
      type: 'string',
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
      description: '`:useCheckbox="false"` renders a real `<button type="button" aria-pressed>` instead of the label-and-checkbox pair. It used to be a `<div @click>`: unreachable by keyboard, and silent to a screen reader. Selectors written against `div.swap` need to target `button.swap` now.',
      preview: `<DuSwap :useCheckbox="false" ariaLabel="Toggle theme" class="text-2xl">
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
      code: `<DuSwap :useCheckbox="false" ariaLabel="Toggle theme">
  <template #on>☀️</template>
  <template #off>🌙</template>
</DuSwap>`,
    },
    {
      title: 'With images or icons',
      description: 'Two icons and no text: nothing here names the control. `ariaLabel` is what a screen reader reads out, so it is not optional in this shape.',
      preview: `<div class="flex flex-wrap gap-4 justify-center">
  <DuSwap rotate ariaLabel="Toggle dark mode" class="text-4xl">
    <template #on>🌙</template>
    <template #off>☀️</template>
  </DuSwap>
  <DuSwap flip ariaLabel="Toggle reading mode" class="text-4xl">
    <template #on>📖</template>
    <template #off>🎮</template>
  </DuSwap>
</div>`,
      code: `<DuSwap v-model="state" rotate ariaLabel="Toggle dark mode">
  <template #on>🌙</template>
  <template #off>☀️</template>
</DuSwap>`,
    },
  ],
} satisfies DocPageData
