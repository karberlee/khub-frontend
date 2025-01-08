<template>
  <div class="profile-setting">
    <!-- <v-row>
      <v-col cols="12" md="6"> -->
        <!-- 图片预览 -->
        <div class="profile-avatar">
          <Avatar :image="avatarUrl" :name="user.name" size="6rem"
            :altText="user.name + ' Avatar'" />
        </div>

        <!-- 文件上传输入框 -->
        <v-file-input
          v-model="file"
          label="选择图片"
          accept="image/*"
          variant="solo"
          :prepend-icon="null"
          prepend-inner-icon="mdi-camera"
          class="avatar-upload"
          :rules="[validateFile]"
          @change="previewImage"
          @click:clear="previewImage"
        ></v-file-input>

        <!-- 显示上传的文件名 -->
        <!-- <v-text-field
          v-if="file"
          v-model="fileName"
          label="上传的文件"
          readonly
          outlined
          class="mt-2"
        ></v-text-field> -->
      <!-- </v-col>
    </v-row> -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import Avatar from "@/components/Avater.vue"

const store = useStore()

const file = ref(null)
const fileName = ref('')
const imageUrl = ref(null)

const user = computed(() => {
  return store.state.user
})

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
</script>

<style lang="scss" scoped>
.profile-setting {
  width: 100%;
}

.profile-avatar {
  margin: 1rem;
}

.avatar-upload {
  margin: 1rem;
  width: 50%;
}
</style>