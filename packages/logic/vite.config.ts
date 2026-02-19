import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: false
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      name: 'LiquidLogic',
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
