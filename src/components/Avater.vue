<template>
  <div class="avatar" :style="{ width: size, height: size, 'background-color': color }">
    <img v-if="image" :src="fullImage" :alt="altText" class="avatar-image"/>
    <div v-else class="avatar-placeholder">{{ initials }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  image: String,
  name: String,
  size: {
    type: String,
    default: '50px',
  },
  altText: {
    type: String,
    default: 'Avatar',
  },
  noUser: {
    type: Boolean,
    default: false
  },
})

const fullImage = computed(() => {
  if (!props.image) return ''
  if (props.image.startsWith('public')) return `${import.meta.env.VITE_API_URL}/${props.image}`
  return props.image
})

// Computed properties
const initials = computed(() => {
  if (props.noUser) {
    return 'Login'
  }
  if (props.name) {
    return props.name
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase())
      .join('')
  }
  return ''
})

const color = computed(() => {
  if (props.name) {
    return generateColor(props.name)
  }
  return '#ffffff'
})

const generateColor = (str) => {
  // 将字符串的字符编码值转换为一个 32 位整数
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i) // 简单的哈希算法
    hash |= 0 // 确保 hash 是一个 32 位整数
  }
  
  // 将哈希值转换为十六进制，并确保生成一个有效的颜色（6位颜色）
  const color = (hash & 0x00FFFFFF).toString(16).toUpperCase() // 取低24位作为颜色值
  return `#${'000000'.substring(0, 6 - color.length) + color}`
}
</script>

<style scoped>
.avatar {
  display: flex !important;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  /* background-color: var(--background-color); */
  cursor: pointer;
  border: 3px solid #ddd;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  /* color: #fff;
  background-color: #007bff; */
}
</style>
