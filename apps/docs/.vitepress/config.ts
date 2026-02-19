import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
  title: 'Liquid Glass UI',
  description: 'A Vue 3 component library with Liquid Glass design aesthetics — featuring schema-driven Form & Table Engines for real-world engineering depth.',

  vite: {
    resolve: {
      alias: {
        '@liquid/ui': path.resolve(__dirname, '../../../packages/ui/src'),
        '@liquid/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    'zh-TW': {
      label: '繁體中文',
      lang: 'zh-TW',
      title: 'Liquid Glass UI',
      description: 'Vue 3 元件庫，融合 Liquid Glass 設計美學，並以 Schema 驅動的表單與資料表引擎展現工程深度。',
      themeConfig: {
        nav: [
          { text: '首頁', link: '/zh-TW/' },
          { text: '指南', link: '/zh-TW/guide/getting-started' },
          { text: '元件', link: '/zh-TW/components/button' },
        ],
        sidebar: {
          '/zh-TW/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速開始', link: '/zh-TW/guide/getting-started' },
              ],
            },
          ],
          '/zh-TW/components/': [
            {
              text: '元件',
              items: [
                { text: 'Button 按鈕', link: '/zh-TW/components/button' },
                { text: 'Card 卡片', link: '/zh-TW/components/card' },
                { text: 'Badge 標籤', link: '/zh-TW/components/badge' },
                { text: 'Modal 對話框', link: '/zh-TW/components/modal' },
                { text: 'Navbar 導覽列', link: '/zh-TW/components/navbar' },
                { text: 'Toast 通知', link: '/zh-TW/components/toast' },
              ],
            },
          ],
        },
      },
    },
  },

  themeConfig: {
    logo: '⬡',
    siteTitle: 'Liquid Glass UI',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Card', link: '/components/card' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Navbar', link: '/components/navbar' },
            { text: 'Toast', link: '/components/toast' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/placeholder/liquid-ui' },
    ],

    footer: {
      message: 'Built with Vue 3 + Liquid Glass',
      copyright: 'Copyright © 2025',
    },
  },
})
