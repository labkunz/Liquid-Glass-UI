<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { ModalProps } from './types';

const props = withDefaults(defineProps<ModalProps>(), {
  variant: 'default',
  size: 'md',
  modelValue: false,
  title: '',
  showClose: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const close = () => {
  emit('update:modelValue', false);
};

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    close();
  }
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const overlayClass = computed(() => style[toCamelCase('liquid-modal-overlay')]);

const modalClasses = computed(() => [
  style[toCamelCase('liquid-modal')],
  style[toCamelCase(`liquid-modal--${props.variant}`)],
  style[toCamelCase(`liquid-modal--${props.size}`)],
]);

const headerClass = computed(() => style[toCamelCase('liquid-modal-header')]);
const titleClass = computed(() => style[toCamelCase('liquid-modal-title')]);
const closeClass = computed(() => style[toCamelCase('liquid-modal-close')]);
const bodyClass = computed(() => style[toCamelCase('liquid-modal-body')]);
const footerClass = computed(() => style[toCamelCase('liquid-modal-footer')]);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" :class="overlayClass" @click="handleOverlayClick">
        <div :class="modalClasses" role="dialog" aria-modal="true">
          <div v-if="title || showClose" :class="headerClass">
            <h3 v-if="title" :class="titleClass">{{ title }}</h3>
            <button v-if="showClose" :class="closeClass" @click="close" aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div :class="bodyClass">
            <slot />
          </div>
          <div v-if="$slots.footer" :class="footerClass">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style src="./Modal.module.css" module></style>
