# 06 - Demo Site 場景規劃

## 兩個 Demo 的定位

| | 部落格 Demo | 後台管理 Demo |
|--|-----------|-------------|
| **展示重點** | 視覺能力（Liquid Glass 美學） | 工程能力（Engine 深度） |
| **目標受眾** | 設計師、產品經理 | 工程師、技術主管 |
| **核心元件** | Card, Badge, Navbar, Toast, Tooltip, Pagination | Table Engine, Form Engine, Modal, Toast |
| **說的故事** | 「這套元件做出來的東西很好看」 | 「這套元件能撐起複雜的業務需求」 |
| **Glass 調性** | 亮色系玻璃 | 暗色系玻璃 |

> 兩個 Demo 主題各自獨立，但使用同一套元件，證明元件庫的通用性與適應性。

---

## Demo 1：Liquid Glass 部落格

### 定位

設計導向的技術知識分享 Blog，內容涵蓋設計、前端、AI 工具、後端學習筆記。
視覺風格以 Liquid Glass 為主張，Blog 本身就是元件庫美學的展示場。

### 技術選擇

- **框架**：Vue 3 + Vite SPA（不使用 Nuxt，維持 monorepo 架構一致性）
- **Markdown 渲染**：`unplugin-vue-markdown` + `shiki`（.md 檔直接 import 成 Vue component）
- **內容來源**：開發過程中整理的真實筆記，粗估 10-15 篇

### 頁面結構

**首頁（文章列表）**
- Glass 風格 Navbar（固定頂部）
- 文章 Card 列表（每篇一張，顯示標題、摘要、分類、閱讀時間）
- Category 篩選 Bar（設計／前端／AI 工具／後端）
- Pagination（每頁 6 篇，10-15 篇文章約 2-3 頁）

**文章頁**
- Glass Navbar（固定頂部）
- 文章內文區域：**實底背景、高對比度**（不套玻璃效果，維持可讀性）
- Code block 含複製按鈕：hover 顯示 Tooltip，點擊觸發 Toast「已複製」
- 文章頂部複製連結按鈕：觸發 Toast「已複製文章連結」

### 文章 Metadata 格式

```ts
{
  slug: 'liquid-glass-css-guide',
  title: '用 CSS 重現液態玻璃折射效果',
  date: '2025-02-01',
  category: 'Design',           // 單選：Design / Frontend / AI Tools / Backend
  tags: ['CSS', 'Glass Morphism'],
  excerpt: '...',               // 列表頁顯示的摘要（約 80 字）
  readTime: 8,                  // 分鐘
  coverGradient: 'design',      // 對應 category 的 CSS gradient 色系
}
```

### Category 與 Gradient 對應

| Category | 色系 |
|----------|------|
| 設計 (Design) | 紫 → 粉 |
| 前端 (Frontend) | 藍 → 青 |
| AI 工具 (AI Tools) | 綠 → 青 |
| 後端 (Backend) | 橘 → 紅 |

### 元件使用對應

| 元件 | 出現位置 | 說明 |
|------|---------|------|
| Navbar | 全頁固定頂部 | Glass 風格 |
| Card | 首頁文章列表 | 每篇文章一張 |
| Badge | 文章 Card 上的 Category 標籤 | 依分類對應色彩 |
| Pagination | 首頁底部 | 每頁 6 篇 |
| Tooltip | 文章頁 code block 複製按鈕 hover | 顯示「複製程式碼」 |
| Toast | 複製程式碼、複製文章連結 | 操作成功回饋 |

### 設計注意

> ⚠️ 部落格是長文閱讀場景，Liquid Glass 只用在「框架」上（Navbar、Card、Footer），
> 文章內文區域必須保持乾淨的實底背景和高對比度。
> 這個取捨本身是面試好談資——展示了對 Glass 效果的克制與判斷力。

---

## Demo 2：招募管理後台（ATS）

### 定位

Applicant Tracking System，展示 Form Engine + Table Engine 在真實業務情境下的工程深度。
主題（招募系統）為工程師和人事部門都熟悉的業務場景，面試官 30 秒內能理解。

### 頁面結構

```
Admin ATS
├── Dashboard                   ← 統計卡片（來自 Jobs + Candidates 兩個資料源）
├── 職缺管理
│   ├── 職缺列表                ← Table Engine 主場景
│   └── 新增／編輯職缺          ← Form Engine（獨立頁面，非 Modal）
└── 應徵者管理
    ├── 應徵者列表              ← Table Engine 第二場景
    └── 新增／編輯應徵者        ← Form Engine（獨立頁面，非 Modal）
```

### 元件互動設計

| 元件 | 觸發場景 | 說明 |
|------|---------|------|
| Table Engine | 職缺列表、應徵者列表 | 排序、篩選、分頁 |
| Form Engine | 新增／編輯職缺、新增／編輯應徵者 | 獨立頁面，非 Modal |
| Modal | 刪除任何資料時 | 二次確認，職責單純 |
| Toast | 新增／編輯成功或失敗 | 操作結果回饋 |
| Badge | Table 中的狀態、分類欄位 | 多色語意對應 |

> **Form 獨立成頁面而非放入 Modal** 的原因：職缺與應徵者欄位數量多，Modal 空間不足，
> 獨立頁面是更真實的 UX 選擇，也讓 Form Engine 有足夠空間完整展示。

### Dashboard 統計來源

| 統計項目 | 資料來源 |
|---------|---------|
| 開放中職缺數 | Jobs |
| 各部門缺額分布 | Jobs |
| 職缺狀態比例 | Jobs |
| 本月新增應徵數 | Candidates |
| 審核階段分布 | Candidates |
| 錄取率 | Candidates |

---

### 職缺（Jobs）Schema

**Table 欄位**

| 欄位 | 類型 | 可排序 | 可篩選 |
|------|------|--------|--------|
| 職位名稱 | text | - | - |
| 部門 | badge | - | ✓ |
| 工作類型 | badge | - | ✓ |
| 狀態 | badge | - | ✓ |
| 應徵人數 | number | ✓ | - |
| 建立日期 | date | ✓ | - |
| 操作 | actions | - | - |

**Form 欄位**

| 欄位 | 元件 | 驗證 | 條件邏輯 |
|------|------|------|---------|
| 職位名稱 | Input | required | - |
| 部門 | Select | required | 選項：Engineering / Product / Design / Marketing / Sales / HR |
| 工作類型 | Select | required | 選「約聘」→ 顯示時薪範圍；選「全職／兼職」→ 顯示月薪範圍 |
| 工作模式 | Select | required | 選「現場／混合」→ 顯示辦公地點欄位 |
| 狀態 | Select | required | 草稿 / 開放中 / 暫停 / 已關閉 |
| 截止日期 | DatePicker | - | - |
| 職位描述 | Textarea | required, minLength 20 | - |

---

### 應徵者（Candidates）Schema

**Table 欄位**

| 欄位 | 類型 | 可排序 | 可篩選 |
|------|------|--------|--------|
| 姓名 | text | ✓ | - |
| Email | text | - | - |
| 應徵職位 | text | - | ✓ |
| 審核階段 | badge | - | ✓ |
| 來源 | badge | - | ✓ |
| 應徵日期 | date | ✓ | - |
| 操作 | actions | - | - |

**審核階段 Badge 色彩**

| 階段 | 色彩 |
|------|------|
| 待審核 | 灰 |
| 一面 | 藍 |
| 二面 | 紫 |
| Offer | 橘 |
| 錄取 | 綠 |
| 拒絕 | 紅 |

**Form 欄位**

| 欄位 | 元件 | 驗證 | 條件邏輯 |
|------|------|------|---------|
| 姓名 | Input | required | - |
| Email | Input | required, email | - |
| 電話 | Input | pattern（選填） | - |
| 應徵職位 | Select | required | 從 Jobs 資料動態產生選項 |
| 審核階段 | Select | required | 待審核 / 一面 / 二面 / Offer / 錄取 / 拒絕 |
| 來源 | Select | - | LinkedIn / 人力銀行 / 員工推薦 / 官網 |
| 帳號類型 | Select | - | 選「企業」→ 顯示公司名稱欄位 |
| 履歷連結 | Input | url format（選填） | - |
| 備註 | Textarea | - | - |

---

### Liquid Glass 應用原則

後台使用 Glass 風格，但重點是功能可用性，效果比 Blog 更收斂：

- Sidebar / Navbar → Glass
- Modal（刪除確認）→ Glass
- Dashboard 統計 Card → Glass
- Table 本身 → 保持清晰可讀，不套 Glass
