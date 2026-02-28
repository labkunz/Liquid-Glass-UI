<script setup lang="ts">
import { ref, computed, useCssModule } from 'vue';

export interface NavbarProps {
  variant?: 'default' | 'glass-css-only' | 'glass-light';
  sticky?: boolean;
}

const props = withDefaults(defineProps<NavbarProps>(), {
  variant: 'default',
  sticky: true,
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-navbar')],
  style[toCamelCase(`liquid-navbar--${props.variant}`)],
  props.sticky ? style[toCamelCase('liquid-navbar--sticky')] : '',
]);

const isMobileOpen = ref(false);
const toggleMobile = () => { isMobileOpen.value = !isMobileOpen.value; };
</script>

<template>
  <nav
    :class="classes"
    aria-label="main navigation"
  >
    <div :class="style[toCamelCase('liquid-navbar-inner')]">
      <!-- Logo -->
      <div :class="style[toCamelCase('liquid-navbar-logo')]">
        <slot name="logo" />
      </div>

      <!-- Desktop links -->
      <div :class="style[toCamelCase('liquid-navbar-links')]">
        <slot name="links" />
      </div>

      <!-- Actions -->
      <div :class="style[toCamelCase('liquid-navbar-actions')]">
        <slot name="actions" />

        <!-- Mobile toggle -->
        <button
          :class="style[toCamelCase('liquid-navbar-toggle')]"
          :aria-expanded="isMobileOpen"
          aria-label="開啟選單"
          @click="toggleMobile"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="liquid-navbar-mobile">
      <div
        v-if="isMobileOpen"
        :class="style[toCamelCase('liquid-navbar-mobile')]"
      >
        <slot name="links" />
      </div>
    </Transition>
  </nav>
</template>

<style src="./Navbar.module.css" module></style>
