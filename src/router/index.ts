import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Users.vue')
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('@/views/Notes.vue')
    },
    {
      path: '/sites',
      name: 'sites',
      component: () => import('@/views/Sites.vue')
    },
    {
      path: "/:catchAll(.*)", // vue3区别于vue2的写法，vue2中直接/*
      redirect: "/"
    }
  ]
})

export default router
