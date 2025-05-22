import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import vueDaisyUI from 'daisyui-vue-kit/plugin-vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueDaisyUI({
      showOutput: false
    }),
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
