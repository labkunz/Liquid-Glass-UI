import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const config: StorybookConfig = {
  // Stories 檔案位置
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  // Storybook Addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  // Framework 配置
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // 使用 vue-component-meta（Vue 官方推薦的 docgen 工具）
      docgen: 'vue-component-meta',
    },
  },

  // 自訂 Vite 配置
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          // 設定別名以正確解析 workspace dependencies
          '@liquid/ui': path.resolve(__dirname, '../../../packages/ui/src'),
          '@liquid/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
        },
      },
      css: {
        modules: {
          // 與 packages/ui/vite.config.ts 保持一致，確保 CSS Module key 格式相同
          localsConvention: 'camelCase',
        },
      },
    });
  },

  // TypeScript 配置
  typescript: {
    check: false, // 可選：在 Storybook 建置時跳過型別檢查以加快速度
  },

  docs: {
    autodocs: 'tag', // 當 story 包含 'autodocs' tag 時自動生成文件
  },
};

export default config;
