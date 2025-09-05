import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import MobileLogin from '@/mobileViews/Login.vue'
import Home from "@/views/Home.vue"

const webRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
    meta: { auth: false }
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Users.vue'),
    meta: { auth: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/views/Notes.vue'),
    meta: { auth: true }
  },
  {
    path: '/sites',
    name: 'Sites',
    component: () => import('@/views/Sites.vue'),
    meta: { auth: true }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/blog/editor/:id?',
    name: 'BlogEditor',
    component: () => import('@/views/BlogEditor.vue'),
    meta: { auth: true },
  },
  {
    path: '/blog/detail/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/dashboard',
    name: 'ManageDashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/notes',
    name: 'ManageNotes',
    component: () => import('@/views/Notes.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/sites',
    name: 'ManageSites',
    component: () => import('@/views/Sites.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/blog/public',
    name: 'ManageBlogPublic',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/blog/private',
    name: 'ManageBlogPrivate',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/assets',
    name: 'Assets',
    component: () => import('@/views/Assets.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
    meta: { auth: true },
  },
  // {
  //   path: '/manage',
  //   name: 'Manage',
  //   component: Layout,
  //   meta: { auth: true },
  //   children: [
  //     {
  //       path: '/notes',
  //       name: 'Notes',
  //       component: () => import('@/views/Notes.vue'),
  //       meta: { auth: true }
  //     },
  //     {
  //       path: '/sites',
  //       name: 'Sites',
  //       component: () => import('@/views/Sites.vue'),
  //       meta: { auth: true }
  //     },
  //     {
  //       path: '/blog',
  //       name: 'Blog',
  //       component: () => import('@/views/Blog.vue'),
  //       meta: { auth: true },
  //     },
  //   ]
  // },
  {
    path: "/:catchAll(.*)", // vue3区别于vue2的写法，vue2中直接/*
    redirect: "/"
  }
]

const mobileRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: MobileLogin,
    meta: { auth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
    meta: { auth: false }
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Users.vue'),
    meta: { auth: true }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/views/Notes.vue'),
    meta: { auth: true }
  },
  {
    path: '/sites',
    name: 'Sites',
    component: () => import('@/views/Sites.vue'),
    meta: { auth: true }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/blog/editor/:id?',
    name: 'BlogEditor',
    component: () => import('@/views/BlogEditor.vue'),
    meta: { auth: true },
  },
  {
    path: '/blog/detail/:id',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/dashboard',
    name: 'ManageDashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/notes',
    name: 'ManageNotes',
    component: () => import('@/views/Notes.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/sites',
    name: 'ManageSites',
    component: () => import('@/views/Sites.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/blog/public',
    name: 'ManageBlogPublic',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/blog/private',
    name: 'ManageBlogPrivate',
    component: () => import('@/views/Blog.vue'),
    meta: { auth: true },
  },
  {
    path: '/manage/assets',
    name: 'Assets',
    component: () => import('@/views/Assets.vue'),
    meta: { auth: true }
  },
  {
    path: '/manage/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
    meta: { auth: true },
  },
  {
    path: "/:catchAll(.*)", // vue3区别于vue2的写法，vue2中直接/*
    redirect: "/"
  }
]

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const routes = isMobile ? mobileRoutes : webRoutes

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: webRoutes,
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.auth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
