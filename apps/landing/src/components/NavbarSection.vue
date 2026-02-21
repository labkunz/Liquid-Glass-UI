<script setup lang="ts">
import { LiquidNavbar, LiquidButton } from '@liquid/ui'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <LiquidNavbar variant="glass-css-only" :sticky="true">
    <template #logo>
      <span class="logo">
        <span class="logo-mark">⬡</span>
        Liquid Glass UI
      </span>
    </template>

    <template #links>
      <button class="nav-link" @click="scrollTo('features')">Features</button>
      <button class="nav-link" @click="scrollTo('demos')">Demos</button>
      <button class="nav-link" @click="scrollTo('showcase')">Components</button>
      <button class="nav-link" @click="scrollTo('quick-start')">Quick Start</button>
    </template>

    <template #actions>
      <a href="https://github.com/labkunz/Liquid-Glass-UI" target="_blank" rel="noopener noreferrer">
        <LiquidButton variant="glass-css-only" size="sm">
          GitHub
        </LiquidButton>
      </a>
      <a href="https://liquid-docs.vercel.app/" target="_blank" rel="noopener noreferrer">
        <LiquidButton variant="glass-highlight-layered" size="sm">
          Docs
        </LiquidButton>
      </a>
    </template>
  </LiquidNavbar>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: #f1f5f9;
  user-select: none;
}

.logo-mark {
  font-size: 1.5rem;
  color: #c084fc;
  line-height: 1;
}

.nav-link {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.65);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.08);
}
</style>
