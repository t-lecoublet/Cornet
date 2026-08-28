import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
      // `core/` is the only code with no styling to look at and no story to
      // click through: if it is not covered by tests, it is not covered at all.
      // The facades are held to a behavioural bar instead (see
      // docs/architecture.md §10), which line coverage measures badly.
      include: ['components/core/**/*.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
      },
    },
  },
})
