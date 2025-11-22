
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
        output: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                        return 'vendor';
                    }
                    if (id.includes('lucide-react') || id.includes('sonner')) {
                        return 'ui';
                    }
                    return 'deps'; // Other dependencies
                }
                if (id.includes('constants.ts')) {
                    return 'data'; // Separate large data file
                }
            }
        }
    }
  }
})
