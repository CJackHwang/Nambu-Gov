<template>
    <header class="app-header">
      <div class="container">
        <router-link to="/" class="logo">
          (联合主义)南武民主共和国
        </router-link>
        <nav class="navigation">
          <router-link to="/">首页</router-link>
          <router-link to="/wiki">民主百科</router-link>
          <!-- 添加更多导航链接 -->
          <!-- <router-link to="/about">关于我们</router-link> -->
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  // Header logic (if any) can go here
  </script>
  
  <style scoped lang="scss">
  // 引入 SCSS 变量
  @import '@/assets/styles/utils/_variables.scss';
  
  .app-header {
    background-color: $color-primary; /* 使用变量定义的主色调 */
    color: $color-text-light;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: inherit; /* 继承 header 的颜色 */
      text-decoration: none;
  
      &:hover {
        text-decoration: underline;
      }
    }
  
    .navigation {
      a {
        color: inherit;
        text-decoration: none;
        margin-left: 1.5rem;
        padding-bottom: 0.25rem; // 为激活状态的下划线留出空间
  
        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 2px; // 稍微加粗下划线
        }
  
        // Vue Router 提供的激活状态 class
        &.router-link-exact-active {
          border-bottom: 2px solid $color-accent; // 使用强调色
          font-weight: 600; // 激活时加粗一点
        }
      }
    }
  }
  </style>