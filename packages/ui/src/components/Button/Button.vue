<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface ButtonProps {
  /**
   * 按鈕樣式變體
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'glass-intense';

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

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-button')],
  style[toCamelCase(`liquid-button--${props.variant}`)],
  style[toCamelCase(`liquid-button--${props.size}`)],
]);
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style src="./Button.module.css" module></style>
