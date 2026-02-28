<script setup lang="ts">
import { LiquidCard, LiquidButton, LiquidBadge } from '@liquid/ui'

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="container">
      <!-- Text content -->
      <div class="hero-content">
        <div class="hero-tag">
          <LiquidBadge
            color="primary"
            variant="default"
            shape="pill"
          >
            Vue 3 · TypeScript · Liquid Glass
          </LiquidBadge>
        </div>

        <h1 class="hero-title">
          Liquid Glass UI
        </h1>

        <p class="hero-subtitle">
          A Vue 3 component library with Liquid Glass design aesthetics —
          featuring schema-driven Form & Table Engines for real-world engineering depth.
        </p>

        <div class="hero-ctas">
          <LiquidButton
            variant="glass-highlight-layered"
            size="lg"
            @click="scrollToFeatures"
          >
            Explore Features
          </LiquidButton>
          <a
            href="https://github.com/labkunz/Liquid-Glass-UI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiquidButton
              variant="glass-css-only"
              size="lg"
            >
              View on GitHub
            </LiquidButton>
          </a>
        </div>
      </div>

      <!-- Component preview card -->
      <div class="hero-preview">
        <LiquidCard
          variant="glass-css-only"
          padding="lg"
        >
          <p class="preview-heading">
            Component Preview
          </p>

          <div class="preview-row">
            <span class="preview-label">Badges</span>
            <div class="preview-badges">
              <LiquidBadge color="primary">
                Design
              </LiquidBadge>
              <LiquidBadge color="info">
                Frontend
              </LiquidBadge>
              <LiquidBadge color="success">
                AI Tools
              </LiquidBadge>
              <LiquidBadge color="warning">
                Backend
              </LiquidBadge>
            </div>
          </div>

          <div class="preview-row">
            <span class="preview-label">Buttons</span>
            <div class="preview-buttons">
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
          </div>

          <div class="preview-glass-badge">
            <span class="glass-badge-label">Glass Effect</span>
            <span class="glass-badge-text">backdrop-filter + CSS layers</span>
          </div>
        </LiquidCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  padding: 5rem 0 4rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Text side */
.hero-tag {
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #f8fafc 0%, #e2d9f3 40%, #f472b6 80%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.25rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.75;
  margin-bottom: 2rem;
  max-width: 480px;
}

.hero-ctas {
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;
}

/* Preview card */
.hero-preview {
  display: flex;
  justify-content: center;
}

.preview-heading {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
}

.preview-row {
  margin-bottom: 1.25rem;
}

.preview-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
}

.preview-badges,
.preview-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preview-glass-badge {
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: rgba(167, 139, 250, 0.1);
  border: 1px solid rgba(167, 139, 250, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.glass-badge-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #c084fc;
}

.glass-badge-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-ctas {
    justify-content: center;
  }

  .hero-subtitle {
    margin: 0 auto 2rem;
  }
}
</style>
