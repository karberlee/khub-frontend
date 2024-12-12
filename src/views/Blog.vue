<template>
  <div class="global-content blog">
    <div class="blog-content">
      <div class="global-title">Blogs Page</div>
      <v-btn color="success" @click="replaceRouter('/blog/editor')">New</v-btn>
      <!-- <v-btn color="success" @click="replaceRouter('/blog/editor/')">Edit</v-btn> -->

      <v-row>
        <v-col
          cols="12"
          xl="3"
          md="6"
          sm="12"
          v-for="(blog, i) in data.blogList"
          :key="blog._id"
        >
          <v-card
            link
            @click="openDetail(blog._id)"
          >
            <v-img
              height="200px"
              :src="`/images/samples/00${i + 1}.jpg`"
              cover
            ></v-img>
            <v-card-item>
              <!-- <template v-slot:prepend>
                <v-icon color="primary" icon="mdi-account"></v-icon>
              </template> -->
              <!-- <template v-slot:append>
                <v-icon color="success" icon="mdi-check"></v-icon>
              </template> -->
              <v-card-title>{{ blog.title || "No Title" }}</v-card-title>
              <v-card-subtitle>{{ getLocalTime(blog.updateTime) || "No Update Time" }}</v-card-subtitle>
            </v-card-item>
            <div v-if="blog.tags.length > 0" class="card-tags">
              <v-chip color="success" label size="x-small" v-for="tag in blog.tags">{{ tag }}</v-chip>
            </div>
            <div v-else class="card-tags">
              <v-chip color="cyan" label size="x-small">No Tag</v-chip>
            </div>
            <v-card-text>
              <div class="card-content">{{ renderMarkdownToText(blog.content) }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
import * as marked from 'marked'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()
const router = useRouter()

const data = reactive({
  blogList: [],
})

const renderMarkdownToText = (content) => {
  // 使用 marked 将 Markdown 渲染为 HTML，然后再清除 HTML 标签
  const html = marked.parse(content)
  return html.replace(/<\/?[^>]+(>|$)/g, "") // 去除 HTML 标签
}

const getLocalTime = (utcTime) => {
  const date = new Date(utcTime)
  return date.toLocaleString().slice(0, 10)
}

const replaceRouter = function (path) {
  router.push(path)
}

const openDetail = (blogId) => {
  const url = router.resolve({ path: `/blog/detail/${blogId}` }).href
  window.open(url, '_blank')
}

onMounted(() => {
  init()
})

// component init, get all blogs
const init = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get("/doc")
  store.commit('setGlobalLoading', false)
  if (res.data.code === 0) {
    data.blogList = res.data.body
  } else {
    alert(res.data.message)
  }
}

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

.card-tags {
  padding: 0 1rem;
  display: flex;
  gap: 0.5rem;
}

.card-content {
  height: 60px;
  overflow: hidden;              /* 隐藏超出容器的部分 */
  display: -webkit-box;          /* 必须设置，启用多行文本处理 */
  -webkit-line-clamp: 3;         /* 设置最多显示的行数 */
  -webkit-box-orient: vertical;  /* 必须设置，启用垂直排列 */
  text-overflow: ellipsis;       /* 超出部分用省略号表示 */
  word-break: break-word;
  white-space: normal;
}
</style>