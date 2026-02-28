<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { LiquidCard, LiquidBadge, LiquidPagination, LiquidFilterBar } from '@liquid/ui'
import BlogNavbar from '../components/BlogNavbar.vue'
import {
  articles,
  categoryGradients,
  categoryColors,
  type Category,
} from '../data/articles'

const PAGE_SIZE = 6

const selectedCategory = ref<Category | 'All'>('All')
const currentPage = ref(1)

const categories: Array<Category | 'All'> = [
  'All', 'Design', 'Frontend', 'AI Tools', 'Backend',
]

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'All') return articles
  return articles.filter((a) => a.category === selectedCategory.value)
})

const totalPages = computed(() =>
  Math.ceil(filteredArticles.value.length / PAGE_SIZE)
)

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredArticles.value.slice(start, start + PAGE_SIZE)
})

function selectCategory(cat: Category | 'All') {
  selectedCategory.value = cat
  currentPage.value = 1
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
  <div class="home-page">
    <BlogNavbar />

    <main class="home-page__main">
      <!-- Hero -->
      <section class="home-page__hero container">
        <h1 class="home-page__title">
          Liquid Glass Blog
        </h1>
        <p class="home-page__subtitle">
          設計、前端、AI 工具、後端學習筆記，以 Liquid Glass 為美學主張
        </p>
      </section>

      <!-- Category Filter -->
      <section class="home-page__filter container">
        <LiquidFilterBar
          :options="categories.map(cat => ({ label: cat === 'All' ? '全部' : cat, value: cat }))"
          :model-value="selectedCategory"
          variant="glass-light"
          @update:model-value="selectCategory($event as Category | 'All')"
        />
      </section>

      <!-- Article Grid -->
      <section class="home-page__grid container">
        <RouterLink
          v-for="article in pagedArticles"
          :key="article.slug"
          :to="`/${article.slug}`"
          class="home-page__card-link"
        >
          <LiquidCard
            variant="glass-css-only"
            padding="none"
            class="home-page__card"
          >
            <!-- Cover gradient -->
            <div
              class="home-page__card-cover"
              :class="`home-page__card-cover--${categoryGradients[article.category]}`"
            >
              <LiquidBadge
                :color="categoryColors[article.category]"
                variant="glass-css-only"
                size="sm"
              >
                {{ article.category }}
              </LiquidBadge>
            </div>

            <!-- Card content -->
            <div class="home-page__card-body">
              <h2 class="home-page__card-title">
                {{ article.title }}
              </h2>
              <p class="home-page__card-excerpt">
                {{ article.excerpt }}
              </p>

              <div class="home-page__card-meta">
                <span class="home-page__card-date">{{ formatDate(article.date) }}</span>
                <span class="home-page__card-read-time">{{ article.readTime }} 分鐘閱讀</span>
              </div>

              <!-- Tags -->
              <div class="home-page__card-tags">
                <LiquidBadge
                  v-for="tag in article.tags.slice(0, 3)"
                  :key="tag"
                  color="default"
                  shape="rounded"
                  size="sm"
                >
                  {{ tag }}
                </LiquidBadge>
              </div>
            </div>
          </LiquidCard>
        </RouterLink>

        <!-- Empty state -->
        <div
          v-if="pagedArticles.length === 0"
          class="home-page__empty"
        >
          此分類暫無文章
        </div>
      </section>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="home-page__pagination container"
      >
        <LiquidPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          variant="glass-light"
          @update:current-page="currentPage = $event"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="home-page__footer container">
      <p>© 2025 Liquid Glass Blog · Built with Liquid UI Library</p>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ---- Main ---- */
.home-page__main {
  flex: 1;
  padding-top: 80px; /* navbar height */
}

/* ---- Hero ---- */
.home-page__hero {
  padding: 4rem 1.5rem 2rem;
  text-align: center;
}

.home-page__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.home-page__subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ---- Category Filter ---- */
.home-page__filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 1.5rem 2rem;
  justify-content: center;
}

/* ---- Grid ---- */
.home-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1.5rem 2rem;
}

.home-page__card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s;
}

.home-page__card-link:hover {
  transform: translateY(-4px);
}

.home-page__card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ---- Card Cover ---- */
.home-page__card-cover {
  height: 140px;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  position: relative;
}

.home-page__card-cover--gradient-design {
  background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
}

.home-page__card-cover--gradient-frontend {
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
}

.home-page__card-cover--gradient-ai {
  background: linear-gradient(135deg, #059669 0%, #06b6d4 100%);
}

.home-page__card-cover--gradient-backend {
  background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
}

/* ---- Card Body ---- */
.home-page__card-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.home-page__card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.4;
  height: 2.8rem; /* font-size(1rem) × line-height(1.4) × 2 行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-page__card-excerpt {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.home-page__card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #9ca3af;
}

.home-page__card-tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.375rem;
  overflow: hidden;
}

/* .home-page__card-tag → 已由 LiquidBadge color="default" shape="rounded" 接管 */

/* ---- Empty ---- */
.home-page__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
}

/* ---- Pagination ---- */
.home-page__pagination {
  display: flex;
  justify-content: center;
  padding: 1rem 1.5rem 3rem;
}

/* ---- Footer ---- */
.home-page__footer {
  padding: 2rem 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
