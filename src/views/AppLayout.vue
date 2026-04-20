<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink, RouterView } from 'vue-router'
import { DuButton, DuModal, DuNavbar, DuSearch } from 'daisyui-vue-kit'
import { docsNav, docsRegistry } from '@/data/docs/registry'

const route = useRoute()
const router = useRouter()

const isDocsRoute = computed(() => route.path.startsWith('/docs'))

// Sidebar state — provided to DocsLayout
const sidebarOpen = ref(false)
provide('sidebarOpen', sidebarOpen)

// Search modal
const searchOpen = ref(false)
const searchItems = docsNav.flatMap(cat =>
  cat.items.map(item => ({
    id: item.path,
    name: item.label,
    category: cat.category,
    description: docsRegistry[item.path]?.description ?? '',
  }))
)
const navSearch = ref<{ id: string; name: string } | null>(null)

watch(navSearch, (val) => {
  if (val?.id) {
    router.push(val.id)
    searchOpen.value = false
    nextTick(() => { navSearch.value = null })
  }
})

function openSearch() {
  searchOpen.value = true
  setTimeout(() => {
    (document.getElementById('modal-search') as HTMLInputElement)?.focus()
  }, 300)
}

function closeSearch() {
  searchOpen.value = false
  navSearch.value = null
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value ? closeSearch() : openSearch()
  }
  if (e.key === 'Escape' && searchOpen.value) {
    closeSearch()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="h-dvh flex flex-col bg-base-100 text-base-content">

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
        <!-- Fake search button -->
        <div class="hidden md:flex flex-1 px-6">
          <button
            class="flex items-center gap-2 w-full max-w-sm px-3 py-1.5 rounded-lg bg-base-200/60 border border-base-300 text-sm text-base-content/40 hover:border-base-content/20 hover:bg-base-200 transition-colors cursor-pointer"
            @click="openSearch"
          >
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span class="flex-1 text-left">Search components & guides...</span>
            <kbd class="hidden lg:inline-flex items-center gap-0.5 text-xs font-mono bg-base-100 border border-base-300 rounded px-1.5 py-0.5 text-base-content/30">Ctrl K</kbd>
          </button>
        </div>
        <!-- Mobile search icon -->
        <button class="md:hidden p-1.5 rounded-lg hover:bg-base-200 transition-colors cursor-pointer" @click="openSearch">
          <svg class="w-5 h-5 text-base-content/50" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
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

    <!-- ─── Search modal ──────────────────────────────── -->
    <DuModal v-model:open="searchOpen" placement="top" closeOnEscape classBox="overflow-visible" customClass="w-full max-w-lg">
      <!-- Détourne l'auto-focus du dialog loin du DuSearch -->
      <span tabindex="0" autofocus class="sr-only" />
      <div class="flex items-center gap-3">
        <svg class="w-4 h-4 shrink-0 text-base-content/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <DuSearch
          v-model="navSearch"
          name="modal-search"
          id="modal-search"
          placeholder="Search components & guides..."
          :listValues="searchItems"
          :limit="10"
          ghost
          class="w-full"
          customClass="border-none shadow-none focus:outline-none text-sm"
        >
          <template #option="{ option }">
            <div class="flex flex-col gap-0.5 w-full py-0.5">
              <div class="flex items-center justify-between gap-2">
                <span class="font-medium text-sm">{{ option.name }}</span>
                <span class="text-xs text-base-content/35 shrink-0 font-mono">{{ (option as any).category }}</span>
              </div>
              <p v-if="(option as any).description" class="text-xs text-base-content/45 truncate">
                {{ (option as any).description }}
              </p>
            </div>
          </template>
        </DuSearch>
        <button class="shrink-0 text-xs text-base-content/30 hover:text-base-content/60 transition-colors cursor-pointer" @click="closeSearch">
          Esc
        </button>
      </div>
    </DuModal>

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
