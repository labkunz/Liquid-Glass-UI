# Card

A versatile container component with solid and glass variants. The flagship component for Liquid Glass aesthetics.

## Demo

### Default

<div style="padding:1rem 0;">
  <LiquidCard variant="default" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;">Default Card</h3>
    <p style="margin:0;color:#666;font-size:0.9rem;">A clean white card with a subtle shadow. Great for structured content.</p>
  </LiquidCard>
</div>

### Glass (CSS Only)

<div style="background:linear-gradient(135deg,#f0f4ff,#faf0ff,#f0faff);padding:1.5rem;border-radius:12px;">
  <LiquidCard variant="glass-css-only" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;">Glass Card</h3>
    <p style="margin:0;color:#475569;font-size:0.9rem;">Glass morphism via <code>backdrop-filter: blur()</code> and layered pseudo-elements. No runtime dependency.</p>
  </LiquidCard>
</div>

### Glass on Colorful Background

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);padding:1.5rem;border-radius:12px;">
  <LiquidCard variant="glass-css-only" padding="lg">
    <h3 style="margin:0 0 0.5rem;font-size:1rem;color:#1e293b;">Glass on Gradient</h3>
    <p style="margin:0;color:#334155;font-size:0.9rem;">The glass effect is most visible on colorful or textured backgrounds.</p>
  </LiquidCard>
</div>

### Padding Variants

<div style="display:flex;gap:1rem;padding:1rem 0;flex-wrap:wrap;">
  <LiquidCard variant="default" padding="sm">
    <span style="font-size:0.875rem;">padding="sm"</span>
  </LiquidCard>
  <LiquidCard variant="default" padding="md">
    <span style="font-size:0.875rem;">padding="md"</span>
  </LiquidCard>
  <LiquidCard variant="default" padding="lg">
    <span style="font-size:0.875rem;">padding="lg"</span>
  </LiquidCard>
</div>

## Usage

```vue
<script setup lang="ts">
import { LiquidCard } from '@liquid/ui'
</script>

<template>
  <!-- Standard card -->
  <LiquidCard variant="default" padding="lg">
    <h2>Card Title</h2>
    <p>Card content goes here.</p>
  </LiquidCard>

  <!-- Glass card (needs a visible background behind it) -->
  <LiquidCard variant="glass-css-only" padding="lg">
    <h2>Glass Card</h2>
    <p>Blurs whatever is behind it.</p>
  </LiquidCard>
</template>
```

## CSS Variable Customization

The glass variant exposes CSS variables for theme adaptation:

```css
/* Dark theme example (from Admin demo) */
:root {
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.05);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.08);
  --liquid-card-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  --liquid-card-glass-highlight-opacity: 0.06;
}

/* Light theme example (default) */
:root {
  --liquid-card-glass-bg: rgba(255, 255, 255, 0.5);
  --liquid-card-glass-border-color: rgba(255, 255, 255, 0.65);
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | Visual style variant |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `overflow` | `'hidden' \| 'visible' \| 'auto'` | `'hidden'` | CSS overflow behavior |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Card content |
