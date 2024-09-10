<template>
  <div class="avatar" :style="{ width: size, height: size }">
    <img v-if="image" :src="image" :alt="altText" class="avatar-image" />
    <div v-else class="avatar-placeholder">{{ initials }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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
});

// Computed properties
const initials = computed(() => {
  if (props.name) {
    return props.name
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase())
      .join('');
  }
  return '';
});
</script>

<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--background-color);
  cursor: pointer;
  /* border: 2px solid #ddd; */
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
