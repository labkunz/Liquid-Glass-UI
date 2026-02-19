# Getting Started

## Installation

Install the component library and design tokens packages:

```bash
pnpm add @liquid/ui @liquid/tokens
```

Or with npm / yarn:

```bash
npm install @liquid/ui @liquid/tokens
# or
yarn add @liquid/ui @liquid/tokens
```

## Setup

### 1. Import Design Tokens

Import the CSS token files in your app entry point. These provide all CSS variables used by the components:

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Design tokens (required)
import '@liquid/tokens/colors.css'
import '@liquid/tokens/glass.css'

createApp(App).mount('#app')
```

### 2. Wrap with GlassFilterProvider

`GlassFilterProvider` injects the SVG filter definitions needed by glass-variant components (`glass`, `glass-intense`, `glass-layered`, etc.). Place it at your app root:

```vue
<!-- App.vue -->
<script setup lang="ts">
import { GlassFilterProvider } from '@liquid/ui'
</script>

<template>
  <GlassFilterProvider>
    <!-- Your app content -->
    <RouterView />
  </GlassFilterProvider>
</template>
```

::: tip
If you only use the `glass-css-only` variant (pure CSS, no SVG filters), `GlassFilterProvider` is optional.
:::

### 3. Use Components

```vue
<script setup lang="ts">
import { LiquidButton, LiquidCard, LiquidBadge } from '@liquid/ui'
</script>

<template>
  <LiquidCard variant="glass-css-only" padding="lg">
    <LiquidBadge color="primary">New Feature</LiquidBadge>
    <h2>Hello, Liquid Glass!</h2>
    <LiquidButton variant="primary">Get Started</LiquidButton>
  </LiquidCard>
</template>
```

## Theming

All components use CSS custom properties from `@liquid/tokens`. Override them on any container to theme a section or the entire app.

### Dark Theme

```css
/* global.css */
body {
  background: #0f1117;
  /* Override card glass variables for dark backgrounds */
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.05);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
}
```

### Light Theme (Default)

The default token values are optimized for light backgrounds. The gradient background pattern used across this library's demos:

```css
body {
  background: linear-gradient(135deg, #f0f4ff 0%, #faf0ff 50%, #f0faff 100%);
  background-attachment: fixed;
}
```

## Glass Variants

Each component supports multiple glass variants:

| Variant | Description | Requires GlassFilterProvider |
|---------|-------------|-------------------------------|
| `default` | Solid white card, standard styling | No |
| `glass-css-only` | Pure CSS glass via `backdrop-filter` and layered pseudo-elements | No |
| `glass-highlight-layered` | CSS glass + `#glass-highlight-only` SVG filter for organic highlight | **Yes** |

::: warning
For the best visual result with `glass-css-only`, ensure the element has a colorful or textured background visible behind it. Glass on a plain white background will have no visible blur effect.
:::

## Next Steps

- Browse the [Components](/components/button) reference
- Check out the [Blog Demo](#) for design-focused usage
- Check out the [Admin Demo](#) for engineering-focused usage
