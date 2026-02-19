# Liquid Glass UI

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.16-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Storybook](https://img.shields.io/badge/Storybook-8.0-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

以 **Liquid Glass（液態玻璃）** 為視覺主張的 Vue 3 元件庫，同時整合 Schema-Driven Form Engine 與 Table Engine，兼具視覺美學與工程深度。

_A Vue 3 UI component library with **Liquid Glass** aesthetics, featuring a Schema-Driven Form Engine & Table Engine for complex data scenarios._

---

## 展示入口 · Live Demos

| 入口 | 說明 | 連結 |
|------|------|------|
| Landing Page | 品牌首頁 · Brand homepage | [liquid-glass-ui-eta.vercel.app](https://liquid-glass-ui-eta.vercel.app/) |
| Component Docs | VitePress 元件文檔 · VitePress documentation | [liquid-docs.vercel.app](https://liquid-docs.vercel.app/) |
| Storybook | 互動元件展示 · Interactive component explorer | [liquid-storybook.vercel.app](https://liquid-storybook.vercel.app/) |
| Blog Demo | Glass 美學展示 · Visual showcase | [liquid-blog.vercel.app](https://liquid-blog.vercel.app/) |
| Admin Demo | Form & Table Engine 展示 · Engineering showcase | [liquid-admin.vercel.app](https://liquid-admin.vercel.app/) |

---

## 專案架構 · Monorepo Structure

採用 pnpm Workspaces 管理，一個 repository 包含三個可發佈套件與五個獨立應用。

_Managed with pnpm Workspaces — one repository, three publishable packages, five independent apps._

```
liquid-glass-ui/
├── packages/
│   ├── tokens/     # Design Tokens — CSS Variables (colors, spacing, glass params)
│   ├── ui/         # Vue 3 Component Library — 22+ Liquid Glass components
│   └── logic/      # Schema-Driven Form Engine & Table Engine
│
└── apps/
    ├── landing/    # Brand landing page
    ├── docs/       # VitePress component documentation (zh-TW / en)
    ├── storybook/  # Storybook component explorer
    ├── blog/       # Demo: Liquid Glass blog
    └── admin/      # Demo: ATS recruitment admin system
```

---

## 元件總覽 · Components

共 22+ 個元件，依 Glass 效果強度分類。

_22+ components categorized by Glass effect intensity._

### 表單類 · Form

| 元件 | Glass 強度 |
|------|-----------|
| Button | 主秀 Featured |
| Select / Dropdown | 主秀 Featured（浮層 overlay） |
| Input | 適度 Subtle |
| Textarea | 適度 Subtle |
| Checkbox / Radio | 適度 Subtle |
| Toggle | 適度 Subtle |
| DatePicker | 適度 Subtle |

### 資料展示 · Data Display

| 元件 | Glass 強度 |
|------|-----------|
| Badge | 主秀 Featured |
| Table | 收斂 Minimal（可讀性優先） |
| Pagination | 適度 Subtle |
| Avatar | 適度 Subtle |

### 回饋類 · Feedback

| 元件 | Glass 強度 |
|------|-----------|
| Modal | 主秀 Featured（大面積浮層） |
| Toast | 主秀 Featured |
| Tooltip | 主秀 Featured |
| Loading | 適度 Subtle |

### 佈局類 · Layout

| 元件 | Glass 強度 |
|------|-----------|
| Card | 門面元件 Hero component |
| Navbar | 主秀 Featured |
| Tabs | 適度 Subtle |
| Container / Stack | 無 None |

---

## Liquid Glass 實作方案 · Glass Implementation

採三層漸進增強策略，在工程可維護性與視覺品質之間取得平衡。

_Three-layer progressive enhancement — balancing engineering maintainability with visual quality._

| 層級 | 技術 | 適用範圍 |
|------|------|---------|
| 基底 Base | CSS `backdrop-filter` + `rgba` + `box-shadow` | 所有元件 All components |
| 加強 Enhanced | SVG Filter (`feDisplacementMap` 折射 + `feSpecularLighting` 高光) | Card、Modal、Toast、Tooltip 等主秀元件 |
| 實驗 Experimental | WebGL Shader | Landing Page Hero 特效 |

> Safari / Firefox 不支援 SVG `backdrop-filter` 時，自動 fallback 至第一層的純 CSS 毛玻璃效果，無相容性問題。
>
> _Safari / Firefox automatically fallback to the CSS-only layer — no compatibility issues._

---

## 技術棧 · Tech Stack

| 類別 | 工具 |
|------|------|
| Framework | Vue 3.5 + TypeScript 5.9 |
| Build Tool | Vite 5.4 |
| Monorepo | pnpm Workspaces |
| CSS | CSS Variables (Design Tokens) + CSS Modules |
| Documentation | VitePress |
| Component Dev | Storybook 8.0 |
| Deployment | Vercel |

---

## 快速上手 · Getting Started

### 環境需求 · Prerequisites

- Node.js 18+
- pnpm 10+

### 安裝 · Install

```bash
git clone https://github.com/labkunz/liquid-glass-ui.git
cd liquid-glass-ui
pnpm install
```

### 本地開發 · Local Development

```bash
# 啟動 Landing Page
pnpm dev:landing

# 啟動元件文檔 Component Docs
pnpm dev:docs

# 啟動 Storybook
pnpm dev:storybook

# 啟動部落格 Demo
pnpm dev:blog

# 啟動後台管理 Demo
pnpm dev:admin
```

### 建置 · Build

```bash
# 建置所有套件 Build all packages
pnpm build:packages

# 建置所有應用 Build all apps
pnpm build:apps

# 型別檢查 Type check
pnpm typecheck
```

---

## Packages

### `@liquid/tokens`

Design Tokens — 所有元件從這裡取值，不自行硬寫數值。

_Design tokens as CSS Variables — all components reference tokens instead of hardcoded values._

包含基礎 Token（顏色、字體、間距、圓角）與 Glass Token（模糊量、透明度、折射參數）：

```css
:root {
  /* Glass Token */
  --glass-blur: 12px;
  --glass-opacity: 0.15;
  --glass-border-opacity: 0.3;
  --glass-refraction-scale: 20;
}
```

主題切換透過 `data-theme` 屬性，無需 JavaScript 逐一修改元件：

```html
<html data-theme="dark">
```

### `@liquid/ui`

22+ Vue 3 元件，每個元件包含：

- `.vue` — 元件本體
- `.module.css` — Scoped CSS Modules，搭配 Design Tokens
- `index.ts` — TypeScript 型別定義與匯出

使用方式：

```ts
import { Button, Card, Modal } from '@liquid/ui'
import '@liquid/ui/style.css'
```

### `@liquid/logic`

Schema-Driven 的 Form Engine 與 Table Engine，核心邏輯為純 TypeScript（零框架依賴），Vue 整合層提供 `<FormEngine />` 與 `<TableEngine />` 元件。

_Schema-Driven Form Engine & Table Engine. Core logic in pure TypeScript (framework-agnostic); Vue integration layer provides ready-to-use components._

```ts
// Form Engine — 一個 Schema 物件生成完整表單（含驗證、條件顯示）
// One schema object generates a full form with validation and conditional fields
const formSchema = {
  fields: [
    { key: 'title', label: '職位名稱', type: 'input', required: true },
    { key: 'type', label: '工作類型', type: 'select', options: [...] },
    {
      key: 'salary',
      label: '月薪範圍',
      type: 'input',
      condition: { field: 'type', value: '全職' }, // 條件顯示
    },
  ],
}

// Table Engine — 一個 Schema 物件生成可互動表格（排序、篩選、分頁）
// One schema object generates an interactive table with sort, filter, and pagination
const tableSchema = {
  columns: [
    { key: 'name', label: '姓名', sortable: true },
    { key: 'status', label: '審核階段', type: 'badge', filterable: true },
    { key: 'date', label: '應徵日期', sortable: true },
  ],
}
```

---

## Apps

### Blog Demo

以 Liquid Glass 元件庫為基礎建立的技術部落格，展示元件庫在內容型網站的視覺表現。Markdown 文章透過 `unplugin-vue-markdown` 直接 import 為 Vue Component。

_A tech blog built with the component library, showcasing Glass morphism in content-heavy sites. Markdown articles are imported directly as Vue components._

- 文章列表頁：Card + Badge + Pagination + FilterBar
- 文章頁：Code block 複製（Tooltip + Toast）

### Admin Demo（ATS 招募管理系統）

以求職者追蹤系統（ATS）為情境，展示 Form Engine + Table Engine 在真實業務情境的工程深度。

_An Applicant Tracking System (ATS) demo showcasing the engineering depth of Form Engine & Table Engine in real-world business scenarios._

- Dashboard：統計卡片（職缺數、應徵者分佈、審核階段）
- 職缺管理：Table Engine（排序、篩選、分頁） + Form Engine（條件欄位）
- 應徵者管理：Table Engine + Form Engine CRUD 完整流程

---

## License

MIT © [labkunz](https://github.com/labkunz)
