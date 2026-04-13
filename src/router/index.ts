import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DocsLayout from '@/views/DocsLayout.vue'
import DocView from '@/views/docs/DocView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/docs',
      component: DocsLayout,
      children: [
        {
          path: '',
          redirect: '/docs/actions/button',
        },
        {
          path: ':category/:component',
          name: 'doc',
          component: DocView,
        },
      ],
    },
  ],
})

export default router
