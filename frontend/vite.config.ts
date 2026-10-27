import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The Three.js scene chunk is large by nature but lazy-loaded after first paint.
    chunkSizeWarningLimit: 1100,
  },
  server: {
    port: 5173,
    // Forward API calls to the local FastAPI server during development.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
