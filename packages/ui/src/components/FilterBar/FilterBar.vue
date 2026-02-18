<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface FilterBarOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  options: string[] | FilterBarOption[];
  modelValue: string;
  variant?: 'default' | 'glass-css-only' | 'glass-light';
}

const props = withDefaults(defineProps<FilterBarProps>(), {
  variant: 'default',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

// 統一轉換成 { label, value } 格式
const normalizedOptions = computed<FilterBarOption[]>(() =>
  props.options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  )
);

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const barClasses = computed(() => [
  style[toCamelCase('liquid-filter-bar')],
  style[toCamelCase(`liquid-filter-bar--${props.variant}`)],
]);

const btnClasses = (value: string) => [
  style[toCamelCase('liquid-filter-bar-btn')],
  props.modelValue === value
    ? style[toCamelCase('liquid-filter-bar-btn--active')]
    : '',
];
</script>

<template>
  <div :class="barClasses" role="group" aria-label="filter options">
    <button
      v-for="opt in normalizedOptions"
      :key="opt.value"
      :class="btnClasses(opt.value)"
      :aria-pressed="modelValue === opt.value"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style src="./FilterBar.module.css" module></style>
