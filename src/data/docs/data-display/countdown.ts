import type { DocPageData } from '@/types/docs'

export default {
  title: 'Countdown',
  description: 'Countdown component gives a live countdown with a smooth animation.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/countdown/',
  sections: [
    {
      title: 'Basic',
      preview: `<span class="countdown font-mono text-4xl">
  <span style="--value:47;"></span>
</span>`,
      code: `<DuCountdown :value="47" />`,
    },
    {
      title: 'Full time display (hours:minutes:seconds)',
      preview: `<span class="countdown font-mono text-4xl">
  <span style="--value:10;"></span>h
  <span style="--value:24;"></span>m
  <span style="--value:50;"></span>s
</span>`,
      code: `<DuCountdownGroup :hours="10" :minutes="24" :seconds="50" />`,
    },
    {
      title: 'Live countdown',
      code: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const seconds = ref(60)
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    if (seconds.value > 0) seconds.value--
  }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <DuCountdown :value="seconds" />
</template>`,
    },
  ],
} satisfies DocPageData
