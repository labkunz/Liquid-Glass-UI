import { reactive } from 'vue'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastItem {
  id: string
  message: string
  type: ToastType
  visible: boolean
}

export const toastState = reactive<{ items: ToastItem[] }>({ items: [] })

let counter = 0

function dismiss(id: string) {
  const item = toastState.items.find((t) => t.id === id)
  if (item) {
    item.visible = false
    setTimeout(() => {
      const idx = toastState.items.findIndex((t) => t.id === id)
      if (idx !== -1) toastState.items.splice(idx, 1)
    }, 400)
  }
}

export function useToast() {
  function show(message: string, type: ToastType = 'success') {
    const id = `toast-${++counter}`
    toastState.items.push({ id, message, type, visible: true })
    setTimeout(() => dismiss(id), 3000)
  }

  return {
    show,
    success: (msg: string) => show(msg, 'success'),
    info: (msg: string) => show(msg, 'info'),
    error: (msg: string) => show(msg, 'error'),
  }
}

export { dismiss }
