<template>
  <div class="profile-setting">
    <!-- 图片预览 -->
    <div class="profile-avatar">
      <div>Avatar:</div>
      <Avatar :image="avatarUrl" :name="user.name" size="6rem"
        :altText="user.name + ' Avatar'" />
    </div>

    <!-- 文件上传输入框 -->
    <v-file-input
      v-model="file"
      label="Upload Avatar"
      accept="image/*"
      variant="solo"
      :prepend-icon="null"
      prepend-inner-icon="mdi-camera"
      class="avatar-upload"
      :rules="[validateFile]"
      @change="previewImage"
      @click:clear="previewImage"
    ></v-file-input>

    <v-text-field
      variant="outlined"
      v-model="user.name"
      label="Name"
      width="50%"
    ></v-text-field>

    <v-btn color="success" @click="saveProfile">Save</v-btn>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue"
import { useStore } from "vuex"
const { appContext } = getCurrentInstance()
const { $get, $post, $patch, $delete } = appContext.config.globalProperties
import { uploadImage } from "@/utils/common"
import Avatar from "@/components/Avater.vue"

const store = useStore()

const file = ref(null)
const fileName = ref('')
const imageUrl = ref(null)
const user = reactive({})

// const user = computed(() => {
//   return store.state.user
// })

const avatarUrl = computed(() => {
  if (imageUrl.value) {
    return imageUrl.value
  }
  return user.avatar
})

// 文件类型和大小验证
const validateFile = (value) => {
  if (!value) return '请选择文件'
  const file = value[0] // 只处理第一个文件
  const isValidType = file?.type.startsWith('image/')
  const isValidSize = file?.size <= 5 * 1024 * 1024 // 限制最大文件大小为 5MB
  if (!isValidType) return '请上传图片文件'
  if (!isValidSize) return '文件大小不能超过 5MB'
  return true
}

// 预览图片
const previewImage = () => {
  if (!file.value) {
    imageUrl.value = null
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
  }
  reader.readAsDataURL(file.value)
  fileName.value = file.value.name
}

const saveProfile = async () => {
  const params = {}
  params.name = user.name
  store.commit('setGlobalLoading', true)
  const res = await uploadImage(file.value, 'avatar')
  params.avatar = `${res.data.body.path}/${res.data.body.file}`
  await $patch(`/user/${user._id}`, params)
  await getUserInfo()
  store.commit('setGlobalLoading', false)
}

onMounted(() => {
  getUserInfo()
})

const getUserInfo = async () => {
  store.commit('setGlobalLoading', true)
  const res = await $get(`/user/reload`)
  Object.assign(user, res.data.body)
  store.commit('setUser', res.data.body)
  store.commit('setGlobalLoading', false)
}
</script>

<style lang="scss" scoped>
.profile-setting {
  width: 100%;
  margin: 1rem;
}

.profile-avatar {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-upload {
  margin: 1rem 0;
  width: 16rem;
}
</style>