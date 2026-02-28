<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path.startsWith('/dashboard')) return 'Dashboard'
  if (path.includes('/jobs/create')) return '新增職缺'
  if (path.includes('/jobs') && path.includes('/edit')) return '編輯職缺'
  if (path.startsWith('/jobs')) return '職缺管理'
  if (path.includes('/candidates/create')) return '新增應徵者'
  if (path.includes('/candidates') && path.includes('/edit')) return '編輯應徵者'
  if (path.startsWith('/candidates')) return '應徵者管理'
  return 'Liquid ATS'
})
</script>

<template>
  <header class="admin-navbar">
    <div class="admin-navbar__inner">
      <h1 class="admin-navbar__title">
        {{ pageTitle }}
      </h1>
      <div class="admin-navbar__actions">
        <span class="admin-navbar__badge">Demo Mode</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(15, 17, 23, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.admin-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navbar-height);
  padding: 0 1.5rem;
}

.admin-navbar__title {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
}

.admin-navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-navbar__badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 4px;
  color: #60a5fa;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>
