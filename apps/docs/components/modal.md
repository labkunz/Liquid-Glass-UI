# Modal

A dialog overlay for confirmations, forms, or detailed content. Renders via `<Teleport to="body">` to avoid z-index issues.

## Demo

<script setup>
import { ref } from 'vue'
const showDefault = ref(false)
const showLg = ref(false)
</script>

### Default Modal

<div style="padding:1rem 0;">
  <LiquidButton variant="primary" @click="showDefault = true">Open Default Modal</LiquidButton>
</div>

<ClientOnly>
  <LiquidModal
    v-model="showDefault"
    title="Confirm Action"
    size="md"
    variant="default"
  >
    <p>Are you sure you want to proceed? This action cannot be undone.</p>
    <template #footer>
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <LiquidButton variant="outline" size="sm" @click="showDefault = false">Cancel</LiquidButton>
        <LiquidButton variant="danger" size="sm" @click="showDefault = false">Delete</LiquidButton>
      </div>
    </template>
  </LiquidModal>
</ClientOnly>

### Large Modal

<div style="padding:1rem 0;">
  <LiquidButton variant="outline" @click="showLg = true">Open Large Modal</LiquidButton>
</div>

<ClientOnly>
  <LiquidModal
    v-model="showLg"
    title="Detailed Information"
    size="lg"
    variant="default"
  >
    <p>This is a larger modal dialog, useful for displaying more content or embedding forms.</p>
    <p style="margin-top:1rem;color:#666;font-size:0.9rem;">Click outside the modal or the × button to close.</p>
    <template #footer>
      <div style="display:flex;justify-content:flex-end;">
        <LiquidButton variant="primary" size="sm" @click="showLg = false">Got it</LiquidButton>
      </div>
    </template>
  </LiquidModal>
</ClientOnly>

## Usage

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
    <!-- Default slot: modal body content -->
    <p>Are you sure you want to delete this item?</p>

    <!-- Named slot: footer actions -->
    <template #footer>
      <LiquidButton variant="outline" @click="isOpen = false">Cancel</LiquidButton>
      <LiquidButton variant="danger" @click="handleDelete">Delete</LiquidButton>
    </template>
  </LiquidModal>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Controls visibility (use with `v-model`) |
| `title` | `string` | `''` | Modal header title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal width |
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | Visual style |
| `showClose` | `boolean` | `true` | Show the × close button in the header |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when modal should close (overlay click or × button) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Modal body content |
| `footer` | Footer area (typically action buttons) |

## Notes

- Modal uses `<Teleport to="body">`, so it always renders above all other content.
- Clicking the overlay backdrop closes the modal by emitting `update:modelValue` with `false`.
- In VitePress, wrap `<LiquidModal>` in `<ClientOnly>` to avoid SSR hydration issues with Teleport.
