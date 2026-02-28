<script setup lang="ts">
// ============================================================
// FormEngine — 主元件
// 接收 schema + v-model，串接 core 層的三個模組：
//   1. schema-parser  → 標準化欄位
//   2. condition      → 過濾可見欄位
//   3. validator      → 驗證可見欄位
// ============================================================

import { computed, ref } from 'vue'

import { parseSchema } from '../core/schema-parser'
import { getVisibleFields, getHiddenFieldKeys } from '../core/condition'
import { validateForm, isFormValid, extractErrors } from '../core/validator'

import type { FieldSchema } from '../core/types'
import FormField from './FormField.vue'

// ---- Props / Emits ------------------------------------------

interface Props {
  schema: FieldSchema[]
  modelValue: Record<string, unknown>
  showSubmit?: boolean
  submitLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showSubmit:  true,
  submitLabel: '送出',
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>]
  'submit': [value: Record<string, unknown>]
}>()

// ---- Core 層資料流 ------------------------------------------

/** Step 1：標準化 schema（只在 schema 改變時重算） */
const normalizedFields = computed(() => parseSchema(props.schema))

/** Step 2：根據目前 formData 過濾可見欄位 */
const visibleFields = computed(() =>
  getVisibleFields(normalizedFields.value, props.modelValue)
)

// ---- 驗證狀態 ------------------------------------------------

/** 是否曾經嘗試送出（控制錯誤訊息是否顯示） */
const submitted = ref(false)

/** 目前的錯誤訊息（只有 submitted 後才計算） */
const errors = computed(() => {
  if (!submitted.value) return {}
  const result = validateForm(visibleFields.value, props.modelValue)
  return extractErrors(result)
})

// ---- 事件處理 ------------------------------------------------

function handleFieldUpdate(key: string, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function handleSubmit() {
  submitted.value = true

  // 清除隱藏欄位的值
  const hiddenKeys = getHiddenFieldKeys(normalizedFields.value, props.modelValue)
  const cleanedData = { ...props.modelValue }
  for (const key of hiddenKeys) {
    delete cleanedData[key]
  }

  // 驗證
  const result = validateForm(visibleFields.value, cleanedData)
  if (!isFormValid(result)) return

  emit('submit', cleanedData)
}
</script>

<template>
  <form
    class="form-engine"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <!-- 依序渲染可見欄位 -->
    <FormField
      v-for="field in visibleFields"
      :key="field.key"
      :field="field"
      :model-value="modelValue[field.key]"
      :error="errors[field.key] ?? null"
      @update:model-value="handleFieldUpdate(field.key, $event)"
    />

    <!-- 送出按鈕：有自訂 #actions slot 或 showSubmit=true 時才渲染容器 -->
    <div
      v-if="showSubmit || $slots['actions']"
      class="form-engine__actions"
    >
      <slot name="actions">
        <button
          v-if="showSubmit"
          type="submit"
          class="form-engine__submit"
        >
          {{ submitLabel }}
        </button>
      </slot>
    </div>
  </form>
</template>
