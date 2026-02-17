<script setup lang="ts">
import { computed, onMounted, useCssModule } from 'vue';

export interface ToastProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  type?: 'info' | 'success' | 'warning' | 'error';
  message?: string;
  modelValue?: boolean;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
  type: 'info',
  message: '',
  modelValue: false,
  duration: 3000,
  position: 'bottom-right',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const close = () => {
  emit('update:modelValue', false);
};

onMounted(() => {
  if (props.modelValue && props.duration > 0) {
    setTimeout(close, props.duration);
  }
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const containerClass = computed(() => [
  style[toCamelCase('liquid-toast-container')],
  style[toCamelCase(`liquid-toast-container--${props.position}`)],
]);

const toastClasses = computed(() => [
  style[toCamelCase('liquid-toast')],
  style[toCamelCase(`liquid-toast--${props.variant}`)],
  style[toCamelCase(`liquid-toast--${props.type}`)],
]);
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="modelValue" :class="containerClass">
        <div :class="toastClasses" role="alert">
          <span :class="style[toCamelCase('liquid-toast-icon')]">
            <svg v-if="type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L6 12L14 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="type === 'error'" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="type === 'warning'" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L14 13H2L8 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M8 7V9M8 11V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 5V8M8 11V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span :class="style[toCamelCase('liquid-toast-message')]">{{ message }}</span>
          <button :class="style[toCamelCase('liquid-toast-close')]" @click="close" aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style src="./Toast.module.css" module></style>
