// ============================================================
// Blog 文章 Metadata Registry
// ============================================================

export type Category = 'Design' | 'Frontend' | 'AI Tools' | 'Backend'

export interface ArticleMeta {
  slug: string
  title: string
  date: string
  category: Category
  tags: string[]
  excerpt: string
  readTime: number
  coverGradient: Category
}

export const articles: ArticleMeta[] = [
  // ---- Design (3) ----
  {
    slug: 'liquid-glass-css-guide',
    title: '用 CSS 重現液態玻璃折射效果',
    date: '2025-02-15',
    category: 'Design',
    tags: ['CSS', 'Glass Morphism', 'backdrop-filter'],
    excerpt:
      '液態玻璃效果風靡 2025 年。這篇文章深入探討 CSS backdrop-filter、SVG feTurbulence 與 feDisplacementMap，一步步重現折射、模糊與高光效果。',
    readTime: 8,
    coverGradient: 'Design',
  },
  {
    slug: 'design-token-architecture',
    title: '設計 Token 架構：從概念到 CSS Variables',
    date: '2025-02-08',
    category: 'Design',
    tags: ['Design Tokens', 'CSS Variables', 'Design System'],
    excerpt:
      '設計 Token 是設計系統的基石，但如何組織它們才能兼顧擴展性與維護性？本文介紹分層 Token 架構——從 Primitive 到 Semantic 到 Component 層的完整設計思路。',
    readTime: 6,
    coverGradient: 'Design',
  },
  {
    slug: 'glass-morphism-ux-principles',
    title: 'Glass Morphism 設計原則：克制才是力量',
    date: '2025-01-28',
    category: 'Design',
    tags: ['Glass Morphism', 'UX', 'Accessibility'],
    excerpt:
      '玻璃態效果很美，但用錯地方會讓可讀性崩潰。這篇文章討論何時該用 Glass、何時該用實底，並整理了六個核心設計判斷原則。',
    readTime: 5,
    coverGradient: 'Design',
  },

  // ---- Frontend (3) ----
  {
    slug: 'vue3-composables-deep-dive',
    title: 'Vue 3 Composables 深度解析：從 useXxx 到模式',
    date: '2025-02-12',
    category: 'Frontend',
    tags: ['Vue 3', 'Composables', 'TypeScript'],
    excerpt:
      'Composables 是 Vue 3 最強大的抽象工具。這篇文章從設計原則出發，探討何時抽 composable、如何處理副作用清理，以及常見的 useXxx 模式整理。',
    readTime: 9,
    coverGradient: 'Frontend',
  },
  {
    slug: 'typescript-advanced-types',
    title: 'TypeScript 進階型別技巧：工具型別的實戰應用',
    date: '2025-02-03',
    category: 'Frontend',
    tags: ['TypeScript', 'Generic', 'Utility Types'],
    excerpt:
      'Partial、Required、Pick、Omit 只是開始。這篇文章介紹 Conditional Types、Infer、Template Literal Types，以及如何用它們建構強健的 API 型別。',
    readTime: 11,
    coverGradient: 'Frontend',
  },
  {
    slug: 'vite-monorepo-setup',
    title: 'Vite Monorepo 實戰：pnpm Workspace 從零設定',
    date: '2025-01-20',
    category: 'Frontend',
    tags: ['Vite', 'Monorepo', 'pnpm', 'Workspace'],
    excerpt:
      '用 pnpm workspace 管理多個套件是現代前端工程的標配。本文介紹 Vite library 模式、TypeScript Project References 的設定細節，以及常見的 workspace 陷阱。',
    readTime: 10,
    coverGradient: 'Frontend',
  },

  // ---- AI Tools (2) ----
  {
    slug: 'claude-code-workflow',
    title: 'Claude Code 開發工作流：讓 AI 寫 Boilerplate，自己把關品質',
    date: '2025-02-10',
    category: 'AI Tools',
    tags: ['Claude Code', 'AI', 'Workflow', 'Productivity'],
    excerpt:
      '用 Claude Code 開發 UI 元件庫的實際心得。重點不是「讓 AI 全部寫完」，而是明確分工——AI 負責重複性結構，人負責設計決策與邊界案例。',
    readTime: 7,
    coverGradient: 'AI Tools',
  },
  {
    slug: 'prompt-engineering-for-dev',
    title: 'Prompt Engineering 實戰：給工程師的提示詞技巧',
    date: '2025-01-25',
    category: 'AI Tools',
    tags: ['Prompt Engineering', 'LLM', 'Claude', 'GPT'],
    excerpt:
      'Chain-of-Thought、Few-Shot、角色設定——這些技巧在實際開發場景怎麼用？整理了 10 個讓 AI 寫出更精確程式碼的提示詞模式。',
    readTime: 8,
    coverGradient: 'AI Tools',
  },

  // ---- Backend (2) ----
  {
    slug: 'rest-api-design-principles',
    title: 'REST API 設計原則：讓 API 說出好故事',
    date: '2025-02-05',
    category: 'Backend',
    tags: ['REST', 'API Design', 'HTTP'],
    excerpt:
      '好的 API 設計像一本清晰的書：命名直覺、狀態碼準確、錯誤訊息有意義。這篇整理了 RESTful API 設計的七個核心原則和常見反模式。',
    readTime: 7,
    coverGradient: 'Backend',
  },
  {
    slug: 'postgresql-query-optimization',
    title: 'PostgreSQL 查詢最佳化：從 EXPLAIN 看見慢查詢根因',
    date: '2025-01-18',
    category: 'Backend',
    tags: ['PostgreSQL', 'Database', 'Query', 'Index'],
    excerpt:
      'EXPLAIN ANALYZE 是找慢查詢的最佳工具，但看懂輸出需要練習。這篇文章從真實慢查詢案例出發，帶你讀懂執行計畫、決定何時加 Index。',
    readTime: 10,
    coverGradient: 'Backend',
  },
]

// 工具函式
export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  return articles.filter((a) => a.category === category)
}

// Category 對應的 gradient CSS class
export const categoryGradients: Record<Category, string> = {
  Design: 'gradient-design',
  Frontend: 'gradient-frontend',
  'AI Tools': 'gradient-ai',
  Backend: 'gradient-backend',
}

// Category 對應的 badge color
export const categoryColors: Record<Category, 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'> = {
  Design: 'info',
  Frontend: 'primary',
  'AI Tools': 'success',
  Backend: 'warning',
}
