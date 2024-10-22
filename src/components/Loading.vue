<template>
  <div v-if="isLoading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary" width="5" size="80"></v-progress-circular>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from "vuex"

const store = useStore()

const isLoading = computed(() => {
  return store.state.globalLoading
})
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998; /* 确保在最上层 */
}
</style>