/**
 * Modal 元件的 Props
 */
export interface ModalProps {
  /** 視覺風格 */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 帶入的內容 */
  modelValue?: boolean;
  /** 標題 */
  title?: string;
  /** 是否顯示關閉按鈕 */
  showClose?: boolean;
}