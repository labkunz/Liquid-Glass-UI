/**
 * Select 元件的選項型別
 * @template T 選項值的型別
 */
export interface SelectOption<T = string | number> {
  /** 選項的值 */
  value: T;
  /** 要顯示選項的文字 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * Select 元件的 Props
 * @template T 選項值的型別
 */
export interface SelectProps<T = string | number> {
  /** 視覺風格 */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 選項列表 */
  options?: SelectOption<T>[];
  /** 當前選中的值 */
  modelValue?: T | null;
  /** 佔位文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
}