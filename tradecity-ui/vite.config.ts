import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        babelParserPlugins: ["explicitResourceManagement"]
      }
    }),
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
      }
    }
  },
  server: {
    proxy: {
      "/graphql": "http://localhost:5246"
    }
  }
})
