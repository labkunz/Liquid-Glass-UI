# 07 - 時間分配（5 天）

> 使用 Claude Code 協作，boilerplate 和重複性工作加速處理，設計決策和品質把關由自己負責。

---

## Day 1：地基

### 目標
Monorepo 跑起來，Glass 效果的「感覺」確認正確。

### 工作內容

**上午：專案架構**
- pnpm workspace 初始化
- TypeScript 設定
- Build pipeline
- `packages/tokens/`：完整的 CSS Variables（基礎 Token + Glass Token）
- GlassFilterProvider 元件

**下午：基準元件**
- 做出 2-3 個最能展現 Liquid Glass 的元件：**Button、Card、Badge**
- 反覆調整 Card 的 Glass 效果，直到滿意

### Day 1 結束標準
- ✅ Monorepo 可以 build
- ✅ Card 的液態玻璃感「對了」
- ✅ Glass Token 的參數已校準

> ⚠️ Day 1 的 Glass Token 校準非常關鍵。如果第一天結束時效果不對，後面所有元件都會歪。

---

## Day 2：元件量產

### 目標
所有基礎元件完成 70%。

### 工作內容

**上午：表單類**
- Input、Textarea、Select、Checkbox/Radio、Toggle、DatePicker
- Claude Code 價值最大：Day 1 已建立元件結構範式，照模式展開

**下午：回饋類 + 佈局類**
- Modal、Toast、Tooltip、Loading
- Tabs、Table、Pagination、Avatar

### Day 2 結束標準
- ✅ 所有 15-18 個元件有基本樣式
- ✅ Props API 設計合理
- ❌ 不用每個都完美，70% 就往下走

> ⚠️ 卡在一個元件上太久是最大的風險。

---

## Day 3：Engine

### 目標
Form Engine 和 Table Engine 可以跑起來。

### 工作內容

**上午：Form Engine**
- `engine/core/`：Schema 解析、驗證邏輯、條件顯示
- `engine/vue/`：`<FormEngine />` 元件
- 用 Day 2 的表單元件渲染

**下午：Table Engine**
- `engine/core/`：資料處理 pipeline（搜尋、篩選、排序、分頁）
- `engine/vue/`：`<TableEngine />` 元件
- 用 Day 2 的 Table、Badge、Pagination 渲染

### Day 3 結束標準
- ✅ 一個 Schema 物件能生成完整的表單
- ✅ 一個 Schema 物件能生成可互動的表格（排序、篩選、分頁）
- ✅ Engine 使用 Day 2 的元件渲染，視覺一致

---

## Day 4：Demo + Storybook

### 目標
兩個 Demo 可以跑，Storybook 有基本 stories。

### 工作內容

**上午：部落格 Demo**
- 首頁（文章卡片列表）
- 文章頁（一篇假內容）
- Glass 風格 Navbar

**下午：後台管理 Demo**
- 使用者管理頁面
- Table Engine 列表 + Form Engine CRUD
- 串起完整流程

**剩餘時間：Storybook**
- Claude Code 根據元件 props 批量產生 stories
- 確保每個元件至少有 Default story

### Day 4 結束標準
- ✅ 部落格 Demo 可以看到文章列表和文章頁
- ✅ 後台 Demo 可以跑完 CRUD 流程
- ✅ Storybook 每個元件有基本展示

---

## Day 5：收尾上線

### 目標
所有入口可以訪問，可以分享連結。

### 工作內容

**上午：Landing Page + 文檔站**
- Landing Page：Hero + Features + Quick Start + 導航到其他入口
- VitePress 文檔站：Getting Started + 幾個重點元件的文檔

**下午：部署 + 收尾**
- GitHub README 完善
- 全部部署到 Vercel（5 個子站）
- 檢查所有連結可訪問
- 修明顯 bug

### Day 5 結束標準
- ✅ 所有入口都能訪問
- ✅ 沒有明顯 bug
- ✅ GitHub README 完整
- ✅ 可以分享連結

---

## 進度落後時的優先級

如果某天進度落後，**優先犧牲**（從最不重要開始）：

1. Storybook 的完整度（stories 數量）
2. 文檔站的內容量
3. 部落格 Demo 的頁面數
4. 後台 Demo 的功能完整度

**絕不犧牲**：

- 元件本身的視覺品質（Glass 效果）
- Engine 的核心功能（至少能跑）
- Landing Page 的存在
- 可以分享的連結

> 面試官點進 Demo 看到東西能跑、有質感，比 Storybook 裡有完整 stories 重要得多。
