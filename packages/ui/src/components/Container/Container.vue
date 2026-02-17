<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface ContainerProps {
  /**
   * 最大寬度限制
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * 左右內距
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<ContainerProps>(), {
  maxWidth: 'lg',
  padding: 'md',
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-container')],
  style[toCamelCase(`liquid-container--${props.maxWidth}`)],
  style[toCamelCase(`liquid-container--padding-${props.padding}`)],
]);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style src="./Container.module.css" module></style>
