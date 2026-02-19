import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@liquid/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@liquid/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      '@liquid/logic': path.resolve(__dirname, '../../packages/logic/src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3002,
    open: true,
  },
})
