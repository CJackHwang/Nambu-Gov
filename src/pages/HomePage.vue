<template>
    <div class="home-page">
      <h1>欢迎来到(联合主义)南武民主共和国官方门户</h1>
      <p>
        本站致力于透明公开政府信息，普及远视主义社会主义核心理念，并提供便捷的公共服务入口。
      </p>
      <section class="principles-overview">
        <h2>核心原则概览</h2>
        <ul>
          <li>联合主义：强调团结、协作与共同体利益。</li>
          <li>民主参与：保障公民权利，鼓励广泛政治协商。</li>
          <li>远视规划：着眼长远发展，实现可持续繁荣。</li>
          <li>社会公平：致力于资源合理分配与机会均等。</li>
        </ul>
      </section>
      <section class="quick-links">
        <h2>快速导航</h2>
        <router-link to="/wiki" class="link-button">探索民主百科</router-link>
        <!-- 添加更多快速链接 -->
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  // 页面特定逻辑
  </script>
  
  <style scoped lang="scss">
  @import '@/assets/styles/utils/_variables.scss'; // 如果需要变量
  
  .home-page {
    h1 {
      margin-bottom: 1rem;
      color: $color-primary; // 使用主色调
    }
    p {
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    section {
      margin-bottom: 2.5rem;
      h2 {
        margin-bottom: 1rem;
        border-bottom: 2px solid $color-accent; // 强调色下划线
        padding-bottom: 0.5rem;
        display: inline-block; // 让边框只包裹文字宽度
      }
      ul {
        list-style: disc;
        margin-left: 1.5rem;
        li {
          margin-bottom: 0.5rem;
        }
      }
    }
    .link-button {
       // 简单的按钮样式，后续可做成公共组件
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: $color-primary;
      color: $color-text-light;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: darken($color-primary, 10%);
      }
    }
  }
  </style>