<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface LoadingProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'pulse';
  label?: string;
  overlay?: boolean;
}

const props = withDefaults(defineProps<LoadingProps>(), {
  variant: 'default',
  size: 'md',
  type: 'spinner',
  label: '',
  overlay: false,
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-loading')],
  style[toCamelCase(`liquid-loading--${props.variant}`)],
  style[toCamelCase(`liquid-loading--${props.size}`)],
  props.overlay ? style[toCamelCase('liquid-loading--overlay')] : '',
]);

const spinnerClass = computed(() => [
  style[toCamelCase('liquid-loading-spinner')],
  style[toCamelCase(`liquid-loading-spinner--${props.type}`)],
]);
</script>

<template>
  <div
    :class="classes"
    role="status"
    :aria-label="label || '載入中'"
  >
    <!-- Spinner type -->
    <div
      v-if="type === 'spinner'"
      :class="spinnerClass"
    >
      <svg
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-dasharray="80 40"
        />
      </svg>
    </div>

    <!-- Dots type -->
    <div
      v-else-if="type === 'dots'"
      :class="spinnerClass"
    >
      <span :class="style[toCamelCase('liquid-loading-dot')]" />
      <span :class="style[toCamelCase('liquid-loading-dot')]" />
      <span :class="style[toCamelCase('liquid-loading-dot')]" />
    </div>

    <!-- Pulse type -->
    <div
      v-else-if="type === 'pulse'"
      :class="spinnerClass"
    />

    <span
      v-if="label"
      :class="style[toCamelCase('liquid-loading-label')]"
    >{{ label }}</span>
  </div>
</template>

<style src="./Loading.module.css" module></style>
