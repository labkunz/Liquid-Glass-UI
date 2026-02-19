# Modal 對話框

用於確認操作、填寫表單或顯示詳細內容的覆蓋層。透過 `<Teleport to="body">` 渲染，避免 z-index 堆疊問題。

## Demo

<script setup>
import { ref } from 'vue'
const showDefault = ref(false)
const showLg = ref(false)
</script>

### Glass Modal

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;">
  <LiquidButton variant="glass-highlight-layered" @click="showDefault = true">開啟 Glass Modal</LiquidButton>
</div>

<ClientOnly>
  <LiquidModal
    v-model="showDefault"
    title="確認操作"
    size="md"
    variant="glass-css-only"
  >
    <p>確定要繼續此操作嗎？此動作無法復原。</p>
    <template #footer>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <LiquidButton variant="glass-css-only" size="sm" @click="showDefault = false">取消</LiquidButton>
        <LiquidButton variant="danger" size="sm" @click="showDefault = false">刪除</LiquidButton>
      </div>
    </template>
  </LiquidModal>
</ClientOnly>

### 大尺寸 Glass Modal

<div style="background:linear-gradient(135deg,#0f172a,#1e1b4b);padding:1.5rem;border-radius:12px;margin:1rem 0;">
  <LiquidButton variant="glass-css-only" @click="showLg = true">開啟大型 Modal</LiquidButton>
</div>

<ClientOnly>
  <LiquidModal
    v-model="showLg"
    title="詳細資訊"
    size="lg"
    variant="glass-css-only"
  >
    <p>這是一個較大的 Modal 對話框，適合顯示更多內容或嵌入表單。</p>
    <p style="margin-top:1rem;color:#94a3b8;font-size:0.9rem;">點擊 Modal 外側或 × 按鈕即可關閉。</p>
    <template #footer>
      <div style="display:flex;justify-content:flex-end;">
        <LiquidButton variant="glass-highlight-layered" size="sm" @click="showLg = false">了解</LiquidButton>
      </div>
    </template>
  </LiquidModal>
</ClientOnly>

## 使用方式

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LiquidModal, LiquidButton } from '@liquid/ui'

const isOpen = ref(false)
</script>

<template>
  <LiquidButton @click="isOpen = true">Open Modal</LiquidButton>

  <LiquidModal
    v-model="isOpen"
    title="Confirm Delete"
    size="md"
    :show-close="true"
  >
    <!-- 預設 slot：Modal 內容 -->
    <p>Are you sure you want to delete this item?</p>

    <!-- 具名 slot：底部操作區 -->
    <template #footer>
      <LiquidButton variant="outline" @click="isOpen = false">Cancel</LiquidButton>
      <LiquidButton variant="danger" @click="handleDelete">Delete</LiquidButton>
    </template>
  </LiquidModal>
</template>
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | `false` | 控制顯示狀態（配合 `v-model` 使用） |
| `title` | `string` | `''` | Modal 標題列文字 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal 寬度 |
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | 視覺樣式 |
| `showClose` | `boolean` | `true` | 是否顯示標題列的 × 關閉按鈕 |

## Events

| 事件 | Payload | 說明 |
|------|---------|------|
| `update:modelValue` | `boolean` | 當 Modal 應關閉時觸發（點擊遮罩或 × 按鈕） |

## Slots

| Slot | 說明 |
|------|------|
| `default` | Modal 主體內容 |
| `footer` | 底部區域（通常為操作按鈕） |

## 注意事項

- Modal 使用 `<Teleport to="body">`，因此始終渲染於所有內容之上。
- 點擊遮罩背景會觸發 `update:modelValue` 事件，傳入 `false` 來關閉 Modal。
- 在 VitePress 中，請將 `<LiquidModal>` 包裹在 `<ClientOnly>` 內，以避免 Teleport 的 SSR 水合問題。
