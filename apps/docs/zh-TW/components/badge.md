# Badge 標籤

緊湊的語義標籤，用於顯示狀態、分類或標記。

## Demo

### 顏色

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
  <LiquidBadge color="default">Default</LiquidBadge>
  <LiquidBadge color="primary">Primary</LiquidBadge>
  <LiquidBadge color="success">Success</LiquidBadge>
  <LiquidBadge color="warning">Warning</LiquidBadge>
  <LiquidBadge color="danger">Danger</LiquidBadge>
  <LiquidBadge color="info">Info</LiquidBadge>
</div>

### 形狀

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
  <LiquidBadge color="primary" shape="pill">Pill（預設）</LiquidBadge>
  <LiquidBadge color="primary" shape="rounded">Rounded</LiquidBadge>
</div>

### 尺寸

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
  <LiquidBadge color="primary" size="sm">Small</LiquidBadge>
  <LiquidBadge color="primary" size="md">Medium</LiquidBadge>
  <LiquidBadge color="primary" size="lg">Large</LiquidBadge>
</div>

### 語義狀態範例（ATS 招募階段）

<div style="background:linear-gradient(135deg,#0f172a,#1e1b4b);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
  <LiquidBadge color="default">待審</LiquidBadge>
  <LiquidBadge color="info">第一輪</LiquidBadge>
  <LiquidBadge color="primary">第二輪</LiquidBadge>
  <LiquidBadge color="warning">Offer</LiquidBadge>
  <LiquidBadge color="success">錄取</LiquidBadge>
  <LiquidBadge color="danger">淘汰</LiquidBadge>
</div>

## 使用方式

```vue
<script setup lang="ts">
import { LiquidBadge } from '@liquid/ui'
</script>

<template>
  <LiquidBadge color="success" shape="pill" size="md">
    Active
  </LiquidBadge>
</template>
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | 視覺樣式變體 |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | 語義顏色 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 標籤尺寸 |
| `shape` | `'pill' \| 'rounded'` | `'pill'` | 圓角樣式 |

## Slots

| Slot | 說明 |
|------|------|
| `default` | 標籤文字內容 |
