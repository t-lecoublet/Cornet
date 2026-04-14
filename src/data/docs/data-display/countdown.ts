import type { DocPageData } from '@/types/docs'

export default {
  title: 'Countdown',
  description: 'Countdown gives a live animated countdown. Use DuCountdown for a single unit (seconds, minutes, hours, or days), or DuCountdownGroup for a full days/hours/minutes/seconds display tied to a target date.',
  category: 'Data Display',
  source: 'https://daisyui.com/components/countdown/',
  sections: [
    {
      title: 'Single value',
      description: 'DuCountdown with a static `:value` prop.',
      preview: `<span class="countdown font-mono text-4xl">
  <span style="--value:47;"></span>
</span>`,
      code: `<DuCountdown :value="47" />`,
    },
    {
      title: 'Countdown from target date',
      description: 'Pass a `targetDate` and a `format` to show the remaining days, hours, minutes, or seconds.',
      code: `<script setup lang="ts">
const deadline = new Date(Date.now() + 1000 * 60 * 60 * 3) // 3 hours from now
</script>

<template>
  <div class="flex gap-4 font-mono text-4xl">
    <div class="flex flex-col items-center">
      <DuCountdown :targetDate="deadline" format="hours" />
      <span class="text-sm">hours</span>
    </div>
    <div class="flex flex-col items-center">
      <DuCountdown :targetDate="deadline" format="minutes" />
      <span class="text-sm">min</span>
    </div>
    <div class="flex flex-col items-center">
      <DuCountdown :targetDate="deadline" format="seconds" />
      <span class="text-sm">sec</span>
    </div>
  </div>
</template>`,
    },
    {
      title: 'Full countdown group',
      description: 'DuCountdownGroup renders days / hours / minutes / seconds all at once from a single `targetDate`.',
      preview: `<div class="flex items-center gap-2 font-mono text-4xl">
  <div class="flex flex-col items-center"><span class="countdown"><span style="--value:2;"></span></span><span class="text-xs mt-1">days</span></div>
  <span class="text-xl">:</span>
  <div class="flex flex-col items-center"><span class="countdown"><span style="--value:10;"></span></span><span class="text-xs mt-1">hours</span></div>
  <span class="text-xl">:</span>
  <div class="flex flex-col items-center"><span class="countdown"><span style="--value:24;"></span></span><span class="text-xs mt-1">min</span></div>
  <span class="text-xl">:</span>
  <div class="flex flex-col items-center"><span class="countdown"><span style="--value:50;"></span></span><span class="text-xs mt-1">sec</span></div>
</div>`,
      code: `<script setup lang="ts">
const deadline = new Date('2025-12-31T23:59:59')
</script>

<template>
  <DuCountdownGroup :targetDate="deadline" />
</template>`,
    },
    {
      title: 'Selective units',
      description: 'Hide specific units with `showDays`, `showHours`, `showMinutes`, `showSeconds` props.',
      code: `<DuCountdownGroup
  :targetDate="deadline"
  :showDays="false"
  :labels="{ hours: 'h', minutes: 'm', seconds: 's' }"
/>`,
    },
    {
      title: 'End event',
      description: 'Listen to the `@end` event when the countdown reaches zero.',
      code: `<DuCountdown :value="seconds" @end="onCountdownEnd" />`,
    },
  ],
} satisfies DocPageData
