import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"
import Home from "@/views/Home.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      meta: { auth: false }
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Users.vue'),
      meta: { auth: true }
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/views/Notes.vue'),
      meta: { auth: true }
    },
    {
      path: '/sites',
      name: 'sites',
      component: () => import('@/views/Sites.vue'),
      meta: { auth: true }
    },
    {
      path: "/:catchAll(.*)", // vue3区别于vue2的写法，vue2中直接/*
      redirect: "/"
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.auth && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
