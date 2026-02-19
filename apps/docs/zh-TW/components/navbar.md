# Navbar 導覽列

具響應式設計的頂部導覽列，支援玻璃變體與內建行動版漢堡選單。

## Demo

### Glass Light（適用淺色背景）

<div style="background:linear-gradient(135deg,#f0f4ff,#faf0ff,#f0faff);border-radius:12px;overflow:hidden;margin:1rem 0;">
  <LiquidNavbar variant="glass-light" :sticky="false">
    <template #logo>
      <span style="font-weight:700;">⬡ My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#666;">Home</span>
      <span style="font-size:0.9rem;color:#666;">Blog</span>
      <span style="font-size:0.9rem;color:#666;">About</span>
    </template>
    <template #actions>
      <LiquidButton variant="primary" size="sm">Sign Up</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

### Glass Dark（適用深色背景）

<div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:12px;overflow:hidden;margin:1rem 0;">
  <LiquidNavbar variant="glass-css-only" :sticky="false">
    <template #logo>
      <span style="font-weight:700;color:#f1f5f9;">⬡ My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#94a3b8;">Dashboard</span>
      <span style="font-size:0.9rem;color:#94a3b8;">Jobs</span>
      <span style="font-size:0.9rem;color:#94a3b8;">Candidates</span>
    </template>
    <template #actions>
      <LiquidButton variant="outline" size="sm">Settings</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

### Default（純白實色）

<div style="border-radius:12px;overflow:hidden;margin:1rem 0;border:1px solid #eee;">
  <LiquidNavbar variant="default" :sticky="false">
    <template #logo>
      <span style="font-weight:700;">My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#666;">Home</span>
      <span style="font-size:0.9rem;color:#666;">Docs</span>
    </template>
    <template #actions>
      <LiquidButton variant="secondary" size="sm">Login</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

## 使用方式

```vue
<script setup lang="ts">
import { LiquidNavbar, LiquidButton } from '@liquid/ui'
</script>

<template>
  <LiquidNavbar variant="glass-light" :sticky="true">
    <!-- Logo 區域（左側） -->
    <template #logo>
      <span class="brand">⬡ MyBrand</span>
    </template>

    <!-- 導覽連結（中央） -->
    <template #links>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
    </template>

    <!-- 操作按鈕（右側） -->
    <template #actions>
      <LiquidButton variant="outline" size="sm">Login</LiquidButton>
      <LiquidButton variant="primary" size="sm">Sign Up</LiquidButton>
    </template>
  </LiquidNavbar>
</template>
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-light'` | `'default'` | 視覺樣式變體 |
| `sticky` | `boolean` | `true` | 是否在捲動時固定於頂部（`position: sticky`） |

## Slots

| Slot | 說明 |
|------|------|
| `logo` | 左側區域，通常為品牌 Logo 或名稱 |
| `links` | 中央區域，導覽連結 |
| `actions` | 右側區域，CTA 按鈕或使用者選單 |

## 注意事項

- `glass-light`：背景為 `rgba(255,255,255,0.65)`，最適合**淺色**頁面背景（Blog Demo）。
- `glass-css-only`：背景為 `rgba(255,255,255,0.1)`，最適合**深色**頁面背景（Admin Demo）。
- 兩種玻璃變體均使用 `backdrop-filter: blur(16px)`。
- Navbar 內建行動版漢堡選單，`links` slot 的內容在 `max-width: 640px` 時會顯示於下拉選單中。
