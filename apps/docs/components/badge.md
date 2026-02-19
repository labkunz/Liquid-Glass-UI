# Badge

A compact semantic label for status, category, or tag display.

## Demo

### Colors

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;padding:1rem 0;">
  <LiquidBadge color="default">Default</LiquidBadge>
  <LiquidBadge color="primary">Primary</LiquidBadge>
  <LiquidBadge color="success">Success</LiquidBadge>
  <LiquidBadge color="warning">Warning</LiquidBadge>
  <LiquidBadge color="danger">Danger</LiquidBadge>
  <LiquidBadge color="info">Info</LiquidBadge>
</div>

### Shapes

<div style="display:flex;gap:0.5rem;align-items:center;padding:1rem 0;">
  <LiquidBadge color="primary" shape="pill">Pill (default)</LiquidBadge>
  <LiquidBadge color="primary" shape="rounded">Rounded</LiquidBadge>
</div>

### Sizes

<div style="display:flex;gap:0.5rem;align-items:center;padding:1rem 0;">
  <LiquidBadge color="primary" size="sm">Small</LiquidBadge>
  <LiquidBadge color="primary" size="md">Medium</LiquidBadge>
  <LiquidBadge color="primary" size="lg">Large</LiquidBadge>
</div>

### Semantic Status Example

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;padding:1rem 0;">
  <LiquidBadge color="default">Pending</LiquidBadge>
  <LiquidBadge color="info">Round 1</LiquidBadge>
  <LiquidBadge color="primary">Round 2</LiquidBadge>
  <LiquidBadge color="warning">Offer</LiquidBadge>
  <LiquidBadge color="success">Hired</LiquidBadge>
  <LiquidBadge color="danger">Rejected</LiquidBadge>
</div>

## Usage

```vue
<script setup lang="ts">
import { LiquidBadge } from '@liquid/ui'
</script>

<template>
  <LiquidBadge color="success" shape="pill" size="md">
    Active
  </LiquidBadge>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-highlight-layered'` | `'default'` | Visual style variant |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Semantic color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `shape` | `'pill' \| 'rounded'` | `'pill'` | Border radius style |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Badge text content |
