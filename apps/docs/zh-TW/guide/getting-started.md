# 快速開始

## 安裝

安裝元件庫與設計 Token 套件：

```bash
pnpm add @liquid/ui @liquid/tokens
```

或使用 npm / yarn：

```bash
npm install @liquid/ui @liquid/tokens
# 或
yarn add @liquid/ui @liquid/tokens
```

## 設定

### 1. 匯入設計 Token

在應用程式入口點匯入 CSS Token 檔案。這些檔案提供元件所需的所有 CSS 變數：

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 設計 Token（必要）
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'

createApp(App).mount('#app')
```

### 2. 使用 GlassFilterProvider 包裹應用

`GlassFilterProvider` 會注入 glass 系列元件所需的 SVG 濾鏡定義（`glass`、`glass-layered` 等）。請將其放置在應用程式根部：

```vue
<!-- App.vue -->
<script setup lang="ts">
import { GlassFilterProvider } from '@liquid/ui'
</script>

<template>
  <GlassFilterProvider>
    <!-- 應用內容 -->
    <RouterView />
  </GlassFilterProvider>
</template>
```

::: tip
若只使用 `glass-css-only` 變體（純 CSS，無 SVG 濾鏡），`GlassFilterProvider` 為可選。
:::

### 3. 使用元件

```vue
<script setup lang="ts">
import { LiquidButton, LiquidCard, LiquidBadge } from '@liquid/ui'
</script>

<template>
  <LiquidCard variant="glass-css-only" padding="lg">
    <LiquidBadge color="primary">New Feature</LiquidBadge>
    <h2>Hello, Liquid Glass!</h2>
    <LiquidButton variant="primary">Get Started</LiquidButton>
  </LiquidCard>
</template>
```

## 主題設定

所有元件均使用 `@liquid/tokens` 提供的 CSS 自訂屬性。可在任意容器上覆寫這些變數，為特定區塊或整個應用套用主題。

### 深色主題

```css
/* global.css */
body {
  background: #0f1117;
  /* 覆寫 Card 玻璃效果變數，適配深色背景 */
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.05);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
}
```

### 淺色主題（預設）

預設 Token 值針對淺色背景優化。本庫 Demo 常用的漸層背景模式：

```css
body {
  background: linear-gradient(135deg, #f0f4ff 0%, #faf0ff 50%, #f0faff 100%);
  background-attachment: fixed;
}
```

## Glass 變體說明

各元件支援多種 glass 變體：

| 變體 | 說明 | 需要 GlassFilterProvider |
|------|------|--------------------------|
| `default` | 純白卡片，標準樣式 | 否 |
| `glass-css-only` | 純 CSS 玻璃效果，使用 `backdrop-filter` 與偽元素疊層 | 否 |
| `glass-highlight-layered` | CSS 玻璃 + SVG 濾鏡高光效果，呈現有機感的高光 | **是** |

::: warning
使用 `glass-css-only` 時，請確保元素後方有可見的彩色或紋理背景。在純白背景上，玻璃的模糊效果將無法顯示。
:::

## 下一步

- 瀏覽[元件文件](/zh-TW/components/button)
- 參考 [Blog Demo](#)，了解設計導向的使用方式
- 參考 [Admin Demo](#)，了解工程導向的使用方式
