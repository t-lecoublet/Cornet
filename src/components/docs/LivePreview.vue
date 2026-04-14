<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { createApp, type App } from 'vue'
import * as CornetComponents from 'daisyui-vue-kit'

const props = defineProps<{ code: string }>()

const container = ref<HTMLElement>()
let app: App | null = null

function mount() {
  if (app) {
    app.unmount()
    app = null
  }
  if (!container.value) return

  app = createApp({
    template: `<div class="flex items-center justify-center flex-wrap gap-3 min-h-20 w-full">${props.code}</div>`,
  })

  for (const [name, component] of Object.entries(CornetComponents)) {
    if (name.startsWith('Du') && component && typeof component === 'object') {
      app.component(name, component as any)
    }
  }

  app.mount(container.value)
}

onMounted(mount)
watch(() => props.code, mount)
onBeforeUnmount(() => {
  app?.unmount()
  app = null
})
</script>

<template>
  <div ref="container" />
</template>
