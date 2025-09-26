import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/Users/User.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
