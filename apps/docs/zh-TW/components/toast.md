# Toast 通知

非阻塞式通知訊息，在可設定的時間後自動消失。

## Demo

<script setup>
import { ref } from 'vue'

const toastVisible = ref(false)
const toastType = ref('success')
const toastMessage = ref('操作成功！')

const showToast = (type) => {
  toastType.value = type
  toastMessage.value = {
    success: '操作已成功完成！',
    error: '發生錯誤，請再試一次。',
    warning: '請在繼續前確認內容。',
    info: '這是一則提示訊息。',
  }[type]
  toastVisible.value = true
}
</script>

### Toast 類型

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.75rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('success')">顯示 Success</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('error')">顯示 Error</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('warning')">顯示 Warning</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('info')">顯示 Info</LiquidButton>
</div>

<ClientOnly>
  <LiquidToast
    v-model="toastVisible"
    :type="toastType"
    :message="toastMessage"
    :duration="3000"
    position="bottom-right"
    variant="glass-css-only"
  />
</ClientOnly>

## 使用方式

### 基本用法（透過 ref 控制）

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { LiquidToast, LiquidButton } from '@liquid/ui'

const visible = ref(false)
</script>

<template>
  <LiquidButton @click="visible = true">Show Toast</LiquidButton>

  <LiquidToast
    v-model="visible"
    type="success"
    message="Saved successfully!"
    :duration="3000"
    position="bottom-right"
  />
</template>
```

### 全域 Toast（透過 Composable）

若需要全應用的 Toast 管理，可使用共享的 Composable 模式（Blog 與 Admin Demo 均採用此方式）：

```typescript
// composables/useToast.ts
import { reactive } from 'vue'

interface ToastItem {
  id: number
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  visible: boolean
}

let nextId = 0
export const toastState = reactive({ items: [] as ToastItem[] })

export function toast(message: string, type: ToastItem['type'] = 'info') {
  const id = ++nextId
  toastState.items.push({ id, message, type, visible: true })
}

export function dismiss(id: number) {
  const i = toastState.items.findIndex(t => t.id === id)
  if (i !== -1) toastState.items.splice(i, 1)
}
```

```vue
<!-- App.vue -->
<template>
  <GlassFilterProvider>
    <LiquidToast
      v-for="item in toastState.items"
      :key="item.id"
      v-model="item.visible"
      :message="item.message"
      :type="item.type"
      :duration="0"
      position="bottom-right"
      @update:model-value="(v) => { if (!v) dismiss(item.id) }"
    />
    <RouterView />
  </GlassFilterProvider>
</template>
```

## Props

| Prop | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `modelValue` | `boolean` | `false` | 控制顯示狀態（配合 `v-model` 使用） |
| `message` | `string` | `''` | 通知文字內容 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 語義類型（控制顏色與圖示） |
| `duration` | `number` | `3000` | 自動關閉的延遲時間（毫秒）。設為 `0` 可停用自動關閉 |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'bottom-right'` | 畫面位置 |
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | 視覺樣式 |

## Events

| 事件 | Payload | 說明 |
|------|---------|------|
| `update:modelValue` | `boolean` | Toast 關閉時觸發（自動或手動） |

## 注意事項

- Toast 使用 `<Teleport to="body">`，始終浮動於所有內容之上。
- 自動關閉計時在 `onMounted` 時開始。若需手動控制關閉，請將 `duration` 設為 `0`。
- 在 VitePress 中，請將 `<LiquidToast>` 包裹在 `<ClientOnly>` 內，以避免 Teleport 的 SSR 問題。
