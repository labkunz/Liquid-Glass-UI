<script setup lang="ts">
export interface ButtonProps {
  /**
   * 按鈕樣式變體
   */
  variant?: 'primary' | 'secondary' | 'outline';

  /**
   * 按鈕尺寸
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 是否禁用
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});

const emit = defineEmits<{
  click: []
}>();

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

<template>
  <button
    :class="[
      'liquid-button',
      `liquid-button--${variant}`,
      `liquid-button--${size}`
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style src="./Button.module.css" scoped></style>
