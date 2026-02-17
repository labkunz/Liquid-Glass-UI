// ============================================================
// Form Engine — Validator
// 對「目前可見的欄位」逐一執行驗證規則
// ============================================================

import type {
  NormalizedField,
  FieldValidationResult,
  FormValidationResult,
} from './types'

// ---- 單一欄位驗證 --------------------------------------------

/**
 * 對單一欄位執行所有驗證規則
 * 規則按順序執行，遇到第一個失敗即停止（短路求值）
 *
 * @param field    已標準化的欄位定義（含 rules）
 * @param value    此欄位目前的值
 * @param formData 整個表單資料（供跨欄位驗證使用）
 */
export function validateField(
  field: NormalizedField,
  value: unknown,
  formData: Record<string, unknown>
): FieldValidationResult {
  for (const rule of field.rules) {
    const result = rule(value, formData)

    if (result !== true) {
      return { valid: false, message: result }
    }
  }

  return { valid: true, message: null }
}

// ---- 整個表單驗證 --------------------------------------------

/**
 * 對「目前可見欄位」全部驗證，回傳每個 key 的驗證結果
 *
 * 注意：只傳入可見欄位（由 condition.ts 過濾後的結果），
 * 隱藏欄位不需要驗證
 *
 * @param visibleFields 目前可見的欄位（已標準化）
 * @param formData      目前的表單資料
 */
export function validateForm(
  visibleFields: NormalizedField[],
  formData: Record<string, unknown>
): FormValidationResult {
  const result: FormValidationResult = {}

  for (const field of visibleFields) {
    const value = formData[field.key]
    result[field.key] = validateField(field, value, formData)
  }

  return result
}

// ---- 輔助工具 ------------------------------------------------

/**
 * 判斷整個表單驗證結果是否全部通過
 */
export function isFormValid(result: FormValidationResult): boolean {
  return Object.values(result).every((r) => r.valid)
}

/**
 * 從驗證結果中取出所有錯誤訊息
 * 回傳格式：{ key: errorMessage }，只包含有錯誤的欄位
 */
export function extractErrors(
  result: FormValidationResult
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const [key, fieldResult] of Object.entries(result)) {
    if (!fieldResult.valid && fieldResult.message) {
      errors[key] = fieldResult.message
    }
  }

  return errors
}
