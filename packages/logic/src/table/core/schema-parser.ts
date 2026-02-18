// ============================================================
// Table Engine — Schema Parser
// 將使用者傳入的 ColumnSchema[] normalize 成內部統一格式
// ============================================================

import type {
  ColumnSchema,
  NormalizedColumn,
  SortState,
  FilterState,
  PaginationState,
} from './types'

// ---- 欄位標準化 ---------------------------------------------

/**
 * 將單一 ColumnSchema 標準化為 NormalizedColumn
 * 填入所有缺少的預設值
 */
function normalizeColumn(col: ColumnSchema): NormalizedColumn {
  return {
    key:        col.key,
    label:      col.label,
    width:      col.width ?? null,
    align:      col.align ?? 'left',
    sortable:   col.sortable ?? false,
    filterable: col.filterable ?? false,
    formatter:  col.formatter ?? null,
  }
}

/**
 * 將整個欄位陣列標準化
 * @param columns 使用者傳入的 ColumnSchema[]
 * @returns NormalizedColumn[] 可供 data-processor 使用
 */
export function parseColumns(columns: ColumnSchema[]): NormalizedColumn[] {
  return columns.map(normalizeColumn)
}

// ---- 初始狀態建立 -------------------------------------------

/**
 * 建立初始排序狀態
 */
export function buildInitialSortState(): SortState {
  return { field: null, order: null }
}

/**
 * 根據 filterable 欄位建立初始過濾狀態（全部為空字串）
 */
export function buildInitialFilterState(
  columns: NormalizedColumn[]
): FilterState {
  return Object.fromEntries(
    columns
      .filter((col) => col.filterable)
      .map((col) => [col.key, ''])
  )
}

/**
 * 建立初始分頁狀態
 * @param pageSize 每頁筆數，預設 10
 */
export function buildInitialPaginationState(pageSize = 10): PaginationState {
  return { page: 1, pageSize }
}
