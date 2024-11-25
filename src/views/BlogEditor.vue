<template>
  <div class="editor">
    <div class="title-row">
      <v-text-field
        width="40%"
        clearable
        v-model="blog.title"
        label="Title"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        maxlength="50"
      ></v-text-field>
      <v-combobox
        width="10%"
        v-model="blog.tags"
        :items="tags"
        label="Tags"
        chips
        multiple
        clearable
        variant="outlined"
      ></v-combobox>
      <v-radio-group inline v-model="blog.public">
        <v-radio label="Private" :value="false"></v-radio>
        <v-radio label="Public" :value="true"></v-radio>
      </v-radio-group>
      <div class="btn-area">
        <v-btn color="success" @click="save()">Publish</v-btn>
      </div>
    </div>
    
    <div class="editor-content">
      <Markdown v-model="blog.content" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router"
import Markdown from '@/components/Markdown.vue'
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties

const store = useStore()
const route = useRoute()
const router = useRouter()

const blog = reactive({
  // title: "",
  tags: [],
  // content: "",
  public: true,
})

const tags = reactive([
  "Docker", "DevOps", "Linux"
])

watch(
  () => blog.tags, 
  (newTags) => {
    if (newTags.length > 3) {
      blog.tags.pop()
    }
  }
)

const save = async () => {
  store.commit('setGlobalLoading', true)
  // alert(JSON.stringify(blog))
  if (route.params.id) {
    await $patch(`/doc/${route.params.id}`, blog)
  } else {
    await $post("/doc", blog)
  }
  store.commit('setGlobalLoading', false)
  router.push("/blog")
}

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
    } else {
      alert(res.data.message)
    }
    store.commit('setGlobalLoading', false)
  }
}

</script>

<style lang="scss" scoped>
.editor {
  margin-top: 5rem;
  min-height: calc( 100vh - 12rem );
  // display: flex;
  // justify-content: center;
}

.title-row {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  .v-text-field {
    background-color: #ffffff;
  }
  
  .v-text-field :deep(.v-input__details) {
    display: none;
  }

  .v-radio-group :deep(.v-input__details) {
    display: none;
  }

  .btn-area {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    gap: 1rem;
  }
}

.editor-content {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  height: calc( 100vh - 18rem );
  // gap: 20px;
}
</style>