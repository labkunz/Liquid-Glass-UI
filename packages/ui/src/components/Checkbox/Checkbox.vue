<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface CheckboxProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  disabled?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  variant: 'default',
  size: 'md',
  label: '',
  disabled: false,
  modelValue: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const handleChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-checkbox')],
  style[toCamelCase(`liquid-checkbox--${props.variant}`)],
  style[toCamelCase(`liquid-checkbox--${props.size}`)],
  props.disabled ? style[toCamelCase('liquid-checkbox--disabled')] : '',
]);

const boxClass = computed(() => [
  style[toCamelCase('liquid-checkbox-box')],
  props.modelValue ? style[toCamelCase('liquid-checkbox-box--checked')] : '',
]);

const labelClass = computed(() => style[toCamelCase('liquid-checkbox-label')]);
</script>

<template>
  <label :class="classes">
    <input
      :class="style[toCamelCase('liquid-checkbox-input')]"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="boxClass">
      <svg v-if="modelValue" viewBox="0 0 12 10" fill="none">
        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span v-if="label" :class="labelClass">{{ label }}</span>
  </label>
</template>

<style src="./Checkbox.module.css" module></style>
