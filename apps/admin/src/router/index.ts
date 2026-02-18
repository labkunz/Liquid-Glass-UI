import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/DashboardPage.vue'),
    },
    // Jobs
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../pages/jobs/JobsListPage.vue'),
    },
    {
      path: '/jobs/create',
      name: 'job-create',
      component: () => import('../pages/jobs/JobFormPage.vue'),
    },
    {
      path: '/jobs/:id/edit',
      name: 'job-edit',
      component: () => import('../pages/jobs/JobFormPage.vue'),
    },
    // Candidates
    {
      path: '/candidates',
      name: 'candidates',
      component: () => import('../pages/candidates/CandidatesListPage.vue'),
    },
    {
      path: '/candidates/create',
      name: 'candidate-create',
      component: () => import('../pages/candidates/CandidateFormPage.vue'),
    },
    {
      path: '/candidates/:id/edit',
      name: 'candidate-edit',
      component: () => import('../pages/candidates/CandidateFormPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
