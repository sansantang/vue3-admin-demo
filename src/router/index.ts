import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    // redirect: '/login',
    component: () => import('@/views/Main.vue'),
    // children: [
    //   {
    //     path: '/home',
    //     name: 'home',
    //     component: () => import('@/views/Home.vue'),
    //   },
    // {
    //   path: '/mall',
    //   name: 'mall',
    //   component: () => import('@/views/Mall.vue'),
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('@/views/Users/User.vue'),
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: () => import('@/views/Users/User.vue'),
    // },
    // ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
