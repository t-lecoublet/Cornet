<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ code: string }>()

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="relative group/code">
    <pre class="bg-base-200 border border-base-300 rounded-xl px-5 py-3.5 text-sm font-mono text-base-content overflow-x-auto">{{ code }}</pre>
    <button
      class="absolute top-2.5 right-2.5 p-1.5 rounded-lg transition-all opacity-0 group-hover/code:opacity-100 focus:opacity-100 cursor-pointer"
      :class="copied
        ? 'bg-success/15 text-success'
        : 'bg-base-300/60 text-base-content/50 hover:bg-base-300 hover:text-base-content'"
      :aria-label="copied ? 'Copied!' : 'Copy code'"
      @click="copy(code)"
    >
      <!-- Clipboard icon -->
      <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
      </svg>
      <!-- Check icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </button>
  </div>
</template>
