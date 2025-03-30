<template>
    <div class="default-layout">
      <AppHeader />
      <main class="main-content">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script setup lang="ts">
  import AppHeader from '../components/layout/AppHeader.vue';
  import AppFooter from '../components/layout/AppFooter.vue';
  </script>
  
  <style scoped lang="scss">
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1; // 让 main 区域占据剩余空间
    padding: 2rem; // 示例内边距
    max-width: 1200px; // 限制内容最大宽度，居中显示
    margin: 0 auto; // 水平居中
    width: 100%;
  }
  </style>