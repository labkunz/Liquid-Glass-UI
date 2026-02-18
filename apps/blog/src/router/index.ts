import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/:slug',
      name: 'article',
      component: () => import('../pages/ArticlePage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
