import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1600, // evita warnings de bundle grande na Vercel
  }
})