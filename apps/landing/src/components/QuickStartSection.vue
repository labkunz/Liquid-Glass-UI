<script setup lang="ts">
import { computed } from 'vue'
import { LiquidCard } from '@liquid/ui'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('xml', xml)

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

const highlightedInstall = computed(() =>
  hljs.highlight(installCode, { language: 'bash' }).value
)

/**
 * Post-process hljs XML output:
 * PascalCase tag names (Vue/Liquid components) → add `hljs-liquid-name` class → purple
 * lowercase tag names (native HTML) → keep `.hljs-name` only → VSCode blue
 */
function tagColorize(html: string): string {
  return html.replace(
    /<span class="hljs-name">([^<]+)<\/span>/g,
    (_, name: string) => {
      if (/^[A-Z]/.test(name)) {
        return `<span class="hljs-name hljs-liquid-name">${name}</span>`
      }
      return `<span class="hljs-name">${name}</span>`
    },
  )
}

const highlightedUsage = computed(() =>
  tagColorize(hljs.highlight(usageCode, { language: 'xml' }).value)
)
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
            <LiquidCard variant="glass-css-only" padding="lg">
              <h3 class="step-title">Install</h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <pre><code v-html="highlightedInstall" /></pre>
            </LiquidCard>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <LiquidCard variant="glass-css-only" padding="lg">
              <h3 class="step-title">Use</h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <pre><code v-html="highlightedUsage" /></pre>
            </LiquidCard>
          </div>
        </div>
      </div>

      <div class="quickstart-cta">
        <p class="cta-text">Want to go deeper?</p>
        <div class="cta-links">
          <a href="https://liquid-docs.vercel.app/" target="_blank" rel="noopener noreferrer" class="cta-link cta-link--primary">Read the Docs →</a>
          <a href="https://liquid-storybook.vercel.app/" target="_blank" rel="noopener noreferrer" class="cta-link">Explore Storybook →</a>
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
  color: #f1f5f9;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

/* highlight.js custom token colors — matching landing page palette */
pre {
  margin: 0;
  overflow-x: auto;
}

pre code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.82rem;
  line-height: 1.7;
  color: #e2e8f0;
}

/* Base tokens */
:deep(.hljs-comment),
:deep(.hljs-quote) {
  color: #64748b;
  font-style: italic;
}

:deep(.hljs-keyword),
:deep(.hljs-selector-tag),
:deep(.hljs-built_in) {
  color: #c084fc;
}

/* Native HTML tag names — VSCode Dark+ blue */
:deep(.hljs-name) {
  color: #4fc1ff;
}

/* Liquid / Vue component tag names — library purple */
:deep(.hljs-liquid-name) {
  color: #c084fc;
}

:deep(.hljs-string),
:deep(.hljs-attr) {
  color: #34d399;
}

:deep(.hljs-title),
:deep(.hljs-section),
:deep(.hljs-tag) {
  color: #60a5fa;
}

:deep(.hljs-attribute) {
  color: #f472b6;
}

:deep(.hljs-literal),
:deep(.hljs-number),
:deep(.hljs-symbol),
:deep(.hljs-bullet) {
  color: #fb923c;
}

:deep(.hljs-variable),
:deep(.hljs-template-variable) {
  color: #e2e8f0;
}

:deep(.hljs-meta) {
  color: #94a3b8;
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
  color: #f1f5f9;
}

.cta-link--primary {
  color: #c084fc;
}

.cta-link--primary:hover {
  color: #e879f9;
}
</style>
