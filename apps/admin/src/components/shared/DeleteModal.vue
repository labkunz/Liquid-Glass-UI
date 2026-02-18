<script setup lang="ts">
import { LiquidModal, LiquidButton } from '@liquid/ui'

interface Props {
  modelValue: boolean
  title?: string
  message?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '確認刪除',
  message: '此操作無法復原，確定要刪除嗎？',
  loading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

function close() {
  emit('update:modelValue', false)
}

function confirm() {
  emit('confirm')
}
</script>

<template>
  <LiquidModal
    :model-value="modelValue"
    :title="title"
    variant="glass-css-only"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <p class="delete-modal__message">{{ message }}</p>

    <template #footer>
      <div class="delete-modal__actions">
        <button class="btn btn--ghost" :disabled="loading" @click="close">
          取消
        </button>
        <button class="btn btn--danger" :disabled="loading" @click="confirm">
          <span v-if="loading">刪除中…</span>
          <span v-else>確認刪除</span>
        </button>
      </div>
    </template>
  </LiquidModal>
</template>

<style scoped>
.delete-modal__message {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 0.5rem 0;
}

.delete-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
