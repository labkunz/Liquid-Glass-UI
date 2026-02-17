// ============================================================
// Form Engine — Condition Evaluator
// 根據目前的 formData，決定哪些欄位應該顯示
// ============================================================

import type { NormalizedField, ConditionOperator } from './types'

// ---- 單一條件判斷 --------------------------------------------

/**
 * 執行單一條件的判斷
 * @param operator 比較運算子
 * @param current  目前欄位的值
 * @param target   schema 設定的比較值
 */
function evaluateOperator(
  operator: ConditionOperator,
  current: unknown,
  target: unknown
): boolean {
  switch (operator) {
    // 等於
    case 'eq':
      return current === target

    // 不等於
    case 'neq':
      return current !== target

    // 包含於（target 必須是陣列）
    case 'in':
      return Array.isArray(target) && target.includes(current)

    // 不包含於（target 必須是陣列）
    case 'nin':
      return Array.isArray(target) && !target.includes(current)

    default:
      return false
  }
}

// ---- 欄位可見性判斷 ------------------------------------------

/**
 * 判斷單一欄位在目前 formData 下是否應該顯示
 * @param field    已標準化的欄位定義
 * @param formData 目前的表單資料
 * @returns true 表示應顯示，false 表示隱藏
 */
export function isFieldVisible(
  field: NormalizedField,
  formData: Record<string, unknown>
): boolean {
  // 沒有條件設定 → 永遠顯示
  if (field.condition === null) return true

  const { field: targetKey, operator = 'eq', value } = field.condition
  const currentValue = formData[targetKey]

  return evaluateOperator(operator, currentValue, value)
}

// ---- 批量過濾 ------------------------------------------------

/**
 * 從所有欄位中過濾出「目前應該顯示」的欄位
 * @param fields   所有欄位（已標準化）
 * @param formData 目前的表單資料
 * @returns 應顯示的欄位陣列，順序保持不變
 */
export function getVisibleFields(
  fields: NormalizedField[],
  formData: Record<string, unknown>
): NormalizedField[] {
  return fields.filter((field) => isFieldVisible(field, formData))
}

/**
 * 取得所有「目前隱藏」的欄位 key
 * 用途：送出表單前清除隱藏欄位的值，避免送出不相關的資料
 */
export function getHiddenFieldKeys(
  fields: NormalizedField[],
  formData: Record<string, unknown>
): string[] {
  return fields
    .filter((field) => !isFieldVisible(field, formData))
    .map((field) => field.key)
}
