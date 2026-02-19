<script setup lang="ts">
import { LiquidCard } from '@liquid/ui'

const installCode = `# Install the packages
pnpm add @liquid/ui @liquid/tokens`

const usageCode = `<script setup lang="ts">
import { GlassFilterProvider, LiquidButton, LiquidCard } from '@liquid/ui'
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'
<\/script>

<template>
  <!-- Wrap app with GlassFilterProvider for SVG filter variants -->
  <GlassFilterProvider>
    <LiquidCard variant="glass-css-only" padding="lg">
      <h1>Hello, Liquid Glass!</h1>
      <LiquidButton variant="primary">Get Started</LiquidButton>
    </LiquidCard>
  </GlassFilterProvider>
</template>`
</script>

<template>
  <section class="quickstart">
    <div class="container">
      <div class="section-header">
        <p class="section-label">Get Started</p>
        <h2 class="section-title">Up and Running in Minutes</h2>
        <p class="section-desc">
          Install the packages, import the tokens, and start building with Liquid Glass components.
        </p>
      </div>

      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <LiquidCard variant="default" padding="lg">
              <h3 class="step-title">Install</h3>
              <pre><code>{{ installCode }}</code></pre>
            </LiquidCard>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <LiquidCard variant="default" padding="lg">
              <h3 class="step-title">Use</h3>
              <pre><code>{{ usageCode }}</code></pre>
            </LiquidCard>
          </div>
        </div>
      </div>

      <div class="quickstart-cta">
        <p class="cta-text">Want to go deeper?</p>
        <div class="cta-links">
          <a href="#" class="cta-link cta-link--primary">Read the Docs →</a>
          <a href="#" class="cta-link">Explore Storybook →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quickstart {
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

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.step {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  background: var(--liquid-color-primary, #007bff);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--liquid-color-text-secondary, #666);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.quickstart-cta {
  text-align: center;
  margin-top: 3rem;
}

.cta-text {
  font-size: 0.95rem;
  color: var(--liquid-color-text-secondary, #888);
  margin-bottom: 1rem;
}

.cta-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.cta-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--liquid-color-text-secondary, #666);
  text-decoration: none;
  transition: color 0.2s;
}

.cta-link:hover {
  color: var(--liquid-color-text, #333);
}

.cta-link--primary {
  color: var(--liquid-color-primary, #007bff);
}

.cta-link--primary:hover {
  color: var(--liquid-color-primary-dark, #0056b3);
}
</style>
