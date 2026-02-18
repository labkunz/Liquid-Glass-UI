<script setup lang="ts">
import { GlassFilterProvider, LiquidToast } from '@liquid/ui'
import { toastState, dismiss } from './composables/useToast'
</script>

<template>
  <GlassFilterProvider>
    <!-- 全域 Toast 渲染層 -->
    <LiquidToast
      v-for="item in toastState.items"
      :key="item.id"
      :model-value="item.visible"
      :message="item.message"
      :type="item.type"
      :duration="0"
      position="bottom-right"
      variant="glass-css-only"
      @update:model-value="(v) => { if (!v) dismiss(item.id) }"
    />

    <RouterView />
  </GlassFilterProvider>
</template>
