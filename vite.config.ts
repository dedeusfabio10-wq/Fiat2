import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true
  },

  build: {
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
        output: {
            manualChunks(id) {
                // Separate vendor libs
                if (id.includes('node_modules')) {
                    if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                        return 'vendor';
                    }
                    if (id.includes('lucide-react') || id.includes('sonner') || id.includes('@supabase')) {
                        return 'ui';
                    }
                    return 'deps'; // other dependencies
                }
                
                // Separate heavy data file
                if (id.includes('constants.ts')) {
                    return 'data';
                }
            }
        }
    }
  }
})