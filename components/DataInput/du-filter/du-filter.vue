<script setup lang="ts">
import { provide } from "vue";
import { useComponentId } from "../../core/shared";
import DuButton from "../../Actions/du-button/du-button.vue";
import { type DuFilterProps, type DuFilterItem } from "./du-filter.types";

const props = withDefaults(
  defineProps<DuFilterProps>(),
  {
    items: undefined,
    name: undefined,
  },
);

const emit = defineEmits<{
  change: [item: DuFilterItem | undefined];
}>();

const filterName = useComponentId(props.name, "filter");

// Provide the string, not a ref: DuButton reads this via a plain
// `inject('filterName', undefined)` and uses it directly (no `.value`
// unwrap, and a Ref object is always truthy regardless of its value).
provide("filterName", filterName);
</script>

<template>
  <div class="filter">
    <DuButton
      customClass="btn filter-reset"
      v-bind="props.buttonsArgs"
      :checked="true"
      label="×"
      @change="emit('change', undefined)"
    />

    <!-- Dynamic items mode -->
    <template v-if="items">
      <DuButton
        v-for="(item, index) in items"
        :key="index"
        v-bind="item.buttonsArgs || props.buttonsArgs"
        :class="[item.customClass]"
        :checked="item.checked"
        :aria-label="item.title"
        @change="emit('change', item)"
      />
    </template>

    <!-- Manual mode -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template> 