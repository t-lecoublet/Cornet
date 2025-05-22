<script setup lang="ts">
import { computed } from "vue";
import { type ToastProps } from "./du-toast.types";

const props = withDefaults(
  defineProps<ToastProps>(),
  {
    horizontalPosition: undefined,
    verticalPosition: undefined,
    to: undefined,
  },
);

const horizontalClass = computed(() => {
  switch (props.horizontalPosition) {
    case "start":
      return "toast-start";
    case "center":
      return "toast-center";
    case "end":
      return "toast-end";
    default:
      return "";
  }
});

const verticalClass = computed(() => {
  switch (props.verticalPosition) {
    case "top":
      return "toast-top";
    case "middle":
      return "toast-middle";
    case "bottom":
      return "toast-bottom";
    default:
      return "";
  }
});
</script>

<template>
  <template v-if="to">
    <Teleport defer :to="to">
      <div :class="['toast', horizontalClass, verticalClass]">
        <slot></slot>
      </div>
    </Teleport>
  </template>
  <template v-else>
    <div :class="['toast', horizontalClass, verticalClass]">
      <slot></slot>
    </div>
  </template>
</template> 