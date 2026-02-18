<script setup lang="ts">
// ============================================================
// ModalProvider — 全域 Modal 渲染層
// 掛在 App 根層一次，負責渲染 modalStore 狀態
//
// 使用方式（App.vue）：
//   <ModalProvider />
//   <RouterView />
// ============================================================

import { computed } from 'vue'
import { LiquidModal, LiquidButton } from '@liquid/ui'
import { modalStore, useModal } from './modal'
import type { Component } from 'vue'

const { _internal } = useModal()

const opts = computed(() => modalStore.options)

/** 判斷 content 是 Vue Component 還是字串 */
const isComponentContent = computed(
  () => opts.value.content !== undefined && typeof opts.value.content === 'object'
)

const contentComponent = computed(
  () => isComponentContent.value ? (opts.value.content as Component) : null
)

const contentText = computed(
  () => !isComponentContent.value ? (opts.value.content as string | undefined) : undefined
)

function handleClose() {
  useModal().modal.close()
}
</script>

<template>
  <LiquidModal
    :model-value="modalStore.isOpen"
    :title="opts.title ?? ''"
    :size="opts.size ?? 'md'"
    :variant="opts.variant ?? 'default'"
    :show-close="opts.showClose ?? true"
    @update:model-value="(v) => { if (!v) handleClose() }"
  >
    <!-- 內容區：confirm 模式顯示 message，一般模式顯示 content -->
    <template v-if="modalStore.isConfirm">
      <p class="modal-provider__message">{{ opts.message }}</p>
    </template>
    <template v-else>
      <!-- 動態元件 -->
      <component
        :is="contentComponent"
        v-if="isComponentContent && contentComponent"
        v-bind="opts.contentProps ?? {}"
      />
      <!-- 純文字 -->
      <span v-else-if="contentText">{{ contentText }}</span>
    </template>

    <!-- Footer：confirm 模式才顯示確認/取消按鈕 -->
    <template v-if="modalStore.isConfirm" #footer>
      <div class="modal-provider__actions">
        <LiquidButton
          variant="outline"
          size="sm"
          @click="_internal._confirmCancel()"
        >
          {{ opts.cancelLabel ?? '取消' }}
        </LiquidButton>
        <LiquidButton
          variant="primary"
          size="sm"
          @click="_internal._confirmOk()"
        >
          {{ opts.confirmLabel ?? '確認' }}
        </LiquidButton>
      </div>
    </template>
  </LiquidModal>
</template>

<style scoped>
.modal-provider__message {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.modal-provider__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
