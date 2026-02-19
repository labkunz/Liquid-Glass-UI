// ============================================================
// useModal — 命令式 Modal 管理
// 全域單例 store + composable
//
// 使用方式：
//   1. App 根層掛一個 <ModalProvider />
//   2. 在任意元件呼叫 useModal()
//
// API 範例：
//   modal.open({ title: '編輯', content: '...' })
//   const ok = await modal.confirm({ title: '確認刪除？' })
// ============================================================

import { reactive } from 'vue'
import type { Component } from 'vue'

// ---- 型別定義 -----------------------------------------------

export type ModalVariant = 'default' | 'glass-css-only' | 'glass-highlight-layered'
export type ModalSize    = 'sm' | 'md' | 'lg' | 'xl'

/** modal.open() 的選項 */
export interface ModalOpenOptions {
  /** Modal 標題 */
  title?: string
  /** Modal 尺寸，預設 'md' */
  size?: ModalSize
  /** 樣式變體，預設 'default' */
  variant?: ModalVariant
  /** 是否顯示右上角關閉按鈕，預設 true */
  showClose?: boolean
  /**
   * Modal 內容（字串 or Vue Component）
   * 字串：直接顯示為文字
   * Component：動態渲染該元件
   */
  content?: string | Component
  /**
   * 傳入動態元件的 props
   */
  contentProps?: Record<string, unknown>
}

/** modal.confirm() 的選項 */
export interface ModalConfirmOptions extends Omit<ModalOpenOptions, 'content' | 'contentProps'> {
  /** 確認說明文字 */
  message?: string
  /** 確認按鈕文字，預設 '確認' */
  confirmLabel?: string
  /** 取消按鈕文字，預設 '取消' */
  cancelLabel?: string
}

/** 內部 Modal 狀態 */
export interface ModalState {
  /** 是否顯示 */
  isOpen: boolean
  /** 是否為 confirm 模式（顯示確認/取消按鈕） */
  isConfirm: boolean
  /** 選項 */
  options: ModalOpenOptions & ModalConfirmOptions
  /**
   * confirm 模式下：resolve 此 Promise 讓呼叫方得到 true/false
   * open 模式下：null
   */
  _resolve: ((value: boolean) => void) | null
}

// ---- 全域單例 Store -----------------------------------------

export const modalStore: ModalState = reactive<ModalState>({
  isOpen:    false,
  isConfirm: false,
  options:   {},
  _resolve:  null,
})

// ---- Composable ---------------------------------------------

export function useModal() {
  /**
   * 開啟 Modal（一般模式，不等待回傳值）
   */
  function open(options: ModalOpenOptions = {}) {
    modalStore.isOpen    = true
    modalStore.isConfirm = false
    modalStore.options   = options
    modalStore._resolve  = null
  }

  /**
   * 關閉 Modal
   * 若處於 confirm 模式，視同 cancel（resolve false）
   */
  function close() {
    if (modalStore._resolve) {
      modalStore._resolve(false)
      modalStore._resolve = null
    }
    modalStore.isOpen = false
  }

  /**
   * 開啟確認 Modal，回傳 Promise<boolean>
   * - 使用者點「確認」→ resolve(true)
   * - 使用者點「取消」或關閉 → resolve(false)
   */
  function confirm(options: ModalConfirmOptions = {}): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      modalStore.isOpen    = true
      modalStore.isConfirm = true
      modalStore.options   = {
        size:         options.size         ?? 'sm',
        variant:      options.variant      ?? 'default',
        showClose:    options.showClose    ?? true,
        title:        options.title        ?? '確認',
        message:      options.message      ?? '',
        confirmLabel: options.confirmLabel ?? '確認',
        cancelLabel:  options.cancelLabel  ?? '取消',
      }
      modalStore._resolve = resolve
    })
  }

  /**
   * confirm 模式下點擊「確認」按鈕
   */
  function _confirmOk() {
    if (modalStore._resolve) {
      modalStore._resolve(true)
      modalStore._resolve = null
    }
    modalStore.isOpen = false
  }

  /**
   * confirm 模式下點擊「取消」按鈕
   */
  function _confirmCancel() {
    close()
  }

  return {
    modal: { open, close, confirm },
    /** ModalProvider 內部使用，請勿在外部呼叫 */
    _internal: { _confirmOk, _confirmCancel },
  }
}
