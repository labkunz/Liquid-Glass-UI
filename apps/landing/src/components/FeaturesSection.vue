<script setup lang="ts">
import { LiquidCard } from '@liquid/ui'

const features = [
  {
    icon: '🫧',
    title: 'Liquid Glass Aesthetics',
    desc: 'CSS-powered glass morphism effects with SVG filter-based refraction. Real depth, zero runtime cost.',
  },
  {
    icon: '⚡',
    title: 'Vue 3 + TypeScript',
    desc: 'Fully typed with TypeScript. Composition API throughout. Modern and future-proof.',
  },
  {
    icon: '📋',
    title: 'Schema-Driven Forms',
    desc: 'Build complex forms from a JSON schema. Validation, conditional fields, and dynamic options built in.',
  },
  {
    icon: '📊',
    title: 'Smart Table Engine',
    desc: 'Sortable, filterable, paginated tables generated from a single schema definition.',
  },
  {
    icon: '🌗',
    title: 'Dark & Light Theme',
    desc: 'CSS variable-based theming. Switch between dark and light with a single data attribute.',
  },
  {
    icon: '🧩',
    title: '22 Components',
    desc: 'From basic Buttons and Inputs to Modal dialogs, Toast notifications, and full Engines.',
  },
]
</script>

<template>
  <section class="features">
    <div class="container">
      <div class="section-header">
        <p class="section-label">
          Why Liquid Glass UI
        </p>
        <h2 class="section-title">
          Built for Both Beauty and Depth
        </h2>
        <p class="section-desc">
          A component library that doesn't force you to choose between visual expressiveness
          and engineering practicality.
        </p>
      </div>

      <div class="features-grid">
        <LiquidCard
          v-for="feature in features"
          :key="feature.title"
          variant="glass-css-only"
          padding="lg"
          class="feature-card"
        >
          <span class="feature-icon">{{ feature.icon }}</span>
          <h3 class="feature-title">
            {{ feature.title }}
          </h3>
          <p class="feature-desc">
            {{ feature.desc }}
          </p>
        </LiquidCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: 5rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.section-desc {
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.65;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
