<script setup lang="ts">
import { computed } from "vue";
import { type TabsProps, type TabItem } from './du-tabs.types';
import { useSizeMapping } from "../../../composables/useSizeProps";

const props = withDefaults(
  defineProps<TabsProps>(),
  {
    size: "default",
    items: undefined,
    type: undefined,
    bottom: false,
    name: "my_tabs",
    modelValue: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [index: number]
}>();

function handleTabClick(index: number, item: TabItem) {
  emit('update:modelValue', index);
  item.onClick?.();
}

const { sizeClass } = useSizeMapping(props, "tabs");

const typeClass = computed(() => {
  switch (props.type) {
    case "lift":
      return "tabs-lift";
    case "border":
      return "tabs-border";
    case "box":
      return "tabs-box";
    default:
      return "";
  }
});
</script>

<template>
  <div :class="['tabs', sizeClass, typeClass]">
    <template v-if="$slots.default">
      <slot></slot>
    </template>

    <template v-else-if="items">
      <template v-for="(item, index) in items" :key="index">
        <label :class="['tab', item.class]" @click="handleTabClick(index, item)">
          <input type="radio" :name="props.name" :checked="item.active" />
          <template v-if="item.label || $slots.tab">
            <slot name="tab" :item="item" :index="index">
              <slot :name="`tab-${index}`" :item="item" :index="index">
                <slot name="icon" :item="item">
                  <component class="w-5 h-5"
                    :is="item.icon"
                    v-if="typeof item.icon === 'object' || typeof item.icon === 'function'"
                  />
                  <img
                    v-else-if="
                      typeof item.icon === 'string' &&
                      item.icon.startsWith('http')
                    "
                    :src="item.icon"
                    :alt="item.label"
                  />
                  <div
                    v-else-if="typeof item.icon === 'string'"
                    v-html="item.icon"
                  ></div>
                </slot>
                {{ item.label }}
              </slot>
            </slot>
          </template>
        </label>
        <template v-if="item.content || $slots.content || $slots[`content-${index}`]">
          <div class="tab-content">
            <slot name="content" :item="item" :index="index">
              <slot :name="`content-${index}`" :item="item" :index="index">
                {{ item.content }}
              </slot>
            </slot>
          </div>
        </template>
      </template>
    </template>
  </div>
</template> 