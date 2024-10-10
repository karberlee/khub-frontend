<template>
  <header>
    <div class="main-button">
      <img class="main-icon" src="@/assets/images/hatch.png" @click="replaceRouter('/')" alt="">
    </div>

    <div class="menus">
      <div class="menu-button" :class="{ active: currentRouter === '/' }" @click="replaceRouter('/')">Home</div>
      <div class="menu-button" :class="{ active: currentRouter === '/users' }" @click="replaceRouter('/users')">Users</div>
      <div class="menu-button" :class="{ active: currentRouter === '/sites' }" @click="replaceRouter('/sites')">Sites</div>
      <div class="menu-button" :class="{ active: currentRouter === '/notes' }" @click="replaceRouter('/notes')">Notes</div>
      <div class="menu-button" @click="changeTheme">theme</div>
    </div>

    <div class="avatar">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <Avatar v-bind="props" :image="user.avatar" :name="user.name" size="3rem"
            :altText="user.name + ' Avatar'" />
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in avatarMenus" :key="index" :value="item">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <div>{{ item.title }}</div>
          </v-list-item>
          <v-list-item @click="logout">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <div>Logout</div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import Avatar from "@/components/Avater.vue"
const { appContext } = getCurrentInstance()
const { $get } = appContext.config.globalProperties

const store = useStore()

const router = useRouter()

const theme = ref(localStorage.getItem("theme") || "default")

const user = computed(() => {
  return store.state.user
})

const currentRouter = ref("/")

const avatarMenus = reactive([
  { icon: "mdi-pencil", title: "Edit" },
  { icon: "mdi-cog", title: "Setting" },
])

// Navigate to Home page
const replaceRouter = function (path) {
  currentRouter.value = path
  router.push(path)
  console.log("aaa:", currentRouter.value === path)
}

// change theme
const changeTheme = function () {
  theme.value = theme.value === "default" ? "dark" : "default"
}

// logout
const logout = function () {
  localStorage.removeItem("token")
  localStorage.removeItem("userId")
  window.location.reload()
}

watch(theme, (newTheme) => {
  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Initialize theme
document.documentElement.setAttribute("data-theme", theme.value)

onMounted(() => {
  getUserInfo()
})

const getUserInfo = async () => {
  const userId = localStorage.getItem('userId')
  const res = await $get(`/user/${userId}`)
  store.commit('setUser', res.data.body)
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  box-shadow: 
    0 2px 4px -1px rgba(0, 0, 0, .2), 
    0 4px 5px 0 rgba(0, 0, 0, .14), 
    0 1px 10px 0 rgba(0, 0, 0, .12);
}

.main-button {
  height: 100%;
  width: 10rem;
  font-size: 2rem;
  font-weight: bolder;
  display: grid;
  place-items: center;
  color: var(--text-color);
  
  .main-icon {
    height: 4rem;          /* 最大高度 100% */
    transition: transform 0.3s; /* 过渡效果 */
    cursor: pointer;
    // object-fit: contain;
  }

  .main-icon:hover {
    transform: scale(1.05);    /* 悬停时放大效果 */
  }
}

.menus {
  height: 100%;
  display: flex;

  .menu-button {
    height: 100%;
    min-width: 10rem;
    display: grid;
    place-items: center;
    color: var(--text-color);
    font-weight: bolder;
    cursor: pointer;
  }

  .menu-button:hover {
    background-color: var(--secondary-color);
  }

  .menu-button.active {
    background-color: var(--secondary-color);
  }
}

.avatar {
  height: 100%;
  width: 5rem;
  display: grid;
  place-items: center;
}
</style>
