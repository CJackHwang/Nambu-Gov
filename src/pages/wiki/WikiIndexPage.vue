<template>
    <div class="wiki-index-page">
      <h1>民主百科</h1>
      <p>深入了解(联合主义)南武民主共和国的政治、历史、文化与社会结构。</p>
      <!-- 后续这里可以添加 Wiki 条目列表、搜索框等 -->
      <div class="placeholder">
        Wiki 内容区域即将建设...
        <br>
        可在此处集成动态加载的 Markdown 内容或结构化数据。
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Wiki 首页逻辑
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles/utils/_variables.scss';
  
  h1 {
    color: $color-primary;
    margin-bottom: 1rem;
  }
  .placeholder {
    margin-top: 2rem;
    padding: 2rem;
    border: 1px dashed $color-secondary;
    background-color: lighten($color-secondary, 15%);
    text-align: center;
    color: $color-text-muted;
  }
  </style>