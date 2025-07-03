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
// Slots documentation : voir le template pour la gestion des slots indexés et globaux.
</script>

<template>
  <ul :class="['menu', inDropdownClass, roundedClass, directionClass, sizeClass]">
    <!-- Mode automatique (items) -->
    <template v-if="items && !$slots.default">
      <template v-for="(item, index) in items" :key="index">
        <!-- Titre simple (menu-title) -->
        <template v-if="item.isTitle && !item.subItems">
          <template v-if="$slots[`title-${index}`]">
            <slot :name="`title-${index}`" v-bind="{ item, index }" />
          </template>
          <template v-else-if="$slots.title">
            <slot name="title" v-bind="{ item, index }" />
          </template>
          <template v-else>
            <li class="menu-title">{{ item.label }}</li>
          </template>
        </template>
        <!-- Titre parent (menu-title + sous-menu) -->
        <template v-else-if="item.isTitle && item.subItems">
          <template v-if="$slots[`title-${index}`]">
            <slot :name="`title-${index}`" v-bind="{ item, index }" />
            <ul>
              <template v-for="(sub, subIndex) in item.subItems" :key="subIndex">
                <template v-if="$slots[`item-${index}-${subIndex}`]">
                  <slot :name="`item-${index}-${subIndex}`" v-bind="{ item: sub, index: subIndex }" />
                </template>
                <template v-else-if="$slots.item">
                  <slot name="item" v-bind="{ item: sub, index: subIndex }" />
                </template>
                <template v-else>
                  <li :class="{ 'menu-disabled': sub.disabled }">
                    <a :href="sub.href">{{ sub.label }}</a>
                  </li>
                </template>
              </template>
            </ul>
          </template>
          <template v-else-if="$slots.title">
            <slot name="title" v-bind="{ item, index }" />
            <ul>
              <template v-for="(sub, subIndex) in item.subItems" :key="subIndex">
                <template v-if="$slots[`item-${index}-${subIndex}`]">
                  <slot :name="`item-${index}-${subIndex}`" v-bind="{ item: sub, index: subIndex }" />
                </template>
                <template v-else-if="$slots.item">
                  <slot name="item" v-bind="{ item: sub, index: subIndex }" />
                </template>
                <template v-else>
                  <li :class="{ 'menu-disabled': sub.disabled }">
                    <a :href="sub.href">{{ sub.label }}</a>
                  </li>
                </template>
              </template>
            </ul>
          </template>
          <template v-else>
            <li>
              <h2 class="menu-title">{{ item.label }}</h2>
              <ul>
                <template v-for="(sub, subIndex) in item.subItems" :key="subIndex">
                  <template v-if="$slots[`item-${index}-${subIndex}`]">
                    <slot :name="`item-${index}-${subIndex}`" v-bind="{ item: sub, index: subIndex }" />
                  </template>
                  <template v-else-if="$slots.item">
                    <slot name="item" v-bind="{ item: sub, index: subIndex }" />
                  </template>
                  <template v-else>
                    <li :class="{ 'menu-disabled': sub.disabled }">
                      <a :href="sub.href">{{ sub.label }}</a>
                    </li>
                  </template>
                </template>
              </ul>
            </li>
          </template>
        </template>
        <!-- Item avec sous-menu -->
        <template v-else-if="item.subItems">
          <template v-if="$slots[`submenu-${index}`]">
            <slot :name="`submenu-${index}`" v-bind="{ item, index }" />
          </template>
          <template v-else-if="$slots.submenu">
            <slot name="submenu" v-bind="{ item, index }" />
          </template>
          <template v-else>
            <li>
              <a :href="item.href" :class="{ 'menu-disabled': item.disabled }">{{ item.label }}</a>
              <ul>
                <template v-for="(sub, subIndex) in item.subItems" :key="subIndex">
                  <template v-if="$slots[`item-${index}-${subIndex}`]">
                    <slot :name="`item-${index}-${subIndex}`" v-bind="{ item: sub, index: subIndex }" />
                  </template>
                  <template v-else-if="$slots.item">
                    <slot name="item" v-bind="{ item: sub, index: subIndex }" />
                  </template>
                  <template v-else>
                    <li :class="{ 'menu-disabled': sub.disabled }">
                      <a :href="sub.href">{{ sub.label }}</a>
                    </li>
                  </template>
                </template>
              </ul>
            </li>
          </template>
        </template>
        <!-- Item simple -->
        <template v-else>
          <template v-if="$slots[`item-${index}`]">
            <slot :name="`item-${index}`" v-bind="{ item, index }" />
          </template>
          <template v-else-if="$slots.item">
            <slot name="item" v-bind="{ item, index }" />
          </template>
          <template v-else>
            <li :class="{ 'menu-disabled': item.disabled }">
              <a :href="item.href">{{ item.label }}</a>
            </li>
          </template>
        </template>
      </template>
    </template>
    <!-- Mode manuel (slot) -->
    <template v-else>
      <slot />
    </template>
  </ul>
</template>