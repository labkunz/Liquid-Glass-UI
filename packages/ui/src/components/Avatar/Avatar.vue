<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';

export interface AvatarProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  initials?: string;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const props = withDefaults(defineProps<AvatarProps>(), {
  variant: 'default',
  size: 'md',
  src: '',
  alt: '',
  initials: '',
  color: 'default',
});

const imgError = ref(false);

const showImage = computed(() => props.src && !imgError.value);
const showInitials = computed(() => !showImage.value && props.initials);

const handleImgError = () => {
  imgError.value = true;
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-avatar')],
  style[toCamelCase(`liquid-avatar--${props.variant}`)],
  style[toCamelCase(`liquid-avatar--${props.size}`)],
  style[toCamelCase(`liquid-avatar--${props.color}`)],
]);
</script>

<template>
  <div :class="classes">
    <img
      v-if="showImage"
      :class="style[toCamelCase('liquid-avatar-img')]"
      :src="src"
      :alt="alt"
      @error="handleImgError"
    >
    <span
      v-else-if="showInitials"
      :class="style[toCamelCase('liquid-avatar-initials')]"
    >
      {{ initials }}
    </span>
    <span
      v-else
      :class="style[toCamelCase('liquid-avatar-placeholder')]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </span>
  </div>
</template>

<style src="./Avatar.module.css" module></style>
