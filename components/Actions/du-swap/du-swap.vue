<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type DuSwapProps } from './du-swap.types'

const props = withDefaults(
  defineProps<DuSwapProps>(),
  {
    modelValue: false,
    rotate: false,
    flip: false,
    useCheckbox: true,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const internalActive = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalActive.value = val
})

const isActive = computed({
  get: () => internalActive.value,
  set: (value) => {
    internalActive.value = value
    emit('update:modelValue', value)
  },
})

const classes = computed(() => ({
  'swap-rotate': props.rotate,
  'swap-flip': props.flip,
}))
</script>

<template>
  <label v-if="useCheckbox" class="swap" :class="classes">
    <input
      type="checkbox"
      v-model="isActive"
      :indeterminate="$slots.indeterminate ? true : false"
    />
    <div class="swap-on">
      <slot name="on" />
    </div>
    <div class="swap-off">
      <slot name="off" />
    </div>
    <div v-if="$slots.indeterminate" class="swap-indeterminate">
      <slot name="indeterminate" />
    </div>
  </label>
  <!-- A toggle a user can operate: a button, not a div with a click handler.
       `aria-pressed` is what announces which of the two states is showing. -->
  <button
    v-else
    type="button"
    class="swap"
    :class="[classes, { 'swap-active': isActive }]"
    :aria-pressed="isActive"
    :aria-label="ariaLabel"
    @click="isActive = !isActive"
  >
    <div class="swap-on">
      <slot name="on" />
    </div>
    <div class="swap-off">
      <slot name="off" />
    </div>
  </button>
</template> 