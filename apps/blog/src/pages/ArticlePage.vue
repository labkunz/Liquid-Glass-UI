<script setup lang="ts">
import { ref, computed, shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import type { Component } from 'vue'
import { LiquidBadge, LiquidTooltip } from '@liquid/ui'
import BlogNavbar from '../components/BlogNavbar.vue'
import { getArticleBySlug, categoryColors, categoryGradients } from '../data/articles'
import { useToast } from '../composables/useToast'

const route = useRoute()
const router = useRouter()
const { success } = useToast()

const slug = computed(() => route.params.slug as string)
const article = computed(() => getArticleBySlug(slug.value))

// 動態 import .md 為 Vue component
const ArticleContent = shallowRef<Component | null>(null)
const isLoading = ref(true)
const notFound = ref(false)

watchEffect(async () => {
  isLoading.value = true
  notFound.value = false
  ArticleContent.value = null

  try {
    // Vite 會自動分析此 dynamic import 並打包 content/ 下所有 .md
    const mod = await import(`../content/${slug.value}.md`)
    ArticleContent.value = mod.default
  } catch {
    notFound.value = true
  } finally {
    isLoading.value = false
  }
})

// 複製文章連結
function copyArticleLink() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    success('已複製文章連結')
  })
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="article-page">
    <BlogNavbar />

    <main class="article-page__main">
      <!-- Loading -->
      <div v-if="isLoading" class="article-page__loading">
        <div class="article-page__spinner" />
      </div>

      <!-- 404 -->
      <div v-else-if="notFound" class="article-page__not-found container">
        <h1>找不到文章</h1>
        <p>你要找的文章不存在，可能已被移除或連結有誤。</p>
        <RouterLink to="/" class="article-page__back-btn">回到首頁</RouterLink>
      </div>

      <!-- Article -->
      <template v-else-if="article">
        <!-- Hero banner -->
        <div
          class="article-page__hero"
          :class="`article-page__hero--${categoryGradients[article.category]}`"
        >
          <div class="article-page__hero-inner container">
            <RouterLink to="/" class="article-page__back">← 回到文章列表</RouterLink>

            <LiquidBadge
              :color="categoryColors[article.category]"
              variant="glass-css-only"
              size="sm"
            >
              {{ article.category }}
            </LiquidBadge>

            <h1 class="article-page__title">{{ article.title }}</h1>

            <div class="article-page__meta">
              <span>{{ formatDate(article.date) }}</span>
              <span class="article-page__meta-dot">·</span>
              <span>{{ article.readTime }} 分鐘閱讀</span>
            </div>

            <div class="article-page__tags">
              <LiquidBadge
                v-for="tag in article.tags"
                :key="tag"
                variant="glass-css-only"
                shape="rounded"
                size="sm"
              >
                {{ tag }}
              </LiquidBadge>
            </div>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="article-page__toolbar container">
          <LiquidTooltip content="複製文章連結" placement="bottom">
            <button class="article-page__tool-btn" @click="copyArticleLink">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6.5 9.5C6.89 10.04 7.39 10.49 7.97 10.82C8.55 11.15 9.19 11.34 9.85 11.37C10.51 11.4 11.17 11.27 11.77 10.99C12.37 10.71 12.89 10.29 13.29 9.77L14.79 7.77C15.49 6.86 15.82 5.72 15.71 4.58C15.6 3.44 15.06 2.38 14.2 1.62C13.34 0.85 12.22 0.44 11.07 0.46C9.92 0.48 8.82 0.93 7.99 1.73L7.25 2.47"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                />
                <path
                  d="M9.5 6.5C9.11 5.96 8.61 5.51 8.03 5.18C7.45 4.85 6.81 4.66 6.15 4.63C5.49 4.6 4.83 4.73 4.23 5.01C3.63 5.29 3.11 5.71 2.71 6.23L1.21 8.23C0.51 9.14 0.18 10.28 0.29 11.42C0.4 12.56 0.94 13.62 1.8 14.38C2.66 15.15 3.78 15.56 4.93 15.54C6.08 15.52 7.18 15.07 8.01 14.27L8.74 13.53"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                />
              </svg>
              複製連結
            </button>
          </LiquidTooltip>
        </div>

        <!-- Article content（實底背景，保持高可讀性） -->
        <div class="article-page__content-wrap container">
          <article class="article-page__content prose">
            <component :is="ArticleContent" />
          </article>
        </div>

        <!-- Footer nav -->
        <div class="article-page__footer-nav container">
          <RouterLink to="/" class="article-page__back-btn">← 回到文章列表</RouterLink>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
.article-page {
  min-height: 100vh;
  background: #f8f9fc;
}

.article-page__main {
  padding-top: 60px; /* navbar height */
}

/* ---- Loading ---- */
.article-page__loading {
  display: flex;
  justify-content: center;
  padding: 6rem 0;
}

.article-page__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(124, 58, 237, 0.2);
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---- 404 ---- */
.article-page__not-found {
  padding: 6rem 1.5rem;
  text-align: center;
}

.article-page__not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.article-page__not-found p {
  color: #6b7280;
  margin-bottom: 2rem;
}

/* ---- Hero ---- */
.article-page__hero {
  padding: 3rem 0 2rem;
}

.article-page__hero--gradient-design {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
}

.article-page__hero--gradient-frontend {
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
}

.article-page__hero--gradient-ai {
  background: linear-gradient(135deg, #059669 0%, #06b6d4 100%);
}

.article-page__hero--gradient-backend {
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

.article-page__hero-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.article-page__back {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.article-page__back:hover {
  color: #ffffff;
}

.article-page__title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.3;
}

.article-page__meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.75);
  align-items: center;
}

.article-page__meta-dot {
  opacity: 0.5;
}

.article-page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

/* .article-page__tag → 已由 LiquidBadge variant="glass-css-only" shape="rounded" 接管 */

/* ---- Toolbar ---- */
.article-page__toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: #f8f9fc;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.article-page__tool-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.35rem 0.75rem;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  font-size: 0.8rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}

.article-page__tool-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #374151;
}

/* ---- Content（實底背景，不套 Glass） ---- */
.article-page__content-wrap {
  padding: 2.5rem 1.5rem 3rem;
  max-width: 760px;
}

.article-page__content {
  background: #ffffff;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
}

/* ---- Prose 文章排版 ---- */
.prose :deep(h1) { font-size: 1.75rem; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb; }
.prose :deep(h2) { font-size: 1.35rem; margin: 2rem 0 0.75rem; color: #1a1a2e; }
.prose :deep(h3) { font-size: 1.1rem; margin: 1.5rem 0 0.5rem; color: #374151; }
.prose :deep(p) { margin: 1rem 0; color: #374151; line-height: 1.75; }
.prose :deep(ul), .prose :deep(ol) { margin: 1rem 0; padding-left: 1.5rem; color: #374151; }
.prose :deep(li) { margin: 0.35rem 0; line-height: 1.7; }
.prose :deep(strong) { font-weight: 700; color: #1a1a2e; }
.prose :deep(em) { font-style: italic; color: #6b7280; }
.prose :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background: #f8f9fc;
  border-left: 4px solid #7c3aed;
  border-radius: 0 8px 8px 0;
  color: #6b7280;
  font-style: italic;
}
.prose :deep(hr) { margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb; }
.prose :deep(table) { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
.prose :deep(th) { padding: 0.6rem 0.75rem; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: 600; text-align: left; }
.prose :deep(td) { padding: 0.6rem 0.75rem; border: 1px solid #e5e7eb; }
.prose :deep(a) { color: #7c3aed; }
.prose :deep(a:hover) { color: #5b21b6; }

/* ---- Footer Nav ---- */
.article-page__footer-nav {
  display: flex;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.article-page__back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.6rem 1.25rem;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #7c3aed;
  text-decoration: none;
  transition: all 0.15s;
}

.article-page__back-btn:hover {
  background: rgba(124, 58, 237, 0.15);
  text-decoration: none;
}
</style>
