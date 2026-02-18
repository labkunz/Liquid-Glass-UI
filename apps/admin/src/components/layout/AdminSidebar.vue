<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const navItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
      <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
      <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
      <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
  },
  {
    path: '/jobs',
    label: '職缺管理',
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M6 4V3C6 2.45 6.45 2 7 2h4c.55 0 1 .45 1 1v1" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 8h14" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
  },
  {
    path: '/candidates',
    label: '應徵者管理',
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M2 15c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
]

function isActive(path: string) {
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="admin-sidebar glass-panel">
    <!-- Logo -->
    <div class="admin-sidebar__logo">
      <span class="admin-sidebar__logo-icon">◈</span>
      <span class="admin-sidebar__logo-text">Liquid ATS</span>
    </div>

    <!-- Navigation -->
    <nav class="admin-sidebar__nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="admin-sidebar__nav-item"
        :class="{ 'admin-sidebar__nav-item--active': isActive(item.path) }"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="admin-sidebar__nav-icon" v-html="item.icon" />
        <span class="admin-sidebar__nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="admin-sidebar__footer">
      <span class="admin-sidebar__footer-text">Liquid UI Library Demo</span>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.03);
}

/* ---- Logo ---- */
.admin-sidebar__logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 0.5rem;
}

.admin-sidebar__logo-icon {
  font-size: 1.25rem;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-sidebar__logo-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.01em;
}

/* ---- Nav ---- */
.admin-sidebar__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.75rem;
}

.admin-sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-decoration: none;
  transition: all 0.15s;
}

.admin-sidebar__nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #94a3b8;
}

.admin-sidebar__nav-item--active {
  background: rgba(96, 165, 250, 0.12);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.2);
}

.admin-sidebar__nav-item--active:hover {
  background: rgba(96, 165, 250, 0.15);
}

.admin-sidebar__nav-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

/* ---- Footer ---- */
.admin-sidebar__footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.admin-sidebar__footer-text {
  font-size: 0.7rem;
  color: #334155;
}
</style>
