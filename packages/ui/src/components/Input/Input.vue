<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface InputProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'default',
  size: 'md',
  type: 'text',
  placeholder: '',
  disabled: false,
  modelValue: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-input')],
  style[toCamelCase(`liquid-input--${props.variant}`)],
  style[toCamelCase(`liquid-input--${props.size}`)],
  props.disabled ? style[toCamelCase('liquid-input--disabled')] : '',
]);

const fieldClass = computed(() => style[toCamelCase('liquid-input-field')]);
</script>

<template>
  <div :class="classes">
    <input
      :class="fieldClass"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<style src="./Input.module.css" module></style>
