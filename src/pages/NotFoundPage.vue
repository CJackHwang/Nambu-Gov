<template>
    <div class="not-found-page">
      <div class="container">
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在或已被移动。</p>
        <router-link to="/" class="back-home-link">返回首页</router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No specific script logic needed for a simple 404 page
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles/utils/_variables.scss';
  
  .not-found-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 10rem); // Adjust based on header/footer height approximation
    text-align: center;
    padding: 2rem; // Ensure padding even on small screens
  }
  
  .container {
    max-width: 600px;
  }
  
  h1 {
    font-size: 6rem;
    font-weight: bold;
    color: $color-secondary;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  
  h2 {
    font-size: 1.75rem;
    color: $color-primary;
    margin-bottom: 1rem;
  }
  
  p {
    color: $color-text-muted;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .back-home-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: $color-primary;
    color: $color-text-light;
    text-decoration: none;
    border-radius: $border-radius;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: darken($color-primary, 10%);
    }
  }
  </style>