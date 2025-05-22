<script setup lang="ts">
import { computed, inject } from "vue";
import { type MenuProps } from './du-menu.types';
import { useSizeMapping } from "../../../composables/useSizeProps";

const props = withDefaults(
  defineProps<MenuProps>(),
  {
    direction: "default",
    size: "default",
    rounded: true,
  },
);

const isInDropdownTrigger = inject("isDropdownTrigger", false);

const directionClass = computed(() => {
  return {
    default: "",
    vertical: "menu-vertical",
    horizontal: "menu-horizontal",
    responsive: "menu-vertical lg:menu-horizontal",
  }[props.direction];
});
const { sizeClass } = useSizeMapping(props, "menu");
const roundedClass = computed(() => {
  return props.rounded ? "rounded-box" : "[&_li>*]:rounded-none p-0";
});
const inDropdownClass = computed(() => {
  return isInDropdownTrigger ? "bg-base-100 shadow-sm" : "bg-base-200";
});
</script>

<template>
  <ul
    :class="['menu', inDropdownClass, roundedClass, directionClass, sizeClass]"
  >
    <slot />
  </ul>
</template> 