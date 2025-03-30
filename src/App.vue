<template>
  <router-view />
</template>

<script setup lang="ts">
// 根组件通常很简单，主要负责渲染当前路由匹配的组件
// 可以在这里添加一些全局的过渡效果等
</script>

<style scoped>
/* 可以添加一些应用级的最外层样式 */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 根据设计理念添加基础背景、字体等 */
  font-family: 'Helvetica Neue', Arial, sans-serif; /* 示例字体，后续可替换 */
  background-color: #f8f9fa; /* 非常浅的灰色背景，符合简约 */
  color: #212529; /* 深灰色文字 */
}
</style>