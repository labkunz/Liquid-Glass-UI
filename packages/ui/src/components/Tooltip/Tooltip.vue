<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';

export interface TooltipProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  content?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  variant: 'default',
  content: '',
  placement: 'top',
  disabled: false,
});

const isVisible = ref(false);

const show = () => {
  if (!props.disabled) {
    isVisible.value = true;
  }
};

const hide = () => {
  isVisible.value = false;
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const wrapperClass = computed(() => style[toCamelCase('liquid-tooltip-wrapper')]);

const tooltipClasses = computed(() => [
  style[toCamelCase('liquid-tooltip')],
  style[toCamelCase(`liquid-tooltip--${props.variant}`)],
  style[toCamelCase(`liquid-tooltip--${props.placement}`)],
  isVisible.value ? style[toCamelCase('liquid-tooltip--visible')] : '',
]);

const arrowClasses = computed(() => [
  style[toCamelCase('liquid-tooltip-arrow')],
  style[toCamelCase(`liquid-tooltip-arrow--${props.placement}`)],
]);
</script>

<template>
  <div
    :class="wrapperClass"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <Transition name="tooltip">
      <div v-if="isVisible && content" :class="tooltipClasses" role="tooltip">
        <span :class="arrowClasses" />
        {{ content }}
      </div>
    </Transition>
  </div>
</template>

<style src="./Tooltip.module.css" module></style>
