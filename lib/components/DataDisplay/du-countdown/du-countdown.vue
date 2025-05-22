<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from "vue"
import { type COUNTDOWNFormat } from './du-countdown.types'

const props = withDefaults(
  defineProps<{
    value?: number
    targetDate?: Date
    format?: COUNTDOWNFormat
    separator?: string
    customClass?: string
    autoStart?: boolean
  }>(),
  {
    value: undefined,
    targetDate: undefined,
    format: "seconds",
    separator: ":",
    customClass: "",
    autoStart: true,
  },
)

const currentValue = ref(props.value !== undefined ? props.value : 0)
const intervalId = ref<number | null>(null)

const calculateTimeRemaining = () => {
  if (!props.targetDate) return 0

  const now = new Date().getTime()
  const target = props.targetDate.getTime()
  const difference = Math.max(0, target - now)

  const calculators = {
    days: () => Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: () =>
      Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: () => Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: () => Math.floor((difference % (1000 * 60)) / 1000),
  }

  return (calculators[props.format] || calculators.seconds)()
}

// Mettre à jour la valeur en fonction de la date cible
const updateFromTargetDate = () => {
  if (props.targetDate) {
    currentValue.value = calculateTimeRemaining()
  }
}

// Formater la valeur pour l'affichage
const formattedValue = computed(() => {
  const value = currentValue.value
  return value < 10 ? `0${value}` : `${value}`
})

// Valeur pour l'attribut aria-label
const ariaLabel = computed(() => {
  return `${currentValue.value} ${props.format}`
})

// Définir l'émetteur d'événements
const emit = defineEmits<{
  (e: "end"): void
}>()

// Démarrer le compte à rebours
const startCountdown = () => {
  if (intervalId.value !== null) return

  updateFromTargetDate()

  intervalId.value = window.setInterval(() => {
    if (props.targetDate) {
      updateFromTargetDate()
      if (currentValue.value === 0) {
        emit("end")
        stopCountdown()
      }
    } else if (currentValue.value > 0) {
      currentValue.value--
      if (currentValue.value === 0) {
        emit("end")
        stopCountdown()
      }
    } else {
      stopCountdown()
    }
  }, 1000)
}

// Arrêter le compte à rebours
const stopCountdown = () => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

// Réinitialiser le compte à rebours
const resetCountdown = () => {
  stopCountdown()
  if (props.value !== undefined) {
    currentValue.value = props.value
  } else if (props.targetDate) {
    updateFromTargetDate()
  } else {
    currentValue.value = 0
  }
}

// Exposer les méthodes pour le contrôle externe
defineExpose({
  start: startCountdown,
  stop: stopCountdown,
  reset: resetCountdown,
})

// Surveiller les changements de props
watch(
  () => props.value,
  (newValue) => {
    if (newValue !== undefined) {
      currentValue.value = newValue
    }
  },
)

watch(
  () => props.targetDate,
  () => {
    resetCountdown()
    if (props.autoStart) {
      startCountdown()
    }
  },
)

// Démarrer le compte à rebours au montage si autoStart est true
onMounted(() => {
  if (props.autoStart) {
    startCountdown()
  }
})

// Nettoyer l'intervalle avant de démonter le composant
onBeforeUnmount(() => {
  stopCountdown()
})
</script>

<template>
  <span
    :class="['countdown', customClass]"
    aria-live="polite"
    :aria-label="ariaLabel"
  >
    <span :style="`--value: ${currentValue};`">
      <slot>{{ formattedValue }}</slot>
    </span>
  </span>
</template> 