<script setup lang="ts">
import { LiquidNavbar, LiquidButton } from '@liquid/ui'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <LiquidNavbar variant="glass-light" :sticky="true">
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
      <LiquidButton
        variant="outline"
        size="sm"
        @click="() => window.open('https://github.com/placeholder/liquid-ui', '_blank')"
      >
        GitHub
      </LiquidButton>
      <LiquidButton
        variant="primary"
        size="sm"
        @click="() => window.open('#', '_blank')"
      >
        Docs
      </LiquidButton>
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
  color: var(--liquid-color-text, #333);
  user-select: none;
}

.logo-mark {
  font-size: 1.5rem;
  color: var(--liquid-color-primary, #007bff);
  line-height: 1;
}

.nav-link {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
  color: var(--liquid-color-text-secondary, #666);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: var(--liquid-color-text, #333);
  background: rgba(0, 0, 0, 0.04);
}
</style>
