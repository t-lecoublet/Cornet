<script setup lang="ts" generic="O, V = O, Q = string">
// Test-only wrapper for driving the combobox engine through a component.
//
// It applies the same prop defaults as the facades, keeps its own model when
// the parent binds no v-model, and hands the engine scope to the test through
// the default slot — as one `reactive` proxy, so tests read plain values
// (`scope.isOpen`, `scope.visibleOptions`) instead of refs.
// Not part of the published package (`files` excludes `tests`).
import { reactive } from 'vue'
import { useCombobox } from '../../components/core/combobox'
import type { ComboboxProps, ComboboxPropsSource, ComboboxSlotProps } from '../../components/core/combobox'

const props = withDefaults(defineProps<Omit<ComboboxProps<O, V, Q>, 'modelValue'>>(), {
  // Auto per mode (single: close, multiple: stay open) — Vue would cast an
  // absent boolean to `false`, so the default has to be an explicit `null`.
  closeOnSelect: null,
  closeOnClickOutside: true,
})

const model = defineModel<V | V[] | null>('modelValue', { default: null })

defineSlots<{
  default: (slotProps: { scope: ComboboxSlotProps<O, V, Q> }) => unknown
}>()

const scope = reactive(useCombobox<O, V, Q>(
  // defineProps widens optionals under exactOptionalPropertyTypes; the engine
  // treats undefined and absent identically. The model ref is passed directly
  // so the local fallback state stays in sync.
  { ...props, modelValue: model } as unknown as ComboboxPropsSource<O, V, Q>,
  (value) => {
    model.value = value
  },
)) as unknown as ComboboxSlotProps<O, V, Q>
</script>

<template>
  <slot :scope="scope" />
</template>
