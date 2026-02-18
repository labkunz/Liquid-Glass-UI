import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { createHighlighter } from 'shiki'

export default defineConfig(async () => {
  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: [
      'javascript', 'typescript', 'vue', 'html', 'css',
      'bash', 'json', 'sql', 'markdown', 'python', 'text',
    ],
  })

  return {
    base: process.env.NODE_ENV === 'production' ? '/blog' : '/',
    plugins: [
      Markdown({
        markdownItSetup(md) {
          md.options.highlight = (code, lang) => {
            try {
              const loaded = highlighter.getLoadedLanguages()
              const validLang = loaded.includes(lang as never) ? lang : 'text'
              return highlighter.codeToHtml(code, {
                lang: validLang,
                theme: 'github-light',
              })
            } catch {
              return ''
            }
          }
        },
      }),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
    ],
    resolve: {
      alias: {
        '@liquid/ui': path.resolve(__dirname, '../../packages/ui/src'),
        '@liquid/tokens': path.resolve(__dirname, '../../packages/tokens/src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
    server: {
      port: 3001,
      open: true,
    },
  }
})
