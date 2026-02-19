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
