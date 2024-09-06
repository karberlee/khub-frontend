import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd()) || {}

  // https://vitejs.dev/config/
  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/styles/variables.scss";` // scss全局变量引入在vue组件中无法使用，在vite配置中可生效
        }
      }
    },
    server: {
      port: parseInt(env.VITE_PORT || "3000"), // 开发服务器端口
      open: true, // 启动时自动打开浏览器
    },
    // build: {
    //   outDir: 'dist', // 构建输出目录
    //   sourcemap: true, // 生成源映射文件
    // }
  }
})
