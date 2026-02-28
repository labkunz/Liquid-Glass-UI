<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface DatePickerProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
  min?: string;
  max?: string;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  variant: 'default',
  size: 'md',
  placeholder: '',
  disabled: false,
  modelValue: '',
  min: '',
  max: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-datepicker')],
  style[toCamelCase(`liquid-datepicker--${props.variant}`)],
  style[toCamelCase(`liquid-datepicker--${props.size}`)],
  props.disabled ? style[toCamelCase('liquid-datepicker--disabled')] : '',
]);

const fieldClass = computed(() => style[toCamelCase('liquid-datepicker-field')]);
</script>

<template>
  <div :class="classes">
    <input
      :class="fieldClass"
      type="date"
      :value="modelValue"
      :disabled="disabled"
      :min="min || undefined"
      :max="max || undefined"
      @change="handleChange"
    >
  </div>
</template>

<style src="./DatePicker.module.css" module></style>
