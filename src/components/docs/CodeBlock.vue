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
  const lang = props.lang ?? 'vue'
  let code = props.code.trim()
  let wrapFragment = false

  if (lang === 'vue' && !code.startsWith('<template') && !code.includes('<script') && !code.includes('<style')) {
    wrapFragment = true
    code = `<template>\n${code}\n</template>`
  }

  let html = hl.codeToHtml(code, { lang, theme: 'solarized-light' })

  if (wrapFragment) {
    html = html.replace(/(<code>)([\s\S]*?)(<\/code>)/, (_, open, content, close) => {
      const lines = content.split('\n').filter((l: string) => l !== '')
      return open + '\n' + lines.slice(1, -1).join('\n') + '\n' + close
    })
  }

  highlighted.value = html
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
