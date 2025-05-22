<script setup lang="ts">
import { computed } from "vue"
import DuCountdown from "./du-countdown.vue"
import { type COUNTDOWNLabels } from './du-countdown.types'

const props = withDefaults(
  defineProps<{
    targetDate?: Date
    showDays?: boolean
    showHours?: boolean
    showMinutes?: boolean
    showSeconds?: boolean
    labels?: COUNTDOWNLabels
    separator?: string
    customClass?: string
  }>(),
  {
    targetDate: undefined,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    labels: () => ({
      days: "days",
      hours: "hours",
      minutes: "min",
      seconds: "sec",
    }),
    separator: ":",
    customClass: "",
  },
)

// Calculer la différence entre maintenant et la date cible
const timeRemaining = computed(() => {
  if (!props.targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  const now = new Date().getTime()
  const target = props.targetDate.getTime()
  const difference = Math.max(0, target - now)

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})
</script>

<template>
  <div :class="['flex items-center gap-2', customClass]">
    <div v-if="showDays" class="flex flex-col items-center">
      <DuCountdown
        :target-date="targetDate"
        format="days"
        :separator="separator"
      />
      <span class="text-xs mt-1">{{ labels.days }}</span>
    </div>

    <span
      v-if="showDays && (showHours || showMinutes || showSeconds)"
      class="text-xl"
    >
      {{ separator }}
    </span>

    <div v-if="showHours" class="flex flex-col items-center">
      <DuCountdown
        :target-date="targetDate"
        format="hours"
        :separator="separator"
      />
      <span class="text-xs mt-1">{{ labels.hours }}</span>
    </div>

    <span v-if="showHours && (showMinutes || showSeconds)" class="text-xl">
      {{ separator }}
    </span>

    <div v-if="showMinutes" class="flex flex-col items-center">
      <DuCountdown
        :target-date="targetDate"
        format="minutes"
        :separator="separator"
      />
      <span class="text-xs mt-1">{{ labels.minutes }}</span>
    </div>

    <span v-if="showMinutes && showSeconds" class="text-xl">
      {{ separator }}
    </span>

    <div v-if="showSeconds" class="flex flex-col items-center">
      <DuCountdown
        :target-date="targetDate"
        format="seconds"
        :separator="separator"
      />
      <span class="text-xs mt-1">{{ labels.seconds }}</span>
    </div>
  </div>
</template> 