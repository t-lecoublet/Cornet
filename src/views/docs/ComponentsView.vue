<script setup lang="ts">
/**
 * All Components — a gallery of every documented component, one live miniature
 * each, linking to its page.
 *
 * It iterates `docsNav`, not the preview map, so a newly documented component
 * appears here the moment it is added to the navigation. If it has no snippet
 * yet the cell says so, which is a visible reminder rather than a silent gap.
 */
import { computed } from 'vue'
import { docsNav, docsCounts } from '@/data/docs/nav'
import { componentGallery } from '@/data/component-gallery'
import { levelByPath, LEVEL_GUIDANCE, LEVEL_ICON, LEVEL_ORDER, LEVEL_STYLE } from '@/data/component-levels'
import GalleryCard from '@/components/docs/GalleryCard.vue'

const categories = computed(() =>
  docsNav
    .filter((cat) => cat.category !== 'Guides')
    .map((cat) => ({
      ...cat,
      items: cat.items.map((item) => ({
        ...item,
        code: componentGallery[item.path],
        level: levelByPath[item.path],
      })),
    })),
)

/** Anchor for the jump links, derived so the two can never disagree. */
const slug = (category: string) => category.toLowerCase().replace(/\s+/g, '-')
</script>

<template>
  <div class="component-gallery">
    <header class="mb-10">
      <h1 class="text-3xl font-black mb-2">All Components</h1>
      <p class="text-base-content/60">
        Every one of the {{ docsCounts.components }} documented components, at a glance.
        Each tile is the real component rendering live — pick one to open its page.
      </p>

      <!-- Jump links: the page is long, and the sidebar lists pages, not sections. -->
      <nav class="flex flex-wrap gap-2 mt-5" aria-label="Jump to a category">
        <a
          v-for="cat in categories"
          :key="cat.category"
          :href="`#${slug(cat.category)}`"
          class="px-2.5 py-1 rounded-lg text-xs font-medium bg-base-200 text-base-content/60 hover:bg-base-300 hover:text-base-content transition-colors"
        >
          {{ cat.category }}
          <span class="text-base-content/35">{{ cat.items.length }}</span>
        </a>
      </nav>

      <!-- Same badges as the sidebar tags, decoded once here. -->
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-4 text-xs text-base-content/45">
        <RouterLink
          v-for="level in LEVEL_ORDER"
          :key="level"
          to="/docs/guides/when-to-use"
          class="flex items-center gap-1 px-1.5 py-0.5 rounded-full font-semibold tracking-tight transition-opacity hover:opacity-80"
          :class="LEVEL_STYLE[level]"
          :title="LEVEL_GUIDANCE[level]"
        >
          <svg class="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" :d="LEVEL_ICON[level]" />
          </svg>
          {{ level }}
        </RouterLink>
        <span>— what a tile costs you, and what it buys.</span>
      </div>
    </header>

    <section
      v-for="cat in categories"
      :key="cat.category"
      :id="slug(cat.category)"
      class="mb-12 scroll-mt-6"
    >
      <h2 class="text-xs font-bold uppercase tracking-widest text-base-content/35 mb-4">
        {{ cat.category }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <GalleryCard
          v-for="item in cat.items"
          :key="item.path"
          :label="item.label"
          :path="item.path"
          :code="item.code"
          :level="item.level"
        />
      </div>
    </section>
  </div>
</template>

<!--
  Unscoped on purpose: every tile is a runtime-compiled template, so it never
  carries the `data-v-` attribute a scoped style would look for. Both rules are
  namespaced under `.component-gallery` so nothing leaks past this page.
-->
<style>
/*
  daisyUI opens a FAB on `:focus-within`. A tile is `pointer-events: none`, so
  nothing in it can take focus and the actions would stay hidden — these two
  rules are the open state, stated directly.
*/
.component-gallery .gallery-fab-open .fab > :nth-child(n + 2) {
  visibility: visible;
  scale: 1;
  opacity: 1;
}

.component-gallery .gallery-fab-open .fab:has(.fab-main-action) > [tabindex]:first-child {
  opacity: 0;
  rotate: 90deg;
}
</style>
