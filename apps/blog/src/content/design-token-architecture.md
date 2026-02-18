# 設計 Token 架構：從概念到 CSS Variables

設計 Token 是設計系統的語彙，讓設計決策可以被系統化管理。但很多團隊一開始就把所有值都放在一個 `variables.css` 裡，等到規模變大就難以維護。

## 三層 Token 架構

業界主流採用三層架構：

### Layer 1：Primitive Tokens（基礎值）

最原始的設計值，不帶語意：

```css
/* 完全不帶語意，只定義值 */
:root {
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --space-4: 1rem;
  --space-8: 2rem;
  --radius-md: 8px;
}
```

### Layer 2：Semantic Tokens（語意值）

引用 Primitive，賦予語意意義：

```css
:root {
  /* 語意：primary 代表主要行動 */
  --color-action-primary: var(--color-blue-500);
  --color-action-primary-hover: var(--color-blue-600);

  /* 語意：surface 代表容器背景 */
  --color-surface-default: #ffffff;
  --color-surface-subtle: #f8fafc;
}
```

### Layer 3：Component Tokens（元件值）

引用 Semantic，專用於特定元件：

```css
:root {
  /* Button 專用 */
  --button-primary-bg: var(--color-action-primary);
  --button-primary-bg-hover: var(--color-action-primary-hover);
  --button-border-radius: var(--radius-md);
}
```

## 為什麼要這樣分層？

這樣的好處在於**換主題時只需修改 Layer 2**：

```css
/* 暗色主題：只需覆寫 Semantic 層 */
[data-theme="dark"] {
  --color-surface-default: #0f1117;
  --color-surface-subtle: #1a1d27;
  /* Button 的 CSS Variables 不需要改，
     因為它引用 Semantic，Semantic 已更新 */
}
```

## Glass Token 的設計

液態玻璃效果的 token 設計尤其重要，因為 Glass 在亮色和暗色背景下需要完全不同的參數：

```css
:root {
  /* 亮色主題：較低透明度、較柔和模糊 */
  --glass-opacity: 0.15;
  --glass-blur: 12px;
  --glass-border-opacity: 0.3;
}

[data-theme="dark"] {
  /* 暗色主題：更低透明度（避免過亮）、更強模糊 */
  --glass-opacity: 0.1;
  --glass-blur: 16px;
  --glass-border-opacity: 0.15;
}
```

## 實際應用：Token 驅動的元件

元件只引用 CSS Variables，不硬碼值：

```css
.liquid-card--glass {
  /* 引用 Glass Tokens，而非直接寫 rgba() */
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(255, 255, 255, var(--glass-border-opacity));
}
```

這樣換主題時，元件自動適應，零修改量。

## Token 命名規範

好的命名規範遵循：`{namespace}-{category}-{property}-{variant}-{state}`

```
--liquid-color-primary         ✅ 清楚的命名空間
--liquid-glass-blur-strong     ✅ 帶有修飾詞
--blue500                      ❌ 缺少命名空間
--primary                      ❌ 太模糊
```

## 小結

Token 架構的核心是**解耦**：讓元件不需要知道「現在是什麼主題」，只需要引用語意化的 Token，主題系統負責提供正確的值。這是設計系統能夠規模化的根本原因。
