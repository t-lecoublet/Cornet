<script setup lang="ts">
import type { DocSlot } from '@/types/docs'

defineProps<{ slots: DocSlot[] }>()
</script>

<template>
  <div class="not-prose">
    <div class="border border-base-300 rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-base-200/60 border-b border-base-300">
            <th class="text-left px-4 py-2.5 font-mono text-xs text-base-content/60 font-semibold w-1/4">Slot</th>
            <th class="text-left px-4 py-2.5 font-mono text-xs text-base-content/60 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(slot, i) in slots"
            :key="slot.title"
            class="border-b border-base-300/50 last:border-0"
            :class="i % 2 === 0 ? 'bg-base-100' : 'bg-base-200/30'"
          >
            <td class="px-4 py-2.5">
              <code class="text-xs font-mono text-accent bg-accent/8 px-1.5 py-0.5 rounded">{{ slot.title }}</code>
            </td>
            <td class="px-4 py-2.5 text-base-content/70 text-xs">{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>