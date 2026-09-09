<script setup lang="ts">
import { useSizeMapping } from "../../../composables/useSizeProps"
import { useVariantMapping } from "../../../composables/useVariantProps"
import { computed, inject } from "vue"
import { useNativeValidation } from "../../core/shared"
import { NULL_WHEN_EMPTY_TYPES, type DuInputFieldModelModifier, type DuInputFieldProps } from "./du-input-field.types"

// The model stays `unknown`, as it was: `DuLabelInputValidator` declares its own
// as `string` and binds it here, so narrowing this one would break it. Only the
// modifier bag is new.
const [model, modifiers] = defineModel<unknown, DuInputFieldModelModifier>()

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

const castsToNumber = computed(() => props.type === "number" || modifiers.number === true)

/** A number, a date, a time: types for which `''` is an absence, not an answer. */
const emptyIsNull = computed(() => (
  castsToNumber.value || (NULL_WHEN_EMPTY_TYPES as readonly string[]).includes(props.type)
))

/**
 * An emptied number or date field means *no value*, not the empty string.
 *
 * The native `v-model` casts through `looseToNumber`, which hands `''` straight
 * back when `parseFloat` fails, and never touches a date at all — so a cleared
 * field emitted `''`, and that `''` ended up in API payloads that a server then
 * refused to parse. Text keeps its empty string, which is a real answer.
 *
 * The numeric cast itself follows Vue to the letter, `'abc'` included, so
 * `.number` holds no surprise beyond the fix.
 */
function toModelValue(raw: unknown): unknown {
  if (raw == null || raw === "") {
    return emptyIsNull.value ? null : raw
  }
  if (!castsToNumber.value) {
    return raw
  }
  if (typeof raw === "number") {
    return raw
  }
  const parsed = Number.parseFloat(String(raw))
  return Number.isNaN(parsed) ? raw : parsed
}

const fieldValue = computed({
  /*
   * `vModelText` compares the element's value against the model before writing,
   * and only casts the element side when the modifier reached the directive or
   * the input is `type="number"`. Ours carries no modifier, so a `.number` on a
   * text-like field would compare `'12'` against `12`, never match, and rewrite
   * `el.value` on every keystroke. Handing back the string keeps them equal.
   */
  get: () => (
    castsToNumber.value && props.type !== "number" && typeof model.value === "number"
      ? String(model.value)
      : model.value
  ),
  set: (raw: unknown) => { model.value = toModelValue(raw) },
})

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
    v-model="fieldValue"
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