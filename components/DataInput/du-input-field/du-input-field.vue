<script setup lang="ts">
import { useSizeMapping } from "../../../composables/useSizeProps"
import { useVariantMapping } from "../../../composables/useVariantProps"
import { computed, inject } from "vue"
import { useNativeValidation } from "../../core/shared"
import { type DuInputFieldProps } from "./du-input-field.types"

const model = defineModel()

const props = withDefaults(defineProps<DuInputFieldProps>(), {
  placeholder: "",
  type: "text",
  size: "default",
  ghost: false,
  variant: "default",
  disabled: false,
  required: false,
})

const { colorClass } = useVariantMapping(props, "input")
const { sizeClass } = useSizeMapping(props, "input")
const ghostClass = computed(() => (props.ghost ? "input-ghost" : ""))
const invalidClass = computed(() => (props.invalid ? "input-bordered focus:invalid:input-error" : ""))

// Validity comes from the browser: already localized, already what the form
// itself will decide on submit. What is added here is the surface — the same
// codes, the same `errorMessages` override and the same "not until you have
// had a chance" timing the combobox exposes.
const validation = useNativeValidation({ errorMessages: () => props.errorMessages })

/** A function ref, so the element is bound during mount rather than a tick later. */
const setFieldRef = (el: unknown) => validation.bind(el as HTMLInputElement | null)

defineExpose({
  valid: computed(() => validation.valid.value),
  errors: computed(() => validation.errors.value),
  validationMessage: computed(() => validation.validationMessage.value),
  markTouched: validation.markTouched,
  reset: validation.reset,
})

const isInput = inject("isInInput", false)
const inJoin = inject("isInJoin", false)

// The template's root is a fragment (input + optional datalist), so Vue cannot
// auto-inherit attributes — without this, an `aria-label` or `aria-describedby`
// passed by the consumer would land nowhere and the field would have no
// accessible name outside a wrapping `<label>`.
defineOptions({ inheritAttrs: false })
</script>

<template>
  <input
    :ref="setFieldRef"
    v-bind="$attrs"
    :disabled="disabled"
    :type="type"
    :placeholder="placeholder"
    :class="[!isInput && 'input', colorClass, sizeClass, ghostClass, invalidClass, props.class, inJoin && 'join-item']"
    :list="suggestionName"
    :required="required"
    :pattern="pattern"
    :minlength="minlength"
    :maxlength="maxlength"
    :title="title"
    v-model="model"
  />
  <!-- Shown only once the field has been visited: an untouched field is not
       failing, it is unanswered. -->
  <slot
    v-if="validation.showError.value"
    name="error"
    :errors="validation.errors.value"
    :message="validation.validationMessage.value"
  >
    <p class="validator-hint">{{ validation.validationMessage.value }}</p>
  </slot>
  <datalist v-if="suggestionName" :id="suggestionName">
    <option v-for="suggestion in suggestionList" :key="suggestion">
      {{ suggestion }}
    </option>
  </datalist>
</template> 