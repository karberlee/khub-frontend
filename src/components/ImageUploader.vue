<template>
  <v-card class="pa-4">
    <v-file-input
      v-model="tempFile"
      :label="label"
      accept="image/*"
      :multiple="false"
      show-size
      prepend-icon="mdi-image"
      @change="appendFile"
    ></v-file-input>

    <v-row v-if="images.length" class="mt-4" dense>
      <v-col v-for="(img, index) in images" :key="index" cols="4">
        <v-img :src="img.url" height="10rem" cover></v-img>
        <div class="mt-1 text-caption text-center">
          <v-btn
            size="x-small"
            icon="mdi-close"
            @click="removeImage(index)"
            variant="tonal"
            color="error"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted, defineExpose  } from 'vue'
import { uploadImage } from "@/utils/common"

// Props
const props = defineProps({
  label: {
    type: String,
    default: 'Upload Image',
  },
  resourceType: {
    type: String,
    default: 'notype',
  },
  multiple: {
    type: Boolean,
    default: false,
  }
})

// 支持 v-model
const modelValue = defineModel() // <-- JavaScript 中不需要传类型
const baseUrl = import.meta.env.VITE_API_URL

const tempFile = ref(null)

// 核心数据结构
const images = ref([]) // 每项结构：{ file?: File, url: string, uploaded: boolean, remotePath?: string }

// 添加图片：创建预览 + 推入 images
const appendFile = () => {
  if (!(tempFile.value instanceof File)) return
  if (!props.multiple) images.value = [] // 单图上传时清空
  
  const file = tempFile.value
  const reader = new FileReader()
  reader.onload = (e) => {
    images.value.push({
      file,
      url: e.target.result,
      uploaded: false,
    })
    updateModelValue()
  }
  reader.readAsDataURL(file)
  tempFile.value = null // 清空，允许重复选择相同图片
}

// 删除图片
const removeImage = (index) => {
  images.value.splice(index, 1)
  updateModelValue()
}

// 同步 modelValue 给父组件，包含 File 或上传路径
function updateModelValue() {
  if (props.multiple) {
    modelValue.value = images.value.map(img => img.uploaded ? img.remotePath : img.file)
  } else {
    const first = images.value[0]
    modelValue.value = first ? (first.uploaded ? first.remotePath : first.file) : ''
  }
}

// 外部调用的上传接口，统一上传未上传文件
async function uploadAll() {
  const uploadedPaths = []

  for (const img of images.value) {
    if (img.uploaded) {
      uploadedPaths.push(img.remotePath)
      continue
    }
    const res = await uploadImage(img.file, props.resourceType)
    const fullPath = `${res.data.body.path}/${res.data.body.file}`

    img.uploaded = true
    img.remotePath = fullPath
    img.url = baseUrl + '/' + fullPath
    delete img.file // 清除 File 引用，节省内存

    uploadedPaths.push(fullPath)
  }

  // 上传完成后同步更新 modelValue
  if (props.multiple) {
    modelValue.value = uploadedPaths
  } else {
    modelValue.value = uploadedPaths[0] || ''
  }
  return modelValue.value                                  // ← 新增：返回上传后的路径列表
}

// 初始化回显（编辑时）
const init = () => {
  if (!modelValue.value) return

  if (props.multiple && Array.isArray(modelValue.value)) {
    images.value = modelValue.value.map(path => ({
      url: baseUrl + '/' + path,
      uploaded: true,
      remotePath: path,
    }))
  } else if (typeof modelValue.value === 'string') {
    images.value = [{
      url: baseUrl + '/' + modelValue.value,
      uploaded: true,
      remotePath: modelValue.value,
    }]
  }
}

onMounted(() => {
  init()
})

defineExpose({
  uploadAll,
})
</script>
