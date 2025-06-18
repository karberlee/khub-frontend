<template>
  <div>
    <v-snackbar v-model="globalSnackbar.visible" color="error">
      <div>{{ globalSnackbar.message }}</div>
      <div>{{ globalSnackbar.detail }}</div>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const globalSnackbar = computed(() => {
  return store.state.globalSnackbar
})
</script>

<style lang="scss" scoped>
  
</style>