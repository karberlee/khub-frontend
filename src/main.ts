import '@/assets/styles/index.scss'

import { createApp } from 'vue'
import store from '@/store'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { get, post, patch, del } from "@/utils/api"

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)

app.config.globalProperties.$get = get
app.config.globalProperties.$post = post
app.config.globalProperties.$patch = patch
app.config.globalProperties.$delete = del

app.config.errorHandler = (err: any, vm: any, info: string) => {
  console.error('Vue catch error:', err)
  const snackbarObj = {
    visible: true,
    message: `Error: ${err.data?.message || err}`,
    detail: `Detail: ${err.data?.detail || err}`,
  }
  store.commit('setGlobalLoading', false)
  store.commit('setGlobalSnackbar', snackbarObj)
  setTimeout(() => {
    store.commit('setGlobalSnackbar', {
      visible: false,
      message: '',
      detail: [],
    })
  }, 3000); // 3 秒后自动关闭
  
  // 在这里，您可以将错误发送到远程日志服务器等
  // 例如：
  // sendErrorToServer(err, info)
}

store.dispatch('loadUserFromStorage')

app.mount('#app')
