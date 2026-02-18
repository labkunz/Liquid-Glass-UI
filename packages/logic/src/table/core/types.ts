// ============================================================
// Table Engine — 型別定義
// 所有 schema 相關的 TypeScript 型別集中在此
// ============================================================

// ---- 欄位 Schema --------------------------------------------

/** 支援的對齊方式 */
export type ColumnAlign = 'left' | 'center' | 'right'

/** 排序方向 */
export type SortOrder = 'asc' | 'desc' | null

/**
 * 單一欄位的 Schema 定義（使用者傳入）
 */
export interface ColumnSchema {
  /** 對應 row 資料的 key */
  key: string
  /** 欄位顯示名稱 */
  label: string
  /** 欄寬（CSS 字串，例如 '120px'、'20%'） */
  width?: string
  /** 水平對齊，預設 'left' */
  align?: ColumnAlign
  /** 是否可排序，預設 false */
  sortable?: boolean
  /** 是否可過濾，預設 false */
  filterable?: boolean
  /**
   * 自訂格式化函式
   * 接收 cell 原始值與完整 row，回傳顯示字串
   */
  formatter?: (value: unknown, row: Record<string, unknown>) => string
}

/**
 * schema-parser 輸出的標準化欄位格式
 * 所有可選欄位都已填入預設值
 */
export interface NormalizedColumn {
  key: string
  label: string
  width: string | null
  align: ColumnAlign
  sortable: boolean
  filterable: boolean
  formatter: ((value: unknown, row: Record<string, unknown>) => string) | null
}

// ---- 狀態型別 -----------------------------------------------

/** 目前的排序狀態 */
export interface SortState {
  field: string | null
  order: SortOrder
}

/** 目前的過濾狀態：{ columnKey → 過濾字串 } */
export type FilterState = Record<string, string>

/** 分頁狀態 */
export interface PaginationState {
  /** 目前頁碼（1-based） */
  page: number
  /** 每頁筆數 */
  pageSize: number
}

// ---- 資料處理結果 -------------------------------------------

/** processData() 的回傳格式 */
export interface ProcessedData {
  /** 當前頁的資料 */
  rows: Record<string, unknown>[]
  /** 過濾後（分頁前）的總筆數 */
  total: number
  /** 總頁數 */
  totalPages: number
}

// ---- TableEngine 對外 Props ---------------------------------

export interface TableEngineProps {
  /** 欄位 Schema 列表 */
  columns: ColumnSchema[]
  /** 完整資料（全部 rows，由外部傳入） */
  rows: Record<string, unknown>[]
  /** 每頁筆數，預設 10 */
  pageSize?: number
  /** 表格樣式變體 */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered'
  /** 是否顯示斑馬紋 */
  striped?: boolean
  /** 是否啟用 hover 高亮 */
  hoverable?: boolean
  /** 是否顯示分頁列 */
  showPagination?: boolean
}
