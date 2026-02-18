// ============================================================
// useToast — 命令式 Toast 管理
// 全域單例 store + composable
// 使用方式：
//   1. App 根層掛一個 <ToastProvider />
//   2. 在任意元件呼叫 useToast()
// ============================================================

import { reactive } from 'vue'

// ---- 型別定義 -----------------------------------------------

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

export type ToastVariant = 'default' | 'glass-css-only' | 'glass-highlight-layered'

export interface ToastOptions {
  /** Toast 類型，影響圖示與顏色 */
  type?: ToastType
  /** 顯示位置，預設 'bottom-right' */
  position?: ToastPosition
  /** 自動關閉時間（ms），0 表示不自動關閉，預設 3000 */
  duration?: number
  /** 樣式變體，預設 'default' */
  variant?: ToastVariant
}

/** 內部 Toast 實例 */
export interface ToastItem extends Required<ToastOptions> {
  /** 唯一識別碼 */
  id: string
  /** 顯示訊息 */
  message: string
  /** 是否顯示（控制 LiquidToast 的 v-model） */
  visible: boolean
}

// ---- 全域單例 Store -----------------------------------------

/**
 * 全域唯一的 toast 列表
 * 所有 useToast() 呼叫都共用同一個 reactive 陣列
 */
export const toastStore = reactive<{ items: ToastItem[] }>({ items: [] })

// ---- 工具函式 -----------------------------------------------

let _idCounter = 0
function generateId(): string {
  return `toast-${Date.now()}-${++_idCounter}`
}

// ---- Composable ---------------------------------------------

export function useToast() {
  /**
   * 新增一個 toast
   */
  function add(message: string, options?: ToastOptions): string {
    const id = generateId()
    const item: ToastItem = {
      id,
      message,
      type:     options?.type     ?? 'info',
      position: options?.position ?? 'bottom-right',
      duration: options?.duration ?? 3000,
      variant:  options?.variant  ?? 'default',
      visible:  true,
    }

    toastStore.items.push(item)

    // 自動移除
    if (item.duration > 0) {
      setTimeout(() => dismiss(id), item.duration)
    }

    return id
  }

  /** 關閉指定 toast */
  function dismiss(id: string) {
    const index = toastStore.items.findIndex((t) => t.id === id)
    if (index !== -1) {
      // 先設 visible = false（讓 LiquidToast 的 Transition 播出）
      toastStore.items[index].visible = false
      // 動畫後移除
      setTimeout(() => {
        toastStore.items.splice(
          toastStore.items.findIndex((t) => t.id === id),
          1
        )
      }, 400)
    }
  }

  /** 關閉所有 toast */
  function clear() {
    toastStore.items.forEach((t) => (t.visible = false))
    setTimeout(() => { toastStore.items.splice(0) }, 400)
  }

  // ---- 快捷方法 -----------------------------------------------

  const toast = {
    /** 顯示資訊 toast */
    info:    (msg: string, opts?: Omit<ToastOptions, 'type'>) => add(msg, { ...opts, type: 'info' }),
    /** 顯示成功 toast */
    success: (msg: string, opts?: Omit<ToastOptions, 'type'>) => add(msg, { ...opts, type: 'success' }),
    /** 顯示警告 toast */
    warning: (msg: string, opts?: Omit<ToastOptions, 'type'>) => add(msg, { ...opts, type: 'warning' }),
    /** 顯示錯誤 toast */
    error:   (msg: string, opts?: Omit<ToastOptions, 'type'>) => add(msg, { ...opts, type: 'error' }),
    /** 關閉指定 id 的 toast */
    dismiss,
    /** 關閉所有 toast */
    clear,
  }

  return { toast }
}
