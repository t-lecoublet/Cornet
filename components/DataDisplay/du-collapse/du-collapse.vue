<script setup lang="ts">
import { type DuCollapseProps } from './du-collapse.types'

withDefaults(
  defineProps<DuCollapseProps>(),
  {
    items: undefined,
    modifier: undefined,
    customClass: '',
  },
)
</script>

<template>
  <!-- Dynamic items mode -->
  <template v-if="items">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'collapse',
        'bg-base-100 border border-base-300',
        modifier,
        item.customClass || customClass,
      ]"
    >
      <input type="checkbox" :checked="item.open ?? false" />
      <div class="collapse-title">
        <slot :name="`title-${index}`" :item="item" :index="index">
          {{ item.title }}
        </slot>
      </div>
      <div class="collapse-content">
        <slot :name="`content-${index}`" :item="item" :index="index">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </template>

  <!-- Manual mode -->
  <template v-else>
    <slot></slot>
  </template>
</template>