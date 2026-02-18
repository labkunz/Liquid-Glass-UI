<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
</script>

<template>
  <nav class="blog-navbar">
    <div class="blog-navbar__inner container">
      <!-- Logo -->
      <RouterLink to="/" class="blog-navbar__logo">
        <span class="blog-navbar__logo-icon">◈</span>
        <span class="blog-navbar__logo-text">Liquid Glass Blog</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="blog-navbar__links">
        <RouterLink to="/" class="blog-navbar__link">文章</RouterLink>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          class="blog-navbar__link"
        >GitHub</a>
      </div>

      <!-- Mobile toggle -->
      <button
        class="blog-navbar__toggle"
        :aria-expanded="isMenuOpen"
        aria-label="開啟選單"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="blog-navbar__mobile-menu">
        <RouterLink to="/" class="blog-navbar__mobile-link" @click="isMenuOpen = false">
          文章
        </RouterLink>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          class="blog-navbar__mobile-link"
          @click="isMenuOpen = false"
        >GitHub</a>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.blog-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  /* Glass 效果 */
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow:
    0 2px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.blog-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

/* ---- Logo ---- */
.blog-navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  font-size: 1rem;
}

.blog-navbar__logo-icon {
  font-size: 1.25rem;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-navbar__logo-text {
  color: #1a1a2e;
}

/* ---- Desktop Links ---- */
.blog-navbar__links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.blog-navbar__link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}

.blog-navbar__link:hover,
.blog-navbar__link.router-link-active {
  color: #7c3aed;
  border-bottom-color: #7c3aed;
}

/* ---- Mobile Toggle ---- */
.blog-navbar__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.blog-navbar__toggle span {
  display: block;
  height: 2px;
  background: #4a5568;
  border-radius: 2px;
  transition: transform 0.2s;
}

/* ---- Mobile Menu ---- */
.blog-navbar__mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.blog-navbar__mobile-link {
  padding: 0.75rem 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.blog-navbar__mobile-link:last-child {
  border-bottom: none;
}

/* ---- Transitions ---- */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
  .blog-navbar__links {
    display: none;
  }

  .blog-navbar__toggle {
    display: flex;
  }
}
</style>
