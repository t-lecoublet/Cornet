<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getHighlighter } from '@/composables/useShiki'

const props = defineProps<{
  code: string
  lang?: string
}>()

const highlighted = ref('')

async function highlight() {
  const hl = await getHighlighter()
  highlighted.value = hl.codeToHtml(props.code.trim(), {
    lang: props.lang ?? 'vue',
    theme: 'solarized-light',
  })
}

onMounted(highlight)
watch(() => props.code, highlight)
</script>

<template>
  <div class="shiki-wrap" v-html="highlighted" />
</template>

<style>
.shiki-wrap pre {
  padding: 1.25rem 1.5rem;
  font-size: 0.8125rem;
  line-height: 1.7;
  overflow-x: auto;
  background: transparent !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.shiki-wrap code, .shiki-wrap .shiki {
  background: transparent !important;
}

</style>
