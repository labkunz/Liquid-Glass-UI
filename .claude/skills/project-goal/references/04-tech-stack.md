# 04 - 技術棧

## 核心技術

| 類別 | 選擇 | 備註 |
|------|------|------|
| 框架 | Vue 3 + TypeScript | 熟悉度高 |
| 建構工具 | Vite | 快速開發、現代化工具鏈 |
| Monorepo | pnpm workspaces | 業界標準、快速、省空間 |
| CSS 架構 | CSS Variables + CSS Modules | 無 runtime cost、見 05-css-architecture |
| 文檔站 | VitePress | 先用預設主題，時間不夠不客製 |
| 元件展示 | Storybook | 業界標準 |
| 部署 | Vercel | Monorepo 多站部署支援好、Nuxt 整合佳 |

---

## Monorepo 結構

```
project-root/
├── packages/
│   ├── tokens/          → Design Tokens（CSS Variables）
│   │                      顏色、間距、圓角、陰影 + Glass Token
│   │
│   ├── ui/              → Vue 元件（Liquid Glass 基礎元件）
│   │                      Button, Card, Modal, Input...
│   │                      每個元件：Component.vue + Component.module.css + index.ts
│   │
│   └── engine/          → Form Engine + Table Engine
│       ├── core/        → 純 TypeScript 邏輯（零框架依賴）
│       │                  Schema 解析、驗證、資料處理（排序/篩選/分頁）
│       └── vue/         → Vue 整合層
│                          <FormEngine /> 和 <TableEngine /> 元件
│
├── apps/
│   ├── landing/         → Landing Page
│   ├── docs/            → Component Doc Site（VitePress）
│   ├── storybook/       → Storybook
│   ├── blog/            → Demo：Liquid Glass 部落格
│   └── admin/           → Demo：後台管理系統
│
└── .github/workflows/   → CI/CD
```

### Engine 拆分策略

目前 `engine/` 先合為一個 package，內部用資料夾分離：

- `core/`：純 TypeScript，可獨立測試，未來可拆成獨立 package
- `vue/`：依賴 `core/` 和 `ui/`，負責黏合邏輯層與 Vue 元件

先寫過一輪，自然會感受到拆分邊界，屆時再正式拆分。

---

## 部署規劃（Vercel）

| App | 子域名 |
|-----|--------|
| landing | `xxx.dev` |
| docs | `docs.xxx.dev` |
| storybook | `storybook.xxx.dev` |
| blog | `demo-blog.xxx.dev` |
| admin | `demo-admin.xxx.dev` |

每個 app 在 Vercel 上建一個獨立 project，指定各自的 root directory。
