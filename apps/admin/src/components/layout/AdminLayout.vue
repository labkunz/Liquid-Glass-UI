<script setup lang="ts">
import AdminSidebar from './AdminSidebar.vue'
import AdminNavbar from './AdminNavbar.vue'
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-content">
      <AdminNavbar />
      <main class="page">
        <slot />
      </main>
    </div>
  </div>
</template>
