# Navbar

A responsive top navigation bar with glass variants and built-in mobile hamburger menu.

## Demo

### Glass Light (for light backgrounds)

<div style="background:linear-gradient(135deg,#f0f4ff,#faf0ff,#f0faff);border-radius:12px;overflow:hidden;margin:1rem 0;">
  <LiquidNavbar variant="glass-light" :sticky="false">
    <template #logo>
      <span style="font-weight:700;">⬡ My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#666;">Home</span>
      <span style="font-size:0.9rem;color:#666;">Blog</span>
      <span style="font-size:0.9rem;color:#666;">About</span>
    </template>
    <template #actions>
      <LiquidButton variant="primary" size="sm">Sign Up</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

### Glass Dark (for dark backgrounds)

<div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:12px;overflow:hidden;margin:1rem 0;">
  <LiquidNavbar variant="glass-css-only" :sticky="false">
    <template #logo>
      <span style="font-weight:700;color:#f1f5f9;">⬡ My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#94a3b8;">Dashboard</span>
      <span style="font-size:0.9rem;color:#94a3b8;">Jobs</span>
      <span style="font-size:0.9rem;color:#94a3b8;">Candidates</span>
    </template>
    <template #actions>
      <LiquidButton variant="outline" size="sm">Settings</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

### Default (Solid white)

<div style="border-radius:12px;overflow:hidden;margin:1rem 0;border:1px solid #eee;">
  <LiquidNavbar variant="default" :sticky="false">
    <template #logo>
      <span style="font-weight:700;">My App</span>
    </template>
    <template #links>
      <span style="font-size:0.9rem;color:#666;">Home</span>
      <span style="font-size:0.9rem;color:#666;">Docs</span>
    </template>
    <template #actions>
      <LiquidButton variant="secondary" size="sm">Login</LiquidButton>
    </template>
  </LiquidNavbar>
</div>

## Usage

```vue
<script setup lang="ts">
import { LiquidNavbar, LiquidButton } from '@liquid/ui'
</script>

<template>
  <LiquidNavbar variant="glass-light" :sticky="true">
    <!-- Logo area (left) -->
    <template #logo>
      <span class="brand">⬡ MyBrand</span>
    </template>

    <!-- Navigation links (center) -->
    <template #links>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
    </template>

    <!-- Action buttons (right) -->
    <template #actions>
      <LiquidButton variant="outline" size="sm">Login</LiquidButton>
      <LiquidButton variant="primary" size="sm">Sign Up</LiquidButton>
    </template>
  </LiquidNavbar>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'glass-css-only' \| 'glass-light'` | `'default'` | Visual style variant |
| `sticky` | `boolean` | `true` | Whether the navbar sticks to the top on scroll (`position: sticky`) |

## Slots

| Slot | Description |
|------|-------------|
| `logo` | Left area — typically brand logo or name |
| `links` | Center area — navigation links |
| `actions` | Right area — CTA buttons, user menu |

## Notes

- `glass-light`: `rgba(255,255,255,0.65)` background — best for **light** page backgrounds (Blog demo).
- `glass-css-only`: `rgba(255,255,255,0.1)` background — best for **dark** page backgrounds (Admin demo).
- Both glass variants use `backdrop-filter: blur(16px)`.
- The Navbar includes a built-in mobile hamburger toggle. The `links` slot content is shown in the mobile dropdown menu at `max-width: 640px`.
