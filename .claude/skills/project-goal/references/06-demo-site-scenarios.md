# 06 - Demo Site 場景規劃

## 兩個 Demo 的定位

| | 部落格 Demo | 後台管理 Demo |
|--|-----------|-------------|
| **展示重點** | 視覺能力（Liquid Glass 美學） | 工程能力（Engine 深度） |
| **目標受眾** | 設計師、產品經理 | 工程師、技術主管 |
| **核心元件** | Card, Badge, Navbar, Toast, Tooltip | Table, Form, Modal, Pagination |
| **說的故事** | 「這套元件做出來的東西很好看」 | 「這套元件能撐起複雜的業務需求」 |

---

## Demo 1：Liquid Glass 部落格

### 頁面結構

**首頁（文章列表）**
- Liquid Glass Card 列表（每篇文章一張卡片）
- Glass 風格 Navbar
- Badge / Tag 分類標籤
- Pagination 分頁

**文章頁**
- Glass Navbar（固定頂部）
- 文章內文區域：**實底背景、高對比度**（不套玻璃效果，維持可讀性）
- Sidebar 或 floating 元素可以套 Glass 效果
- Toast 通知（如「已複製連結」）
- Tooltip（如程式碼片段說明）

**關於頁面（可選）**
- 展示其他 UI 元件

### 內容

- 2-3 篇假文章即可（或寫真實技術文章更好）
- 重點是展示元件在真實場景的視覺效果

### 設計注意

> ⚠️ 部落格是長文閱讀場景，Liquid Glass 只用在「框架」上（Navbar、Card、Sidebar、Footer），文章內文區域必須保持乾淨的實底背景和高對比度。這個取捨本身是面試好談資。

---

## Demo 2：後台管理系統

### 頁面結構

**使用者管理頁面（核心）**
- **Table Engine 展示**：使用者列表
  - 排序（多欄位）
  - 篩選（角色、狀態）
  - 搜尋
  - 分頁
  - 批量操作（選擇 → 批量刪除/匯出）
- **Form Engine 展示**：新增 / 編輯使用者
  - Modal 彈窗表單
  - 必填驗證、Email 驗證
  - 條件顯示（如選「企業帳號」→ 顯示公司名稱欄位）
  - 跨欄位驗證（確認密碼）
- Row actions：編輯、刪除
- Badge 顯示角色與狀態

**Dashboard 頁面（可選）**
- 展示 Card、簡單數據展示
- Glass 風格的統計卡片

### 完整 CRUD 流程

```
列表展示（Table Engine）
    → 新增（Form Engine + Modal）
    → 編輯（Form Engine + Modal + 載入現有資料）
    → 刪除（確認 Modal）
    → 批量操作（選擇 + 批量處理）
```

### 同樣套 Liquid Glass 風格

後台也使用 Glass 風格，但重點是功能可用性，Glass 效果收斂：
- Sidebar / Navbar 套 Glass
- Modal 套 Glass
- Card（統計卡片）套 Glass
- Table 本身保持清晰可讀
