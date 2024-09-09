<template>
  <header>
    <div class="main-button">Header</div>
    <div class="menus">
      <div class="menu-button" @click="replaceRouter('/')">Home</div>
      <div class="menu-button" @click="replaceRouter('/user_list')">UserList</div>
      <div class="menu-button" @click="changeTheme">theme</div>
    </div>
    <Avatar 
      :image="userInfo.avatar"
      :name="userInfo.nickname"
      size="3rem"
      :altText="userInfo.nickname + ' Avatar'"
    />
  </header>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Avatar from '@/components/Avater.vue'

const router = useRouter()

const theme = ref(localStorage.getItem('theme') || 'light')

const userInfo = reactive({
  nickname: 'Hello',
  avatar: 'src/assets/images/vue.ico',
  email: 'email@example.com'
})

// Navigate to Home page
const replaceRouter = function(path) {
  router.push(path)
}

// change theme
const changeTheme = function() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
})

// Initialize theme
document.documentElement.setAttribute('data-theme', theme.value)
</script>

<style lang="scss" scoped>
header {
  height: 5rem;
  background-color: var(--background-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-button {
  height: 100%;
  width: 10rem;
  font-size: 2rem;
  font-weight: bolder;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.menus {
  height: 100%;
  display: flex;

  .menu-button {
    height: 100%;
    min-width: 10rem;
    display: grid;
    place-items: center;
    background-color: var(--primary-color);
    color: var(--text-color);
    font-weight: bolder;
    cursor: pointer;
  }
  
  .menu-button:hover {
    background-color: var(--secondary-color);
  }
}

</style>
