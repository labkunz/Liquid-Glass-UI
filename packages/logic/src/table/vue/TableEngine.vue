<script setup lang="ts">
// ============================================================
// TableEngine — 主元件
// 接收 columns schema + rows，串接 core 層三個模組：
//   1. schema-parser  → 標準化欄位
//   2. data-processor → sort → filter → paginate
//   3. 渲染 LiquidTable + LiquidPagination
// ============================================================

import { computed, reactive, watch } from 'vue'
import { LiquidPagination } from '@liquid/ui'
import type { TableColumn } from '@liquid/ui'

import { parseColumns, buildInitialSortState, buildInitialFilterState, buildInitialPaginationState } from '../core/schema-parser'
import { processData } from '../core/data-processor'

import type { SortState, TableEngineProps } from '../core/types'

// ---- Props / Emits ------------------------------------------

const props = withDefaults(defineProps<TableEngineProps>(), {
  pageSize:       10,
  variant:        'default',
  striped:        false,
  hoverable:      true,
  showPagination: true,
})

const emit = defineEmits<{
  /** 排序改變時發出（供 server-side 擴充） */
  'sort-change': [sort: SortState]
  /** 換頁時發出（供 server-side 擴充） */
  'page-change': [page: number]
}>()

// ---- Core 層資料流 ------------------------------------------

/** Step 1：標準化 column schema */
const normalizedColumns = computed(() => parseColumns(props.columns))

/** 內部狀態 */
const sortState = reactive<SortState>(buildInitialSortState())

const filterState = reactive(
  buildInitialFilterState(normalizedColumns.value)
)

const paginationState = reactive(
  buildInitialPaginationState(props.pageSize)
)

// 當 pageSize prop 改變時同步更新
watch(() => props.pageSize, (size) => {
  paginationState.pageSize = size
  paginationState.page = 1
})

// 當 columns 改變時，重建 filterState
watch(normalizedColumns, (cols) => {
  const fresh = buildInitialFilterState(cols)
  // 清除舊的 key，補入新的
  for (const key of Object.keys(filterState)) {
    delete filterState[key]
  }
  Object.assign(filterState, fresh)
})

/** Step 2：處理資料（sort + filter + paginate） */
const processed = computed(() =>
  processData(
    props.rows,
    normalizedColumns.value,
    sortState,
    filterState,
    paginationState,
  )
)

// ---- 欄位轉換（符合 LiquidTable 的 TableColumn 格式） --------

const tableColumns = computed<TableColumn[]>(() =>
  normalizedColumns.value.map((col) => ({
    key:   col.key,
    label: col.label,
    width: col.width ?? undefined,
    align: col.align,
  }))
)

/** 格式化後的當前頁 rows（套用 formatter） */
const displayRows = computed(() =>
  processed.value.rows.map((row) => {
    const formatted: Record<string, unknown> = { ...row }
    for (const col of normalizedColumns.value) {
      if (col.formatter) {
        formatted[col.key] = col.formatter(row[col.key], row)
      }
    }
    return formatted
  })
)

// ---- 事件處理 -----------------------------------------------

function handleSortClick(key: string) {
  const col = normalizedColumns.value.find((c) => c.key === key)
  if (!col?.sortable) return

  if (sortState.field === key) {
    // 切換方向：asc → desc → null
    if (sortState.order === 'asc')       sortState.order = 'desc'
    else if (sortState.order === 'desc') { sortState.field = null; sortState.order = null }
  } else {
    sortState.field = key
    sortState.order = 'asc'
  }

  // 重置到第一頁
  paginationState.page = 1
  emit('sort-change', { ...sortState })
}

function handlePageChange(page: number) {
  paginationState.page = page
  emit('page-change', page)
}

function handleFilterInput(key: string, value: string) {
  filterState[key] = value
  // 過濾後重置到第一頁
  paginationState.page = 1
}

// ---- 排序圖示 helper ----------------------------------------

function getSortIcon(key: string): string {
  if (sortState.field !== key) return '⇅'
  return sortState.order === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <div class="table-engine">
    <!-- 過濾列（只顯示 filterable 欄位） -->
    <div
      v-if="normalizedColumns.some((c) => c.filterable)"
      class="table-engine__filters"
    >
      <template v-for="col in normalizedColumns" :key="col.key">
        <div v-if="col.filterable" class="table-engine__filter-item">
          <label class="table-engine__filter-label">{{ col.label }}</label>
          <input
            class="table-engine__filter-input"
            type="text"
            :placeholder="`搜尋 ${col.label}…`"
            :value="filterState[col.key] ?? ''"
            @input="handleFilterInput(col.key, ($event.target as HTMLInputElement).value)"
          />
        </div>
      </template>
    </div>

    <!-- 表格主體 -->
    <div class="table-engine__table-wrapper">
      <table class="table-engine__table">
        <thead>
          <tr>
            <th
              v-for="col in tableColumns"
              :key="col.key"
              class="table-engine__th"
              :class="{
                'table-engine__th--sortable': normalizedColumns.find((c) => c.key === col.key)?.sortable,
                [`table-engine__th--${col.align ?? 'left'}`]: true,
              }"
              :style="col.width ? { width: col.width } : {}"
              @click="handleSortClick(col.key)"
            >
              {{ col.label }}
              <span
                v-if="normalizedColumns.find((c) => c.key === col.key)?.sortable"
                class="table-engine__sort-icon"
                :class="{ 'table-engine__sort-icon--active': sortState.field === col.key }"
              >
                {{ getSortIcon(col.key) }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in displayRows"
            :key="i"
            class="table-engine__tr"
            :class="{ 'table-engine__tr--striped': striped && i % 2 === 1 }"
          >
            <td
              v-for="col in tableColumns"
              :key="col.key"
              class="table-engine__td"
              :class="[`table-engine__td--${col.align ?? 'left'}`]"
            >
              <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="displayRows.length === 0">
            <td :colspan="tableColumns.length" class="table-engine__empty">
              無資料
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分頁 -->
    <div v-if="showPagination && processed.totalPages > 1" class="table-engine__pagination">
      <span class="table-engine__total">共 {{ processed.total }} 筆</span>
      <LiquidPagination
        :current-page="paginationState.page"
        :total-pages="processed.totalPages"
        :variant="variant"
        @update:current-page="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.table-engine {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ---- 過濾列 ---- */
.table-engine__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.table-engine__filter-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.table-engine__filter-label {
  font-size: 12px;
  color: #666;
}
.table-engine__filter-input {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.table-engine__filter-input:focus {
  border-color: #999;
}

/* ---- 表格 ---- */
.table-engine__table-wrapper {
  overflow-x: auto;
}
.table-engine__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.table-engine__th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
  user-select: none;
}
.table-engine__th--sortable {
  cursor: pointer;
}
.table-engine__th--sortable:hover {
  background: rgba(0, 0, 0, 0.04);
}
.table-engine__th--center { text-align: center; }
.table-engine__th--right  { text-align: right;  }

.table-engine__sort-icon {
  margin-left: 4px;
  font-size: 11px;
  opacity: 0.4;
}
.table-engine__sort-icon--active {
  opacity: 1;
  color: #6366f1;
}

.table-engine__tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.15s;
}
.table-engine__tr:hover {
  background: rgba(0, 0, 0, 0.03);
}
.table-engine__tr--striped {
  background: rgba(0, 0, 0, 0.02);
}

.table-engine__td {
  padding: 10px 12px;
  text-align: left;
}
.table-engine__td--center { text-align: center; }
.table-engine__td--right  { text-align: right;  }

.table-engine__empty {
  padding: 32px;
  text-align: center;
  color: #9ca3af;
}

/* ---- 分頁列 ---- */
.table-engine__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.table-engine__total {
  font-size: 13px;
  color: #6b7280;
}
</style>
