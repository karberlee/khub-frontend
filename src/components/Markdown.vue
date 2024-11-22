<template>
  <MdEditor
    class="customize-md-editor"
    editorId="md-editor-v-0"
    v-model="localValue"
    :toolbars="toolbars"
  />
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const toolbars = reactive([
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-", // 分割
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-", // 分割
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-", // 分割
  "revoke",
  "next",
  "save",
  "=", // 分区（左右）
  "prettier",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "previewOnly",
  "htmlPreview",
  "catalog",
  // "github",
])

// 使用 ref 存储本地值
const localValue = ref(props.modelValue)

// 使用 defineEmits 来触发 update:modelValue 事件
const emit = defineEmits(['update:modelValue'])

// 监听 localValue 的变化，并触发事件更新父组件
watch(localValue, (newVal) => {
  emit('update:modelValue', newVal)
})

// 监听父组件传递的 modelValue 变化，并更新本地值，解决初次加载无法接收传值问题
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});
</script>

<style lang="scss" scoped>
.customize-md-editor {
  height: 100%;
}
</style>