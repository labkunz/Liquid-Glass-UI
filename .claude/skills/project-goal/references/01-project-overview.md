# 01 - 專案概覽與核心策略

## 專案性質

一個以 **Liquid Glass（液態玻璃）** 為視覺風格主張的 Vue 3 元件庫，同時包含 Schema-Driven 的 Form Engine 與 Table Engine，兼具視覺美學與工程深度。

> 一句話定位待實作到一定程度後再確立，需要串起「Liquid Glass 視覺」與「Form/Table Engine 工程深度」兩條主線。

---

## 核心策略

**一個專案 × 五個展示入口 × 兩個 Demo Site**

### 展示入口

| 入口 | 目的 | 目標受眾 |
|------|------|----------|
| Landing Page | 品牌第一印象、導流 | 所有人 |
| Storybook | 互動元件展示 | 設計師、工程師 |
| Component Doc Site | 技術文檔深度（VitePress） | 工程師 |
| Demo - 部落格 | 展示視覺能力 | 設計師、產品經理 |
| Demo - 後台管理 | 展示工程能力（Engine） | 工程師、主管 |
| GitHub README | 程式碼品質、工程實踐 | 工程師 |

### 兩個 Demo 的互補邏輯

- **部落格 Demo**：展示 Liquid Glass 在內容型網站的視覺表現（Card、Navbar、Badge、Toast）
- **後台管理 Demo**：展示 Form Engine + Table Engine 的 CRUD 能力（排序、篩選、分頁、條件表單）
- 兩個 Demo 用同一套元件，證明元件庫的通用性

### 核心原則

- **完成 > 完美**：每個部分做到 80% 就算完成
- **Day 5 結束時必須能分享連結**
- **用 Claude Code 加速，自己把關品質**
