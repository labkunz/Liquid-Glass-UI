import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';

// 引入 Design Tokens (CSS Variables)
import '@liquid/tokens/colors.css';

// Vue 全域配置（如需要）
setup((app) => {
  // 可以在這裡註冊全域元件或插件
  // 例如：
  // app.use(SomePlugin);
  // app.component('GlobalComponent', GlobalComponent);
});

const preview: Preview = {
  parameters: {
    // 控制預設 layout
    layout: 'centered',

    // Controls addon 配置
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // 背景主題配置
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },

    // Actions addon 配置
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
