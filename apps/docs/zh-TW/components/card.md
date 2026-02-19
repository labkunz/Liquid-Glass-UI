# Card 卡片

多功能的容器元件，支援實心與玻璃變體。是展示 Liquid Glass 美學的核心元件。

## Demo

### Glass 搭配漸層背景（淺色）

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;">
  <LiquidCard variant="glass-css-only" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;color:#1e293b;">Glass Card</h3>
    <p style="margin:0;color:#334155;font-size:0.9rem;">透過 <code>backdrop-filter: blur()</code> 與偽元素疊層實現的玻璃擬態效果，無執行期依賴。</p>
  </LiquidCard>
</div>

### Glass 搭配深色背景

<div style="background:linear-gradient(135deg,#0f172a,#1e1b4b,#0f172a);padding:1.5rem;border-radius:12px;margin:1rem 0;">
  <LiquidCard variant="glass-css-only" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;color:#f1f5f9;">Glass Card（深色）</h3>
    <p style="margin:0;color:#94a3b8;font-size:0.9rem;">相同元件在深色背景下同樣呈現出色效果，Admin Demo 中即採用此方式。</p>
  </LiquidCard>
</div>

### Glass Highlight Layered

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;">
  <LiquidCard variant="glass-highlight-layered" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;color:#1e293b;">Glass Highlight</h3>
    <p style="margin:0;color:#334155;font-size:0.9rem;">在玻璃效果上加入頂部高光層，呈現更強的景深與真實感。</p>
  </LiquidCard>
</div>

### 內距變體

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:1rem;flex-wrap:wrap;">
  <LiquidCard variant="glass-css-only" padding="sm">
    <span style="font-size:0.875rem;color:#1e293b;">padding="sm"</span>
  </LiquidCard>
  <LiquidCard variant="glass-css-only" padding="md">
    <span style="font-size:0.875rem;color:#1e293b;">padding="md"</span>
  </LiquidCard>
  <LiquidCard variant="glass-css-only" padding="lg">
    <span style="font-size:0.875rem;color:#1e293b;">padding="lg"</span>
  </LiquidCard>
</div>

## 使用方式

```vue
<script setup lang="ts">
import { LiquidCard } from '@liquid/ui'
</script>

<template>
  <!-- 標準卡片 -->
  <LiquidCard variant="default" padding="lg">
    <h2>Card Title</h2>
    <p>Card content goes here.</p>
  </LiquidCard>

  <!-- 玻璃卡片（後方需有可見背景） -->
  <LiquidCard variant="glass-css-only" padding="lg">
    <h2>Glass Card</h2>
    <p>Blurs whatever is behind it.</p>
  </LiquidCard>
</template>
```

## CSS 變數自訂

Glass 變體提供 CSS 變數供主題調整：

```css
/* 深色主題範例（Admin Demo 使用） */
:root {
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.05);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
  --liquid-card-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  --liquid-card-glass-highlight-opacity: 0.06;
}

/* 淺色主題範例（預設） */
:root {
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.5);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.65);
}
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | 視覺樣式變體 |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 內部間距 |
| `overflow` | `'hidden' \| 'visible' \| 'auto'` | `'hidden'` | CSS overflow 行為 |

## Slots

| Slot | 說明 |
|------|------|
| `default` | 卡片內容 |
