<template>
  <Loading />
  <Snackbar />
  <!-- <component v-if="showHeaderFooter" :is="headerComponent" /> -->
  <!-- <router-view /> -->
  <!-- <component v-if="showHeaderFooter" :is="footerComponent" /> -->
  <MobileLayout v-if="isMobile"/>
  <Layout v-else/>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'
import Snackbar from '@/components/Snackbar.vue'
import Layout from './views/Layout.vue'
import MobileLayout from './mobileViews/Layout.vue'

// 通过动态导入来避免不必要的组件加载
const Header = defineAsyncComponent(() => import('@/components/Header.vue'))
const Footer = defineAsyncComponent(() => import('@/components/Footer.vue'))

const route = useRoute()

const routeList = ['/login', '/signup']
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const showHeaderFooter = computed(() => {
  return !routeList.includes(route.path)
})

// 设置动态组件
const headerComponent = showHeaderFooter.value ? Header : null
const footerComponent = showHeaderFooter.value ? Footer : null
</script>

<style scoped>

</style>
