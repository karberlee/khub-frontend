<template>
  <header>
    <div>Application Header</div>
    <div>
      <button @click="replaceRouter('/')">Home</button>
      <button @click="replaceRouter('/user_list')">UserList</button>
      <button @click="changeTheme">theme</button>
    </div>
    <Avatar 
      :image="avaterLink"
      name="John Doe"
      size="3rem"
      altText="John's Avatar"
    />
    <Avatar 
      name="Jane Smith"
      size="3rem"
    />
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Avatar from '@/components/Avater.vue'

const router = useRouter()

const theme = ref(localStorage.getItem('theme') || 'light')

const avaterLink = ref('src/assets/images/vue.ico')

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

<style scoped>
header {
  height: 3rem;
  background-color: var(--primary-color);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
