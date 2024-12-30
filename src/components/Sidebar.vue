<template>
  <div class="sidebar">
    <v-tabs
      v-model="tab"
      color="primary"
      direction="vertical"
    >
      <v-tab
        v-for="item in menuItems"
        :prepend-icon="item.icon"
        :text="item.name"
        :value="item.name"
        @click="replaceRouter(item.path)"
      ></v-tab>
    </v-tabs>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"

const route = useRoute()
const router = useRouter()

const menuItems = [
  { name: 'Dashboard', icon: 'mdi-view-dashboard', path: '/manage/dashboard' },
  { name: 'Site', icon: 'mdi-web', path: '/manage/sites' },
  { name: 'Note', icon: 'mdi-note-multiple', path: '/manage/notes' },
  { name: 'My Blog', icon: 'mdi-post', path: '/manage/blog/public' },
  { name: 'Private Blog', icon: 'mdi-post', path: '/manage/blog/private' },
]

const tab = ref('Dashboard')

watch(() => route.path, () => {
  init()
})

const replaceRouter = function (path) {
  router.push(path)
}

onMounted(() => {
  init()
})

const init = () => {
  const currentItem = menuItems.find(item => item.path == route.path)
  if (currentItem) {
    tab.value = currentItem.name
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 15rem;
  height: calc(100vh - 5rem);
  margin-top: 5rem;
  background: var(--pure-color);
  padding: 1rem;
  // border-radius: 10px;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 
    2px 0 4px 0 rgba(0, 0, 0, .2); 
    // 0 4px 5px 0 rgba(0, 0, 0, .14), 
    // 0 1px 10px 0 rgba(0, 0, 0, .12);
}
</style>