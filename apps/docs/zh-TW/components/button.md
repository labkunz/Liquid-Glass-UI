# Button 按鈕

靈活的操作觸發元件，支援多種視覺樣式、尺寸與玻璃效果。

## Demo

### Glass 變體

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.75rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-highlight-layered">Highlight Layered</LiquidButton>
  <LiquidButton variant="glass-css-only">Glass CSS</LiquidButton>
  <LiquidButton variant="glass-layered">Layered</LiquidButton>
  <LiquidButton variant="glass-highlight-only">Highlight Only</LiquidButton>
</div>

### 尺寸

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
  <LiquidButton variant="glass-css-only" size="sm">Small</LiquidButton>
  <LiquidButton variant="glass-css-only" size="md">Medium</LiquidButton>
  <LiquidButton variant="glass-css-only" size="lg">Large</LiquidButton>
</div>

### 深色背景

<div style="background:linear-gradient(135deg,#0f172a,#1e1b4b);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.75rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-highlight-layered">Highlight</LiquidButton>
  <LiquidButton variant="glass-css-only">Glass CSS</LiquidButton>
  <LiquidButton variant="glass-layered">Layered</LiquidButton>
</div>

### 禁用狀態

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-css-only" :disabled="true">Disabled Glass</LiquidButton>
  <LiquidButton variant="glass-highlight-layered" :disabled="true">Disabled Highlight</LiquidButton>
</div>

## 使用方式

```vue
<script setup lang="ts">
import { LiquidButton } from '@liquid/ui'
</script>

<template>
  <LiquidButton variant="primary" size="md" @click="handleClick">
    Click Me
  </LiquidButton>
</template>
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'glass' \| 'glass-css-only' \| 'glass-highlight-only' \| 'glass-layered' \| 'glass-highlight-layered'` | `'primary'` | 視覺樣式變體 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 按鈕尺寸 |
| `disabled` | `boolean` | `false` | 禁用按鈕 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type 屬性 |

## Events

| 事件 | Payload | 說明 |
|------|---------|------|
| `click` | `MouseEvent` | 按鈕點擊時觸發（禁用狀態下不觸發） |

## 注意事項

- Glass 變體（`glass`、`glass-layered`、`glass-highlight-layered`）需要在應用根部放置 `GlassFilterProvider`。
- `glass-css-only` 與 `glass-highlight-only` 無需 `GlassFilterProvider` 即可使用。
- 為獲得最佳玻璃效果，請確保按鈕後方有彩色或紋理背景。
