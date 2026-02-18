<script setup lang="ts">
// ============================================================
// ToastProvider — 全域 Toast 渲染層
// 掛在 App 根層一次即可，負責渲染 toastStore 中所有 toast 實例
//
// 使用方式（App.vue）：
//   <ToastProvider />
//   <RouterView />
// ============================================================

import { LiquidToast } from '@liquid/ui'
import { toastStore } from './toast'
</script>

<template>
  <!--
    直接渲染所有 ToastItem
    LiquidToast 本身已有 Teleport to="body"，
    所以此元件放在任何位置都不影響 DOM 結構
  -->
  <LiquidToast
    v-for="item in toastStore.items"
    :key="item.id"
    :model-value="item.visible"
    :type="item.type"
    :message="item.message"
    :position="item.position"
    :duration="0"
    :variant="item.variant"
    @update:model-value="(v) => { if (!v) item.visible = false }"
  />
</template>
