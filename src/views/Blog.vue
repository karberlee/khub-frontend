<template>
  <div class="global-content blog">
    <div class="blog-content">
      Blog Module
      <v-btn color="success" @click="replaceRouter('/blog/editor')">New</v-btn>
      <!-- <v-btn color="success" @click="replaceRouter('/blog/editor/')">Edit</v-btn> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const router = useRouter()

const replaceRouter = function (path) {
  router.push(path)
}

const store = useStore()
</script>

<style lang="scss" scoped>
.blog {
  // margin-top: 5rem;
  // min-height: calc( 100vh - 12rem );
  // display: flex;
  // justify-content: center;
}

.blog-content {
  width: 80%;
  // margin-top: 2rem;
  // display: grid;
  // place-items: center;
}
</style>