import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:5174',
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts') || id.includes('victory-vendor') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            return 'vendor-core';
          }
          if (
            id.includes('/data/massiveReactionsData') ||
            id.includes('/data/elementsAnimeData') ||
            id.includes('/data/massivePhysicsData')
          ) {
            return 'science-databases';
          }
          if (id.includes('/mockTestData')) {
            return 'mock-tests-data';
          }
        },
      },
    },
  },
});
