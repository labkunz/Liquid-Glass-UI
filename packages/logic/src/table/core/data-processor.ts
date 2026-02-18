// ============================================================
// Table Engine — Data Processor
// 負責 sort → filter → paginate 三段資料處理流程
// 全部為純函式，不依賴 Vue 響應系統
// ============================================================

import type {
  NormalizedColumn,
  SortState,
  FilterState,
  PaginationState,
  ProcessedData,
} from './types'

// ---- 排序 ---------------------------------------------------

/**
 * 依 SortState 對 rows 進行排序
 * - 自動判斷數字 / 字串，分別採用數值比較或 localeCompare
 * - order 為 null 時回傳原陣列（不排序）
 */
export function sortRows(
  rows: Record<string, unknown>[],
  sort: SortState
): Record<string, unknown>[] {
  if (sort.field === null || sort.order === null) return rows

  const { field, order } = sort
  const direction = order === 'asc' ? 1 : -1

  return [...rows].sort((a, b) => {
    const av = a[field]
    const bv = b[field]

    // 數值比較
    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * direction
    }

    // 字串比較（含中文）
    const as = String(av ?? '')
    const bs = String(bv ?? '')
    return as.localeCompare(bs, 'zh-Hant-TW', { numeric: true }) * direction
  })
}

// ---- 過濾 ---------------------------------------------------

/**
 * 依 FilterState 對 rows 進行模糊過濾
 * - 只比較 filterable 欄位
 * - 空字串不過濾（視為無條件）
 * - 大小寫不敏感
 */
export function filterRows(
  rows: Record<string, unknown>[],
  filters: FilterState,
  columns: NormalizedColumn[]
): Record<string, unknown>[] {
  // 只取有值的過濾條件
  const activeFilters = Object.entries(filters).filter(([, v]) => v.trim() !== '')
  if (activeFilters.length === 0) return rows

  // 建立 filterable key set，快速查詢
  const filterableKeys = new Set(
    columns.filter((c) => c.filterable).map((c) => c.key)
  )

  return rows.filter((row) =>
    activeFilters.every(([key, filterValue]) => {
      if (!filterableKeys.has(key)) return true
      const cellValue = String(row[key] ?? '').toLowerCase()
      return cellValue.includes(filterValue.toLowerCase())
    })
  )
}

// ---- 分頁 ---------------------------------------------------

/**
 * 計算總頁數
 */
export function getTotalPages(total: number, pageSize: number): number {
  if (pageSize <= 0) return 1
  return Math.max(1, Math.ceil(total / pageSize))
}

/**
 * 依分頁狀態切片 rows
 */
export function paginateRows(
  rows: Record<string, unknown>[],
  pagination: PaginationState
): Record<string, unknown>[] {
  const { page, pageSize } = pagination
  const start = (page - 1) * pageSize
  return rows.slice(start, start + pageSize)
}

// ---- 主入口 -------------------------------------------------

/**
 * 主資料處理流程：sort → filter → paginate
 * @param allRows   全部原始資料
 * @param columns   標準化後的欄位定義
 * @param sort      排序狀態
 * @param filters   過濾狀態
 * @param pagination 分頁狀態
 * @returns ProcessedData（當前頁資料 + 過濾後總筆數 + 總頁數）
 */
export function processData(
  allRows: Record<string, unknown>[],
  columns: NormalizedColumn[],
  sort: SortState,
  filters: FilterState,
  pagination: PaginationState
): ProcessedData {
  // Step 1: 排序
  const sorted = sortRows(allRows, sort)

  // Step 2: 過濾
  const filtered = filterRows(sorted, filters, columns)

  // Step 3: 計算分頁
  const total = filtered.length
  const totalPages = getTotalPages(total, pagination.pageSize)

  // 防止當前頁超出範圍（過濾後頁數可能縮減）
  const safePage = Math.min(pagination.page, totalPages)
  const safePagination = { ...pagination, page: safePage }

  // Step 4: 分頁切片
  const rows = paginateRows(filtered, safePagination)

  return { rows, total, totalPages }
}
