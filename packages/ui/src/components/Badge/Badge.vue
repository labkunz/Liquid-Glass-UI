<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface BadgeProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
  color: 'default',
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-badge')],
  style[toCamelCase(`liquid-badge--${props.variant}`)],
  style[toCamelCase(`liquid-badge--${props.size}`)],
  style[toCamelCase(`liquid-badge--${props.color}`)],
]);
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<style src="./Badge.module.css" module></style>
