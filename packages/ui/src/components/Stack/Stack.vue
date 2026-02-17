<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface StackProps {
  /**
   * 排列方向
   */
  direction?: 'row' | 'column';

  /**
   * 子元素間距
   */
  gap?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * 交叉軸對齊（align-items）
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * 主軸對齊（justify-content）
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}

const props = withDefaults(defineProps<StackProps>(), {
  direction: 'column',
  gap: 'md',
  align: 'stretch',
  justify: 'start',
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-stack')],
  style[toCamelCase(`liquid-stack--${props.direction}`)],
  style[toCamelCase(`liquid-stack--gap-${props.gap}`)],
  style[toCamelCase(`liquid-stack--align-${props.align}`)],
  style[toCamelCase(`liquid-stack--justify-${props.justify}`)],
]);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<style src="./Stack.module.css" module></style>
