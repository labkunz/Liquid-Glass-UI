# 元件庫暗色主題策略：Variant vs Theme

在暗色主題的 Admin 頁面中，元件庫的 `default` variant（白底）與深色背景產生視覺衝突時，有三種常見的解法，各自有不同的架構意涵。

---

## 問題背景

`LiquidInput`、`LiquidSelect` 等元件的 `default` variant 設計給亮色主題使用（白色背景、深色邊框）。
當這些元件被放進暗色 glass card 時，白底的 Input 與深色背景形成強烈違和感。

直覺反應是「加一個 `variant="dark"`」，但這其實是錯誤的架構決策。

---

## 三種解法比較

### 方案 A：頁面側 `:deep()` 覆蓋（目前採用）

在使用元件的頁面，用 Vue scoped CSS 的 `:deep()` 語法針對特定情境覆蓋樣式。

```css
/* 只影響 .form-page__card 內部的元件 */
.form-page__card :deep(.liquid-input) {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
}
```

**優點**：改動範圍小，不影響元件庫本身。
**缺點**：若有多個暗色主題頁面，需重複撰寫覆蓋規則。

---

### 方案 B：新增 `variant="dark"`（不建議）

在元件接受 `variant` prop，並新增 `dark` 這個 variant。

**問題所在**：

`variant`（變體）和 `theme`（主題）是兩個不同的維度：
- **Variant** → 視覺風格的選擇（`default`、`glass-css-only`、`glass-highlight-layered`）
- **Theme** → 整個應用的色彩環境（`light`、`dark`）

把 `dark` 實作成 variant，代表每次使用都要手動傳 prop，且無法透過主題系統自動切換。
這是在用錯誤的維度解決正確的問題。

---

### 方案 C：CSS Variable 主題化（架構正確，留待未來）

在 `@liquid/tokens` 定義主題變數，元件 CSS 引用變數，由 `[data-theme="dark"]` 的 context 覆蓋變數值。

**tokens 定義：**
```css
/* tokens/colors.css */
:root {
  --input-bg: #ffffff;
  --input-border: #dee2e6;
  --input-text: #212529;
}

[data-theme="dark"] {
  --input-bg: rgba(255, 255, 255, 0.06);
  --input-border: rgba(255, 255, 255, 0.12);
  --input-text: #e2e8f0;
}
```

**元件 CSS 改用變數：**
```css
.liquid-input {
  background: var(--input-bg);
  border-color: var(--input-border);
  color: var(--input-text);
}
```

**使用端自動生效：**
```vue
<!-- App.vue 已設 data-theme="dark" -->
<div data-theme="dark">
  <LiquidInput />  <!-- 自動套用暗色樣式，不需傳任何 prop -->
</div>
```

**優點**：一次設定，所有元件自動跟隨主題，無需修改 prop 或覆蓋 CSS。
**缺點**：需要對所有元件的 CSS 做 variable 化重構，工程量大。

---

## 技術決策記錄

### 當下選擇：方案 A

**理由**：
1. 目前元件庫的 CSS 尚未採用 CSS variable 的設計習慣
2. 強行局部 variable 化會造成「部分元件有變數、部分沒有」的不一致狀態
3. Demo 專案 scope 內，選擇務實的局部覆蓋方案

### 已知技術債

方案 C（CSS Variable 主題化）才是設計系統的正確架構方向。
若元件庫未來要認真支援多主題，需做：
1. 在 `@liquid/tokens` 建立語意化的主題變數（不只是顏色值，而是角色定義如 `--input-bg`）
2. 所有元件 CSS 改為引用 tokens 變數
3. 移除元件庫內的 hardcoded 顏色值

---

## 面試談資

這個決策過程本身就是一個好的談資：

> 「我知道正確的架構是 CSS Variable 主題化，讓元件透過 `data-theme` context 自動切換。
> 但在 demo 專案的 scope 內，我有意識地選擇了較小改動的 `:deep()` 覆蓋方案，
> 並將正確方向記錄為已知技術債，而不是假裝問題不存在。」
