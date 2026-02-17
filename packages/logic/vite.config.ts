import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['core', 'vue'],
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'core/index.ts'),
        vue: resolve(__dirname, 'vue/index.ts')
      },
      name: 'LiquidEngine',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', '@liquid/ui'],
      output: {
        globals: {
          vue: 'Vue',
          '@liquid/ui': 'LiquidUI'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
