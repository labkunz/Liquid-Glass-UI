export interface ButtonProps {
  /**
   * 按鈕樣式變體
   */
  variant?: 'primary' | 'secondary' | 'outline'
          | 'ghost' | 'danger'
          | 'glass' | 'glass-intense'
          | 'glass-css-only'
          | 'glass-highlight-only'
          | 'glass-layered'
          | 'glass-highlight-layered';

  /**
   * 按鈕尺寸
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 原生 button type（用於表單送出等情境）
   */
  type?: 'button' | 'submit' | 'reset';
}