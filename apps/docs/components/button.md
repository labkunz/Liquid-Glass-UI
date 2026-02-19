# Button

A flexible action trigger with multiple visual variants, sizes, and glass effects.

## Demo

### Variants

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;padding:1rem 0;">
  <LiquidButton variant="primary">Primary</LiquidButton>
  <LiquidButton variant="secondary">Secondary</LiquidButton>
  <LiquidButton variant="outline">Outline</LiquidButton>
  <LiquidButton variant="ghost">Ghost</LiquidButton>
  <LiquidButton variant="danger">Danger</LiquidButton>
</div>

### Sizes

<div style="display:flex;gap:0.5rem;align-items:center;padding:1rem 0;">
  <LiquidButton variant="primary" size="sm">Small</LiquidButton>
  <LiquidButton variant="primary" size="md">Medium</LiquidButton>
  <LiquidButton variant="primary" size="lg">Large</LiquidButton>
</div>

### Glass Variants

<div style="background:linear-gradient(135deg,#a78bfa,#60a5fa);padding:1.5rem;border-radius:12px;display:flex;gap:0.75rem;flex-wrap:wrap;">
  <LiquidButton variant="glass-css-only">Glass CSS</LiquidButton>
  <LiquidButton variant="glass-highlight-layered">Glass Highlight</LiquidButton>
</div>

### Disabled State

<div style="display:flex;gap:0.5rem;padding:1rem 0;">
  <LiquidButton variant="primary" :disabled="true">Disabled</LiquidButton>
  <LiquidButton variant="outline" :disabled="true">Disabled Outline</LiquidButton>
</div>

## Usage

```vue
<script setup lang="ts">
import { LiquidButton } from '@liquid/ui'
</script>

<template>
  <LiquidButton variant="primary" size="md" @click="handleClick">
    Click Me
  </LiquidButton>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'glass' \| 'glass-intense' \| 'glass-css-only' \| 'glass-highlight-only' \| 'glass-layered' \| 'glass-highlight-layered'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted on button click (only when not disabled) |

## Notes

- Glass variants (`glass`, `glass-intense`, `glass-layered`, `glass-highlight-layered`) require `GlassFilterProvider` at the app root.
- `glass-css-only` and `glass-highlight-only` work without `GlassFilterProvider`.
- For best glass appearance, ensure there is a colorful or textured background behind the button.
