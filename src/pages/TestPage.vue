<template>
  <div class="test-page">
    <h1>测试页面</h1>
    <p>这是一个简单的测试页面，用于确认路由和渲染机制是否正常工作。</p>
    <button @click="count++">点击计数: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<style>
.test-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #b71c1c;
}

button {
  background: #b71c1c;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
}
</style> 