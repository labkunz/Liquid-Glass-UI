<script setup lang="ts">
import { LiquidCard, LiquidButton, LiquidBadge } from '@liquid/ui'
</script>

<template>
  <section class="showcase">
    <div class="container">
      <div class="section-header">
        <p class="section-label">
          See It In Action
        </p>
        <h2 class="section-title">
          Handcrafted with Vue 3
        </h2>
        <p class="section-desc">
          Every component is purpose-built with a consistent API and Liquid Glass aesthetics.
          Interactive, accessible, and ready to use.
        </p>
      </div>

      <div class="showcase-grid">
        <!-- Buttons -->
        <LiquidCard
          variant="glass-css-only"
          padding="lg"
          class="showcase-card"
        >
          <h3 class="showcase-card-title">
            Button
          </h3>
          <p class="showcase-card-sub">
            10 variants · 3 sizes
          </p>
          <div class="showcase-items">
            <LiquidButton
              variant="glass-highlight-layered"
              size="sm"
            >
              Highlight
            </LiquidButton>
            <LiquidButton
              variant="glass-css-only"
              size="sm"
            >
              Glass
            </LiquidButton>
            <LiquidButton
              variant="glass-layered"
              size="sm"
            >
              Layered
            </LiquidButton>
          </div>
          <div
            class="showcase-items"
            style="margin-top: 0.75rem;"
          >
            <LiquidButton
              variant="glass-css-only"
              size="sm"
            >
              Small
            </LiquidButton>
            <LiquidButton
              variant="glass-css-only"
              size="md"
            >
              Medium
            </LiquidButton>
            <LiquidButton
              variant="glass-css-only"
              size="lg"
            >
              Large
            </LiquidButton>
          </div>
        </LiquidCard>

        <!-- Badges -->
        <LiquidCard
          variant="glass-css-only"
          padding="lg"
          class="showcase-card"
        >
          <h3 class="showcase-card-title">
            Badge
          </h3>
          <p class="showcase-card-sub">
            6 colors · 2 shapes
          </p>
          <div class="showcase-items">
            <LiquidBadge color="default">
              Default
            </LiquidBadge>
            <LiquidBadge color="primary">
              Primary
            </LiquidBadge>
            <LiquidBadge color="success">
              Success
            </LiquidBadge>
            <LiquidBadge color="warning">
              Warning
            </LiquidBadge>
            <LiquidBadge color="danger">
              Danger
            </LiquidBadge>
            <LiquidBadge color="info">
              Info
            </LiquidBadge>
          </div>
          <div
            class="showcase-items"
            style="margin-top: 0.75rem;"
          >
            <LiquidBadge
              color="primary"
              shape="pill"
            >
              Pill shape
            </LiquidBadge>
            <LiquidBadge
              color="primary"
              shape="rounded"
            >
              Rounded
            </LiquidBadge>
          </div>
        </LiquidCard>

        <!-- Glass Card -->
        <div class="glass-demo-bg">
          <div class="glass-demo-label">
            Glass Effect
          </div>
          <LiquidCard
            variant="glass-css-only"
            padding="lg"
          >
            <h3 class="showcase-card-title">
              Card (Glass)
            </h3>
            <p class="showcase-card-sub">
              backdrop-filter · CSS layers
            </p>
            <p class="glass-demo-desc">
              Glass morphism via <code>backdrop-filter: blur()</code> and layered
              <code>::before</code> / <code>::after</code> pseudo-elements.
              No runtime dependency.
            </p>
          </LiquidCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase {
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

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.showcase-card {
  min-height: 200px;
}

.showcase-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.25rem;
}

.showcase-card-sub {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.showcase-items {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

/* Glass demo */
.glass-demo-bg {
  background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
}

.glass-demo-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.glass-demo-desc {
  font-size: 0.85rem;
  color: #334155;
  line-height: 1.6;
  margin-top: 0.75rem;
}

/* Override title/sub text inside glass demo card (light bg context) */
.glass-demo-bg .showcase-card-title {
  color: #1e293b;
}

.glass-demo-bg .showcase-card-sub {
  color: #475569;
}

@media (max-width: 900px) {
  .showcase-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .showcase-grid {
    grid-template-columns: 1fr;
  }
}
</style>
