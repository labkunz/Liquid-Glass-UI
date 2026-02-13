<script setup lang="ts">
import { Button } from '@liquid/ui';

const handleClick = (variant: string) => {
  alert(`${variant} clicked!`);
};
</script>

<template>
  <div class="app">
    <h1>Liquid UI Library</h1>

    <section class="section">
      <h2>Button Variants</h2>
      <div class="button-group">
        <Button variant="primary" @click="() => handleClick('Primary')">
          Primary Button
        </Button>

        <Button variant="secondary" @click="() => handleClick('Secondary')">
          Secondary Button
        </Button>

        <Button variant="outline" @click="() => handleClick('Outline')">
          Outline Button
        </Button>
      </div>
    </section>

    <section class="section">
      <h2>Button Sizes</h2>
      <div class="button-group">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </section>

    <section class="section">
      <h2>Disabled State</h2>
      <div class="button-group">
        <Button disabled>Disabled Button</Button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: var(--liquid-color-text, #333);
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--liquid-color-text-secondary, #666);
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
