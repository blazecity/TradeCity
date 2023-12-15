import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import moduleGeneration from "./build/modules/plugin-module-generation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    moduleGeneration(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        // manual chunks only working with dynamic imports
        chunkFileNames: "assets/[name]/[name].js",
        manualChunks: id => {
          if (id.includes("src/components/temp/")) {
            return "temp";
          }

          if (id.includes("src/components/ui/")) {
            return "ui";
          }

          return "hel";
        }
      }
    }
  }
})
