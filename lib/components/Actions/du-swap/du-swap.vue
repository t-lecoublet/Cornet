<script setup lang="ts">
import { computed, ref } from 'vue'
import { type SWAPProperty } from './du-swap.types'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    rotate?: boolean
    flip?: boolean
    useCheckbox?: boolean
  }>(),
  {
    modelValue: false,
    rotate: false,
    flip: false,
    useCheckbox: true,
  },
)

const emit = defineEmits(['update:modelValue'])

const isActive = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
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
  <div v-else class="swap" :class="[classes, { 'swap-active': isActive }]">
    <div class="swap-on">
      <slot name="on" />
    </div>
    <div class="swap-off">
      <slot name="off" />
    </div>
  </div>
</template> 