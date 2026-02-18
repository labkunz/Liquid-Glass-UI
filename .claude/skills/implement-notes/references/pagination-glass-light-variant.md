# Pagination Glass Light Variant

在亮色背景下，為 `LiquidPagination` 元件新增 `glass-light` variant，解決低可視度問題。

---

## 問題背景

Blog demo site 使用亮色漸層背景（淺紫／藍系），但 Pagination 使用 `variant="glass-css-only"`。

`glass-css-only` 是為**暗色背景**設計的：

```css
/* 問題所在 */
.liquid-pagination--glass-css-only .liquid-pagination-btn {
  background: rgba(255, 255, 255, 0.1); /* 幾乎透明 */
  color: rgba(255, 255, 255, 0.8);       /* 白字在亮背景上不可見 */
}
```

結果：數字、箭頭幾乎不可見；active 頁碼的藍底雖然有顯示，但也偏淡。

---

## 方案評估

| 方案 | 做法 | 優 | 劣 |
|------|------|----|----|
| A | 切換 `default` variant | 最快 | 失去 Glass 感 |
| B | 修改 `glass-css-only` | 不用新增 variant | 破壞 admin 暗色使用情境 |
| **C（選用）** | **新增 `glass-light` variant** | 語義清晰、改動隔離 | 需改 component library |
| D | `:deep()` 覆蓋 | 快 | 維護性低，樣式散落 |

選擇方案 C 的原因：

- **語義明確**：blog = light，admin = dark，各自對應不同 variant
- **改動隔離**：兩個 Demo 互不影響
- **作品集加分**：展示設計系統對亮／暗模式的考量

---

## 實作內容

### 1. 更新 Props 型別

`packages/ui/src/components/Pagination/Pagination.vue`

```typescript
// Before
variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';

// After
variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered' | 'glass-light';
```

### 2. 新增 CSS Variant

`packages/ui/src/components/Pagination/Pagination.module.css`

**設計原則**：

| 屬性 | 值 | 說明 |
|------|-----|------|
| 文字色（一般） | `rgba(60, 50, 80, 0.8)` | 深紫灰，與亮背景對比 |
| 一般按鈕背景 | `rgba(255, 255, 255, 0.45)` + `backdrop-filter: blur(8px)` | 亮色玻璃感 |
| 邊框 | `rgba(255, 255, 255, 0.75)` | 白色高光邊 |
| hover 背景 | `rgba(255, 255, 255, 0.65)` | 更亮、有互動感 |
| active 背景 | `rgba(99, 102, 241, 0.75)` + 白字 | 靛紫，與 blog 主色調對應 |
| disabled | `opacity: 0.35` | 可辨識但不可點 |

```css
/* ===== Glass Light Variant (for light backgrounds) ===== */
.liquid-pagination--glass-light .liquid-pagination-btn {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  color: rgba(60, 50, 80, 0.8);
}
.liquid-pagination--glass-light .liquid-pagination-btn--active {
  background: rgba(99, 102, 241, 0.75);
  color: rgba(255, 255, 255, 1);
}
.liquid-pagination--glass-light .liquid-pagination-nav--disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
```

### 3. Rebuild UI Package

```bash
pnpm build:ui
```

### 4. Blog 使用端切換

`apps/blog/src/pages/HomePage.vue`

```html
<!-- Before -->
<LiquidPagination variant="glass-css-only" ... />

<!-- After -->
<LiquidPagination variant="glass-light" ... />
```

---

## 關鍵設計判斷

### Active 顏色目前為 hardcoded

```css
background: rgba(99, 102, 241, 0.75); /* 靛紫，寫死在 CSS 中 */
```

Pagination 的 Props 不提供顏色設定，使用端若要客製化只能用 `:deep()` 覆蓋。
若未來需要主題色可配置，可考慮暴露 CSS Custom Properties：

```css
/* 未來可能的方向 */
--pagination-active-color: rgba(99, 102, 241, 0.75);
```

### 兩種 Glass Variant 的對應情境

| Variant | 適用背景 | 文字色策略 | 使用位置 |
|---------|---------|-----------|---------|
| `glass-css-only` | 暗色 | 白色系 RGBA | apps/admin |
| `glass-light` | 亮色 | 深紫灰 RGBA | apps/blog |

---

## 涉及檔案

- `packages/ui/src/components/Pagination/Pagination.vue` — 加入 union type
- `packages/ui/src/components/Pagination/Pagination.module.css` — 新增 CSS block
- `apps/blog/src/pages/HomePage.vue` — 切換 variant
