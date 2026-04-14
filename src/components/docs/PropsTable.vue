<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { DocClassnames } from '@/types/docs'

const props = defineProps<{ classnames: DocClassnames }>()

const tabs = computed(() => {
  const entries: { key: keyof DocClassnames; label: string }[] = [
    { key: 'component', label: 'Component' },
    { key: 'style', label: 'Style' },
    { key: 'color', label: 'Color' },
    { key: 'size', label: 'Size' },
    { key: 'modifier', label: 'Modifier' },
    { key: 'placement', label: 'Placement' },
    { key: 'animation', label: 'Animation' },
  ]
  return entries.filter(e => props.classnames[e.key]?.length)
})

const active = ref(tabs.value[0]?.key ?? 'component')
const rows = computed(() => props.classnames[active.value] ?? [])

watch(tabs, (newTabs) => {
  if (!newTabs.find(t => t.key === active.value)) {
    active.value = newTabs[0]?.key ?? 'component'
  }
})
</script>

<template>
  <div v-if="tabs.length" class="not-prose">
    <!-- Tab bar -->
    <div class="flex gap-1 mb-0 flex-wrap">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-3 py-1.5 text-xs font-mono rounded-t-lg border border-b-0 transition-colors cursor-pointer"
        :class="active === tab.key
          ? 'bg-base-100 border-base-300 text-base-content'
          : 'bg-base-200/60 border-transparent text-base-content/50 hover:text-base-content/80'"
        @click="active = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Table -->
    <div class="border border-base-300 rounded-b-xl rounded-tr-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-base-200/60 border-b border-base-300">
            <th class="text-left px-4 py-2.5 font-mono text-xs text-base-content/60 font-semibold w-1/3">Class</th>
            <th class="text-left px-4 py-2.5 font-mono text-xs text-base-content/60 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="row.class"
            class="border-b border-base-300/50 last:border-0"
            :class="i % 2 === 0 ? 'bg-base-100' : 'bg-base-200/30'"
          >
            <td class="px-4 py-2.5">
              <code class="text-xs font-mono text-primary bg-primary/8 px-1.5 py-0.5 rounded">{{ row.class }}</code>
              <span v-if="row.default" class="ml-2 text-xs text-base-content/40 italic">default</span>
            </td>
            <td class="px-4 py-2.5 text-base-content/70 text-xs">{{ row.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
