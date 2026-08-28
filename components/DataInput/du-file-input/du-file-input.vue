<script setup lang="ts">
import { ref, watch } from "vue"
import { type DuFileInputEmit, type DuFileInputProps } from './du-file-input.types'
import { useVariantMapping } from "../../../composables/useVariantProps"
import { useSizeMapping } from "../../../composables/useSizeProps"

const props = withDefaults(
  defineProps<DuFileInputProps>(),
  {
    modelValue: undefined,
    disabled: false,
    variant: "default",
    size: "default",
    ghost: false,
    multiple: false,
    accept: undefined,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<DuFileInputEmit>()

const input = ref<HTMLInputElement | null>(null)

const { colorClass } = useVariantMapping(props, "file-input")
const { sizeClass } = useSizeMapping(props, "file-input")

function onChange(event: Event) {
  const files = [...((event.target as HTMLInputElement).files ?? [])]
  emit('update:modelValue', files)
  emit('change', files)
}

// A file input's value cannot be assigned from script — the browser forbids it,
// so nobody can put a file in a form the user did not choose. The one thing the
// model *can* do is clear the field, which is what a form reset needs.
watch(() => props.modelValue, (files) => {
  if ((files == null || files.length === 0) && input.value != null && input.value.value !== '') {
    input.value.value = ''
  }
})

defineExpose({ clear: () => { if (input.value != null) input.value.value = '' } })
</script>

<template>
  <input
    ref="input"
    type="file"
    :disabled="disabled"
    :multiple="multiple"
    :accept="accept"
    :aria-label="ariaLabel"
    :class="['file-input', colorClass, sizeClass, ghost && 'file-input-ghost']"
    @change="onChange"
  />
</template>
