# Toast

A non-blocking notification that auto-dismisses after a configurable duration.

## Demo

<script setup>
import { ref } from 'vue'

const toastVisible = ref(false)
const toastType = ref('success')
const toastMessage = ref('Action completed successfully!')

const showToast = (type) => {
  toastType.value = type
  toastMessage.value = {
    success: 'Action completed successfully!',
    error: 'Something went wrong. Please try again.',
    warning: 'Please review before continuing.',
    info: 'Here is some useful information.',
  }[type]
  toastVisible.value = true
}
</script>

### Toast Types

<div style="background:linear-gradient(135deg,#a78bfa,#f472b6,#60a5fa);padding:1.5rem;border-radius:12px;margin:1rem 0;display:flex;gap:0.75rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('success')">Show Success</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('error')">Show Error</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('warning')">Show Warning</LiquidButton>
  <LiquidButton variant="glass-css-only" size="sm" @click="showToast('info')">Show Info</LiquidButton>
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

## Usage

### Basic (managed by ref)

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

### Global Toast via Composable

For app-wide toast management, use a shared composable pattern (as used in the Blog and Admin demos):

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Controls visibility (use with `v-model`) |
| `message` | `string` | `''` | Notification text content |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Semantic type (controls color and icon) |
| `duration` | `number` | `3000` | Auto-close delay in ms. Set to `0` to disable auto-close |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center'` | `'bottom-right'` | Screen position |
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | Visual style |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when toast closes (auto or manual) |

## Notes

- Toast uses `<Teleport to="body">`, so it always floats above all other content.
- Auto-close starts `onMounted`. Set `duration="0"` when managing close manually.
- In VitePress, wrap `<LiquidToast>` in `<ClientOnly>` to avoid SSR Teleport issues.
