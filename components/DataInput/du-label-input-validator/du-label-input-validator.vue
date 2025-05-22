<script setup lang="ts">
import { useSlots } from "vue";
import DuInputField from "../du-input-field/du-input-field.vue";
import DuLabel from "../du-label/du-label.vue";
import { type LabelInputValidatorProps } from "./du-label-input-validator.types";

const slots = useSlots();

const props = withDefaults(defineProps<LabelInputValidatorProps>(), {
  type: "floating-label",
  pattern: "[A-Za-z][A-Za-z0-9\\-]*",
  required: false,
  placeholder: "",
  inputType: "text",
  disabled: false,
});
</script>

<template>
  <DuLabel :class="[type, 'validator']">
    <slot name="before"></slot>
    <DuInputField
      :required="required"
      :pattern="pattern"
      :minlength="minlength"
      :maxlength="maxlength"
      :title="title"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :suggestionName="suggestionName"
      :suggestionList="suggestionList"
    />
    <slot name="after"></slot>
  </DuLabel>
  <p class="validator-hint" v-if="slots.hint">
    <slot name="hint"></slot>
  </p>
</template> 