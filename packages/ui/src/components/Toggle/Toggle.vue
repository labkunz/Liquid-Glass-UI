<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface ToggleProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  disabled?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'default',
  size: 'md',
  label: '',
  disabled: false,
  modelValue: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-toggle')],
  style[toCamelCase(`liquid-toggle--${props.variant}`)],
  style[toCamelCase(`liquid-toggle--${props.size}`)],
  props.modelValue ? style[toCamelCase('liquid-toggle--on')] : '',
  props.disabled ? style[toCamelCase('liquid-toggle--disabled')] : '',
]);

const trackClasses = computed(() => [
  style[toCamelCase('liquid-toggle-track')],
  props.modelValue ? style[toCamelCase('liquid-toggle-track--on')] : '',
]);

const thumbClasses = computed(() => [
  style[toCamelCase('liquid-toggle-thumb')],
  props.modelValue ? style[toCamelCase('liquid-toggle-thumb--on')] : '',
]);
</script>

<template>
  <label :class="classes">
    <input
      :class="style[toCamelCase('liquid-toggle-input')]"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
    />
    <span :class="trackClasses">
      <span :class="thumbClasses" />
    </span>
    <span v-if="label" :class="style[toCamelCase('liquid-toggle-label')]">{{ label }}</span>
  </label>
</template>

<style src="./Toggle.module.css" module></style>
