<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { DuButton, DuNavbar } from 'daisyui-vue-kit'
import { docsNav } from '@/data/docs/registry'

const route = useRoute()
const sidebarOpen = ref(false)
const searchQuery = ref('')

const filteredNav = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return docsNav
  return docsNav
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.label.toLowerCase().includes(q)),
    }))
    .filter(cat => cat.items.length)
})

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="h-screen bg-base-100 text-base-content flex flex-col">

    <!-- ─── Navbar ──────────────────────────────────────── -->
    <DuNavbar class="sticky top-0 z-50 shadow-none! bg-base-100/80 backdrop-blur border-b-2 border-base-300 shrink-0">
      <template #start>
        <div class="flex items-center gap-3 px-2">
          <!-- Mobile hamburger -->
          <button
            class="lg:hidden p-1.5 rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
            @click="sidebarOpen = !sidebarOpen"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <RouterLink to="/" class="relative flex items-center pr-2">
            <img src="/logo.svg" alt="Cornet" class="h-9 w-auto" />
            <span class="beta-badge">Beta</span>
          </RouterLink>
          <span class="hidden sm:inline text-xs font-mono text-base-content/30 border border-base-300 rounded-md px-2 py-0.5">docs</span>
        </div>
      </template>
      <template #center>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-base-content/70">
          <RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink>
          <RouterLink to="/docs" class="hover:text-primary transition-colors text-primary font-semibold">Docs</RouterLink>
        </nav>
      </template>
      <template #end>
        <div class="px-2">
          <DuButton variant="neutral" size="sm" outline tag="a" href="https://gitlab.limos.fr/hub-isima/daisyui-vue-kit" target="_blank">
            GitLab
          </DuButton>
        </div>
      </template>
    </DuNavbar>

    <!-- ─── Body ─────────────────────────────────────────── -->
    <div class="flex flex-1 overflow-clip  h-[calc(100vh-4rem)]">

      <!-- Overlay (mobile) -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/30 z-30 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- ─── Sidebar ────────────────────────────────────── -->
      <aside
        class="fixed lg:sticky h-[calc(100vh-4rem)] lg:h-full z-40 w-64 shrink-0 border-r border-base-300 bg-base-100 flex flex-col transition-transform duration-200"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <!-- Search -->
        <div class="p-3 border-b border-base-300">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/35" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search components..."
              class="input input-sm w-full pl-8 bg-base-200/60 border-base-300 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          <div
            v-for="cat in filteredNav"
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
          55 components · 6 categories
        </div>
      </aside>

      <!-- ─── Content ────────────────────────────────────── -->
      <main class="flex-1 overflow-y-scroll h-full">
        <div class="max-w-3xl mx-auto px-6 py-10">
          <RouterView />
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
.beta-badge {
  position: absolute;
  top: -6px;
  right: -4px;
  font-size: 10px;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.05em;
  line-height: 1;
  color: var(--color-primary);
  text-shadow:
    -1px -1px 0 color-mix(in srgb, var(--color-primary), black 60%),
     1px -1px 0 color-mix(in srgb, var(--color-primary), black 60%),
    -1px  1px 0 color-mix(in srgb, var(--color-primary), black 60%),
     1px  1px 0 color-mix(in srgb, var(--color-primary), black 60%),
     1px  2px 0 color-mix(in srgb, var(--color-primary), black 75%);
  user-select: none;
  pointer-events: none;
}
</style>
