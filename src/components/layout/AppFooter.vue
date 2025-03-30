<template>
    <footer class="app-footer">
      <div class="container">
        <p>© {{ currentYear }} (联合主义)南武民主共和国 政府信息公开</p>
        <p>遵循远视主义社会主义原则 | <a href="#">隐私政策</a> | <a href="#">联系我们</a></p>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const currentYear = ref(new Date().getFullYear());
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles/utils/_variables.scss';
  
  .app-footer {
    background-color: $color-secondary; /* 页脚的次要颜色 */
    color: $color-text-muted; /* 使用柔和的文字颜色 */
    padding: 1.5rem 0;
    text-align: center;
    font-size: 0.875rem;
    margin-top: auto; // 将页脚推到底部
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  
    p {
      margin: 0.5rem 0;
    }
  
    a {
      color: $color-primary; /* 链接使用主色 */
      text-decoration: none;
  
      &:hover {
        text-decoration: underline;
      }
    }
  }
  </style>