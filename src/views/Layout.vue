<template>
  <div class="layout">
    <component v-if="showHeader" :is="headerComponent" />
    <div class="content">
      <Sidebar v-if="showSidebar" />
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <component v-if="showFooter" :is="footerComponent" />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

// 通过动态导入来避免不必要的组件加载
const Header = defineAsyncComponent(() => import('@/components/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'))

const route = useRoute()

const routeList = ['/login', '/signup']

const showHeader = computed(() => {
  return !routeList.includes(route.path)
})

// 仅当 URL 是以 '/manage/' 开头时才显示菜单栏
const showSidebar = computed(() => {
  return route.path.startsWith('/manage')
})

const showFooter = computed(() => {
  return !routeList.includes(route.path) && !route.path.startsWith('/manage')
})

// 设置动态组件
const headerComponent = showHeader.value ? Header : null
const footerComponent = showFooter.value ? Footer : null
</script>

<style lang="scss" scoped>
.layout {
  // display: flex;
  // flex-direction: column;
  // height: 100vh;
}
.content {
  display: flex;
  justify-content: center;
}
.main-content {
  flex: 1;
  // padding: 20px;
}
</style>