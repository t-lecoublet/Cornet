<script setup lang="ts">
import { computed } from 'vue';
import { type MenuItem } from './du-menu.types';

const props = defineProps<{
  item: MenuItem;
  index: number;
  parentIndex?: string;
}>();

const slots = defineSlots();

const idx = computed(() => props.parentIndex ? `${props.parentIndex}-${props.index}` : `${props.index}`);

// Détermine si l'item est actif (sélectionné)
const isActive = computed(() => {
  if (props.item.multiple) {
    // En mode multiple, utilise la propriété checked
    return props.item.checked
  } else {
    // En mode simple, peut utiliser checked ou une autre logique
    return props.item.checked || props.item.active
  }
});
</script>

<template>
  <!-- Titre simple (menu-title) -->
  <template v-if="item.isTitle && !item.subItems">
    <template v-if="$slots[`title-${idx}`]">
      <slot :name="`title-${idx}`" :item="item" :index="index" />
    </template>
    <template v-else-if="$slots.title">
      <slot name="title" :item="item" :index="index" />
    </template>
    <template v-else>
      <li class="menu-title">{{ item.label }}</li>
    </template>
  </template>
  <!-- Titre parent (menu-title + sous-menu) -->
  <template v-else-if="item.isTitle && item.subItems">
    <template v-if="$slots[`title-${idx}`]">
      <slot :name="`title-${idx}`" :item="item" :index="index" />
      <ul role="listbox">
        <du-menu-item
          v-for="(sub, subIndex) in item.subItems"
          :key="subIndex"
          :item="sub"
          :index="subIndex"
          :parent-index="idx"
          v-bind="$attrs"
        >
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </du-menu-item>
      </ul>
    </template>
    <template v-else-if="$slots.title">
      <slot name="title" :item="item" :index="index" />
      <ul role="listbox">
        <du-menu-item
          v-for="(sub, subIndex) in item.subItems"
          :key="subIndex"
          :item="sub"
          :index="subIndex"
          :parent-index="idx"
          v-bind="$attrs"
        >
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </du-menu-item>
      </ul>
    </template>
    <template v-else>
      <li>
        <h2 class="menu-title">{{ item.label }}</h2>
        <ul role="listbox">
          <du-menu-item
            v-for="(sub, subIndex) in item.subItems"
            :key="subIndex"
            :item="sub"
            :index="subIndex"
            :parent-index="idx"
            v-bind="$attrs"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </du-menu-item>
        </ul>
      </li>
    </template>
  </template>
  <!-- Item avec sous-menu -->
  <template v-else-if="item.subItems">
    <template v-if="$slots[`submenu-${idx}`]">
      <slot :name="`submenu-${idx}`" :item="item" :index="index" />
    </template>
    <template v-else-if="$slots.submenu">
      <slot name="submenu" :item="item" :index="index" />
    </template>
    <template v-else>
      <li>
        <a :role="item.disabled ? undefined : 'option'"
          :href="item.href" 
          :class="{ 
            'menu-disabled': item.disabled,
            'menu-active': isActive
          }" 
          @click.stop="item.onClick && item.onClick()"
        >
          {{ item.label }}
        </a>
        <ul role="listbox">
          <du-menu-item
            v-for="(sub, subIndex) in item.subItems"
            :key="subIndex"
            :item="sub"
            :index="subIndex"
            :parent-index="idx"
            v-bind="$attrs"
          >
            <template v-for="(_, name) in $slots" #[name]="slotProps">
              <slot :name="name" v-bind="slotProps" />
            </template>
          </du-menu-item>
        </ul>
      </li>
    </template>
  </template>
  <!-- Item simple -->
  <template v-else>
    <template v-if="$slots[`item-${idx}`]">
      <slot :name="`item-${idx}`" :item="item" :index="index" />
    </template>
    <template v-else-if="$slots.item">
      <slot name="item" :item="item" :index="index" />
    </template>
    <template v-else>
      <li :class="{ 'menu-disabled': item.disabled }">
        <a :role="item.disabled ? undefined : 'option'"
          :href="item.href" 
          :class="{ 'menu-active': isActive }"
          @click.stop="item.onClick && item.onClick()"
        >
          <!-- Checkbox pour sélection multiple -->
          <input 
            v-if="item.multiple && item.value !== undefined" 
            type="checkbox" 
            class="invisible w-0 h-0 overflow-clip" 
            :checked="item.checked" 
            disabled
          >
          {{ item.label }}
        </a>
      </li>
    </template>
  </template>
</template>