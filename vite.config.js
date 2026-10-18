import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps the built site portable (works from any static path).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
