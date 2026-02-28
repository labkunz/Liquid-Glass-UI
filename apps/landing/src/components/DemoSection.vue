<script setup lang="ts">
import { LiquidCard, LiquidButton, LiquidBadge } from '@liquid/ui'

const BLOG_URL = 'https://liquid-blog.vercel.app/'
const ADMIN_URL = 'https://liquid-admin.vercel.app/'
</script>

<template>
  <section class="demos">
    <div class="container">
      <div class="section-header">
        <p class="section-label">
          Live Demos
        </p>
        <h2 class="section-title">
          Two Demos. One Component Library.
        </h2>
        <p class="section-desc">
          The same set of components powering two completely different products —
          proving versatility across design styles and engineering needs.
        </p>
      </div>

      <div class="demos-grid">
        <!-- Blog Demo -->
        <div class="demo-wrapper demo-wrapper--light">
          <LiquidCard
            variant="glass-css-only"
            padding="lg"
            class="demo-card"
          >
            <div class="demo-card-header">
              <LiquidBadge
                color="primary"
                size="sm"
              >
                Design Focus
              </LiquidBadge>
            </div>
            <h3 class="demo-title">
              Liquid Glass Blog
            </h3>
            <p class="demo-desc">
              A content-focused blog showcasing Liquid Glass aesthetics in a light, airy design.
              Demonstrates Card, Badge, Navbar, Toast, and Pagination in a real-world layout.
            </p>
            <div class="demo-tags">
              <span class="demo-tag">Card</span>
              <span class="demo-tag">Navbar</span>
              <span class="demo-tag">Badge</span>
              <span class="demo-tag">Pagination</span>
              <span class="demo-tag">Toast</span>
            </div>
            <div class="demo-footer">
              <span class="demo-audience">For designers & PMs</span>
              <a
                :href="BLOG_URL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton
                  variant="primary"
                  size="sm"
                >
                  Visit Blog →
                </LiquidButton>
              </a>
            </div>
          </LiquidCard>
        </div>

        <!-- Admin Demo -->
        <div class="demo-wrapper demo-wrapper--dark">
          <LiquidCard
            variant="glass-css-only"
            padding="lg"
            class="demo-card demo-card--dark"
          >
            <div class="demo-card-header">
              <LiquidBadge
                color="info"
                size="sm"
              >
                Engineering Focus
              </LiquidBadge>
            </div>
            <h3 class="demo-title demo-title--dark">
              ATS Admin System
            </h3>
            <p class="demo-desc demo-desc--dark">
              An Applicant Tracking System (ATS) built with Form Engine and Table Engine.
              Full CRUD with schema-driven forms, sortable/filterable tables, and real-world business logic.
            </p>
            <div class="demo-tags demo-tags--dark">
              <span class="demo-tag demo-tag--dark">Form Engine</span>
              <span class="demo-tag demo-tag--dark">Table Engine</span>
              <span class="demo-tag demo-tag--dark">Modal</span>
              <span class="demo-tag demo-tag--dark">Toast</span>
            </div>
            <div class="demo-footer">
              <span class="demo-audience demo-audience--dark">For engineers & tech leads</span>
              <a
                :href="ADMIN_URL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidButton
                  variant="outline"
                  size="sm"
                >
                  Visit Admin →
                </LiquidButton>
              </a>
            </div>
          </LiquidCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demos {
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

.demos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Light demo wrapper */
.demo-wrapper {
  border-radius: 20px;
  padding: 2px;
}

.demo-wrapper--light {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.3) 0%, rgba(96, 165, 250, 0.2) 100%);
}

.demo-wrapper--dark {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
}

.demo-card {
  height: 100%;
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.55);
}

.demo-card--dark {
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.04);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
  --liquid-card-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --liquid-card-glass-highlight-opacity: 0.04;
}

.demo-card-header {
  margin-bottom: 1rem;
}

.demo-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--liquid-color-text, #333);
  margin-bottom: 0.75rem;
}

.demo-title--dark {
  color: #f1f5f9;
}

.demo-desc {
  font-size: 0.9rem;
  color: var(--liquid-color-text-secondary, #666);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.demo-desc--dark {
  color: #94a3b8;
}

.demo-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.demo-tag {
  font-size: 0.75rem;
  background: rgba(99, 102, 241, 0.12);
  color: #4338ca;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.demo-tag--dark {
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.demo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.demo-footer .demo-footer:has(.demo-card--dark) {
  border-top-color: rgba(255, 255, 255, 0.06);
}

.demo-audience {
  font-size: 0.8rem;
  color: var(--liquid-color-text-secondary, #888);
}

.demo-audience--dark {
  color: #64748b;
}

@media (max-width: 720px) {
  .demos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
