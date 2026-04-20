import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/docs',
      component: () => import('@/views/DocsLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/docs/guides/installation',
        },
        {
          path: ':category/:component',
          name: 'doc',
          component: () => import('@/views/docs/DocView.vue'),
        },
      ],
    },
  ],
})

export default router
