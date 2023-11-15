import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', './playground/**/*.*', './playground-temp/**/*.*'],
    testTimeout: 20000,
  },
})
