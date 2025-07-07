<script setup lang="ts">
import { computed, inject } from "vue";
import { type MenuProps } from './du-menu.types';
import { useSizeMapping } from "../../../composables/useSizeProps";
import DuMenuItem from './du-menu-item.vue';

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
// Slots documentation : voir le template pour la gestion des slots indexés et globaux.
</script>

<template>
  <ul :class="['menu', inDropdownClass, roundedClass, directionClass, sizeClass]">
    <!-- Mode automatique (items) -->
    <template v-if="items && !$slots.default">
      <DuMenuItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :index="index"
      >
        <!-- Transmission de tous les slots au composant enfant -->
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </DuMenuItem>
    </template>
    <!-- Mode manuel (slot) -->
    <template v-else>
      <slot />
    </template>
  </ul>
</template>


<style>

.menu * a, .menu * button {
  margin: .125rem 0;
}

</style>