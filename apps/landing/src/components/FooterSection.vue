<script setup lang="ts">
import { LiquidCard } from '@liquid/ui'

const entryPoints = [
  {
    icon: '📖',
    label: 'Blog Demo',
    desc: 'Liquid Glass aesthetics in action',
    url: '#',
  },
  {
    icon: '⚙️',
    label: 'Admin Demo',
    desc: 'Form & Table Engine showcase',
    url: '#',
  },
  {
    icon: '📚',
    label: 'Component Docs',
    desc: 'API reference & usage guides',
    url: '#',
  },
  {
    icon: '🎨',
    label: 'Storybook',
    desc: 'Interactive component explorer',
    url: '#',
  },
  {
    icon: '💻',
    label: 'GitHub',
    desc: 'Source code & contributions',
    url: 'https://github.com/placeholder/liquid-ui',
  },
]
</script>

<template>
  <footer class="footer">
    <!-- Entry points section -->
    <div class="entry-points">
      <div class="container">
        <div class="entry-header">
          <p class="section-label">Explore The Ecosystem</p>
          <h2 class="section-title">Five Ways to Explore</h2>
        </div>

        <div class="entry-grid">
          <a
            v-for="entry in entryPoints"
            :key="entry.label"
            :href="entry.url"
            target="_blank"
            rel="noopener noreferrer"
            class="entry-link"
          >
            <LiquidCard variant="glass-css-only" padding="md" class="entry-card">
              <span class="entry-icon">{{ entry.icon }}</span>
              <span class="entry-label">{{ entry.label }}</span>
              <span class="entry-desc">{{ entry.desc }}</span>
            </LiquidCard>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bar">
      <div class="container footer-bar-inner">
        <span class="footer-logo">⬡ Liquid Glass UI</span>
        <span class="footer-copy">
          Built with Vue 3 + Liquid Glass · © 2025
        </span>
        <div class="footer-links">
          <a href="https://github.com/placeholder/liquid-ui" target="_blank" class="footer-link">
            GitHub
          </a>
          <a href="#" class="footer-link">Docs</a>
          <a href="#" class="footer-link">Storybook</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Entry points section */
.entry-points {
  padding: 5rem 0 3rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.entry-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.entry-link {
  text-decoration: none;
  display: block;
}

.entry-card {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.entry-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.entry-icon {
  font-size: 1.5rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.entry-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #f1f5f9;
}

.entry-desc {
  font-size: 0.75rem;
  color: var(--liquid-color-text-secondary, #888);
  line-height: 1.4;
  text-align: center;
}

/* Bottom bar */
.footer-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.5rem 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
}

.footer-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-logo {
  font-weight: 700;
  font-size: 0.95rem;
  color: #f1f5f9;
}

.footer-copy {
  font-size: 0.85rem;
  color: var(--liquid-color-text-secondary, #888);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  font-size: 0.85rem;
  color: var(--liquid-color-text-secondary, #888);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--liquid-color-primary, #007bff);
}

/* Responsive */
@media (max-width: 900px) {
  .entry-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .entry-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bar-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
