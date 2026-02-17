<script setup lang="ts">
// ============================================================
// FormField — 單一欄位渲染器
// 根據 NormalizedField.type 決定渲染哪個 @liquid/ui 元件
// ============================================================

import {
  LiquidInput,
  LiquidTextarea,
  LiquidSelect,
  LiquidCheckbox,
  LiquidRadio,
  LiquidToggle,
  LiquidDatePicker,
} from '@liquid/ui'

import type { NormalizedField } from '../core/types'

// ---- Props --------------------------------------------------

interface Props {
  field: NormalizedField
  modelValue: unknown
  error: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: unknown]
}>()

// ---- type → 元件對應 ----------------------------------------

// 之後 FormField.vue template 的 <component :is="..." /> 會用到
// 目前先定義對應關係，實際綁定在 template 完成
const componentMap = {
  input:    LiquidInput,
  textarea: LiquidTextarea,
  select:   LiquidSelect,
  checkbox: LiquidCheckbox,
  radio:    LiquidRadio,
  toggle:   LiquidToggle,
  date:     LiquidDatePicker,
} as const

// ---- 事件處理 -----------------------------------------------

function handleUpdate(value: unknown) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="form-field">
    <!-- 欄位標籤 -->
    <label class="form-field__label">
      {{ field.label }}
      <span v-if="field.required" class="form-field__required" aria-hidden="true">*</span>
    </label>

    <!-- 動態渲染對應 UI 元件 -->
    <component
      :is="componentMap[field.type]"
      :model-value="modelValue"
      :placeholder="field.placeholder"
      :disabled="field.disabled"
      :options="field.options"
      @update:model-value="handleUpdate"
    />

    <!-- 錯誤訊息 -->
    <p v-if="error" class="form-field__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>
