<script setup lang="ts">
import { computed, nextTick, provide, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import { DuButton, DuNavbar, DuSearch } from 'daisyui-vue-kit'
import { docsNav } from '@/data/docs/registry'

const route = useRoute()
const router = useRouter()

const isDocsRoute = computed(() => route.path.startsWith('/docs'))

// Sidebar state — injected by DocsLayout
const sidebarOpen = ref(false)
provide('sidebarOpen', sidebarOpen)

// Search
const searchItems = docsNav.flatMap(cat =>
  cat.items.map(item => ({ id: item.path, name: item.label, category: cat.category }))
)
const navSearch = ref<{ id: string; name: string } | null>(null)
watch(navSearch, (val) => {
  if (val?.id) {
    router.push(val.id)
    nextTick(() => { navSearch.value = null })
  }
})
</script>

<template>
  <div class="h-screen flex flex-col bg-base-100 text-base-content">

    <!-- ─── Navbar ──────────────────────────────────────── -->
    <DuNavbar class="sticky top-0 z-50 shadow-none! bg-base-100/80 backdrop-blur border-b-2 border-base-300 shrink-0">
      <template #start>
        <div class="flex items-center gap-3 px-2">
          <button
            v-if="isDocsRoute"
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
          <span v-if="isDocsRoute" class="hidden sm:inline text-xs font-mono text-base-content/30 border border-base-300 rounded-md px-2 py-0.5">docs</span>
        </div>
      </template>

      <template #center>
        <div class="hidden md:flex flex-1 px-6">
          <DuSearch
            v-model="navSearch"
            name="docs-search"
            id="docs-search"
            placeholder="Search components & guides..."
            :listValues="searchItems"
            :limit="8"
            size="sm"
            customClass="w-full bg-base-200/60 border-base-300 focus:outline-none focus:border-primary/50"
          >
            <template #option="{ option }">
              <div class="flex items-center justify-between w-full gap-2">
                <span>{{ option.name }}</span>
                <span class="text-xs text-base-content/35">{{ (option as any).category }}</span>
              </div>
            </template>
          </DuSearch>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2 px-2">
          <DuButton variant="neutral" size="sm" outline as="a" href="https://gitlab.limos.fr/hub-isima/daisyui-vue-kit" target="_blank">
            GitLab
          </DuButton>
        </div>
      </template>
    </DuNavbar>

    <!-- ─── Page content ──────────────────────────────── -->
    <div :class="isDocsRoute ? 'flex-1 overflow-hidden flex flex-col' : 'flex-1 overflow-y-auto'">
      <RouterView />
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
