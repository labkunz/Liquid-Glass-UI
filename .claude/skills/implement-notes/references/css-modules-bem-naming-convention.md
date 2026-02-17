# CSS Modules 與 BEM 命名慣例衝突問題

在 Vue 元件使用 `useCssModule()` 搭配 BEM 命名時，BEM element 分隔符號 `__`（雙底線）與 CSS Modules 的 camelCase 轉換規則不一致，導致 class 無法套用，元件顯示為原生 HTML 樣式。

---

## 環境資訊

- **Framework**: Vue 3.4.x
- **建置工具**: Vite 5.x
- **CSS 機制**: CSS Modules (`.module.css`) + `useCssModule()`
- **發現元件**: Tabs

---

## 問題描述

Tabs 元件的標籤列 `<button>` 顯示為瀏覽器原生按鈕樣式（灰色背景、3D 邊框），開發工具確認 class attribute 為 `undefined` 或空值。

自訂的 `.liquid-tabs-tab` 樣式完全沒有套用。

---

## 根本原因分析

### 問題：`toCamelCase` 工具只處理連字號，不處理底線

專案的 `toCamelCase` 工具函式如下：

```ts
const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());
```

此函式只將「連字號 `-` 後的字母」轉為大寫，**不處理底線 `_`**。

### CSS Modules 的 camelCase 轉換規則

Vite 的 CSS Modules 在 camelCase 模式下，會將**連字號 `-` 和底線 `_` 都視為單字分隔符號**：

| 原始 CSS 類別名 | CSS Modules key（camelCase） |
|---|---|
| `liquid-button--primary` | `liquidButtonPrimary` |
| `liquid-tabs-nav` | `liquidTabsNav` |
| `liquid-tabs__nav` | `liquidTabsNav` |

### 兩者對不上

使用 BEM element 格式 `__` 時：

| 原始類別名 | `toCamelCase` 產出 | CSS Modules 實際 key | 是否對得上 |
|---|---|---|---|
| `liquid-tabs__nav` | `liquidTabs__nav` | `liquidTabsNav` | ❌ 不符合 |
| `liquid-tabs-nav` | `liquidTabsNav` | `liquidTabsNav` | ✅ 符合 |

`style['liquidTabs__nav']` 回傳 `undefined` → class 未套用 → 原生樣式。

### 為什麼 Button 元件沒有出現此問題？

Button 的所有 CSS 類別名稱只使用連字號（BEM modifier 格式 `--`），不含底線 `__`：

```css
.liquid-button--primary   /* 只有 -- */
.liquid-button--sm        /* 只有 -- */
```

Tabs 是專案中**第一個使用 BEM element `__` 分隔符號**的元件，因此是首次遇到此問題。

---

## 解決方案

### 方案（採用）：統一使用純連字號命名，捨棄 BEM `__`

在 CSS Modules 環境下，BEM `__` 的命名語義優勢消失，因為 CSS Modules 已透過 scope 隔離保證類別名稱不衝突。

**修改前（有問題）：**

```css
.liquid-tabs__nav  { ... }
.liquid-tabs__tab  { ... }
.liquid-tabs__panel { ... }
```

```ts
style[toCamelCase('liquid-tabs__nav')]   // → 'liquidTabs__nav' → undefined
```

**修改後（正確）：**

```css
.liquid-tabs-nav  { ... }
.liquid-tabs-tab  { ... }
.liquid-tabs-panel { ... }
```

```ts
style[toCamelCase('liquid-tabs-nav')]    // → 'liquidTabsNav' → ✅ 有效
```

---

## 專案命名規範（確立）

所有元件 CSS 類別名稱一律使用**純連字號格式**：

| 用途 | 格式 | 範例 |
|---|---|---|
| 區塊（Block） | `liquid-{component}` | `.liquid-tabs` |
| 子元素（Element） | `liquid-{component}-{element}` | `.liquid-tabs-nav` |
| 修飾符（Modifier） | `liquid-{component}--{modifier}` | `.liquid-tabs--glass` |
| 狀態 | `liquid-{component}-{element}--{state}` | `.liquid-tabs-tab--active` |

> **注意**：Element 分隔符使用單連字號 `-`（非 BEM 標準的 `__`），Modifier 使用雙連字號 `--`（與 BEM 標準一致）。

---

## 延伸注意事項

若未來需要擴充 `toCamelCase` 以支援底線（例如需要使用 BEM `__`），可修改為：

```ts
// 同時處理連字號和底線
const toCamelCase = (str: string) =>
  str.replace(/[-_]+([a-z])/g, (_, letter) => letter.toUpperCase());
```

但考慮到整個專案的命名一致性，**建議維持現有規範（純連字號），而非修改 `toCamelCase`**。
