<script lang="ts" setup>
import { computed } from "vue";
import { type JoinProps } from "./du-join.types";

const props = withDefaults(
  defineProps<JoinProps>(),
  {
    as: "div",
    direction: undefined,
  },
);

const directionClass = computed(() => {
  switch (props.direction) {
    case "horizontal":
      return "join-horizontal";
    case "vertical":
      return "join-vertical";
    default:
      return "";
  }
});
</script>

<template>
  <component :is="as" :class="['join', directionClass]">
    <slot></slot>
  </component>
</template> 