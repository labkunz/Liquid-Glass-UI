<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, useCssModule } from 'vue';

export interface SelectOption<T = string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T = string | number> {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  options?: SelectOption<T>[];
  modelValue?: T | null;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<SelectProps<string | number>>(), {
  variant: 'default',
  size: 'md',
  options: () => [],
  modelValue: null,
  placeholder: '請選擇...',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
}>();

const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue);
  return found ? found.label : props.placeholder;
});

const isSelected = computed(() => props.modelValue !== null);

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: SelectOption) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value);
    isOpen.value = false;
  }
};

const handleOutsideClick = (e: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
  document.removeEventListener('keydown', handleKeydown);
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const wrapperClasses = computed(() => [
  style[toCamelCase('liquid-select')],
  style[toCamelCase(`liquid-select--${props.variant}`)],
  style[toCamelCase(`liquid-select--${props.size}`)],
  isOpen.value ? style[toCamelCase('liquid-select--open')] : '',
  props.disabled ? style[toCamelCase('liquid-select--disabled')] : '',
]);

const triggerClasses = computed(() => [
  style[toCamelCase('liquid-select-trigger')],
  !isSelected.value ? style[toCamelCase('liquid-select-trigger--placeholder')] : '',
]);

const dropdownClasses = computed(() => [
  style[toCamelCase('liquid-select-dropdown')],
]);

const optionClasses = (option: SelectOption) => [
  style[toCamelCase('liquid-select-option')],
  option.value === props.modelValue ? style[toCamelCase('liquid-select-option--selected')] : '',
  option.disabled ? style[toCamelCase('liquid-select-option--disabled')] : '',
];
</script>

<template>
  <div ref="selectRef" :class="wrapperClasses">
    <button
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      @click="toggleDropdown"
    >
      <span :class="style[toCamelCase('liquid-select-value')]">{{ selectedLabel }}</span>
      <span :class="[style[toCamelCase('liquid-select-arrow')], isOpen ? style[toCamelCase('liquid-select-arrow--open')] : '']">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>

    <div v-if="isOpen" :class="dropdownClasses">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="optionClasses(option)"
        :disabled="option.disabled"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style src="./Select.module.css" module></style>
