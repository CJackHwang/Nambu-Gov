import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Vue 3 插件
  ],
  resolve: {
    alias: {
      // 这是关键：将 '@' 别名配置为指向项目的 'src' 目录
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 如果需要全局注入 SCSS 变量或混入 (可选，当前结构不需要强制注入)
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@/assets/styles/utils/_variables.scss";
  //         @import "@/assets/styles/utils/_mixins.scss";
  //       `
  //       // 注意：全局注入可能导致变量/混入泄漏到所有组件的 <style> 块，
  //       // 即使它们没有显式 @import。按需 @import 通常是更推荐的做法。
  //       // 如果你确实希望全局可用，可以取消注释此部分。
  //     }
  //   }
  // }
  // 服务器配置 (可选，例如更改端口)
  // server: {
  //   port: 3000 // 例如，将开发服务器端口改为 3000
  // }
})