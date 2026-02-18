<script setup lang="ts">
import { GlassFilterProvider } from '@liquid/ui'
import { ToastProvider, ModalProvider } from '@liquid/logic/composables'
</script>

<template>
  <!-- data-theme="dark" 啟動暗色 glass token -->
  <div data-theme="dark">
    <GlassFilterProvider>
      <ToastProvider />
      <ModalProvider />
      <RouterView />
    </GlassFilterProvider>
  </div>
</template>
