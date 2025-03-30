import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify' // 我们需要安装这个插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        // 启用 defineModel
        defineModel: true
      }
    }),
    // Vuetify 插件
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      // 这是关键：将 '@' 别名配置为指向项目的 'src' 目录
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: true,
  },
  build: {
    // 依赖预打包
    modulePreload: {
      polyfill: true,
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 生产环境是否移除console
        drop_debugger: true, // 生产环境是否移除debugger
      }
    },
    chunkSizeWarningLimit: 1500, // 包大小警告限制
  },
  // 开发服务器配置
  server: {
    host: true,
    port: 5173, // 开发服务器端口
    open: false, // 自动打开浏览器
    cors: true, // 允许跨域
    hmr: {
      overlay: false, // 关闭错误提示遮罩
    },
  },
  // esbuild转换目标
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  // 优化依赖
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vuetify',
      'pinia'
    ],
    exclude: [],
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