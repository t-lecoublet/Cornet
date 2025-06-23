<script setup lang="ts">
import { computed, inject } from "vue";
import { type MenuProps } from './du-menu.types';
import { useSizeMapping } from "../../../composables/useSizeProps";

export interface MenuProps {
  direction?: MenuDirection;
  size?: Size;
  rounded?: boolean;
  items?: Array<{
    label: string;
    icon?: string;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    subItems?: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
      disabled?: boolean;
    }>;
  }>;
  activeItem?: string;
  onItemClick?: (item: { label: string; href?: string; onClick?: () => void }) => void;
  onSubItemClick?: (item: { label: string; href?: string; onClick?: () => void }) => void;
} 

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
  <template v-if="props.items">
    <li v-for="(item, index) in props.items" :key="index" :class="{ 'menu-item': true, 'disabled': item.disabled }">
      <a
        v-if="item.href"
        :href="item.href"
        @click="item.onClick ? item.onClick() : null"
        class="flex items-center"
      >
        <Icon v-if="item.icon" :name="item.icon" class="mr-2" />
        {{ item.label }}
      </a>
      <button
        v-else
        @click="item.onClick ? item.onClick() : null"
        class="flex items-center w-full text-left"
      >
        <Icon v-if="item.icon" :name="item.icon" class="mr-2" />
        {{ item.label }}
      </button>
      <ul v-if="item.subItems" class="menu-sub">
        <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :class="{ 'disabled': subItem.disabled }">
          <a
            v-if="subItem.href"
            :href="subItem.href"
            @click="subItem.onClick ? subItem.onClick() : null"
            class="flex items-center"
          >           
            {{ subItem.label }}
          </a>
          <button
            v-else
            @click="subItem.onClick ? subItem.onClick() : null"
            class="flex items-center w-full text-left"
          >
            {{ subItem.label }}
          </button>
        </li>
      </ul>
    </li>
  </template>
  <template v-else>
    <slot />
  </template>
  </ul>
</template> 