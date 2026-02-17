<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface TextareaProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  modelValue?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'default',
  size: 'md',
  placeholder: '',
  disabled: false,
  rows: 4,
  modelValue: '',
  resize: 'vertical',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-textarea')],
  style[toCamelCase(`liquid-textarea--${props.variant}`)],
  style[toCamelCase(`liquid-textarea--${props.size}`)],
  props.disabled ? style[toCamelCase('liquid-textarea--disabled')] : '',
]);

const fieldClass = computed(() => style[toCamelCase('liquid-textarea-field')]);
</script>

<template>
  <div :class="classes">
    <textarea
      :class="fieldClass"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :value="modelValue"
      :style="{ resize }"
      @input="handleInput"
    />
  </div>
</template>

<style src="./Textarea.module.css" module></style>
