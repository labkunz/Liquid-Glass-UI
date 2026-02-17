// ============================================================
// Form Engine — 型別定義
// 所有 schema 相關的 TypeScript 型別集中在此
// ============================================================

// ---- 欄位類型 -----------------------------------------------

/** 支援的欄位類型 */
export type FieldType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'date'

// ---- 驗證規則 -----------------------------------------------

/**
 * 驗證函式：接收欄位值與整個表單資料
 * 回傳 true 代表通過；回傳 string 代表失敗並附帶錯誤訊息
 */
export type ValidationFn = (
  value: unknown,
  formData: Record<string, unknown>
) => true | string

/** 內建驗證規則的簡寫形式（之後 schema-parser 會展開成 ValidationFn） */
export interface BuiltinRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
}

/** 欄位的完整驗證規則：可以是內建簡寫或自訂函式 */
export type ValidationRule = ValidationFn | BuiltinRules

// ---- 條件顯示 -----------------------------------------------

/** 支援的條件運算子 */
export type ConditionOperator = 'eq' | 'neq' | 'in' | 'nin'

/**
 * 欄位的條件顯示設定
 * 當指定欄位（field）的值滿足條件時，此欄位才會顯示
 */
export interface FieldCondition {
  /** 要觀察的目標欄位 key */
  field: string
  /** 比較運算子，預設為 'eq' */
  operator?: ConditionOperator
  /** 用來比較的值 */
  value: unknown
}

// ---- Select / Radio / Checkbox 的選項 ----------------------

export interface FieldOption {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

// ---- 欄位 Schema --------------------------------------------

/**
 * 單一欄位的完整 Schema 定義
 */
export interface FieldSchema {
  /** 欄位識別鍵，對應 formData 的屬性名 */
  key: string
  /** 欄位類型 */
  type: FieldType
  /** 顯示標籤 */
  label: string
  /** Placeholder 文字 */
  placeholder?: string
  /** 是否必填（內建驗證，等同於 rules: [{ required: true }]） */
  required?: boolean
  /** 驗證規則列表 */
  rules?: ValidationRule[]
  /** 條件顯示設定，不填表示永遠顯示 */
  condition?: FieldCondition
  /** Select / Radio / Checkbox 的選項列表 */
  options?: FieldOption[]
  /** 預設值 */
  defaultValue?: unknown
  /** 是否禁用 */
  disabled?: boolean
}

// ---- 解析後的欄位（內部使用） --------------------------------

/**
 * schema-parser 輸出的標準化欄位格式
 * 所有可選欄位都已填入預設值
 */
export interface NormalizedField extends Required<Pick<FieldSchema, 'key' | 'type' | 'label'>> {
  placeholder: string
  required: boolean
  rules: ValidationFn[]       // 已展開成純函式，不含 BuiltinRules 物件
  condition: FieldCondition | null
  options: FieldOption[]
  defaultValue: unknown
  disabled: boolean
}

// ---- 驗證結果 -----------------------------------------------

/** 單一欄位的驗證結果 */
export interface FieldValidationResult {
  valid: boolean
  message: string | null
}

/** 整個表單的驗證結果：key → 驗證結果 */
export type FormValidationResult = Record<string, FieldValidationResult>

// ---- FormEngine 對外 Props ----------------------------------

export interface FormEngineProps {
  /** 欄位 Schema 列表 */
  schema: FieldSchema[]
  /** 表單資料（v-model） */
  modelValue: Record<string, unknown>
  /** 是否顯示送出按鈕 */
  showSubmit?: boolean
  /** 送出按鈕文字 */
  submitLabel?: string
}
