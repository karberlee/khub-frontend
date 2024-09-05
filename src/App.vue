<template>
  <Header v-if="showHeaderFooter" />
  <router-view />
  <Footer v-if="showHeaderFooter" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()

const showHeaderFooter = computed(() => {
  return route.path !== '/login'
})
</script>

<style scoped>

</style>
