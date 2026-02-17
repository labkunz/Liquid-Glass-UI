<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface RadioProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  value: string | number;
  modelValue?: string | number | null;
  name?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<RadioProps>(), {
  variant: 'default',
  size: 'md',
  label: '',
  modelValue: null,
  name: '',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-radio')],
  style[toCamelCase(`liquid-radio--${props.variant}`)],
  style[toCamelCase(`liquid-radio--${props.size}`)],
  props.disabled ? style[toCamelCase('liquid-radio--disabled')] : '',
]);

const dotClass = computed(() => [
  style[toCamelCase('liquid-radio-dot')],
  isChecked.value ? style[toCamelCase('liquid-radio-dot--checked')] : '',
]);
</script>

<template>
  <label :class="classes">
    <input
      :class="style[toCamelCase('liquid-radio-input')]"
      type="radio"
      :value="value"
      :checked="isChecked"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="dotClass">
      <span v-if="isChecked" :class="style[toCamelCase('liquid-radio-dot-inner')]" />
    </span>
    <span v-if="label" :class="style[toCamelCase('liquid-radio-label')]">{{ label }}</span>
  </label>
</template>

<style src="./Radio.module.css" module></style>
