<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { docsNav } from '@/data/docs/registry'

const route = useRoute()
const sidebarOpen = inject<Ref<boolean>>('sidebarOpen', ref(false))

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="flex flex-1 h-full overflow-hidden">

    <!-- Overlay (mobile) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/30 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- ─── Sidebar ────────────────────────────────────── -->
    <aside
      class="fixed lg:sticky top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-full z-40 w-64 shrink-0 border-r border-base-300 bg-base-100 flex flex-col transition-transform duration-200"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        <div
          v-for="cat in docsNav"
          :key="cat.category"
        >
          <div class="px-2 mb-1.5">
            <span class="text-xs font-bold uppercase tracking-widest text-base-content/35">{{ cat.category }}</span>
          </div>
          <ul class="space-y-0.5">
            <li v-for="item in cat.items" :key="item.path">
              <RouterLink
                :to="item.path"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
                :class="isActive(item.path)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-base-content/60 hover:text-base-content hover:bg-base-200/70'"
                @click="sidebarOpen = false"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-base-300 text-xs text-base-content/30">
        55 components · 3 guides
      </div>
    </aside>

    <!-- ─── Content ────────────────────────────────────── -->
    <main class="flex-1 overflow-y-scroll h-full">
      <div class="max-w-3xl mx-auto px-6 py-10">
        <RouterView />
      </div>
    </main>

  </div>
</template>
