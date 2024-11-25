<template>
  <div class="global-content preview">
    <div class="preview-content">
      <div class="title-row">
        <div class="blog-title">{{ blog.title }}</div>
        <div class="blog-detail">
          <div class="blog-tags">
            <v-chip color="success" label size="x-small" v-for="tag in blog.tags">{{ tag }}</v-chip>
          </div>
          <div class="update-time">{{ updateTime }}</div>
        </div>
      </div>

      <div class="blog-content">
        <MdPreview class="md-preview" :id="id" v-model="blog.content" />
        <MdCatalog class="md-catalog" :editorId="id" :scrollElement="scrollElement" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import { MdPreview, MdCatalog } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()
const route = useRoute()
const router = useRouter()

const id = 'preview-only'
const scrollElement = document.documentElement

const blog = reactive({
  // title: "",
  // tags: [],
  // content: "",
  // public: true,
  // updateTime: "",
})

const updateTime = computed(() => {
  const date = new Date(blog.updateTime)
  return date.toLocaleString()
})

onMounted(() => {
  init()
})

const init = async () => {
  if (route.params.id) {
    store.commit('setGlobalLoading', true)
    const res = await $get(`/doc/${route.params.id}`)
    if (res.data.code === 0) {
      blog.title = res.data.body.title
      blog.tags = res.data.body.tags
      blog.content = res.data.body.content
      blog.public = res.data.body.public
      blog.updateTime = res.data.body.updateTime
    } else {
      alert(res.data.message)
    }
    store.commit('setGlobalLoading', false)
  }
}

</script>

<style lang="scss" scoped>
.preview {

}

.preview-content {
  width: 80%;
}

.title-row {
  margin: 1.5rem 0 1rem 0;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 10px;

  .blog-title {
    font-size: 1.2rem;
    font-weight: 700;
    // padding: 1rem 1rem;
  }

  .blog-detail {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .blog-tags {
      display: flex;
      gap: 0.5rem;
    }

    .update-time {
      font-size: 0.8rem;
      color: #777777;
    }
  }

}

.blog-content {
  display: flex;
  gap: 1rem;

  .md-preview {
    width: 80%;
    border-radius: 10px;
  }

  .md-catalog {
    padding: 1rem;
    flex-grow: 1;
    background-color: #ffffff;
    border-radius: 10px;
    position: -webkit-sticky;  /* For Safari support */
    position: sticky;          /* For modern browsers */
    top: 6.5rem;                    /* 固定在顶部 */
    height: 100%;             /* 确保它覆盖整个视窗的高度 */
    overflow-y: auto;          /* 如果内容过多，可以滚动 */
  }
}
</style>