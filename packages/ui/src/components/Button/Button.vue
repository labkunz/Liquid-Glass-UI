<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { ButtonProps } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
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
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style src="./Button.module.css" module></style>
