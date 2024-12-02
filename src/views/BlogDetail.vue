<template>
  <div class="global-content preview">
    <div class="preview-content">
      <div class="blog-content">

        <v-card class="blog-sider">
          <v-card-item>
            <!-- <template v-slot:prepend>
              <v-icon color="primary" icon="mdi-account"></v-icon>
            </template> -->
            <!-- <template v-slot:append>
              <v-icon color="success" icon="mdi-check"></v-icon>
            </template> -->
            <v-card-title>{{ blog.owner?.name || "No Name" }}</v-card-title>
            <v-card-subtitle>Come here {{ signupDays }} days</v-card-subtitle>
          </v-card-item>
        </v-card>

        <div class="preview-area">
          <div class="title-row">
            <div class="blog-title">{{ blog.title }}</div>
            <div class="author-row">
              <div class="author">
                <v-icon icon="mdi-account" color="success"></v-icon>
                <div class="author-name">{{ blog.owner?.name || "No Name" }}</div>
              </div>
              <div class="author-btn" v-if="isOwner()">
                <v-btn
                  color="success"
                  size="small"
                  @click="replaceRouter(`/blog/editor/${blog._id}`)"
                >Edit</v-btn>
                <v-btn
                  color="error"
                  size="small"
                  @click="deleteBlog"
                >Delete</v-btn>
              </div>
            </div>
            <div class="blog-detail">
              <div class="blog-tags">
                <v-chip color="success" label size="x-small" v-for="tag in blog.tags">{{ tag }}</v-chip>
              </div>
              <div class="update-time">
                <v-icon icon="mdi-clock-time-four-outline"></v-icon>
                <div class="time-text">{{ updateTime }}</div>
              </div>
            </div>
          </div>
          <MdPreview class="md-preview" :id="id" v-model="blog.content" />
        </div>

        <MdCatalog class="md-catalog" :editorId="id" :scrollElement="scrollElement" />
        
      </div>

      <v-dialog v-model="deleteDialog" max-width="50rem">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this blog?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="tonal" @click="deleteCancel">Cancel</v-btn>
            <v-btn color="error" variant="elevated" @click="deleteConfirm">Confirm</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

const deleteDialog = ref(false)

const blog = reactive({
  // owner: {
  //   _id: "",
  //   account: "",
  //   name: "",
  //   createTime: "",
  // },
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

const signupDays = computed(() => {
  const createDate = new Date(blog.owner?.createTime)
  const currentDate = new Date()
  const timeDiff = currentDate - createDate
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  return days
})

const replaceRouter = function (path) {
  router.push(path)
}

const isOwner = function() {
  return blog.owner?._id === store.state.user._id
}

// open delete comfirm dialog
const deleteBlog = () => {
  deleteDialog.value = true
}

// cancel delete
const deleteCancel = () => {
  deleteDialog.value = false
}

// confirm delete
const deleteConfirm = async () => {
  store.commit('setGlobalLoading', true)
  await $delete(`/doc/${blog._id}`)
  store.commit('setGlobalLoading', false)
  deleteCancel()
  replaceRouter('/blog')
}

onMounted(() => {
  init()
})

const init = async () => {
  if (route.params.id) {
    store.commit('setGlobalLoading', true)
    const res = await $get(`/doc/${route.params.id}`)
    store.commit('setGlobalLoading', false)
    if (res.data.code === 0) {
      blog._id = res.data.body._id
      blog.owner = res.data.body.owner
      blog.title = res.data.body.title
      blog.tags = res.data.body.tags
      blog.content = res.data.body.content
      blog.public = res.data.body.public
      blog.updateTime = res.data.body.updateTime
    } else {
      alert(res.data.message)
    }
  }
}

</script>

<style lang="scss" scoped>
.preview {

}

.preview-content {
  width: 80%;
}

.blog-content {
  display: flex;
  gap: 1rem;

  .blog-sider {
    flex: 1;
    background-color: #ffffff;
    border-radius: 10px;
    // padding: 1rem;
    position: -webkit-sticky;  /* For Safari support */
    position: sticky;          /* For modern browsers */
    top: 6.5rem;                    /* 固定在顶部 */
    height: 100%;               /* 确保它覆盖整个视窗的高度 */
    overflow-y: auto;          /* 如果内容过多，可以滚动 */
  }

  .preview-area {
    flex: 4;
    border-radius: 10px;

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

      .author-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .author {
          display: flex;
          gap: 0.5rem;

          .author-name {
            color: #777777;
          }
        }

        .author-btn {
          display: flex;
          gap: 0.5rem;
        }
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
          display: flex;
          gap: 0.5rem;
          
          .time-text {
            color: #777777;
          }
        }
      }
    }

    .md-preview {
      border-radius: 10px;
    }
  }

  .md-catalog {
    padding: 1rem;
    flex: 1;
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