<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface CardProps {
  /**
   * 卡片樣式變體
   */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';

  /**
   * 卡片內距
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-card')],
  style[toCamelCase(`liquid-card--${props.variant}`)],
  style[toCamelCase(`liquid-card--padding-${props.padding}`)],
]);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style src="./Card.module.css" module></style>
