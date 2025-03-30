import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import  router  from './router';

// 引入全局样式入口 (确保 sass 已安装)
import './assets/styles/main.scss';

// 创建 Vue 应用实例
const app = createApp(App);

// 创建 Pinia 实例
const pinia = createPinia();

// 注册 Pinia
app.use(pinia);

// 注册 Vue Router
app.use(router);

// 挂载应用
app.mount('#app');