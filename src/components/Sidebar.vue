<template>
  <div class="sidebar">
    <!-- <v-tabs
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
    </v-tabs> -->

    <div class="workspace-select">
      <v-select
        width="100%"
        v-model="data.currentWorkspaceId"
        label="Workspace"
        :items="workspaceSeletcList"
        variant="outlined"
        @update:modelValue="changeWorkspace"
      ></v-select>
    </div>

    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :prepend-icon="item.icon"
        :value="item.name"
        :active="tab===item.name"
        @click="replaceRouter(item.path)"
        color="primary"
      >
        <v-list-item-title class="custom-title">{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, reactive, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const route = useRoute()
const router = useRouter()

const menuItems = [
  { name: 'Dashboard', icon: 'mdi-view-dashboard', path: '/manage/dashboard' },
  { name: 'Site', icon: 'mdi-web', path: '/manage/sites' },
  { name: 'Note', icon: 'mdi-note-multiple', path: '/manage/notes' },
  { name: 'My Blog', icon: 'mdi-post', path: '/manage/blog/public' },
  { name: 'Private Blog', icon: 'mdi-post', path: '/manage/blog/private' },
  { name: 'Asset', icon: 'mdi-cash', path: '/manage/assets' },
  { name: 'Setting', icon: 'mdi-cog', path: '/manage/setting' },
]

const data = reactive({
  workspaceList: [],
  currentWorkspaceId: '',
})

const tab = ref('Dashboard')

const workspaceSeletcList = computed(() => {
  return data.workspaceList.map(item => { return { title: item.name, value: item._id } })
})

watch(() => route.path, () => {
  init()
})

const replaceRouter = function (path) {
  router.push(path)
}

const changeWorkspace = () => {
  localStorage.setItem('workspaceId', data.currentWorkspaceId)
  location.reload()
}

onMounted(async () => {
  init()
  await loadWorkspaceList()
})

const init = async () => {
  const currentItem = menuItems.find(item => item.path == route.path)
  if (currentItem) {
    tab.value = currentItem.name
  }
}

const loadWorkspaceList = async () => {
  const res = await $get('/workspace')
  data.workspaceList = res.data.body.filter(item => item.active)
  const localStorageWorkspaceId = localStorage.getItem('workspaceId')
  if (localStorageWorkspaceId && data.workspaceList.map(item => item._id).includes(localStorageWorkspaceId)) {
    // 当浏览器本地存储中存在workspaceId且该workspaceId有效，将其设为当前workspaceId
    data.currentWorkspaceId = localStorageWorkspaceId
  } else {
    // 否则将默认workspace的id设为当前workspaceId并存入浏览器本地存储
    data.currentWorkspaceId = data.workspaceList.find(item => item.default)._id
    localStorage.setItem('workspaceId', data.currentWorkspaceId)
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 15rem;
  height: calc(100vh - 5rem);
  margin-top: 5rem;
  background: var(--pure-color);
  padding: 0.5rem;
  // border-radius: 10px;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 
    2px 0 4px 0 rgba(0, 0, 0, .2); 
    // 0 4px 5px 0 rgba(0, 0, 0, .14), 
    // 0 1px 10px 0 rgba(0, 0, 0, .12);
}

.workspace-select {
  margin: 0.5rem;

  .v-text-field :deep(.v-input__details) {
    display: none;
  }
}

.list-item {
  // color: var(--primary-color);
}

.custom-title {
  font-size: 1rem !important; /* 你可以根据需要调整大小 */
  line-height: unset !important;
}
</style>