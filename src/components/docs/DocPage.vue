<script setup lang="ts">
import { ref } from 'vue'
import type { DocPageData } from '@/types/docs'
import PropsTable from './PropsTable.vue'
import PropsDocs from './PropsDocs.vue'
import SlotsDocs from './SlotsDocs.vue'
import LivePreview from './LivePreview.vue'

defineProps<{ data: DocPageData }>()

const copiedIdx = ref<number | null>(null)
function copyCode(code: string, idx: number) {
  navigator.clipboard.writeText(code).then(() => {
    copiedIdx.value = idx
    setTimeout(() => { copiedIdx.value = null }, 2000)
  }).catch(() => {
    // Clipboard API not available
  })
}

function getFullCode(section: { code: string }): string {
  return section.code
}

function sectionKey(data: DocPageData, idx: number): string {
  return data.title + '-' + idx
}
</script>

<template>
  <div class="min-h-full">

    <!-- ─── Page header ─────────────────────────────────── -->
    <div class="border-b border-base-300 pb-6 mb-8">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-mono text-base-content/40 uppercase tracking-widest">{{ data.category }}</span>
          </div>
          <h1 class="text-3xl font-black text-base-content mb-2">{{ data.title }}</h1>
          <p class="text-base-content/60 text-base max-w-2xl">{{ data.description }}</p>
        </div>
        <a
          v-if="data.source"
          :href="data.source"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1.5 text-xs text-base-content/40 hover:text-primary transition-colors mt-1 shrink-0"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          DaisyUI source
        </a>
      </div>
    </div>

    <!-- ─── Props documentation ───────────────────────── -->
    <section v-if="data.props?.length" class="mb-10">
      <h2 class="text-base font-bold text-base-content mb-3">Props</h2>
      <PropsDocs :props="data.props" />
    </section>

    <!-- ─── Slots documentation ─────────────────────── -->
    <section v-if="data.slots?.length" class="mb-10">
      <h2 class="text-base font-bold text-base-content mb-3">Slots</h2>
      <SlotsDocs :slots="data.slots" />
    </section>

    <!-- ─── Classnames / Props table ────────────────────── -->
    <section v-if="data.classnames" class="mb-10">
      <h2 class="text-base font-bold text-base-content mb-3">Props &amp; Classes</h2>
      <PropsTable :classnames="data.classnames" />
    </section>

    <!-- ─── Sections ─────────────────────────────────────── -->
    <section v-if="data.sections.length" class="space-y-10">
      <div
        v-for="(section, idx) in data.sections"
        :key="sectionKey(data, idx)"
        class="group"
      >
        <!-- Section title -->
        <h3 class="text-sm font-bold text-base-content/80 mb-3 flex items-center gap-2">
          <span class="w-1 h-4 rounded-full bg-primary/50 inline-block"></span>
          {{ section.title }}
        </h3>

        <!-- Optional description -->
        <p v-if="section.description" class="text-sm text-base-content/55 mb-3">
          {{ section.description }}
        </p>

        <!-- Live Vue preview -->
        <div
          v-if="section.preview"
          class="border border-base-300 rounded-t-xl bg-base-100 px-6 py-8"
        >
          <LivePreview :code="section.preview" :script="section.script" />
        </div>

        <!-- Code block -->
        <div :class="section.preview ? 'rounded-b-xl overflow-hidden border border-t-0 border-base-300' : 'rounded-xl overflow-hidden border border-base-300'">
          <div class="flex items-center justify-between bg-base-200/80 px-4 py-2 border-b border-base-300/60">
            <span class="text-xs font-mono text-base-content/40">vue</span>
            <button
              class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg transition-all cursor-pointer"
              :class="copiedIdx === idx
                ? 'bg-success/15 text-success'
                : 'text-base-content/40 hover:text-base-content/80 hover:bg-base-300/40'"
              @click="copyCode(getFullCode(section), idx)"
            >
              <svg v-if="copiedIdx !== idx" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {{ copiedIdx === idx ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="bg-base-200/40 px-5 py-4 text-sm font-mono text-base-content overflow-x-auto leading-relaxed">{{ getFullCode(section) }}</pre>
        </div>
      </div>
    </section>

  </div>
</template>
