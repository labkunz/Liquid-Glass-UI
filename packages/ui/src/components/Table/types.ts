/**
 * Table 表格元件-負責表格行的型別
 */
export interface TableColumn<T> {
  /** 渲染用單一值 */
  key: keyof T;
  /** 顯示文字 */
  label: string;
  /** 單行寬度 */
  width?: string;
  /** 對齊方式 */
  align?: 'left' | 'center' | 'right';
  /** 
   * 渲染顯示方法 
   * 
   */
  render?: (value: T[keyof T], row: T) => string
}

/**
 * Table 表格元件的 Props
 */
export interface TableProps<T = Record<string, unknown>> {
  /** 視覺風格 */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  /** 行的型別 */
  columns: TableColumn<T>[];
  /** 實際傳入的資料型別 */
  data: T[];
  /** 條紋效果 */
  striped?: boolean;
  /** hover效果 */
  hoverable?: boolean;
}