// ============================================================
// Form Engine — Schema Parser
// 負責將使用者傳入的 FieldSchema[] normalize 成內部統一格式
// ============================================================

import type {
  FieldSchema,
  NormalizedField,
  ValidationFn,
  ValidationRule,
  BuiltinRules,
} from './types'

// ---- 內建驗證規則展開 ----------------------------------------

/**
 * 判斷一個 ValidationRule 是否為內建簡寫物件（BuiltinRules）
 * 而非自訂函式
 */
function isBuiltinRules(rule: ValidationRule): rule is BuiltinRules {
  return typeof rule === 'object'
}

/**
 * 將 BuiltinRules 物件展開成 ValidationFn[]
 * 這樣 validator.ts 只需要處理純函式，不用再判斷格式
 */
function expandBuiltinRules(rules: BuiltinRules): ValidationFn[] {
  const fns: ValidationFn[] = []

  if (rules.required) {
    fns.push((value) =>
      value !== undefined && value !== null && value !== ''
        ? true
        : '此欄位為必填'
    )
  }

  if (rules.minLength !== undefined) {
    const min = rules.minLength
    fns.push((value) =>
      typeof value === 'string' && value.length >= min
        ? true
        : `至少需要 ${min} 個字元`
    )
  }

  if (rules.maxLength !== undefined) {
    const max = rules.maxLength
    fns.push((value) =>
      typeof value === 'string' && value.length <= max
        ? true
        : `最多 ${max} 個字元`
    )
  }

  if (rules.pattern !== undefined) {
    const pattern = rules.pattern
    fns.push((value) =>
      typeof value === 'string' && pattern.test(value)
        ? true
        : '格式不正確'
    )
  }

  if (rules.email) {
    fns.push((value) =>
      typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? true
        : '請輸入有效的 Email 格式'
    )
  }

  return fns
}

/**
 * 將單一 ValidationRule 轉成 ValidationFn[]
 */
function normalizeRule(rule: ValidationRule): ValidationFn[] {
  if (typeof rule === 'function') return [rule]
  if (isBuiltinRules(rule)) return expandBuiltinRules(rule)
  return []
}

// ---- Schema 標準化 ------------------------------------------

/**
 * 將單一 FieldSchema 標準化為 NormalizedField
 * 填入所有缺少的預設值，並將 rules 展開成純函式陣列
 */
function normalizeField(field: FieldSchema): NormalizedField {
  // 將 required: true 轉成對應的驗證規則，插入 rules 最前面
  const builtinRequired: ValidationFn[] = field.required
    ? [(value) => (value !== undefined && value !== null && value !== '' ? true : '此欄位為必填')]
    : []

  const expandedRules: ValidationFn[] = (field.rules ?? []).flatMap(normalizeRule)

  return {
    key:          field.key,
    type:         field.type,
    label:        field.label,
    placeholder:  field.placeholder ?? '',
    required:     field.required ?? false,
    rules:        [...builtinRequired, ...expandedRules],
    condition:    field.condition ?? null,
    options:      field.options ?? [],
    defaultValue: field.defaultValue ?? undefined,
    disabled:     field.disabled ?? false,
  }
}

/**
 * 將整個 schema 陣列標準化
 * @param schema 使用者傳入的 FieldSchema[]
 * @returns NormalizedField[] 可供 condition / validator 使用
 */
export function parseSchema(schema: FieldSchema[]): NormalizedField[] {
  return schema.map(normalizeField)
}

/**
 * 根據 schema 建立表單的初始資料物件
 * 使用各欄位的 defaultValue，沒有則填 undefined
 */
export function buildInitialValues(
  schema: NormalizedField[]
): Record<string, unknown> {
  return Object.fromEntries(
    schema.map((field) => [field.key, field.defaultValue ?? undefined])
  )
}
