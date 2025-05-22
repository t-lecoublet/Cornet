<script lang="ts" setup>
import { computed } from "vue";
import DuJoin from "../../Layout/du-join/du-join.vue";
import { type PaginationProps } from './du-pagination.types';
import { useSizeMapping } from "../../../composables/useSizeProps";
import { useVariantMapping } from "../../../composables/useVariantProps";

const props = withDefaults(
  defineProps<PaginationProps>(),
  {
    modelValue: 1,
    perPage: 10,
    showNext: true,
    showPrevious: true,
    showFirst: false,
    showLast: false,
    size: "default",
    nextLabel: "»",
    previousLabel: "«",
    firstLabel: "«« ",
    lastLabel: " »»",
    variant: "default",
    outline: false,
    manual: false,
    showEllipsis: true,
    maxPages: 0,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const { sizeClass } = useSizeMapping({ size: props.size }, "btn");
const { colorClass } = useVariantMapping({ variant: props.variant }, "btn");

const outlineClass = computed(() => {
  return props.outline ? "btn-outline" : "";
});

const pages = computed(() => {
  const result: (number | string)[] = [];
  const current = props.modelValue;

  if (props.maxPages > 0) {
    const maxPagesHalf = Math.floor(props.maxPages / 2);
    let startPage = Math.max(1, current - maxPagesHalf);
    let endPage = Math.min(totalPages.value, startPage + props.maxPages - 1);

    if (endPage - startPage + 1 < props.maxPages) {
      startPage = Math.max(1, endPage - props.maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    return result;
  }

  result.push(1);

  if (props.showEllipsis && current > 3) {
    result.push("...");
  }

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(current + 1, totalPages.value - 1);
    i++
  ) {
    result.push(i);
  }

  if (props.showEllipsis && current < totalPages.value - 2) {
    result.push("...");
  }

  if (totalPages.value > 1) {
    result.push(totalPages.value);
  }

  return result;
});

function changePage(page: number | string) {
  if (typeof page === "number") {
    emit("update:modelValue", page);
  }
}
</script>

<template>
  <DuJoin>
    <template v-if="manual">
      <slot></slot>
    </template>

    <template v-else>
      <button
        v-if="showFirst"
        class="join-item btn"
        :class="[
          sizeClass,
          colorClass,
          outlineClass,
          { 'btn-disabled': modelValue <= 1 },
        ]"
        @click="changePage(1)"
        :disabled="modelValue <= 1"
      >
        <slot name="first">{{ firstLabel }}</slot>
      </button>

      <button
        v-if="showPrevious"
        class="join-item btn"
        :class="[
          sizeClass,
          colorClass,
          outlineClass,
          { 'btn-disabled': modelValue <= 1 },
        ]"
        @click="changePage(modelValue - 1)"
        :disabled="modelValue <= 1"
      >
        <slot name="previous">{{ previousLabel }}</slot>
      </button>

      <button
        v-for="page in pages"
        :key="page"
        class="join-item btn"
        :class="[
          sizeClass,
          colorClass,
          outlineClass,
          { 'btn-active': page === modelValue },
          { 'btn-disabled': page === '...' },
        ]"
        @click="changePage(page)"
      >
        <slot :name="`page-${page}`">{{ page }}</slot>
      </button>

      <button
        v-if="showNext"
        class="join-item btn"
        :class="[
          sizeClass,
          colorClass,
          outlineClass,
          { 'btn-disabled': modelValue >= totalPages },
        ]"
        @click="changePage(modelValue + 1)"
        :disabled="modelValue >= totalPages"
      >
        <slot name="next">{{ nextLabel }}</slot>
      </button>

      <button
        v-if="showLast"
        class="join-item btn"
        :class="[
          sizeClass,
          colorClass,
          outlineClass,
          { 'btn-disabled': modelValue >= totalPages },
        ]"
        @click="changePage(totalPages)"
        :disabled="modelValue >= totalPages"
      >
        <slot name="last">{{ lastLabel }}</slot>
      </button>
    </template>
  </DuJoin>
</template>

<style scoped>
.btn.btn-disabled {
  background-color: color-mix(in oklab, var(--btn-bg) 100%, transparent);
  --btn-fg: color-mix(in oklch, var(--color-base-content) 50%, #0000);
}

.btn.btn-outline.btn-disabled {
  --btn-bg: #0000;
  --btn-fg: color-mix(in oklch, var(--btn-color) 35%, #0000);
  --btn-border: var(--btn-color);
}
</style> 