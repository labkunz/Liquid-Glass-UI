# 05 - CSS 架構

## 核心概念

三個技術各司其職：

| 技術 | 職責 | 位置 |
|------|------|------|
| CSS Variables | 統一「值」— Design Tokens、主題切換 | `packages/tokens/` |
| CSS Modules | 隔離「命名」— 避免全域 class 衝突 | 各元件旁 `*.module.css` |
| GlassFilterProvider | 管理 SVG Filter — 全域定義、元件引用 | App 最外層 |

三者不衝突，可以一起用。

---

## 第一層：Design Tokens（`packages/tokens/`）

所有元件從這裡取值，不自己硬寫數字。

### 基礎 Token

```css
:root {
  /* 顏色 */
  --color-primary: #3b82f6;
  --color-text: #1a1a2e;
  /* ...更多顏色 */

  /* 字體 */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 16px;

  /* 間距 */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* 圓角 */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* 陰影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

### Glass Token（本專案核心）

```css
:root {
  /* Glass 基礎 */
  --glass-blur: 12px;
  --glass-opacity: 0.15;
  --glass-border-opacity: 0.3;
  --glass-shadow-opacity: 0.2;

  /* Glass 折射（SVG Filter 參數） */
  --glass-refraction-scale: 20;
  --glass-refraction-frequency: 0.008;

  /* Glass 高光 */
  --glass-highlight-intensity: 0.6;
  --glass-highlight-angle: 135deg;
}
```

---

## 第二層：元件樣式（各元件旁 `*.module.css`）

CSS Modules 自動加 hash 避免命名衝突，內部用 Token 取值。

### 檔案結構

```
packages/ui/
├── Button/
│   ├── Button.vue
│   ├── Button.module.css
│   └── index.ts
├── Card/
│   ├── Card.vue
│   ├── Card.module.css
│   └── index.ts
```

### 範例：Card.module.css

```css
.root {
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(255, 255, 255, var(--glass-border-opacity));
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, var(--glass-shadow-opacity));
}

.root:hover {
  --glass-opacity: 0.2;  /* 元件層級覆蓋 token */
}
```

---

## 第三層：主題系統

Liquid Glass 在亮色和暗色背景上的參數差異大，用 CSS Variables + `data-theme` 屬性切換。

```css
:root,
[data-theme="light"] {
  --glass-opacity: 0.15;
  --glass-blur: 12px;
  --glass-border-opacity: 0.3;
  --glass-bg: rgba(255, 255, 255, var(--glass-opacity));
}

[data-theme="dark"] {
  --glass-opacity: 0.1;
  --glass-blur: 16px;
  --glass-border-opacity: 0.15;
  --glass-bg: rgba(255, 255, 255, var(--glass-opacity));
}
```

切換主題：在 `<html>` 上加 `data-theme="dark"`，所有元件瞬間切換，不需要 JavaScript 改每個元件的 style。

---

## SVG Filter 管理：GlassFilterProvider

SVG Filter 需要定義在 DOM 裡才能被 CSS 引用。做一個全域元件，在 App 最外層包一次。

```vue
<!-- GlassFilterProvider.vue -->
<template>
  <svg style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="glass-refraction">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008"
          numOctaves="2"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="20"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
      <filter id="glass-highlight">
        <!-- feSpecularLighting 高光效果 -->
      </filter>
    </defs>
  </svg>
  <slot />
</template>
```

元件引用方式：

```css
.card-with-refraction {
  filter: url(#glass-refraction);
}
```

Filter 的參數可透過 CSS Variables 控制，與主題系統串接。
