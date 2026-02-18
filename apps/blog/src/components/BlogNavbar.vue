<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LiquidNavbar } from '@liquid/ui'
</script>

<template>
  <LiquidNavbar variant="glass-light" :sticky="true">
    <template #logo>
      <RouterLink to="/" class="blog-navbar__logo">
        <span class="blog-navbar__logo-icon">◈</span>
        <span class="blog-navbar__logo-text">Liquid Glass Blog</span>
      </RouterLink>
    </template>

    <template #links>
      <RouterLink to="/" class="blog-navbar__link">文章</RouterLink>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener"
        class="blog-navbar__link"
      >GitHub</a>
    </template>
  </LiquidNavbar>
</template>

<style scoped>
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
</style>
