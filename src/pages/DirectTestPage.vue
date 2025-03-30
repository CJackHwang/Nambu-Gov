<template>
  <div class="direct-test-page">
    <h1>无布局测试页面</h1>
    <p>这个页面不使用任何布局组件，直接通过路由渲染。</p>
    <button @click="count++">点击计数: {{ count }}</button>
    <div>
      <a href="/">返回首页</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<style>
.direct-test-page {
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

h1 {
  color: #b71c1c;
}

button {
  background: #b71c1c;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 20px 0;
  cursor: pointer;
}
</style> 